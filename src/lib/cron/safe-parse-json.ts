export function safeParseJSON<T>(raw: string, label: string): T {
  let cleaned = raw.replace(/```json|```/g, '').trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error(`No JSON object found in Gemini response for: ${label}`);
  cleaned = match[0];

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    cleaned = cleaned.replace(/("(?:[^"\\]|\\.)*")|(\n)/g, (m, str, nl) => {
      if (str) return str;
      if (nl) return ' ';
      return m;
    });

    cleaned = cleaned
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"');

    try {
      return JSON.parse(cleaned) as T;
    } catch (e2) {
      const lastBrace = cleaned.lastIndexOf('}');
      if (lastBrace > 0) {
        try {
          return JSON.parse(cleaned.slice(0, lastBrace + 1)) as T;
        } catch {
          // fall through
        }
      }
      throw new Error(`JSON parse failed for "${label}": ${(e2 as Error).message}`);
    }
  }
}
