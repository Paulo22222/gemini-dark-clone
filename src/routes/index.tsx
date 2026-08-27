import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/gemini/Header";
import { ChatInput } from "@/components/gemini/ChatInput";
import { Message, type ChatMessage } from "@/components/gemini/Message";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gemini — Assistente de IA em Dark Mode" },
      {
        name: "description",
        content:
          "Interface de conversa estilo Gemini em dark mode: mensagens fluidas, blocos de código com destaque de sintaxe e barra de entrada flutuante.",
      },
      { property: "og:title", content: "Gemini — Assistente de IA em Dark Mode" },
      {
        property: "og:description",
        content:
          "Converse com um assistente de IA em uma interface escura minimalista com blocos de código copiáveis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const INITIAL: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "Me mostra uma função em Python que calcula Fibonacci com memoization.",
  },
  {
    id: "2",
    role: "assistant",
    content: `Claro. A versão com memoization guarda os resultados já calculados, então cada valor é computado apenas uma vez — a complexidade cai de exponencial para linear.

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci(n: int) -> int:
    """Retorna o n-ésimo número de Fibonacci."""
    if n < 0:
        raise ValueError("n deve ser não-negativo")
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Exemplo de uso
print([fibonacci(i) for i in range(10)])  # 0 1 1 2 3 5 8 13 21 34
\`\`\`

Se preferir evitar recursão, uma versão iterativa usa memória constante e é ainda mais rápida para valores grandes de n.`,
  },
];

function Index() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: text },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Esta é uma demonstração de interface, então ainda não estou conectado a um modelo. Assim que houver um backend, a resposta real aparecerá exatamente aqui, com o mesmo estilo de texto e blocos de código.",
      },
    ]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-8 px-4 pt-6 pb-40">
          <h1 className="sr-only">Conversa com o Gemini</h1>
          {messages.map((m) => (
            <Message key={m.id} message={m} />
          ))}
          <div ref={endRef} />
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-8 pb-4">
        <div className="mx-auto w-full max-w-[800px] px-4">
          <ChatInput onSend={send} />
          <p className="mt-3 text-center text-xs text-muted-foreground">
            O Gemini pode cometer erros, inclusive sobre pessoas. Verifique as respostas.
          </p>
        </div>
      </div>
    </div>
  );
}
