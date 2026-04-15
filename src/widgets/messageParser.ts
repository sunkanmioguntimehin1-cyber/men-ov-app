export type MessageSegment =
  | { type: "text"; content: string }
  | { type: "actions"; options: string[] }
  | { type: "widget"; name: WidgetName; payload?: string }
  | { type: "selection"; value: string };

export type WidgetName =
  | "symptom_form"
  | "cycle_form"
  | "date_picker"
  | "intensity_slider"
  | "management_tabs"
  | "resource";

export interface CyclePayload {
  type: "cycle";
  start_date: string;
  duration: string;
  note?: string;
}

export interface SymptomPayload {
  type: "symptom";
  symptoms: string[];
  severity_level: "Mild" | "Moderate" | "Severe";
  date_logged: string;
  triggers: string[];
  notes?: string;
}

export interface WidgetSelectionResult {
  widgetType: "date_picker" | "cycle_form" | "symptom_form";
  payload: string | CyclePayload | SymptomPayload;
}

const ACTION_RE = /<<ACTIONS:\s*(\[.*?\])>>/g;
const WIDGET_RE = /<<WIDGET:\s*([\w_]+(?::[\w\s\-]+)?)>>/g;
const SELECTION_RE = /<<SELECTION:\[(.*?)\]>>/g;
const SPLIT_RE =
  /<<(?:ACTIONS:\s*\[.*?\]|WIDGET:\s*[\w_]+(?::[\w\s\-]+)?|SELECTION:\[.*?\])>>/g;

export function parseMessage(raw: string): MessageSegment[] {
  const segments: MessageSegment[] = [];
  let lastIndex = 0;

  const tags: { index: number; length: number; raw: string }[] = [];

  let m: RegExpExecArray | null;
  const combined = new RegExp(
    "<<(?:ACTIONS:\\s*(\\[.*?\\])|WIDGET:\\s*([\\w_]+(?::[\\w\\s\\-]+)?)|SELECTION:(\\[.*?\\]))>>",
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
    } else if (tag.raw.includes("SELECTION:")) {
      const match = tag.raw.match(/SELECTION:\[(.*?)\]/);
      if (match) {
        segments.push({ type: "selection", value: match[1] });
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

export function extractSelection(raw: string): string | undefined {
  const match = raw.match(/<<SELECTION:\[(.*?)\]>>/);
  return match ? match[1] : undefined;
}

export function stripSelectionTag(raw: string): string {
  return raw.replace(/<<SELECTION:\[.*?\]>>\s*/g, "");
}

export function parseSystemPayload(payloadStr: string): Record<string, string> {
  const result: Record<string, string> = {};
  const parts = payloadStr.split("|").map((p) => p.trim());
  for (const part of parts) {
    const colonIdx = part.indexOf(":");
    if (colonIdx !== -1) {
      const key = part.substring(0, colonIdx).trim();
      const val = part.substring(colonIdx + 1).trim();
      result[key] = val;
    }
  }
  return result;
}

export function parseWidgetSelection(
  raw: string,
): WidgetSelectionResult | undefined {
  if (!raw) return undefined;

  if (raw.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return { widgetType: "date_picker", payload: raw };
  }

  if (raw.includes("SYSTEM_PAYLOAD:")) {
    const payloadMatch = raw.match(/\[SYSTEM_PAYLOAD:\s*(.*?)\]/s);
    if (!payloadMatch) return undefined;
    const payloadContent = payloadMatch[1];
    const parsed = parseSystemPayload(payloadContent);
    const widgetType = parsed["type"];

    if (widgetType === "cycle") {
      return {
        widgetType: "cycle_form",
        payload: {
          type: "cycle",
          start_date: parsed["start_date"] || "",
          duration: parsed["duration"] || "",
          note: parsed["note"] || "",
        } as CyclePayload,
      };
    }

    if (widgetType === "symptom") {
      const symptomsStr = parsed["symptoms"] || "none";
      const triggersStr = parsed["triggers"] || "none";
      const severityStr = parsed["severity_level"] || "Moderate";
      return {
        widgetType: "symptom_form",
        payload: {
          type: "symptom",
          symptoms:
            symptomsStr === "none"
              ? []
              : symptomsStr.split(", ").map((s) => s.trim()),
          severity_level: severityStr as "Mild" | "Moderate" | "Severe",
          date_logged: parsed["date_logged"] || "",
          triggers:
            triggersStr === "none"
              ? []
              : triggersStr.split(", ").map((t) => t.trim()),
          notes: parsed["notes"] || "",
        } as SymptomPayload,
      };
    }
  }

  return undefined;
}
