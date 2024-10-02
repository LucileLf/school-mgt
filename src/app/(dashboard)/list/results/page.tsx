// import FormModal from "@/components/FormModal";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { resultsData, role, teachersData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import {
  Prisma,
  Result,
  Assignment,
  Lesson,
  Class,
  Teacher,
  Subject,
  Student,
  Exam
} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type ResultList = {
  id: number; 
  title: string;
  studentSurname: string;
  studentName: string;
  score: number;
  teacherName: string;
  teacherSurname: string;
  className: string; 
  date: Date
}

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
//student*
//score*
//assignment or exam? -> date  +  lesson: class, teacher, subbject
const renderRow = (item: ResultList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-MySchoolPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      {item.title}
    </td>
    <td>{item.studentName + " " + item.studentSurname}</td>
    <td className="hidden md:table-cell">{item.score}</td>
    <td className="hidden md:table-cell">
    {item.teacherName + " " + item.teacherSurname}
    </td>
    <td className="hidden md:table-cell">
      {item.className}
    </td>
    <td className="hidden md:table-cell">
    {new Intl.DateTimeFormat("fr-FR").format(item.date)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="result" type="update" id={item.id} />
            <FormModal table="result" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ResultListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // console.log(searchParams);
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION
  const query: Prisma.ResultWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key){
          case "studentId":query.studentId = value;
            break;
          case "search": query.OR = [
            {exam:{title:{contains:value, mode:'insensitive'}}},
            {assignment:{title:{contains:value, mode:'insensitive'}}},
            {student:{name:{contains:value, mode: 'insensitive'}}}
          ]
          break;
          default:
            break;
        }
      }
    }
  }

  const [dataRes, resultsCount] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: true,
        assignment: {
          select: {
            title: true,
            startDate: true,
            lesson: 
            {
              select: {
                teacher: { select: { name: true, surname: true } },
                class: { select: { name: true } },
              },
            },
          },
        },
        exam: {
          select: {
            title: true,
            startTime: true,
            lesson: 
            {
              select: {
                teacher: { select: { name: true, surname: true } },
                class: { select: { name: true } },
              },
            },
          },
        },
        // class: {select: {name: true}},
        // teacher: {select: {name: true, surname: true}},
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1), // skip items from previous pages
    }),
    prisma.result.count({ where: query }),
  ]);

  const resultsData = dataRes.map(item=>{
    const assessment = item.exam || item.assignment
    if (!assessment) return null;
    const isExam = "startTime" in assessment;
    return{
      id:item.id,
      title: assessment.title,
      studentName:item.student.name,
      studentSurname:item.student.surname,
      score: item.score,
      teacherName: assessment.lesson.teacher.name,
      teacherSurname: assessment.lesson.teacher.surname,
      class: assessment.lesson.class,
      date: isExam ? assessment.startTime : assessment.startDate 
    }
  })
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-MySchoolYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-MySchoolYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="result" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={resultsData} />
      {/* PAGINATION */}
      <Pagination page={p} count={resultsCount} />
    </div>
  );
};

export default ResultListPage;
