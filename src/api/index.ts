import axios from "axios";
import {
  filterSchema,
  paginatedMatadataSchema,
  queryParamsSchema,
} from "./schema.js";
import { z } from "zod";

export { queryParamsSchema, paginatedMatadataSchema };

export type QueryParams = z.infer<typeof queryParamsSchema>;
export type PaginatedResults<T> = {
  metadata: z.infer<typeof paginatedMatadataSchema>;
  items: Array<T>;
};

const OUTSETA_SUBDOMAIN = process.env.OUTSETA_SUBDOMAIN!;
const OUTSETA_API_KEY = process.env.OUTSETA_API_KEY!;
const OUTSETA_API_SECRET = process.env.OUTSETA_API_SECRET!;

const outsetaAxiosInstance = axios.create({
  baseURL: `https://${OUTSETA_SUBDOMAIN}.outseta.com/api/v1`,
  headers: {
    Authorization: `Outseta ${OUTSETA_API_KEY}:${OUTSETA_API_SECRET}`,
    "Content-Type": "application/json",
  },
});

// Add request interceptor to transform params
outsetaAxiosInstance.interceptors.request.use((config) => {
  if (config.params) {
    const {
      page,
      perPage,
      orderBy,
      orderDirection,
      filters = [],
      ...rest
    } = config.params;

    const transformedParams = {
      ...rest, // Keep all other params as-is
      // Transform page/perPage to offset/limit for Outseta API
      ...(page !== undefined && { offset: page.toString() }),
      ...(perPage !== undefined && { limit: perPage.toString() }),
      // Transform orderBy with direction
      ...(orderBy && {
        orderBy: `${orderBy}+${orderDirection?.toUpperCase() ?? "ASC"}`,
      }),
      // Transform filters if they exist
      ...filters.reduce(
        (acc: Record<string, string>, filter: z.infer<typeof filterSchema>) => {
          const { field, operator, value } = filter;
          const paramKey = operator ? `${field}__${operator}` : field;
          acc[paramKey] = value?.toString();
          return acc;
        },
        {} as Record<string, string>
      ),
    };

    // Build transformed params, keeping unchanged ones
    config.params = {
      ...rest, // Keep all other params as-is
      ...transformedParams, // Add the transformed params
    };
  }
  return config;
});

// Add response interceptor to transform metadata
outsetaAxiosInstance.interceptors.response.use((response) => {
  if (
    response.data &&
    typeof response.data === "object" &&
    response.data.metadata
  ) {
    response.data = {
      ...response.data,
      metadata: {
        total: response.data.metadata.total,
        page: response.data.metadata.offset,
        perPage: response.data.metadata.limit,
      },
    };
  }
  return response;
});

export default outsetaAxiosInstance;
