export type MessageSegment =
  | { type: "text"; content: string }
  | { type: "actions"; options: string[] }
  | { type: "widget"; name: WidgetName; payload?: string };

export type WidgetName =
  | "symptom_form"
  | "cycle_form"
  | "date_picker"
  | "intensity_slider"
  | "management_tabs"
  | "resource";

const ACTION_RE = /<<ACTIONS:\s*(\[.*?\])>>/g;
const WIDGET_RE = /<<WIDGET:\s*([\w_]+(?::[\w\s\-]+)?)>>/g;
const SPLIT_RE = /<<(?:ACTIONS:\s*\[.*?\]|WIDGET:\s*[\w_]+(?::[\w\s\-]+)?)>>/g;

export function parseMessage(raw: string): MessageSegment[] {
  const segments: MessageSegment[] = [];
  let lastIndex = 0;

  // Collect all tags with their positions
  const tags: { index: number; length: number; raw: string }[] = [];

  let m: RegExpExecArray | null;
  const combined = new RegExp(
    "<<(?:ACTIONS:\\s*(\\[.*?\\])|WIDGET:\\s*([\\w_]+(?::[\\w\\s\\-]+)?))>>",
    "g",
  );

  while ((m = combined.exec(raw)) !== null) {
    tags.push({ index: m.index, length: m[0].length, raw: m[0] });
  }

  for (const tag of tags) {
    if (tag.index > lastIndex) {
      const text = raw.slice(lastIndex, tag.index).trim();
      if (text) segments.push({ type: "text", content: text });
    }

    if (tag.raw.includes("ACTIONS:")) {
      const match = tag.raw.match(/ACTIONS:\s*(\[.*?\])/);
      if (match) {
        try {
          const options: string[] = JSON.parse(match[1]);
          segments.push({ type: "actions", options });
        } catch {}
      }
    } else if (tag.raw.includes("WIDGET:")) {
      const match = tag.raw.match(/WIDGET:\s*([\w_]+)(?::([\w\s\-]+))?/);
      if (match) {
        const name = match[1] as WidgetName;
        const payload = match[2]?.trim();
        segments.push({ type: "widget", name, payload });
      }
    }

    lastIndex = tag.index + tag.length;
  }

  if (lastIndex < raw.length) {
    const text = raw.slice(lastIndex).trim();
    if (text) segments.push({ type: "text", content: text });
  }

  return segments;
}
