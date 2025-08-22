import { z } from "zod";
import outseta, { PaginatedResults, QueryParams } from "../api/index.js";
import { createPersonSchema, CreatePersonParams } from "./schema.js";

export { createPersonSchema, CreatePersonParams };

export const getPeople = async (params: QueryParams) => {
  return await outseta.get<PaginatedResults<any>>("/crm/people", {
    params,
  });
};

export const createPerson = async (params: CreatePersonParams) => {
  // Transform params to match Outseta API format (PascalCase)
  const outsetaParams = {
    Email: params.email,
    FirstName: params.firstName,
    LastName: params.lastName,
  };

  return await outseta.post("/crm/people", outsetaParams);
};
