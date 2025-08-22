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
    `The number of results to return per page. Use with page for pagination.
       When perPage > 25, fields automatically defaults to *, if fields is not explicitly set: removing immediate child objects.`
  ),
  fields: z
    .string()
    .optional()
    .describe(
      `The fields to return.\n\n
         Default includes main object and immediate child objects.\n\n
         Use * for only root fields (max page size 100),
         comma-separated fields like 'Uid,Name' for minimal data (max page size 100),
         specific paths like 'Uid,CurrentSubscription.Plan.*', '*,PersonAccount.*,PersonAccount.Person.*' for nested data (max page size 25),
         and include 'LifeTimeValue' for computed values (max page size 25).\n\n
         Unsure of page the max page size, check the response in the first response.\n\n
         Unsure of possible fields, do a request with perPage=1 to see the possible fields.`
    ),
});

export const paginatedMatadataSchema = z.object({
  page: pageSchema,
  perPage: perPageSchema,
  total: z.number(),
});
