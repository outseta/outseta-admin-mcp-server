import axios, { AxiosInstance, AxiosResponse } from "axios";
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

    // Add response interceptor to transform metadata
    this.axiosInstance.interceptors.response.use((response) => {
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
  }

  async getPlanFamilies(): Promise<AxiosResponse<any>> {
    return await this.axiosInstance.get("/billing/planfamilies");
  }

  async getPlans(
    params: QueryParams
  ): Promise<AxiosResponse<PaginatedResults>> {
    return await this.axiosInstance.get("/billing/plans", {
      params,
    });
  }

  async createPlan(params: any): Promise<AxiosResponse<any>> {
    return await this.axiosInstance.post("/billing/plans", params);
  }

  async getAccounts(
    params: QueryParams
  ): Promise<AxiosResponse<PaginatedResults>> {
    return await this.axiosInstance.get("/crm/accounts", {
      params,
    });
  }
}

export default OutsetaApi;
