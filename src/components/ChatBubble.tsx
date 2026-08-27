import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/mock-data";

export function ChatBubble({ message }: { message: ChatMessage }) {
  const mine = message.from === "you";
  return (
    <div className={cn("mb-3 flex", mine ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-3.5 py-2.5 text-[15px] leading-relaxed shadow-[0_8px_24px_rgba(0,0,0,0.25)]",
          mine ? "bg-primary text-white" : "bg-surface text-white",
        )}
      >
        <p>{message.text}</p>
        {message.attachment && <p className="mt-1 text-xs opacity-80">Attachment: {message.attachment}</p>}
        <p className={cn("mt-1 text-[11px]", mine ? "text-white/70" : "text-dim")}>{message.time}</p>
      </div>
    </div>
  );
}
