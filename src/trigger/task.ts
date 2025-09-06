import { Context, logger, task } from "@trigger.dev/sdk";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const testRun = async (input: string, ctx: Context) => {
  console.log("Hello world from console.log", input);

  await logger.trace("testRun", async (span) => {
    const res = await generateText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "user",
          content: "Create a random user. Return name, age and email.",
        },
      ],
      experimental_telemetry: {
        isEnabled: true,
        metadata: {
          triggerRunId: ctx.run.id,
          triggerRunUrl: `https://cloud.trigger.dev/orgs/${ctx.organization.slug}/projects/${ctx.project.slug}/env/${ctx.environment.slug}/runs/${ctx.run.id}`,
        },
      },
    });

    console.log(res.text);
  });
};

export const testTelemetry = task({
  id: "test-telemetry",
  run: async (payload: { input: string }, { ctx }) => {
    await testRun(payload.input, ctx);
  },
});
