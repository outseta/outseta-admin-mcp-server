import outseta, { PaginatedResults, QueryParams } from "../api/index.js";
import {
  createEmailListSchema,
  CreateEmailListParams,
  getEmailListSubscribersSchema,
  GetEmailListSubscribersParams,
  subscribeToEmailListSchema,
  SubscribeToEmailListParams,
} from "./schema.js";

export {
  createEmailListSchema,
  CreateEmailListParams,
  getEmailListSubscribersSchema,
  GetEmailListSubscribersParams,
  subscribeToEmailListSchema,
  SubscribeToEmailListParams,
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

export const subscribeToEmailList = async (
  params: SubscribeToEmailListParams
) => {
  // Transform params to match Outseta API format (PascalCase)
  const outsetaParams = {
    EmailList: { Uid: params.listUid },
    Person: { Uid: params.personUid },
    SendWelcomeEmail: params.sendWelcomeEmail,
  };

  return await outseta.post(
    `/email/lists/${params.listUid}/subscriptions`,
    outsetaParams
  );
};
