# Trigger.dev + LangSmith Telemetry Demo

This project demonstrates how to integrate [Trigger.dev](https://trigger.dev) with [LangSmith](https://smith.langchain.com) for AI telemetry and observability. It includes a sample task that generates text using OpenAI's GPT-4o model while capturing telemetry data in LangSmith.

## Features

- **Trigger.dev Integration**: Background task processing with retry logic and scaling
- **LangSmith Telemetry**: Complete observability for AI model interactions
- **OpenAI Integration**: Text generation using GPT-4o model
- **TypeScript Support**: Fully typed codebase for better development experience

## Prerequisites

Before getting started, make sure you have:

1. **Node.js** (version 18 or higher)
2. **npm** or **yarn** package manager
3. **Trigger.dev account** - [Sign up here](https://trigger.dev)
4. **OpenAI API key** - [Get one here](https://platform.openai.com/api-keys)
5. **LangSmith account** - [Sign up here](https://smith.langchain.com)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```bash
# Trigger.dev
TRIGGER_PROJECT_REF=your_trigger_project_ref_here

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# LangSmith
LANGSMITH_API_KEY=your_langsmith_api_key_here
LANGSMITH_PROJECT=your_project_name_here
```

#### Getting Your Env vars:

**Trigger.dev:**

1. Go to your [Trigger.dev dashboard](https://cloud.trigger.dev)
2. Navigate to your project
3. Copy the "Project Reference" (starts with `proj_`) from the project settings

**OpenAI:**

1. Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new secret key
3. Copy the key (starts with `sk-`)

**LangSmith:**

1. Go to [LangSmith Settings](https://smith.langchain.com/settings)
2. Create an API key in the "API Keys" section
3. Create a project or use an existing one

### 3. Development Setup

Start the development server:

```bash
npm run dev
```

This will:

- Start the Trigger.dev development environment
- Watch for file changes and reload automatically
- Connect to your Trigger.dev project
- Enable local task execution

### 4. Testing the Task

Once the development server is running, you can trigger the task:

1. **Via Trigger.dev Dashboard:**

   - Go to your project dashboard
   - Find the "test-telemetry" task
   - Click "Test" and provide a payload like: `{"input": "test message"}`

2. **Via API (using curl):**
   ```bash
   curl -X POST "https://api.trigger.dev/api/v1/tasks/test-telemetry/trigger" \
     -H "Authorization: Bearer YOUR_TRIGGER_SECRET_KEY" \
     -H "Content-Type: application/json" \
     -d '{"input": "Hello from API"}'
   ```

## Project Structure

```
├── src/
│   └── trigger/
│       └── task.ts          # Main task definition
├── trigger.config.ts        # Trigger.dev configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── .env                    # Environment variables (create this)
└── README.md              # This file
```

## How It Works

### The Task (`src/trigger/task.ts`)

The main task does the following:

1. **Receives Input**: Takes a string input parameter
2. **Calls OpenAI**: Uses the AI SDK to generate text with GPT-4o
3. **Captures Telemetry**: Automatically sends trace data to LangSmith
4. **Returns Results**: Logs the generated text

### Telemetry Configuration

The `trigger.config.ts` file configures:

- **OTLP Exporter**: Sends telemetry data to LangSmith
- **Retry Logic**: Handles failures with exponential backoff
- **Process Management**: Optimizes performance with keep-alive settings
- **Machine Scaling**: Uses `small-2x` machines for processing

## Monitoring and Observability

### LangSmith Dashboard

After running tasks, you can view detailed telemetry in your LangSmith dashboard:

1. **Traces**: See complete execution traces with timing
2. **Model Calls**: Monitor OpenAI API usage and performance
3. **Errors**: Debug failed requests with full context
4. **Metrics**: Track usage patterns and costs

### Trigger.dev Dashboard

Monitor your tasks in the Trigger.dev dashboard:

1. **Task Runs**: View execution history and status
2. **Logs**: Access detailed execution logs
3. **Performance**: Monitor execution times and resource usage
4. **Scheduling**: Set up recurring or delayed task execution

## Deployment

To deploy your tasks to production:

```bash
npm run deploy
```

This will:

- Build your TypeScript code
- Deploy to Trigger.dev's infrastructure
- Make your tasks available for production use

## Environment Variables Reference

| Variable              | Description                         | Required |
| --------------------- | ----------------------------------- | -------- |
| `TRIGGER_PROJECT_REF` | Trigger.dev project reference ID    | ✅       |
| `OPENAI_API_KEY`      | OpenAI API key for GPT model access | ✅       |
| `LANGSMITH_API_KEY`   | LangSmith API key for telemetry     | ✅       |
| `LANGSMITH_PROJECT`   | LangSmith project name              | ✅       |

## Troubleshooting

### Common Issues

1. **"Project not found" error**

   - Verify your `TRIGGER_PROJECT_REF` is correct
   - Check that the project reference in your `.env` file matches your Trigger.dev project

2. **OpenAI API errors**

   - Ensure your `OPENAI_API_KEY` is valid and has sufficient credits
   - Check that you have access to the GPT-4o model

3. **LangSmith telemetry not appearing**

   - Verify your `LANGSMITH_API_KEY` and `LANGSMITH_PROJECT` are correct
   - Check that your LangSmith project exists

4. **Development server won't start**
   - Make sure you're using Node.js 18 or higher
   - Try deleting `node_modules` and running `npm install` again

### Getting Help

- **Trigger.dev**: [Documentation](https://trigger.dev/docs) | [Discord](https://discord.gg/trigger)
- **LangSmith**: [Documentation](https://docs.smith.langchain.com) | [Support](https://smith.langchain.com/support)
- **OpenAI**: [Documentation](https://platform.openai.com/docs) | [Support](https://platform.openai.com/support)

## Next Steps

- Explore more complex AI workflows
- Set up scheduled tasks for regular processing
- Add error handling and retry logic
- Implement webhook triggers for real-time processing
- Scale to multiple tasks and workflows
