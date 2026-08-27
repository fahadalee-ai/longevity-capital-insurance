import { createFileRoute } from "@tanstack/react-router";
import { Paperclip, Send } from "lucide-react";
import { useState } from "react";
import { ChatBubble } from "@/components/ChatBubble";
import { AuthGate } from "@/components/Gate";
import { QUICK_REPLIES, seedAgent } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/messages/")({
  component: MessagesScreen,
});

function MessagesScreen() {
  return (
    <AuthGate title="Sign in to message your agent" body="Chat with a licensed agent about quotes, claims, and appointments.">
      <ChatThread />
    </AuthGate>
  );
}

function ChatThread() {
  const { messages, sendMessage } = useApp();
  const [text, setText] = useState("");
  const agent = seedAgent;

  const send = (value?: string) => {
    const next = (value ?? text).trim();
    if (!next) return;
    sendMessage(next);
    setText("");
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background pt-[max(0.75rem,env(safe-area-inset-top))]">
      <header className="flex items-center gap-3 border-b border-border px-4 pb-3">
        <img src={agent.photo} alt="" className="h-11 w-11 rounded-lg object-cover" />
        <div className="min-w-0 flex-1">
          <p className="font-display font-semibold">{agent.name}</p>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/30 px-2 py-0.5 text-[10px] font-semibold text-[#9aa4ff]">{agent.title}</span>
            <span className="text-[11px] text-success">{agent.lastSeen}</span>
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <ChatBubble key={m.id} message={m} />
        ))}
      </div>
      <div className="border-t border-border px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
        <div className="mb-2 flex gap-2 overflow-x-auto">
          {QUICK_REPLIES.map((r) => (
            <button key={r} type="button" onClick={() => send(r)} className="shrink-0 rounded-full bg-surface px-3 py-1.5 text-xs text-muted-foreground">
              {r}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-dim">
            <Paperclip size={18} />
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) sendMessage(`Shared ${f.name}`, f.name);
              }}
            />
          </label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Message your agent"
            className="h-10 flex-1 rounded-lg border border-border bg-surface-elevated px-3 text-sm outline-none focus:border-primary"
          />
          <button type="button" onClick={() => send()} className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
