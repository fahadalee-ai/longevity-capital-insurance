import { Download, FileText, Share2 } from "lucide-react";
import { formatDateShort, type AppDocument } from "@/lib/mock-data";

export function DocumentRow({
  doc,
  onDownload,
  onShare,
}: {
  doc: AppDocument;
  onDownload?: () => void;
  onShare?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border px-1 py-3 last:border-0">
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-elevated text-primary">
        <FileText size={18} strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{doc.name}</p>
        <p className="text-xs text-dim">
          {doc.type} · {formatDateShort(doc.addedAt)} · {doc.size}
        </p>
      </div>
      <button type="button" aria-label="Download" onClick={onDownload} className="p-2 text-muted-foreground">
        <Download size={16} strokeWidth={2} />
      </button>
      <button type="button" aria-label="Share" onClick={onShare} className="p-2 text-muted-foreground">
        <Share2 size={16} strokeWidth={2} />
      </button>
    </div>
  );
}
