import { z } from "zod";

export const createPersonSchema = z.object({
  email: z.string().email().describe("The email address of the person"),
  firstName: z.string().optional().describe("The first name of the person"),
  lastName: z.string().optional().describe("The last name of the person"),
});

export type CreatePersonParams = z.infer<typeof createPersonSchema>;
