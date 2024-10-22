import BigCalendar from "@/components/BigCalendar"
import prisma from "@/lib/prisma"
import { adjustScheduleToCurrentWeek } from "@/lib/utils"

const BigCalendarContainer = async ({type, id}:{type:"teacherId" | "classId", id: string | number}) => {
    // if teacher page, lesson.teacherId - if student page, lesson.classId
  
  const dataRes = await prisma.lesson.findMany({
    where:{
        ...(type === "teacherId" ? {teacherId: id as string} : {classId: id as number}),
    }
  })

  const data = dataRes.map(lesson=>({
    title:lesson.name,
    start: lesson.startTime,
    end: lesson.endTime
  }))

  const schedule = adjustScheduleToCurrentWeek(data)

    return(
    <div className="">
        <BigCalendar data={schedule}/>
    </div>
  )
}

export default BigCalendarContainer
