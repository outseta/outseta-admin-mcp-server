import { z } from "zod";
import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import OutsetaApi, { queryParamsSchema, QueryParams } from "../api/index.js";

import {
  createSuccessResponse,
  createErrorResponse,
  PAGINATION_DESCRIPTION,
  FILTERING_DESCRIPTION,
} from "./_utils.js";

const createPlanSchema = z.object({
  accountRegistrationMode: z.enum(["Individual", "Team"]).default("Individual"),
  isActive: z.boolean().describe("Whether the plan is active"),
  name: z.string().describe("The name of the plan"),
  planFamilyUid: z.string().describe("The UID of the plan family"),
  trialPeriodDays: z.number().describe("Number of trial period days"),
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
        yearlyRate: z
          .number()
          .optional()
          .describe("The yearly rate for the plan"),
      }),
      z.object({
        oneTimeRate: z
          .number()
          .optional()
          .describe("The one-time fee for the plan"),
      }),
    ])
    .describe("The rates for the plan"),
});

export const registerPlansTools = (
  server: McpServer,
  outsetaApi: OutsetaApi
) => {
  server.tool(
    "get_plans",
    `Get billing plans from Outseta. ${PAGINATION_DESCRIPTION} ${FILTERING_DESCRIPTION}`,
    queryParamsSchema.shape,
    async (params: QueryParams) => {
      try {
        const response = await outsetaApi.getPlans(params);
        return createSuccessResponse(response);
      } catch (error: any) {
        return createErrorResponse(error, "retrieving plans");
      }
    }
  );
  server.tool(
    "get_plan_families",
    "Get all plan families",
    queryParamsSchema.shape,
    async (params: QueryParams) => {
      try {
        const response = await outsetaApi.getPlanFamilies(params);
        return createSuccessResponse(response);
      } catch (error: any) {
        return createErrorResponse(error, "retrieving plan families");
      }
    }
  );
  server.tool(
    "create_plan",
    "Create a new billing plan in Outseta",
    createPlanSchema.shape,
    async (params: z.infer<typeof createPlanSchema>) => {
      const MonthlyRate =
        "monthlyRate" in params.rates ? params.rates.monthlyRate : undefined;
      const QuarterlyRate =
        "quarterlyRate" in params.rates
          ? params.rates.quarterlyRate
          : undefined;
      const YearlyRate =
        "yearlyRate" in params.rates && params.rates.yearlyRate
          ? params.rates.yearlyRate
          : undefined;
      const OneTimeRate =
        "oneTimeRate" in params.rates && params.rates.oneTimeRate
          ? params.rates.oneTimeRate
          : undefined;

      const transformedParams = {
        AccountRegistrationMode: params.accountRegistrationMode,
        IsActive: params.isActive,
        Name: params.name,
        PlanFamily: { Uid: params.planFamilyUid },
        TrialPeriodDays: params.trialPeriodDays,
        MonthlyRate,
        QuarterlyRate,
        YearlyRate,
        OneTimeRate,
      };

      try {
        const response = await outsetaApi.createPlan(transformedParams);
        return createSuccessResponse(response);
      } catch (error: any) {
        return createErrorResponse(error, "creating plan");
      }
    }
  );
};
