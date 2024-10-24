import { z } from "zod";

export const subjectSchema = z.object({
  // id not needed for create form
  id: z.coerce.number().optional(), // coerce prevents returning string when parsing objects
  name: z
    .string()
    .min(1, { message: "Subject name is required!" }),
  teachers: z.array(z.string()) // teacher ids
});

export type SubjectSchema = z.infer<typeof subjectSchema>;
