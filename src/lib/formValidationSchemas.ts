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

export const classSchema = z.object({
  // id not needed for create form
  id: z.coerce.number().optional(), // coerce prevents returning string when parsing objects
  name: z
    .string()
    .min(1, { message: "Class name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Grade is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Capacity is required!" }),
  supervisorId: z.coerce.string().optional()
});

export type ClassSchema = z.infer<typeof classSchema>;
