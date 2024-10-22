import Announcements from "@/components/Announcements"
import BigCalendarContainer from "@/components/BigCalendarContainer"
import { auth } from "@clerk/nextjs/server"


const TeacherPage = () => {

  const {userId}= auth()
  
  return (
    <div className="p-4 flex flex-col xl:flex-row  gap-4">

      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          {/* @ts-expect-error Server Component */}
          <BigCalendarContainer type={"teacherId"} id={userId}/>
        </div>


      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        {/* @ts-expect-error Server Component */}
        <Announcements/>
        {/* Annoncements */}
      </div>

    </div>
  )
}

export default TeacherPage
