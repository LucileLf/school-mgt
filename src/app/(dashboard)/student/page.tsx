import UserCard from "@/components/UserCard"
import CountChart from "@/components/CountChart"
import AttendanceChart from "@/components/AttendanceChart"
import FinanceChart from "@/components/FinanceChart"
import EventCalendar from "@/components/EventCalendar"
import Announcements from "@/components/Announcements"
import BigCalendar from "@/components/BigCalendar"

const StudentPage = () => {
  return (
    <div className="p-4 flex flex-col xl:flex-row  gap-4">

      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalendar/>
        </div>


      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar/>
        <Announcements/>
        {/* Annoncements */}
      </div>

    </div>
  )
}

export default StudentPage
