import { useState } from "react";
import { Check, Copy } from "lucide-react";

const PY_KEYWORDS =
  /\b(def|return|if|elif|else|for|while|import|from|as|class|try|except|finally|with|lambda|yield|in|not|and|or|is|None|True|False|pass|break|continue|raise|async|await|print|self|public|static|void|new|int|String|final|private)\b/g;

type Token = { text: string; kind: string };

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  const pattern = new RegExp(
    [
      "(#[^\\n]*|//[^\\n]*)", // comment
      "(\"\"\"[\\s\\S]*?\"\"\"|'''[\\s\\S]*?'''|\"(?:[^\"\\\\\\n]|\\\\.)*\"|'(?:[^'\\\\\\n]|\\\\.)*')", // string
      "(\\b\\d+(?:\\.\\d+)?\\b)", // number
    ].join("|"),
    "g",
  );

  let last = 0;
  let m: RegExpExecArray | null;
  const pushPlain = (text: string) => {
    if (!text) return;
    let idx = 0;
    let k: RegExpExecArray | null;
    PY_KEYWORDS.lastIndex = 0;
    while ((k = PY_KEYWORDS.exec(text))) {
      if (k.index > idx) tokens.push({ text: text.slice(idx, k.index), kind: "plain" });
      tokens.push({ text: k[0], kind: "keyword" });
      idx = k.index + k[0].length;
    }
    if (idx < text.length) tokens.push({ text: text.slice(idx), kind: "plain" });
  };

  while ((m = pattern.exec(code))) {
    pushPlain(code.slice(last, m.index));
    tokens.push({
      text: m[0],
      kind: m[1] ? "comment" : m[2] ? "string" : "number",
    });
    last = m.index + m[0].length;
  }
  pushPlain(code.slice(last));
  return tokens;
}

const kindClass: Record<string, string> = {
  keyword: "text-code-keyword",
  string: "text-code-string",
  number: "text-code-number",
  comment: "text-code-comment italic",
  plain: "text-code-plain",
};

export function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-surface-border bg-code">
      <div className="flex items-center justify-between border-b border-surface-border px-4 py-2">
        <span className="text-xs font-medium tracking-wide text-muted-foreground lowercase">
          {language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copiado" : "Copiar código"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-6">
        <code className="font-mono">
          {tokenize(code).map((t, i) => (
            <span key={i} className={kindClass[t.kind]}>
              {t.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
