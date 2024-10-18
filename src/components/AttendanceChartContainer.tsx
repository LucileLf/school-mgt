import prisma from '@/lib/prisma'
import AttendanceChart from './AttendanceChart'
import Image from "next/image"

const AttendanceChartContainer = async () => {

  // attendance from latest monday
  const today = new Date()
  const dayOfWeek =today.getDay()
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const lastMonday = new Date(today)
  lastMonday.setDate(today.getDate() - daysSinceMonday)

  const resData = await prisma.attendance.findMany({
    where:{
      date:{
        gte:lastMonday
      }
    }
    ,select:{
      date: true, 
      present: true
    }
  })

  // for each week day, create data item
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"]

  const attendanceMap : {[key:string]:{present:number;absent:number}}= {
    Mon:{present:0, absent:0},
    Tue:{present:0, absent:0},
    Wed:{present:0, absent:0},
    Thu:{present:0, absent:0},
    Fri:{present:0, absent:0},
  }

  resData.forEach(item=>{
    const itemDate = new Date(item.date)
    // week days
    if(dayOfWeek >= 1 && dayOfWeek <= 5){
      const dayName = daysOfWeek[dayOfWeek-1]
      if(item.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1
      }
    }
  })

  const data = daysOfWeek.map((day)=>({
    name: day,
    present:attendanceMap[day].present,
    absent:attendanceMap[day].absent
  }))

  return (
    <div className="bg-white rounded-lg p-4 h-full">
    {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className='text-lg font-semibold'>Attendance</h1>
        <Image src="/moreDark.png" alt='more icon' width={20} height={20}/>
      </div>
    {/* CHART */}
      <AttendanceChart data={data}/>
    </div>
  )
}

export default AttendanceChartContainer