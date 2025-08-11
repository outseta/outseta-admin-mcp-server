import axios, { AxiosInstance } from "axios";
import {
  FilterParam,
  PaginatedResults,
  QueryParams,
} from "./schemas/common.js";

class OutsetaApi {
  private axiosInstance: AxiosInstance;

  constructor(subdomain: string, apiKey: string, apiSecret: string) {
    this.axiosInstance = axios.create({
      baseURL: `https://${subdomain}.outseta.com/api/v1`,
      headers: {
        Authorization: `Outseta ${apiKey}:${apiSecret}`,
        "Content-Type": "application/json",
      },
      transformResponse: [
        (data) => {
          if (data.metadata) {
            return {
              ...data,
              metadata: {
                total: data.metadata.total,
                page: data.metadata.offset,
                perPage: data.metadata.limit,
              },
            };
          }
          return data;
        },
      ],
    });

    // Add request interceptor to transform params
    this.axiosInstance.interceptors.request.use((config) => {
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
            (acc: Record<string, string>, filter: FilterParam) => {
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
  }

  async getPlans(params: QueryParams): Promise<PaginatedResults> {
    const response = await this.axiosInstance.get("/billing/plans", {
      params,
    });

    return response.data as PaginatedResults;
  }

  async getAccounts(params: QueryParams): Promise<PaginatedResults> {
    const response = await this.axiosInstance.get("/crm/accounts", {
      params,
    });

    return response.data as PaginatedResults;
  }
}

export default OutsetaApi;
