import OpenAI from 'openai';
import { config } from '../config';
import { listMonthlyRevenue } from './tools/listRevenue';
import { createLimitedTimeOffer } from './tools/createOffer';
import { analyzeChurn } from './tools/analyzeChurn';
import { retryFailedInvoice } from './tools/retryInvoice';

type ToolName = 'listMonthlyRevenue' | 'createLimitedTimeOffer' | 'analyzeChurn' | 'retryFailedInvoice';

const tools: Record<ToolName, (args: any) => Promise<any>> = {
  listMonthlyRevenue,
  createLimitedTimeOffer,
  analyzeChurn,
  retryFailedInvoice,
};

const toolDefinitions: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'listMonthlyRevenue',
      description: 'Returns total revenue captured over the last N months.',
      parameters: {
        type: 'object',
        properties: { months: { type: 'number', description: 'Number of months to look back (default 3)' } },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'createLimitedTimeOffer',
      description: 'Creates a new Stripe product and price for a limited-time offer.',
      parameters: {
        type: 'object',
        required: ['name', 'currency', 'unitAmount'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          currency: { type: 'string' },
          unitAmount: { type: 'number', description: 'Amount in cents' },
          interval: { type: 'string', enum: ['month', 'year'] },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'analyzeChurn',
      description: 'Analyzes subscription churn over the last N days.',
      parameters: {
        type: 'object',
        properties: { days: { type: 'number', description: 'Number of days to analyze (default 30)' } },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'retryFailedInvoice',
      description: 'Retries payment for a failed Stripe invoice.',
      parameters: {
        type: 'object',
        required: ['invoiceId'],
        properties: { invoiceId: { type: 'string' } },
      },
    },
  },
];

const client = new OpenAI({ apiKey: config.copilot.apiKey });

export async function copilotQuery(input: {
  userMessage: string;
  toolCall?: { name: ToolName; args: any };
}) {
  // Direct tool invocation bypass
  if (input.toolCall) {
    const fn = tools[input.toolCall.name];
    if (!fn) throw new Error(`Unknown tool: ${input.toolCall.name}`);
    const result = await fn(input.toolCall.args);
    return { type: 'tool_result', result };
  }

  // LLM-driven flow with tool use
  const response = await client.chat.completions.create({
    model: config.copilot.model,
    messages: [
      {
        role: 'system',
        content:
          'You are a Stripe revenue operations copilot. Use the available tools to answer questions about revenue, subscriptions, churn, and invoices. Be concise and data-driven.',
      },
      { role: 'user', content: input.userMessage },
    ],
    tools: toolDefinitions,
    tool_choice: 'auto',
  });

  const message = response.choices[0].message;

  if (message.tool_calls?.length) {
    const tc = message.tool_calls[0];
    const fn = tools[tc.function.name as ToolName];
    if (!fn) throw new Error(`Unknown tool: ${tc.function.name}`);
    const args = JSON.parse(tc.function.arguments);
    const result = await fn(args);
    return { type: 'tool_result', tool: tc.function.name, result };
  }

  return { type: 'message', message: message.content };
}