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

export const getEmailListSubscribersSchema = z.object({
  listUid: z.string().describe("The unique identifier of the email list"),
});

export const subscribeToEmailListSchema = z.object({
  listUid: z.string().describe("The unique identifier of the email list"),
  personUid: z
    .string()
    .describe("The unique identifier of the person to subscribe"),
  sendWelcomeEmail: z
    .boolean()
    .optional()
    .default(false)
    .describe("Whether to send a welcome email to the subscriber"),
});

export type CreateEmailListParams = z.infer<typeof createEmailListSchema>;
export type GetEmailListSubscribersParams = z.infer<
  typeof getEmailListSubscribersSchema
>;
export type SubscribeToEmailListParams = z.infer<
  typeof subscribeToEmailListSchema
>;
