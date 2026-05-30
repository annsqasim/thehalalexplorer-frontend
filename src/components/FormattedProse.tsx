"use client";

interface FormattedProseProps {
  text: string;
  className?: string;
}

/**
 * Renders plain text with optional markdown-style headings:
 * - Lines starting with ### become h3
 * - Lines starting with ## become h4 (avoid h2 to preserve page hierarchy)
 */
export function FormattedProse({ text, className = "" }: FormattedProseProps) {
  const blocks = text.split(/\n\n+/).filter(Boolean);

  return (
    <div className={`space-y-4 text-gray-700 leading-relaxed ${className}`}>
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("### ")) {
          return (
            <div key={index}>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {trimmed.replace(/^###\s+/, "")}
              </h3>
            </div>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h4 key={index} className="text-lg font-semibold text-gray-900">
              {trimmed.replace(/^##\s+/, "")}
            </h4>
          );
        }
        return (
          <p key={index} className="text-lg">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
