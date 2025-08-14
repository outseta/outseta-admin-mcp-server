import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { queryParamsSchema } from "./api/index.js";
import { QueryParams } from "./api/index.js";
import * as crmAccounts from "./crm_accounts/index.js";
import * as billingPlans from "./billing_plans/index.js";

export const PAGINATION_DESCRIPTION =
  "Use page and perPage for pagination - check the 'total' in metadata to see if more results are available. Set page to skip pages (e.g., page=1 for the second page keeping perPage the same for all pages).";

export const FILTERING_DESCRIPTION =
  "Use filters for filtering data. Each filter should specify a field, optional operator (__gt, __gte, __lt, __lte, __ne, __isnull), and value. For basic filtering without operators, just specify field and value.";

export const registerTools = (server: McpServer) => {
  server.tool(
    "get_accounts",
    `Get accounts from Outseta. ${PAGINATION_DESCRIPTION} ${FILTERING_DESCRIPTION}`,
    queryParamsSchema.shape,
    async (params: QueryParams) => {
      return toolResponse(crmAccounts.getAccounts, params, "get_accounts");
    }
  );

  server.tool(
    "get_plans",
    `Get plans from Outseta. ${PAGINATION_DESCRIPTION} ${FILTERING_DESCRIPTION}`,
    queryParamsSchema.shape,
    async (params: QueryParams) => {
      return toolResponse(billingPlans.getPlans, params, "get_plans");
    }
  );

  server.tool(
    "get_plan_families",
    `Get plan families from Outseta. ${PAGINATION_DESCRIPTION} ${FILTERING_DESCRIPTION}`,
    queryParamsSchema.shape,
    async (params: QueryParams) => {
      return toolResponse(
        billingPlans.getPlanFamilies,
        params,
        "get_plan_families"
      );
    }
  );

  server.tool(
    "create_plan",
    "Create a plan in Outseta",
    billingPlans.createPlanSchema.shape,
    async (params: billingPlans.CreatePlanParams) => {
      return toolResponse(billingPlans.createPlan, params, "create_plan");
    }
  );

  server.tool(
    "create_plan_family",
    "Create a plan family in Outseta",
    billingPlans.createPlanFamilySchema.shape,
    async (params: billingPlans.CreatePlanFamilyParams) => {
      return toolResponse(
        billingPlans.createPlanFamily,
        params,
        "create_plan_family"
      );
    }
  );
};

const toolResponse = async (
  func: (params: any) => Promise<any>,
  params: any,
  operation: string
) => {
  try {
    const response = await func(params);
    return {
      structuredContent: {
        ...response.data,
      },
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(response.data, null, 2),
        },
      ],
    };
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      structuredContent: {
        error: errorMessage,
      },
      content: [
        {
          type: "text" as const,
          text: `Error ${operation}: ${errorMessage}`,
        },
      ],
    };
  }
};
