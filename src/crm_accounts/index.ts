import { z } from "zod";
import outseta, { PaginatedResults, QueryParams } from "../api/index.js";
import { registerAccountSchema } from "./schema.js";

export { registerAccountSchema };
export type RegisterAccountParams = z.infer<typeof registerAccountSchema>;

export const getAccounts = async (params: QueryParams) => {
  return await outseta.get<PaginatedResults<any>>("/crm/accounts", {
    params,
  });
};

export const registerAccount = async (params: RegisterAccountParams) => {
  // Transform params to match Outseta API format (PascalCase)
  const outsetaParams = {
    Name: params.accountName,
    Subscriptions: [
      {
        BillingRenewalTerm: params.billingRenewalTerm,
        Plan: {
          Uid: params.planUid,
        },
      },
    ],
    PersonAccount: [
      {
        IsPrimary: true,
        Person: {
          Email: params.email,
          FirstName: params.firstName,
          LastName: params.lastName,
        },
      },
    ],
  };

  return await outseta.post("/crm/registrations", outsetaParams);
};
