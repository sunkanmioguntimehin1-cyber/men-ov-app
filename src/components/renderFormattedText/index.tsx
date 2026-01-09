import { Text, View } from "react-native";
import { ParseInlineFormatting } from "../parseInlineFormatting";

export const RenderFormattedText = (text: string): React.ReactNode => {
  const elements: React.ReactNode[] = [];
  const lines = text.split("\n");

  lines.forEach((line, lineIndex) => {
    if (!line.trim()) {
      elements.push(<View key={`space-${lineIndex}`} style={{ height: 8 }} />);
      return;
    }

    if (line.trim().startsWith("- ")) {
      const content = line.replace(/^-\s*/, "");
      const formatted = ParseInlineFormatting(content);
      elements.push(
        <View key={lineIndex} style={{ flexDirection: "row", marginBottom: 4 }}>
          <Text style={{ color: "white", marginRight: 8, fontSize: 16 }}>
            •
          </Text>
          <Text
            style={{
              color: "white",
              flex: 1,
              fontSize: 16,
              fontFamily: "PoppinsRegular",
            }}
          >
            {formatted}
          </Text>
        </View>
      );
    } else {
      const formatted = ParseInlineFormatting(line);
      elements.push(
        <Text
          key={lineIndex}
          style={{
            color: "white",
            fontSize: 16,
            marginBottom: 4,
            fontFamily: "PoppinsRegular",
          }}
        >
          {formatted}
        </Text>
      );
    }
  });

  return <>{elements}</>;
};
