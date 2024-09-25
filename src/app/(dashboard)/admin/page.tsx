import UserCard from "@/components/UserCard"
import CountChart from "@/components/CountChart"
import AttendanceChart from "@/components/AttendanceChart"
import FinanceChart from "@/components/FinanceChart"
import EventCalendar from "@/components/EventCalendar"
import Announcements from "@/components/Announcements"

const AdminPage = () => {
  return (
    <div className="p-4 flex flex-col md:flex-row gap-4">

      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-9">

        {/* CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student"/>
          <UserCard type="parent"/>
          <UserCard type="teacher"/>
          <UserCard type="staff"/>
        </div>

        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-column lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart/>
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart/>
          </div>
        </div>

        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart/>
        </div>

      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar/>
        <Announcements/>
      </div>

    </div>
  )
}

export default AdminPage
