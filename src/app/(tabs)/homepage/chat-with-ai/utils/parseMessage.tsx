import React from "react";
import { Text, View } from "react-native";
import * as Linking from "expo-linking";

export const renderFormattedText = (text: string) => {
  const elements: React.ReactNode[] = [];
  const lines = text.split("\n");

  lines.forEach((line, lineIndex) => {
    if (!line.trim()) {
      elements.push(<View key={`space-${lineIndex}`} style={{ height: 8 }} />);
      return;
    }

    if (line.trim().startsWith("- ")) {
      const content = line.replace(/^-\s*/, "");
      const formatted = parseInlineFormatting(content);
      elements.push(
        <View key={lineIndex} style={{ flexDirection: "row", marginBottom: 4 }}>
          <Text style={{ color: "white", marginRight: 8, fontSize: 16 }}>•</Text>
          <Text
            style={{
              color: "black",
              flex: 1,
              fontSize: 16,
              fontFamily: "PoppinsRegular",
            }}
          >
            {formatted}
          </Text>
        </View>,
      );
    } else {
      const formatted = parseInlineFormatting(line);
      elements.push(
        <Text
          key={lineIndex}
          style={{
            color: "black",
            fontSize: 16,
            marginBottom: 4,
            fontFamily: "PoppinsRegular",
          }}
        >
          {formatted}
        </Text>,
      );
    }
  });

  return <>{elements}</>;
};

export const parseInlineFormatting = (text: string): React.ReactNode[] => {
  const elements: React.ReactNode[] = [];
  let currentIndex = 0;

  const regex = /(\*\*.*?\*\*)|(\[.*?\]\(.*?\))/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > currentIndex) {
      elements.push(text.substring(currentIndex, match.index));
    }

    const fullMatch = match[0];

    if (fullMatch.startsWith("**")) {
      const boldText = fullMatch.replace(/\*\*/g, "");
      elements.push(
        <Text
          key={match.index}
          style={{ fontFamily: "PoppinsSemiBold", color: "black" }}
        >
          {boldText}
        </Text>,
      );
    } else if (fullMatch.startsWith("[")) {
      const linkMatch = fullMatch.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const linkText = linkMatch[1];
        const url = linkMatch[2];
        elements.push(
          <Text
            key={match.index}
            style={{
              color: "#0e48c7",
              textDecorationLine: "underline",
              fontFamily: "PoppinsSemiBold",
              fontSize: 16,
            }}
            onPress={() => Linking.openURL(url)}
          >
            {linkText}
          </Text>,
        );
      }
    }

    currentIndex = match.index + fullMatch.length;
  }

  if (currentIndex < text.length) {
    elements.push(text.substring(currentIndex));
  }

  return elements.length > 0 ? elements : [text];
};