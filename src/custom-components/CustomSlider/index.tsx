import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";

interface CustomSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  trackHeight?: number;
  thumbSize?: number;
  trackColor?: string;
  fillColor?: string;
  thumbColor?: string;
}

export const CustomSlider: React.FC<CustomSliderProps> = ({
  min = 1,
  max = 10,
  step = 1,
  value = 1,
  onValueChange,
  disabled = false,
  trackHeight = 6,
  thumbSize = 22,
  trackColor = "#F0E8FF",
  fillColor = "#8B5CF6",
  thumbColor = "#8B5CF6",
}) => {
  const [trackWidth, setTrackWidth] = useState(0);

  // ── Animated values ──────────────────────────────────────────────────────
  const thumbAnim = useRef(new Animated.Value(0)).current;
  const fillAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current; // useNativeDriver: true
  const glowAnim = useRef(new Animated.Value(0)).current; // useNativeDriver: false
  const isPressed = useRef(false);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const clamp = (val: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, val));

  const valueToPosition = useCallback(
    (val: number, width: number) => {
      if (width === 0) return 0;
      return ((val - min) / (max - min)) * (width - thumbSize);
    },
    [min, max, thumbSize],
  );

  const positionToValue = useCallback(
    (locationX: number, width: number) => {
      if (width === 0) return value;
      const usable = width - thumbSize;
      const ratio = clamp((locationX - thumbSize / 2) / usable, 0, 1);
      const raw = min + ratio * (max - min);
      return clamp(Math.round(raw / step) * step, min, max);
    },
    [min, max, step, thumbSize, value],
  );

  // ── Sync position when value or trackWidth changes ────────────────────────
  useEffect(() => {
    if (trackWidth === 0) return;
    const pos = valueToPosition(value, trackWidth);
    const fill = pos + thumbSize / 2;

    // Safe — both use useNativeDriver: false
    Animated.parallel([
      Animated.spring(thumbAnim, {
        toValue: pos,
        useNativeDriver: false,
        tension: 180,
        friction: 12,
      }),
      Animated.spring(fillAnim, {
        toValue: fill,
        useNativeDriver: false,
        tension: 180,
        friction: 12,
      }),
    ]).start();
  }, [value, trackWidth]);

  // ── Press animations ──────────────────────────────────────────────────────
  // IMPORTANT: scaleAnim uses useNativeDriver: true
  //            glowAnim uses useNativeDriver: false
  //            Never mix them in Animated.parallel!

  const animatePressIn = () => {
    isPressed.current = true;

    // Native driver — separate call
    Animated.spring(scaleAnim, {
      toValue: 1.35,
      useNativeDriver: true,
      tension: 200,
      friction: 8,
    }).start();

    // JS driver — separate call
    Animated.timing(glowAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const animatePressOut = () => {
    isPressed.current = false;

    // Native driver — separate call
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 8,
    }).start();

    // JS driver — separate call
    Animated.timing(glowAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // ── Update position during drag (instant — no spring) ────────────────────
  const updatePosition = useCallback(
    (locationX: number) => {
      if (trackWidth === 0) return;
      const newValue = positionToValue(locationX, trackWidth);
      const pos = valueToPosition(newValue, trackWidth);
      const fill = pos + thumbSize / 2;

      thumbAnim.setValue(pos);
      fillAnim.setValue(fill);
      onValueChange?.(newValue);
    },
    [trackWidth, positionToValue, valueToPosition, thumbSize, onValueChange],
  );

  // ── Snap to nearest step on release ──────────────────────────────────────
  const snapToStep = useCallback(
    (locationX: number) => {
      if (trackWidth === 0) return;
      const snapped = positionToValue(locationX, trackWidth);
      const pos = valueToPosition(snapped, trackWidth);
      const fill = pos + thumbSize / 2;

      // Safe — both use useNativeDriver: false
      Animated.parallel([
        Animated.spring(thumbAnim, {
          toValue: pos,
          useNativeDriver: false,
          tension: 300,
          friction: 15,
        }),
        Animated.spring(fillAnim, {
          toValue: fill,
          useNativeDriver: false,
          tension: 300,
          friction: 15,
        }),
      ]).start();

      onValueChange?.(snapped);
    },
    [trackWidth, positionToValue, valueToPosition, thumbSize, onValueChange],
  );

  // ── PanResponder ──────────────────────────────────────────────────────────
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,

      onPanResponderGrant: (evt) => {
        animatePressIn();
        updatePosition(evt.nativeEvent.locationX);
      },

      onPanResponderMove: (evt) => {
        updatePosition(evt.nativeEvent.locationX);
      },

      onPanResponderRelease: (evt) => {
        animatePressOut();
        snapToStep(evt.nativeEvent.locationX);
      },

      onPanResponderTerminate: () => {
        animatePressOut();
      },

      onShouldBlockNativeResponder: () => false,
    }),
  ).current;

  // ── Glow interpolations ───────────────────────────────────────────────────
  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.2],
  });

  const glowScale = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.8],
  });

  return (
    <View
      style={[styles.container, { height: thumbSize + 16 }]}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        setTrackWidth(w);

        // Set initial positions without animation on first layout
        const pos = valueToPosition(value, w);
        thumbAnim.setValue(pos);
        fillAnim.setValue(pos + thumbSize / 2);
      }}
      pointerEvents={disabled ? "none" : "auto"}
      {...(!disabled ? panResponder.panHandlers : {})}
    >
      {/* ── Background Track ── */}
      <View
        style={[
          styles.track,
          {
            height: trackHeight,
            backgroundColor: trackColor,
            borderRadius: trackHeight / 2,
          },
        ]}
      />

      {/* ── Filled Track ── */}
      <Animated.View
        style={[
          styles.fill,
          {
            height: trackHeight,
            width: fillAnim,
            backgroundColor: fillColor,
            borderRadius: trackHeight / 2,
          },
        ]}
        pointerEvents="none"
      />

      {/* ── Glow Ring (behind thumb) ── */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.glow,
          {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: fillColor,
            opacity: glowOpacity,
            top: "50%",
            marginTop: -(thumbSize / 2),
            left: thumbAnim,
            transform: [{ scale: glowScale }],
          },
        ]}
      />

      {/* ── Thumb ── */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            left: thumbAnim,
            top: "50%",
            marginTop: -(thumbSize / 2),
            transform: [{ scale: scaleAnim }],
            backgroundColor: "white",
            borderWidth: 2.5,
            borderColor: disabled ? "#ccc" : fillColor,
            opacity: disabled ? 0.5 : 1,
            shadowColor: fillColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.35,
            shadowRadius: 4,
            elevation: 5,
          },
        ]}
      >
        {/* Inner dot */}
        <View
          style={{
            width: thumbSize * 0.35,
            height: thumbSize * 0.35,
            borderRadius: thumbSize,
            backgroundColor: disabled ? "#ccc" : fillColor,
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
  },
  track: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  fill: {
    position: "absolute",
    left: 0,
  },
  glow: {
    position: "absolute",
  },
  thumb: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
