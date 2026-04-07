import type { ReactNode } from "react";

import type { ScenarioState } from "@/types/enums";

import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { SkeletonBlock } from "@/components/shared/skeleton-block";

interface ScenarioStateGateProps {
  scenario: ScenarioState;
  children: ReactNode;
  loadingFallback?: ReactNode;
  emptyTitle: string;
  emptyDescription?: string;
  errorTitle: string;
  errorDescription?: string;
}

export function ScenarioStateGate({
  scenario,
  children,
  loadingFallback,
  emptyTitle,
  emptyDescription,
  errorTitle,
  errorDescription
}: ScenarioStateGateProps) {
  if (scenario === "loading") return loadingFallback ?? <SkeletonBlock />;
  if (scenario === "empty") return <EmptyState title={emptyTitle} description={emptyDescription} />;
  if (scenario === "error") return <ErrorState title={errorTitle} description={errorDescription} />;

  return <>{children}</>;
}
