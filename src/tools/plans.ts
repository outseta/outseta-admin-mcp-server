import { z } from "zod";
import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  paginationSchema,
  filtersSchema,
  orderBySchema,
  PAGINATION_DESCRIPTION,
  FILTERING_DESCRIPTION,
  QueryParams,
} from "../schemas/common.js";
import { createSuccessResponse, createErrorResponse } from "./_utils.js";
import type OutsetaApi from "../api.js";

const oneTimeRateSchema = z.object({
  oneTimeRate: z
    .number()
    .optional()
    .default(0)
    .describe("The one-time fee for the plan"),
});
const recurringRateSchema = z.object({
  monthlyRate: z
    .number()
    .optional()
    .default(0)
    .describe("The monthly rate for the plan"),
  quarterlyRate: z
    .number()
    .optional()
    .default(0)
    .describe("The quarterly rate for the plan"),
  yearlyRate: z
    .number()
    .optional()
    .default(0)
    .describe("The yearly rate for the plan"),
});

export const registerPlansTools = (
  server: McpServer,
  outsetaApi: OutsetaApi
) => {
  server.tool(
    "get_plans",
    `Get billing plans from Outseta. ${PAGINATION_DESCRIPTION} ${FILTERING_DESCRIPTION}`,
    {
      ...paginationSchema.shape,
      ...orderBySchema.shape,
      filters: filtersSchema,
    },
    async (params: QueryParams) => {
      try {
        const response = await outsetaApi.getPlans(params);
        return createSuccessResponse(response);
      } catch (error: any) {
        return createErrorResponse(error, "retrieving plans");
      }
    }
  );
  server.tool("get_plan_families", "Get all plan families", {}, async () => {
    try {
      const response = await outsetaApi.getPlanFamilies();
      return createSuccessResponse(response);
    } catch (error: any) {
      return createErrorResponse(error, "retrieving plan families");
    }
  });
  server.tool(
    "create_plan",
    "Create a new billing plan",
    {
      accountRegistrationMode: z
        .enum(["Individual", "Team"])
        .default("Individual")
        .transform((val) => (val === "Individual" ? 1 : 2))
        .describe(
          "Account registration mode: Individual = one account per person (no account info requested), Team = one account per group (account info requested during registration)"
        ),
      isActive: z.boolean().describe("Whether the plan is active"),
      name: z.string().describe("The name of the plan"),
      planFamilyUid: z.string().describe("The UID of the plan family"),
      rates: z
        .union([oneTimeRateSchema, recurringRateSchema])
        .describe("The rates for the plan"),
      trialPeriodDays: z.number().describe("Number of trial period days"),
    },
    async (params: any) => {
      // Transform the parameters to match the expected API format
      const transformedParams = {
        AccountRegistrationMode: params.accountRegistrationMode,
        IsActive: params.isActive,
        Name: params.name,
        PlanFamily: { Uid: params.planFamilyUid },
        MonthlyRate: params.rates.monthlyRate,
        QuarterlyRate: params.rates.quarterlyRate,
        YearlyRate: params.rates.yearlyRate,
        OneTimeRate: params.rates.oneTimeRate,
        TrialPeriodDays: params.trialPeriodDays,
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
