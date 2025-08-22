import outseta, { PaginatedResults, QueryParams } from "../api/index.js";
import { createEmailListSchema, CreateEmailListParams } from "./schema.js";

export { createEmailListSchema, CreateEmailListParams };

export const getEmailLists = async (params: QueryParams) => {
  return await outseta.get<PaginatedResults<any>>("/email/lists", {
    params,
  });
};

export const createEmailList = async (params: CreateEmailListParams) => {
  // Transform params to match Outseta API format (PascalCase)
  const outsetaParams: any = {
    Name: params.name,
    Description: params.description,
    IsInternal: params.isInternal,
    RequiresDoubleOptIn: params.requiresDoubleOptIn,
  };

  if (params.welcome) {
    outsetaParams.WelcomeFromName = params.welcome.fromName;
    outsetaParams.WelcomeFromEmail = params.welcome.fromEmail;
    outsetaParams.WelcomeSubject = params.welcome.subject;
    outsetaParams.WelcomeBody = params.welcome.body;
  }

  return await outseta.post("/email/lists", outsetaParams);
};
