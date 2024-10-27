import { z } from "zod";
import {UserSex} from "@prisma/client"

// use coerce for number, boolean or date (prevents returning string when parsing objects)

export const subjectSchema = z.object({
  // id not needed for create form
  id: z.coerce.number().optional(),
  name: z
    .string()
    .min(1, { message: "Subject name is required!" }),
  teachers: z.array(z.string()) // teacher ids
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  // id not needed for create form
  id: z.coerce.number().optional(),
  name: z
    .string()
    .min(1, { message: "Class name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Grade is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Capacity is required!" }),
  supervisorId: z.string().optional()
});

export type ClassSchema = z.infer<typeof classSchema>;


export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }).optional().or(z.literal("")), // if not empty string must be correct
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional() // not needed for update form
    .or(z.literal("")),
  name: z.string().min(1, { message: "Name is required!" }),
  surname: z.string().min(1, { message: "Surname is required!" }),
  phone: z.string().optional(),
  address: z.string().min(1, { message: "Address is required!" }),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  subjects:z.array(z.string()).optional(), // subject ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }).optional().or(z.literal("")), // if not empty string must be correct
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional() // not needed for update form
    .or(z.literal("")),
  name: z.string().min(1, { message: "Name is required!" }),
  surname: z.string().min(1, { message: "Surname is required!" }),
  phone: z.string().optional(),
  address: z.string().min(1, { message: "Address is required!" }),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
  parentId: z.string().min(1, { message: "Parent Id is required!" }), // subject ids
});

export type StudentSchema = z.infer<typeof studentSchema>;


// export const teacherSchema = z.object({
//   // id not needed for create form
//   id: z.coerce.string().optional(), // coerce prevents returning string when parsing objects
//   username: z
//     .string()
//     .min(1, { message: "Teacher username is required!" }),
//   name: z
//     .string()
//     .min(1, { message: "Teacher name is required!" }),
//   surname: z
//     .string()
//     .min(1, { message: "Teacher surname is required!" }),
//   email: z
//     .string()
//     .min(1, { message: "Teacher email is required!" }),
//   phone: z
//     .string()
//     .min(1, { message: "Teacher phone is required!" }),
//   address: z
//     .string()
//     .min(1, { message: "Teacher address is required!" }),
//   img: z
//     .string()
//     .min(1, { message: "Teacher img is required!" }),
//   bloodType: z
//     .string()
//     .min(1, { message: "Teacher blood type is required!" }),
//   sex: z
//     .enum(UserSex)
//     // .string()
//     .min(1, { message: "Teacher sex is required!" }),


//   capacity: z.coerce.number().min(1, { message: "Grade is required!" }),
//   gradeId: z.coerce.number().min(1, { message: "Capacity is required!" }),
//   supervisorId: z.coerce.string().optional()
// });

// export type TeacherSchema = z.infer<typeof teacherSchema>;
