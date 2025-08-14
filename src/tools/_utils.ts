import { type CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { AxiosResponse } from "axios";

export const PAGINATION_DESCRIPTION =
  "Use page and perPage for pagination - check the 'total' in metadata to see if more results are available. Set page to skip pages (e.g., page=1 for the second page keeping perPage the same for all pages).";

export const FILTERING_DESCRIPTION =
  "Use filters for filtering data. Each filter should specify a field, optional operator (__gt, __gte, __lt, __lte, __ne, __isnull), and value. For basic filtering without operators, just specify field and value.";

export const createSuccessResponse = (
  response: AxiosResponse<any>
): CallToolResult => {
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
};

export const createErrorResponse = (
  error: unknown,
  operation: string
): CallToolResult => {
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
};
