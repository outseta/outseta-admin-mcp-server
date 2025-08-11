import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
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

export const registerAccountsTools = (
  server: McpServer,
  outsetaApi: OutsetaApi
) => {
  server.tool(
    "get_accounts",
    `Get accounts from Outseta. ${PAGINATION_DESCRIPTION} ${FILTERING_DESCRIPTION}`,
    {
      ...paginationSchema.shape,
      ...orderBySchema.shape,
      filters: filtersSchema,
    },
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
