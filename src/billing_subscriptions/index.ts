import { z } from "zod";
import outseta from "../api/index.js";
import { subscriptionChangeSchema } from "./schema.js";

export { subscriptionChangeSchema };

export type SubscriptionChangeParams = z.infer<typeof subscriptionChangeSchema>;

const changeOrPreviewSubscription = async (
  params: SubscriptionChangeParams,
  preview: boolean = false
) => {
  const { accountUid, planUid, startImmediately } = params;
  let { billingRenewalTerm } = params;

  const accountResponse = await outseta.get(`/crm/accounts/${accountUid}`, {
    params: {
      fields: "Uid,Name,CurrentSubscription.*",
    },
  });

  const accountData = accountResponse.data;

  if (!accountData.CurrentSubscription) {
    throw new Error(
      `Account ${accountUid} does not have an active subscription`
    );
  }

  const currentSubscription = accountData.CurrentSubscription;

  billingRenewalTerm =
    billingRenewalTerm ?? currentSubscription.BillingRenewalTerm;

  const subscriptionUpdatePayload = {
    Plan: {
      Uid: planUid,
    },
    BillingRenewalTerm: billingRenewalTerm,
    Account: {
      Uid: accountUid,
    },
  };

  const subscriptionEndpoint = preview
    ? `/billing/subscriptions/${currentSubscription.Uid}/changesubscriptionpreview`
    : `/billing/subscriptions/${currentSubscription.Uid}/changeSubscription`;

  const subscriptionResponse = await outseta.put(
    subscriptionEndpoint,
    subscriptionUpdatePayload,
    {
      params: {
        startImmediately: startImmediately,
      },
    }
  );

  return subscriptionResponse;
};

export const changeSubscription = async (params: SubscriptionChangeParams) => {
  return changeOrPreviewSubscription(params, false);
};

export const previewSubscriptionChange = async (
  params: SubscriptionChangeParams
) => {
  return changeOrPreviewSubscription(params, true);
};
