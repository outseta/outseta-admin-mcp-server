import { z } from "zod";

export const PAGINATION_DESCRIPTION =
  "Use page and perPage for pagination - check the 'total' in metadata to see if more results are available. Set page to skip pages (e.g., page=1 for the second page keeping perPage the same for all pages).";

export const FILTERING_DESCRIPTION =
  "Use filters for filtering data. Each filter should specify a field, optional operator (__gt, __gte, __lt, __lte, __ne, __isnull), and value. For basic filtering without operators, just specify field and value.";

export interface FilterParam {
  field: string;
  operator?: string;
  value: string | number | boolean;
}

// Paginated query params interface
export interface QueryParams {
  page?: number;
  perPage?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
  filters?: FilterParam[];
}

export interface PaginatedResults {
  items: Record<string, any>;
  metadata: {
    total: number;
    page: number;
    perPage: number;
  };
}

export const paginationSchema = z.object({
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
    .max(25) // Because most of our calls are for more than *
    .default(25)
    .describe(
      "The number of results to return per page. Maximum value is 100. Use with page for pagination, keep the same value for all pages."
    ),
});

export const filterSchema = z.object({
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

export const filtersSchema = z
  .array(filterSchema)
  .optional()
  .describe("Array of filter conditions to apply");

export const orderBySchema = z.object({
  orderBy: z.string().optional().describe("The field to order by"),
  orderDirection: z
    .enum(["asc", "desc"])
    .optional()
    .describe("The direction to order by"),
});

export interface ToolPaginatedResults {
  metadata: {
    page: number;
    perPage: number;
    total: number;
  };
  items: Record<string, any>;
}
