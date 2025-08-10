import axios, { AxiosInstance } from "axios";

// Paginated results interface
export interface OutsetaPaginatedResults {
  items: Record<string, any>;
  metadata: {
    total: number;
    offset: number;
    limit: number;
  };
}

// Filter parameter interface
export interface FilterParam {
  field: string;
  operator?: string;
  value: string | number | boolean;
}

// Paginated query params interface
export interface OutsetaQueryParams {
  offset?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
  filters?: FilterParam[];
}

function buildFilterParams(filters: FilterParam[]): Record<string, string> {
  const filterParams: Record<string, string> = {};

  for (const filter of filters) {
    const { field, operator, value } = filter;

    // Build the parameter key based on whether there's an operator
    const paramKey = operator ? `${field}__${operator}` : field;

    // Convert value to string
    const paramValue =
      typeof value === "boolean"
        ? value.toString().toLowerCase()
        : value.toString();

    filterParams[paramKey] = paramValue;
  }

  return filterParams;
}

function toOutsetaQueryParams(
  params: OutsetaQueryParams
): Record<string, string | undefined> {
  const orderByParam = params.orderBy
    ? `${params.orderBy}+${params.orderDirection?.toUpperCase() ?? "ASC"}`
    : undefined;

  const baseParams = {
    offset: params.offset?.toString() ?? "0",
    limit: params.limit?.toString() ?? "100",
    orderBy: orderByParam,
  };

  // Add filter parameters if they exist
  if (params.filters && params.filters.length > 0) {
    const filterParams = buildFilterParams(params.filters);
    return { ...baseParams, ...filterParams };
  }

  return baseParams;
}

class OutsetaApi {
  private axiosInstance: AxiosInstance;

  constructor(subdomain: string, apiKey: string, apiSecret: string) {
    console.error(`OutsetaApi: ${subdomain}, ${apiKey}, ${apiSecret}`);
    this.axiosInstance = axios.create({
      baseURL: `https://${subdomain}.outseta.com/api/v1`,
      headers: {
        Authorization: `Outseta ${apiKey}:${apiSecret}`,
        "Content-Type": "application/json",
      },
    });
  }

  async getPlans(params: OutsetaQueryParams): Promise<OutsetaPaginatedResults> {
    const response = await this.axiosInstance.get("/billing/plans", {
      params: toOutsetaQueryParams(params),
    });

    return response.data as OutsetaPaginatedResults;
  }

  async getAccounts(
    params: OutsetaQueryParams
  ): Promise<OutsetaPaginatedResults> {
    const response = await this.axiosInstance.get("/crm/accounts", {
      params: toOutsetaQueryParams(params),
    });

    return response.data as OutsetaPaginatedResults;
  }
}

export default OutsetaApi;
