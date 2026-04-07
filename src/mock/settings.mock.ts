import type { Source } from "@/types/contracts";
import type { UiState } from "@/types/view-models";

export interface SettingsMock {
  sources: Source[];
  refresh_frequency: string;
  classification_rule_version: string;
  importance_rule_version: string;
  prompt_profile: string;
  crawl_job_status: Array<{ job_name: string; status: string; last_run_at: string }>;
}

export const settingsMock: UiState<SettingsMock> = {
  scenario: "ready",
  data: {
    sources: [
      {
        id: "src_01",
        name: "通义千问官方文档",
        source_type: "docs",
        url: "https://example.com/docs",
        enabled: true,
        crawl_strategy: "rss",
        last_crawled_at: "2026-04-07T08:00:00Z",
        status: "active"
      },
      {
        id: "src_02",
        name: "阿里云官方博客",
        source_type: "blog",
        url: "https://example.com/blog",
        enabled: true,
        crawl_strategy: "html",
        last_crawled_at: "2026-04-07T07:10:00Z",
        status: "active"
      },
      {
        id: "src_03",
        name: "Qwen GitHub",
        source_type: "github",
        url: "https://github.com/QwenLM",
        enabled: true,
        crawl_strategy: "api",
        last_crawled_at: "2026-04-07T06:45:00Z",
        status: "active"
      }
    ],
    refresh_frequency: "每 6 小时",
    classification_rule_version: "v1.0-static",
    importance_rule_version: "v1.0-static",
    prompt_profile: "研究工作台基础模板",
    crawl_job_status: [
      {
        job_name: "官方文档同步",
        status: "最近一次成功",
        last_run_at: "2026-04-07T08:00:00Z"
      },
      {
        job_name: "GitHub 变更同步",
        status: "最近一次成功",
        last_run_at: "2026-04-07T06:45:00Z"
      }
    ]
  }
};
