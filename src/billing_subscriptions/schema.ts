import { z } from "zod";

export const subscriptionChangeSchema = z.object({
  accountUid: z.string().describe("The unique identifier for the account"),
  planUid: z
    .string()
    .optional()
    .describe(
      "The unique identifier for the plan to change to. Will use current subscription plan if not provided."
    ),
  billingRenewalTerm: z
    .enum(["Monthly", "Quarterly", "Annual"])
    .optional()
    .describe(
      "The billing renewal term for the new plan. Will use current subscription term if not provided."
    )
    .transform((val) => {
      if (!val) return undefined;
      switch (val) {
        case "Monthly":
          return 1;
        case "Annual":
          return 2;
        case "Quarterly":
          return 3;
        default:
          return undefined;
      }
    }),
  startImmediately: z
    .boolean()
    .optional()
    .default(false)
    .describe("Whether the changes should start immediately"),
});
