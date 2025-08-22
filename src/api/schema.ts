import { z } from "zod";

export const filterSchema = z.object({
  field: z
    .string()
    .describe("The field name to filter on. Use with operator and value."),
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

export const pageSchema = z.number().min(0);
export const perPageSchema = z.number().min(1).max(25);

export const queryParamsSchema = z.object({
  q: z
    .string()
    .optional()
    .describe(
      "Search term to filter results by. Searches across relevant fields."
    ),
  orderBy: z.string().optional().describe("The field to order by"),
  orderDirection: z
    .enum(["asc", "desc"])
    .optional()
    .describe("The direction to order by"),
  filters: z
    .array(filterSchema)
    .optional()
    .describe("Array of filter conditions to apply."),
  page: pageSchema
    .default(0)
    .describe(
      "The page number to start from (0-based). Use page=1 for the second page, page=2 for the third page, etc."
    ),
  perPage: perPageSchema
    .optional()
    .default(25)
    .describe(
      "The number of results to return per page. Maximum value is 25. Use with page for pagination, keep the same value for all pages."
    ),
});

export const paginatedMatadataSchema = z.object({
  page: pageSchema,
  perPage: perPageSchema,
  total: z.number(),
});
