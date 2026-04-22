import { format, isValid, parse } from "date-fns";
import { stripQuotaTag, stripSelectionTag } from "@/src/widgets/messageParser";

export const formatUserMessageForDisplay = (text: string): string => {
  console.log("Original message text for formatting:", text);
  let formatted = stripSelectionTag(text);
  formatted = stripQuotaTag(formatted);
  if (formatted.startsWith("[SYSTEM_PAYLOAD:")) {
    formatted = formatted
      .replace("[SYSTEM_PAYLOAD: FORM_SUBMITTED | ", "")
      .replace("]", "")
      .replace("type: ", "");
  }

  formatted = formatted.replace(
    /([a-z_]+):\s*(\d{4}-\d{2}-\d{2})(?:\s|$|\|)/g,
    (match, fieldName, dateStr) => {
      const parsed = parse(dateStr, "yyyy-MM-dd", new Date());
      if (!isValid(parsed)) return match;
      return `${fieldName}: ${format(parsed, "MMM d, yyyy")}`;
    },
  );

  console.log("Formatted message text for display:", formatted);

  return formatted;
};