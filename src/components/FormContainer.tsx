import { PrismaClientExtends } from "@prisma/client/extension";
import FormModal from "./FormModal";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  // fetch related data (ex: teachers for subject)
  let relatedData = {};

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;
      case "class":
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: classTeachers, grades: classGrades };
        break;
      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubjects };
        break;
      case "student":
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        relatedData = { classes: studentClasses, grades: studentGrades };
        break;
      case "exam":
        const { sessionClaims, userId } = auth();
        const role = (sessionClaims?.metadata as { role?: string })?.role;
        const examLessons = await prisma.lesson.findMany({
          where: {
            // if teacher, can only add own lessons // if admin, can add any lesson
            ...(role === "teacher" ? { teacherId: userId! } : {}),
          },
          select: {id: true, name: true },
        });
        relatedData = { lessons: examLessons };
        break;
      default:
        break;
    }
  }

  return (
    <FormModal
      table={table}
      type={type}
      data={data}
      id={id}
      relatedData={relatedData}
    />
  );
};

export default FormContainer;
