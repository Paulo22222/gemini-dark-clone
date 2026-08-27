import { useRef, useState } from "react";
import { ArrowUp, ChevronDown, Mic, Plus } from "lucide-react";

export function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  const submit = () => {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue("");
    if (ref.current) ref.current.style.height = "auto";
  };

  return (
    <div className="rounded-[28px] border border-surface-border bg-surface px-3 py-2.5">
      <div className="flex items-end gap-2">
        <button
          type="button"
          aria-label="Adicionar arquivos ou imagens"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-bubble hover:text-foreground"
        >
          <Plus className="size-5" />
        </button>

        <textarea
          ref={ref}
          rows={1}
          value={value}
          placeholder="Peça ao Gemini"
          onChange={(e) => {
            setValue(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          className="max-h-[200px] flex-1 resize-none bg-transparent py-2 text-[15px] leading-6 text-foreground outline-none placeholder:text-muted-foreground"
        />

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="hidden items-center gap-1 rounded-full px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-bubble hover:text-foreground sm:inline-flex"
          >
            2.5 Flash
            <ChevronDown className="size-3.5" />
          </button>
          {value.trim() ? (
            <button
              type="button"
              aria-label="Enviar"
              onClick={submit}
              className="flex size-9 items-center justify-center rounded-full bg-send text-send-foreground transition-opacity hover:opacity-90"
            >
              <ArrowUp className="size-5" />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Entrada por voz"
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-bubble hover:text-foreground"
            >
              <Mic className="size-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
