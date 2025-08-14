import { type CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { AxiosResponse } from "axios";

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
