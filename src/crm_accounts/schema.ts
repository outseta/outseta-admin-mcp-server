import { z } from "zod";

export const registerAccountSchema = z.object({
  email: z
    .string()
    .email()
    .describe(
      "The email address of the person signing up and creating the account."
    ),
  planUid: z.string().describe("The UID of the plan for the subscription"),
  firstName: z
    .string()
    .optional()
    .describe("The first name of the primary person"),
  lastName: z
    .string()
    .optional()
    .describe("The last name of the primary person"),
  accountName: z.string().optional().describe("The name of the account"),
  billingRenewalTerm: z
    .enum(["Monthly", "Quarterly", "Annual"])
    .optional()
    .default("Monthly")
    .describe("The billing renewal term for the subscription")
    .transform((val) => {
      switch (val) {
        case "Monthly":
          return 1;
        case "Annual":
          return 2;
        case "Quarterly":
          return 3;
        default:
          return 1; // Default to Monthly
      }
    }),
});

export const addPersonToAccountSchema = z.object({
  accountUid: z
    .string()
    .describe("The UID of the account to add the person to"),
  personUid: z.string().describe("The UID of the person to add to the account"),
  isPrimary: z
    .boolean()
    .optional()
    .default(false)
    .describe(
      "Whether this person should be the primary contact for the account"
    ),
  sendWelcomeEmail: z
    .boolean()
    .optional()
    .default(false)
    .describe("Whether to send a welcome email to the person"),
});

export type AddPersonToAccountParams = z.infer<typeof addPersonToAccountSchema>;
