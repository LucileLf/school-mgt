import Pagination from "@/components/Pagination"
import TableSearch from "@/components/TableSearch"
import Table from "@/components/Table"
import Image from "next/image"
import Link from "next/link"
import { role, studentsData } from "@/lib/data";
import FormModal from "@/components/FormModal"
import { Prisma, Student, Class } from "@prisma/client"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"


type StudentList = Student & {class: Class}

const columns = [
  {
    header:"Info", accessor:"info",
  },
  {
    header:"Student ID", accessor:"StudentId", className:"hidden md:table-cell"
  },
  {
    header:"Grade", accessor:"grade", className:"hidden md:table-cell"
  },
  {
    header:"Phone", accessor:"phone", className:"hidden lg:table-cell"
  },
  {
    header:"Address", accessor:"address", className:"hidden lg:table-cell"
  },
  {
    header:"Actions", accessor:"action",
  },
]

const renderRow = (item: StudentList)=> (
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hoer:bg-MySchoolPurpleLight">
    <td className="flex items-center gap-4 p-4">
      <Image src={item.img || "/noAvatar.png"} alt={'student profile picture'} width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover"/>
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.class.name}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username}</td>
    <td className="hidden md:table-cell">{item.class.name[0]}</td>
    <td className="hidden lg:table-cell">{item.phone}</td>
    <td className="hidden lg:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/students/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-MySchoolSky">
            <Image src="/view.png" alt="eye glass icon" width={16} height={16}/>
          </button>
        </Link>
        {role ==="admin" &&
        // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-MySchoolPurple">
        //     <Image src="/delete.png" alt="trash icon" width={16} height={16}/>
        // </button>}
        <FormModal table="student" type="delete" id={item.id}/>}
      </div>
    </td>
  </tr>
)

const StudentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  
  // console.log(searchParams);
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION
  const query:Prisma.StudentWhereInput = {};

  if (queryParams) {
    for(const [key, value] of Object.entries(queryParams)){
      if(value !== undefined){
      switch(key){
        case "teacherId":
          {query.class={lessons:{some:{teacherId:value}}}}

         break;
        case "search":query.name={contains:value, mode:"insensitive"}
          break;
        default:
          break; 
      }}
    }
  } 

  const [studentsData, studentsCount] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1) // skip items from previous pages
    }),
    prisma.student.count({where:query})
  ])


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold"> All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch/>
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-MySchoolYellow">
              <Image src="/filter.png" alt="filter icon" width={14} height={14}/>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-MySchoolYellow">
              <Image src="/sort.png" alt="sort icon" width={14} height={14}/>
            </button>
            {role === 'admin' &&
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-MySchoolYellow">
              //   <Image src="/plus.png" alt="plus icon" width={14} height={14}/>
              // </button>
            <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <div className="">
        <Table columns={columns} renderRow={renderRow} data={studentsData}/>
      </div>
      {/* PAGINATION */}
      <Pagination page={p} count={studentsCount}/>
    </div>
  )
}

export default StudentListPage
