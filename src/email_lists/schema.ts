import { z } from "zod";

const welcomeEmailSchema = z.object({
  fromName: z.string().describe("The 'from' name for welcome emails"),
  fromEmail: z
    .string()
    .email()
    .describe("The 'from' email address for welcome emails"),
  subject: z.string().describe("The subject line for welcome emails"),
  body: z.string().describe("The HTML body for welcome emails"),
});

export const createEmailListSchema = z.object({
  name: z.string().describe("The name of the email list"),
  description: z.string().optional().describe("Description of the email list"),
  isInternal: z
    .boolean()
    .optional()
    .default(false)
    .describe(
      "Whether the list is internal (no double opt-in or welcome email)"
    ),
  requiresDoubleOptIn: z
    .boolean()
    .optional()
    .default(true)
    .describe(
      "Whether the list requires double opt-in (only allowed when isInternal is false)"
    ),
  welcome: welcomeEmailSchema
    .optional()
    .describe(
      "Welcome email configuration (only allowed when isInternal is false)"
    ),
});

export type CreateEmailListParams = z.infer<typeof createEmailListSchema>;
