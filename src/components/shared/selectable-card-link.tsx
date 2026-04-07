import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface SelectableCardLinkProps {
  href: string;
  selected?: boolean;
  className?: string;
  children: ReactNode;
}

export function SelectableCardLink({ href, selected = false, className, children }: SelectableCardLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block rounded-xl border border-transparent transition-all hover:-translate-y-0.5 hover:border-primary/60",
        selected && "border-primary/60 bg-primary/5",
        className
      )}
    >
      {children}
    </Link>
  );
}
