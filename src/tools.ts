import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { queryParamsSchema } from "./api/index.js";
import { QueryParams } from "./api/index.js";
import * as crmAccounts from "./crm_accounts/index.js";
import * as crmPeople from "./crm_people/index.js";
import * as billingPlans from "./billing_plans/index.js";
import * as billingSubscriptions from "./billing_subscriptions/index.js";
import * as emailLists from "./email_lists/index.js";

export const CONFIRMATION_DESCRIPTION =
  "Make sure to ask for confirmation before running this tool.";

export const PAGINATION_DESCRIPTION =
  "Use page and perPage for pagination - check the 'total' in metadata to see if more results are available. Set page to skip pages (e.g., page=1 for the second page keeping perPage the same for all pages).";

export const FILTERING_DESCRIPTION =
  "Use filters for filtering data. Each filter should specify a field, optional operator (__gt, __gte, __lt, __lte, __ne, __isnull), and value. For basic filtering without operators, just specify field and value.";

const READ_ANNOTATION = {
  readOnlyHint: true,
  destructiveHint: false,
  openWorldHint: true,
} as const;

const WRITE_ANNOTATION = {
  readOnlyHint: false,
  destructiveHint: false,
  openWorldHint: true,
} as const;

const DESTRUCTIVE_ANNOTATION = {
  ...WRITE_ANNOTATION,
  destructiveHint: true,
} as const;

