import { z } from "zod";
import outseta, { PaginatedResults, QueryParams } from "../api/index.js";
import { createPlanSchema, createPlanFamilySchema } from "./schema.js";

export { createPlanSchema, createPlanFamilySchema };
export type CreatePlanParams = z.infer<typeof createPlanSchema>;
export type CreatePlanFamilyParams = z.infer<typeof createPlanFamilySchema>;

export const getPlans = async (params: QueryParams) => {
  return await outseta.get<PaginatedResults<any>>("/billing/plans", {
    params,
  });
};

export const getPlanFamilies = async (params: QueryParams) => {
  return await outseta.get<PaginatedResults<any>>("/billing/planfamilies", {
    params,
  });
};

export const createPlan = async (params: CreatePlanParams) => {
  const MonthlyRate =
    "monthlyRate" in params.rates ? params.rates.monthlyRate : undefined;
  const QuarterlyRate =
    "quarterlyRate" in params.rates ? params.rates.quarterlyRate : undefined;
  const AnnualRate =
    "annualRate" in params.rates && params.rates.annualRate
      ? params.rates.annualRate
      : undefined;
  const OneTimeRate =
    "oneTimeRate" in params.rates && params.rates.oneTimeRate
      ? params.rates.oneTimeRate
      : undefined;

  const outsetaParams = {
    AccountRegistrationMode: params.accountRegistrationMode,
    IsActive: params.isActive,
    Name: params.name,
    PlanFamily: { Uid: params.planFamilyUid },
    TrialPeriodDays: params.trialPeriodDays,
    MonthlyRate,
    QuarterlyRate,
    AnnualRate,
    OneTimeRate,
  };
  return await outseta.post("/billing/plans", outsetaParams);
};

export const createPlanFamily = async (params: CreatePlanFamilyParams) => {
  const outsetaParams = {
    Name: params.name,
    IsDefault: params.isDefault,
    IsActive: params.isActive,
  };
  return await outseta.post("/billing/planfamilies", outsetaParams);
};
