import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import OutsetaApi, { queryParamsSchema, QueryParams } from "../api/index.js";
import {
  createSuccessResponse,
  createErrorResponse,
  PAGINATION_DESCRIPTION,
  FILTERING_DESCRIPTION,
} from "./_utils.js";

export const registerAccountsTools = (
  server: McpServer,
  outsetaApi: OutsetaApi
) => {
  server.tool(
    "get_accounts",
    `Get accounts from Outseta. ${PAGINATION_DESCRIPTION} ${FILTERING_DESCRIPTION}`,
    queryParamsSchema.shape,
    async (params: QueryParams) => {
      try {
        const response = await outsetaApi.getAccounts(params);
        return createSuccessResponse(response);
      } catch (error: any) {
        console.error(error);
        return createErrorResponse(error, "retrieving accounts");
      }
    }
  );
};
