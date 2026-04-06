import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";

interface PaywallWebViewModalProps {
  visible: boolean;
  url: string;
  onClose: () => void;
  /** Called when the WebView detects the redirect scheme */
  onRedirect: (url: string) => void;
  redirectScheme?: string;
}

const PaywallWebViewModal: React.FC<PaywallWebViewModalProps> = ({
  visible,
  url,
  onClose,
  onRedirect,
  redirectScheme = "menoviaapp://",
}) => {
  const [loading, setLoading] = React.useState(true);
  const redirectFiredRef = React.useRef(false);

  // Reset the guard every time the modal opens
  React.useEffect(() => {
    if (visible) {
      redirectFiredRef.current = false;
      setLoading(true);
    }
  }, [visible]);

  const fireRedirect = React.useCallback(
    (navUrl: string) => {
      // Only fire once per session
      if (redirectFiredRef.current) return;
      redirectFiredRef.current = true;
      onRedirect(navUrl);
    },
    [onRedirect],
  );

  // ── 1. onShouldStartLoadWithRequest ─────────────────────────────────────
  // Most reliable — fires before the WebView even attempts to load the URL.
  // Return false to block the navigation (we handle it ourselves).
  const handleShouldStartLoad = (request: any): boolean => {
    if (request.url && request.url.startsWith(redirectScheme)) {
      fireRedirect(request.url);
      return false; // block the WebView from trying to load a custom scheme
    }
    return true;
  };

  // ── 2. onNavigationStateChange ───────────────────────────────────────────
  // Backup: fires when the navigation state changes (e.g. history push).
  const handleNavigationChange = (navState: WebViewNavigation) => {
    if (navState.url && navState.url.startsWith(redirectScheme)) {
      fireRedirect(navState.url);
    }
  };

  // ── 3. Injected JS — catches window.location assignments & meta-refreshes ─
  // RevenueCat sometimes does window.location = "menoviaapp://..." in JS.
  // We intercept that and post it back via postMessage.
  const INJECTED_JS = `
    (function () {
      var _scheme = ${JSON.stringify(redirectScheme)};

      // Intercept location.href setter
      try {
        var _href = Object.getOwnPropertyDescriptor(window.location, 'href');
        if (_href && _href.configurable && _href.set) {
          Object.defineProperty(window.location, 'href', {
            configurable: true,
            set: function(v) {
              if (typeof v === 'string' && v.startsWith(_scheme)) {
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'redirect', url: v }));
              } else {
                _href.set.call(window.location, v);
              }
            },
            get: function() { return _href.get.call(window.location); }
          });
        }
      } catch(e) {}

      // Intercept anchor clicks
      document.addEventListener('click', function(e) {
        var el = e.target;
        while (el && el.tagName !== 'A') el = el.parentElement;
        if (el && el.href && el.href.startsWith(_scheme)) {
          e.preventDefault();
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'redirect', url: el.href }));
        }
      }, true);
    })();
    true;
  `;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data?.type === "redirect" && data?.url?.startsWith(redirectScheme)) {
        fireRedirect(data.url);
      }
    } catch (_) {}
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Upgrade to Plus</Text>
          <View style={styles.closeBtn} />
        </View>

        {/* Loading overlay */}
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#712A87" />
          </View>
        )}

        <WebView
          source={{ uri: url }}
          style={styles.webview}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          // Three layers of redirect detection
          onShouldStartLoadWithRequest={handleShouldStartLoad}
          onNavigationStateChange={handleNavigationChange}
          onMessage={handleMessage}
          injectedJavaScriptBeforeContentLoaded={INJECTED_JS}
          // Allow custom scheme so Android does not crash on unknown protocol
          originWhitelist={["https://*", "http://*", "menoviaapp://*"]}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState={false}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#1f2937",
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PaywallWebViewModal;
