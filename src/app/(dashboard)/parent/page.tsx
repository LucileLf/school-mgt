import EventCalendar from "@/components/EventCalendar"
import BigCalendarContainer from "@/components/BigCalendarContainer"
import Announcements from "@/components/Announcements"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

const ParentPage = async () => {

  const {userId}= auth()
  // const classId=

  const students = await prisma.student.findMany({
    where: {
      parentId: userId!
    }
  })

  return (
    <div className="p-4 flex flex-col xl:flex-row  gap-4">

      {/* LEFT */}
      {/* One calendar per child */}
      {students.map((student)=>
        <div className="w-full xl:w-2/3">
          <div className="h-full bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold">{student.name + "'s schedule"}</h1>
            {/* @ts-expect-error Server Component */}
            <BigCalendarContainer type={"classId"} id={student.classId}/>
          </div>
        </div>
      )}
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar/>
        {/* @ts-expect-error Server Component */}
        <Announcements/>
        {/* Annoncements */}
      </div>

    </div>
  )
}

export default ParentPage
