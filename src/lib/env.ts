export type DataSourceMode = "mock" | "api";

export function getDataSourceMode(): DataSourceMode {
  const raw = process.env.NEXT_PUBLIC_DATA_SOURCE;
  if (raw === "api") return "api";
  return "mock";
}
