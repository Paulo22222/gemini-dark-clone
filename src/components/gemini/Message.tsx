import { CodeBlock } from "./CodeBlock";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

/** Splits assistant text into prose and ```lang fenced code blocks. */
function renderContent(content: string) {
  const parts = content.split(/```/);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      const nl = part.indexOf("\n");
      const language = part.slice(0, nl).trim() || "code";
      return <CodeBlock key={i} language={language} code={part.slice(nl + 1).replace(/\s+$/, "")} />;
    }
    return part
      .split(/\n{2,}/)
      .filter(Boolean)
      .map((p, j) => (
        <p key={`${i}-${j}`} className="mb-4 last:mb-0 whitespace-pre-wrap">
          {p}
        </p>
      ));
  });
}

export function Message({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-3xl bg-bubble px-5 py-3 text-bubble-foreground leading-relaxed">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="text-assistant leading-[1.6]">{renderContent(message.content)}</div>
  );
}
