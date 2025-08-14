import outseta, { PaginatedResults, QueryParams } from "../api/index.js";

export const getAccounts = async (params: QueryParams) => {
  return await outseta.get<PaginatedResults<any>>("/crm/accounts", {
    params,
  });
};
