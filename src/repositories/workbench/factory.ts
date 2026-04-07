import { getDataSourceMode } from "@/lib/env";
import { httpWorkbenchRepository } from "@/repositories/workbench/http-repository";
import { mockWorkbenchRepository } from "@/repositories/workbench/mock-repository";
import type { WorkbenchRepository } from "@/repositories/workbench/repository";

export function getWorkbenchRepository(): WorkbenchRepository {
  const mode = getDataSourceMode();
  return mode === "api" ? httpWorkbenchRepository : mockWorkbenchRepository;
}
