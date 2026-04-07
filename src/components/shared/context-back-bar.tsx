import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";

interface ContextBackBarProps {
  href: string;
  label: string;
  contextText?: string;
  className?: string;
}

export function ContextBackBar({ href, label, contextText, className }: ContextBackBarProps) {
  return (
    <div className={cn("flex items-center justify-between rounded-lg border border-border/60 bg-card/40 px-3 py-2 text-xs", className)}>
      <Link href={href} className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>{label}</span>
      </Link>
      {contextText ? <span className="text-muted-foreground">{contextText}</span> : null}
    </div>
  );
}