export const registerTools = (server: McpServer) => {
  // ── CRM Accounts ──

  server.registerTool("get_accounts", {
    description: `Get accounts from Outseta. Remember to use ask specifically for LifeTimeValue if needed.
     ${PAGINATION_DESCRIPTION} ${FILTERING_DESCRIPTION}`,
    inputSchema: queryParamsSchema.shape,
    annotations: READ_ANNOTATION,
  }, async (params: QueryParams) => {
    return toolResponse(crmAccounts.getAccounts, params, "get_accounts");
  });

  server.registerTool("register_account", {
    description: `Register a new account (person + account + subscription) in Outseta. ${CONFIRMATION_DESCRIPTION}`,
    inputSchema: crmAccounts.registerAccountSchema.shape,
    annotations: WRITE_ANNOTATION,
  }, async (params: crmAccounts.RegisterAccountParams) => {
    return toolResponse(crmAccounts.registerAccount, params, "register_account");
  });

  // ── CRM People ──

  server.registerTool("get_people", {
    description: `Get people from Outseta. ${PAGINATION_DESCRIPTION} ${FILTERING_DESCRIPTION}`,
    inputSchema: queryParamsSchema.shape,
    annotations: READ_ANNOTATION,
  }, async (params: QueryParams) => {
    return toolResponse(crmPeople.getPeople, params, "get_people");
  });

  server.registerTool("create_person", {
    description: `Create a person in Outseta. People can be connected to accounts or exist independently (e.g., for email lists or support tickets). ${CONFIRMATION_DESCRIPTION}`,
    inputSchema: crmPeople.createPersonSchema.shape,
    annotations: WRITE_ANNOTATION,
  }, async (params: crmPeople.CreatePersonParams) => {
    return toolResponse(crmPeople.createPerson, params, "create_person");
  });

  server.registerTool("add_person_to_account", {
    description: `Add an existing person to an account in Outseta. ${CONFIRMATION_DESCRIPTION}`,
    inputSchema: crmAccounts.addPersonToAccountSchema.shape,
    annotations: WRITE_ANNOTATION,
  }, async (params: crmAccounts.AddPersonToAccountParams) => {
    return toolResponse(crmAccounts.addPersonToAccount, params, "add_person_to_account");
  });

  // ── Billing Plans ──

  server.registerTool("get_plans", {
    description: `Get plans from Outseta. ${PAGINATION_DESCRIPTION} ${FILTERING_DESCRIPTION}`,
    inputSchema: queryParamsSchema.shape,
    annotations: READ_ANNOTATION,
  }, async (params: QueryParams) => {
    return toolResponse(billingPlans.getPlans, params, "get_plans");
  });

  server.registerTool("get_plan_families", {
    description: `Get plan families from Outseta. ${PAGINATION_DESCRIPTION} ${FILTERING_DESCRIPTION}`,
    inputSchema: queryParamsSchema.shape,
    annotations: READ_ANNOTATION,
  }, async (params: QueryParams) => {
    return toolResponse(billingPlans.getPlanFamilies, params, "get_plan_families");
  });

  server.registerTool("create_plan", {
    description: `Create a plan in Outseta. ${CONFIRMATION_DESCRIPTION}`,
    inputSchema: billingPlans.createPlanSchema.shape,
    annotations: WRITE_ANNOTATION,
  }, async (params: billingPlans.CreatePlanParams) => {
    return toolResponse(billingPlans.createPlan, params, "create_plan");
  });

  server.registerTool("create_plan_family", {
    description: `Create a plan family in Outseta. ${CONFIRMATION_DESCRIPTION}`,
    inputSchema: billingPlans.createPlanFamilySchema.shape,
    annotations: WRITE_ANNOTATION,
  }, async (params: billingPlans.CreatePlanFamilyParams) => {
    return toolResponse(billingPlans.createPlanFamily, params, "create_plan_family");
  });

  // ── Billing Subscriptions ──

  server.registerTool("preview_subscription_change", {
    description: `Preview the subscription plan change for an account in Outseta without making actual changes.`,
    inputSchema: billingSubscriptions.subscriptionChangeSchema.shape,
    annotations: READ_ANNOTATION,
  }, async (params: billingSubscriptions.SubscriptionChangeParams) => {
    return toolResponse(billingSubscriptions.previewSubscriptionChange, params, "preview_subscription_change");
  });

  server.registerTool("change_subscription", {
    description: `Change the subscription plan for an account in Outseta. Make sure to preview the change. ${CONFIRMATION_DESCRIPTION}`,
    inputSchema: billingSubscriptions.subscriptionChangeSchema.shape,
    annotations: DESTRUCTIVE_ANNOTATION,
  }, async (params: billingSubscriptions.SubscriptionChangeParams) => {
    return toolResponse(billingSubscriptions.changeSubscription, params, "change_subscription");
  });

  // ── Email Lists ──

  server.registerTool("get_email_lists", {
    description: `Get email lists from Outseta. ${PAGINATION_DESCRIPTION} ${FILTERING_DESCRIPTION}`,
    inputSchema: queryParamsSchema.shape,
    annotations: READ_ANNOTATION,
  }, async (params: QueryParams) => {
    return toolResponse(emailLists.getEmailLists, params, "get_email_lists");
  });

  server.registerTool("create_email_list", {
    description: `Create an email list in Outseta. Welcome email configuration and requiresDoubleOptIn are only allowed when isInternal is false. ${CONFIRMATION_DESCRIPTION}`,
    inputSchema: emailLists.createEmailListSchema.shape,
    annotations: WRITE_ANNOTATION,
  }, async (params: emailLists.CreateEmailListParams) => {
    return toolResponse(emailLists.createEmailList, params, "create_email_list");
  });

  server.registerTool("get_email_list_subscribers", {
    description: `Get all subscribers to a specific email list from Outseta.`,
    inputSchema: emailLists.getEmailListSubscribersSchema.shape,
    annotations: READ_ANNOTATION,
  }, async (params: emailLists.GetEmailListSubscribersParams) => {
    return toolResponse(emailLists.getEmailListSubscribers, params, "get_email_list_subscribers");
  });

  server.registerTool("subscribe_to_email_list", {
    description: `Subscribe an existing person to an email list in Outseta. ${CONFIRMATION_DESCRIPTION}`,
    inputSchema: emailLists.subscribeToEmailListSchema.shape,
    annotations: WRITE_ANNOTATION,
  }, async (params: emailLists.SubscribeToEmailListParams) => {
    return toolResponse(emailLists.subscribeToEmailList, params, "subscribe_to_email_list");
  });
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
    // If there is a response data, it means the error is from the API
    // So we can return the error message from the API
    const errorData = error.response?.data ?? { message: error.message };
    return {
      structuredContent: {
        error: errorData,
      },
      content: [
        {
          type: "text" as const,
          text: `Error ${operation}:\n\n${JSON.stringify(errorData, null, 2)}`,
        },
      ],
    };
  }
};
