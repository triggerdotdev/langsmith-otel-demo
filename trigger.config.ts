import { defineConfig } from "@trigger.dev/sdk";
import { initializeOTEL } from "langsmith/experimental/otel/setup";

const { DEFAULT_LANGSMITH_SPAN_EXPORTER } = initializeOTEL({
  skipGlobalContextManagerSetup: true,
  exporterConfig: {
    url: "https://api.smith.langchain.com/otel/v1/traces",
    projectName: process.env.LANGSMITH_PROJECT ?? "default",
    apiKey: process.env.LANGSMITH_API_KEY!,
  },
});

export default defineConfig({
  project: process.env.TRIGGER_PROJECT_REF!,
  processKeepAlive: {
    enabled: true,
    maxExecutionsPerProcess: 20,
  },
  logLevel: "log",
  maxDuration: 3600,
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  machine: "small-2x",
  telemetry: {
    exporters: [DEFAULT_LANGSMITH_SPAN_EXPORTER],
  },
});
