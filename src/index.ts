#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import OutsetaApi, { OutsetaPaginatedResults, FilterParam } from "./api.js";

const PAGINATION_DESCRIPTION =
  "Use page and perPage for pagination - check the 'total' in metadata to see if more results are available. Set page to skip pages (e.g., page=1 for the second page keeping perPage the same for all pages).";

const FILTERING_DESCRIPTION =
  "Use filters for filtering data. Each filter should specify a field, optional operator (__gt, __gte, __lt, __lte, __ne, __isnull), and value. For basic filtering without operators, just specify field and value.";

const paginationSchema = z.object({
  page: z
    .number()
    .min(0)
    .default(0)
    .describe(
      "The page number to start from (0-based). Use page=1 for the second page, page=2 for the third page, etc."
    ),
  perPage: z
    .number()
    .min(1)
    .max(100)
    .default(100)
    .describe(
      "The number of results to return per page. Maximum value is 100. Use with page for pagination, keep the same value for all pages."
    ),
});

const filterSchema = z.object({
  field: z
    .string()
    .describe(
      "The field name to filter on. Use with operator and value. Example: CreatedAt"
    ),
  operator: z
    .enum(["gt", "gte", "lt", "lte", "ne", "isnull"])
    .optional()
    .describe(
      "Comparison operator: gt (>), gte (>=), lt (<), lte (<=), ne (!=), isnull (is null). Use with field and value. Example: gt"
    ),
  value: z
    .union([z.string(), z.number()])
    .describe(
      "The value to filter by. Use with field and operator. Example: 2025-01-01"
    ),
});

const filtersSchema = z
  .array(filterSchema)
  .optional()
  .describe("Array of filter conditions to apply");

interface ToolPaginatedResults {
  metadata: {
    page: number;
    perPage: number;
    total: number;
  };
  items: Record<string, any>;
}

const toToolPaginationMetadata = (
  metadata: OutsetaPaginatedResults["metadata"]
): ToolPaginatedResults["metadata"] => {
  return {
    page: metadata.offset,
    perPage: metadata.limit,
    total: metadata.total,
  };
};

// Create server instance
const server = new McpServer({
  name: "outseta-admin",
  version: "1.0.0",
});

// Register Outseta tools
server.tool(
  "get_plans",
  `Get billing plans from Outseta. ${PAGINATION_DESCRIPTION} ${FILTERING_DESCRIPTION}`,
  {
    ...paginationSchema.shape,
    orderBy: z.string().optional().describe("The field to order by"),
    orderDirection: z
      .enum(["asc", "desc"])
      .optional()
      .describe("The direction to order by"),
    filters: filtersSchema,
  },
  async ({ page, perPage, orderBy, orderDirection, filters }) => {
    try {
      // Initialize API client when tool is called
      const api = new OutsetaApi(
        process.env.OUTSETA_SUBDOMAIN!,
        process.env.OUTSETA_API_KEY!,
        process.env.OUTSETA_API_SECRET!
      );

      const response = await api.getPlans({
        offset: page,
        limit: perPage,
        orderBy,
        orderDirection,
        filters,
      });

      const structuredContent: ToolPaginatedResults = {
        metadata: toToolPaginationMetadata(response.metadata),
        items: response.items,
      };

      return {
        structuredContent: {
          ...structuredContent,
        },
        content: [
          {
            type: "text",
            text: JSON.stringify(structuredContent, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        structuredContent: {
          error: error instanceof Error ? error.message : String(error),
        },
        content: [
          {
            type: "text",
            text: `Error retrieving plans: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
      };
    }
  }
);

server.tool(
  "get_accounts",
  `Get accounts from Outseta. ${PAGINATION_DESCRIPTION} ${FILTERING_DESCRIPTION}`,
  {
    ...paginationSchema.shape,
    orderBy: z.string().optional().describe("The field to order by"),
    orderDirection: z
      .enum(["asc", "desc"])
      .optional()
      .describe("The direction to order by"),
    filters: filtersSchema,
  },
  async ({ page, perPage, orderBy, orderDirection, filters }) => {
    try {
      // Initialize API client when tool is called
      const api = new OutsetaApi(
        process.env.OUTSETA_SUBDOMAIN!,
        process.env.OUTSETA_API_KEY!,
        process.env.OUTSETA_API_SECRET!
      );

      const response = await api.getAccounts({
        offset: page,
        limit: perPage,
        orderBy,
        orderDirection,
        filters,
      });

      const structuredContent: ToolPaginatedResults = {
        metadata: toToolPaginationMetadata(response.metadata),
        items: response.items,
      };

      return {
        structuredContent: {
          ...structuredContent,
        },
        content: [
          {
            type: "text",
            text: JSON.stringify(structuredContent, null, 2),
          },
        ],
      };
    } catch (error: any) {
      console.error(error);
      return {
        structuredContent: {
          error: error instanceof Error ? error.message : String(error),
        },
        content: [
          {
            type: "text",
            text: `Error retrieving accounts: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
      };
    }
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Outseta Admin MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
