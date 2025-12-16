import { Linking, Text } from "react-native";

export const ParseInlineFormatting = (text: string): React.ReactNode[] => {
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
          style={{ fontFamily: "PoppinsSemiBold", color: "white" }}
        >
          {boldText}
        </Text>
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
              color: "#ADD8E6",
              textDecorationLine: "underline",
              fontFamily: "PoppinsRegular",
            }}
            onPress={() => Linking.openURL(url)}
          >
            {linkText}
          </Text>
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
