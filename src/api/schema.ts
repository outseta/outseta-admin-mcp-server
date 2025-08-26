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
export const perPageSchema = z.number().min(1).max(100);

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
    .optional()
    .describe(
      "The page number to start from (0-based). Use page=1 for the second page, page=2 for the third page, etc."
    ),
  perPage: perPageSchema.optional().describe(
    `The number of results to return per page. Use with page for pagination.\n
    Do a request with no page=0, perPage=undefined to see the max page size for the configured fields.`
  ),
  fields: z
    .string()
    .optional()
    .default("*.*")
    .describe(
      `The fields to include in the response:\n\n
         - Main object's root fields - '*' (max page size 100)\n
         - Minimal data - comma-separated list of fields like 'Uid,Name' (max page size 100)\n
         - Nested data - specific paths like 'Uid,CurrentSubscription.Plan.*', '*,PersonAccount.*,PersonAccount.Person.*' (max page size 25)\n
         - Computed values - the field must be explicitly set '*,LifeTimeValue' (max page size 25)\n
         - Default, includes main object and immediate child objects - *.* (max page size 25)\n\n

      Do a request with only page=0, perPage=10 to see the possible fields.\n
      Do a request with no page=0, perPage=undefined to see the max page size for the configured fields.`
    ),
});

export const paginatedMatadataSchema = z.object({
  page: pageSchema,
  perPage: perPageSchema,
  total: z.number(),
});
