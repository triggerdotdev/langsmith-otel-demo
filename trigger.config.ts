import { defineConfig } from "@trigger.dev/sdk";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

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
    exporters: [
      new OTLPTraceExporter({
        url: "https://api.smith.langchain.com/otel/v1/traces",
        headers: {
          "x-api-key": process.env.LANGSMITH_API_KEY!,
          "Langsmith-Project": process.env.LANGSMITH_PROJECT ?? "default",
        },
      }),
    ],
  },
});
