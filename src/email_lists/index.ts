import outseta, { PaginatedResults, QueryParams } from "../api/index.js";
import {
  createEmailListSchema,
  CreateEmailListParams,
  getEmailListSubscribersSchema,
  GetEmailListSubscribersParams,
} from "./schema.js";

export {
  createEmailListSchema,
  CreateEmailListParams,
  getEmailListSubscribersSchema,
  GetEmailListSubscribersParams,
};

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

export const getEmailListSubscribers = async (
  params: GetEmailListSubscribersParams
) => {
  return await outseta.get<PaginatedResults<any>>(
    `/email/lists/${params.listUid}/subscriptions`
  );
};
