import { z } from "zod";

export const createPlanSchema = z.object({
  accountRegistrationMode: z.enum(["Individual", "Team"]).default("Individual"),
  isActive: z.boolean().describe("Whether the plan is active"),
  name: z.string().describe("The name of the plan"),
  planFamilyUid: z.string().describe("The UID of the plan family"),
  trialPeriodDays: z
    .number()
    .optional()
    .describe("Number of trial period days"),
  rates: z
    .union([
      z.object({
        monthlyRate: z
          .number()
          .optional()
          .describe("The monthly rate for the plan"),
        quarterlyRate: z
          .number()
          .optional()
          .describe("The quarterly rate for the plan"),
        annualRate: z
          .number()
          .optional()
          .describe("The annual rate for the plan"),
      }),
      z.object({
        oneTimeRate: z
          .number()
          .optional()
          .describe("The one-time fee for the plan"),
      }),
    ])
    .optional()
    .default({})
    .describe("The rates for the plan"),
});

export const createPlanFamilySchema = z.object({
  name: z.string().describe("The name of the plan family"),
  isDefault: z
    .boolean()
    .optional()
    .default(false)
    .describe("Whether the plan family is the default"),
  isActive: z
    .boolean()
    .optional()
    .default(true)
    .describe("Whether the plan family is active"),
});
