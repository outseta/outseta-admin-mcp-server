import { PaginatedResults } from "../schemas/common.js";

export const createSuccessResponse = (structuredContent: PaginatedResults) => {
  return {
    structuredContent: {
      ...structuredContent,
    },
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(structuredContent, null, 2),
      },
    ],
  };
};

export const createErrorResponse = (error: unknown, operation: string) => {
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
