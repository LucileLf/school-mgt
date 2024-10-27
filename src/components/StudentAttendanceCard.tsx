import prisma from "@/lib/prisma"

const StudentAttendanceCard = async ({studentId}: {studentId: string}) => {
  const attendance = await prisma.attendance.findMany({
    where:{
      studentId,
      date:{
        gte:new Date(new  Date().getFullYear(), 0, 1) // date grater than last year
      }
    }
  })

  const totalDays = attendance.length;
  const presentDays = attendance.filter((day)=>day.present).length;
  const attendancePercentage = (presentDays / totalDays) * 100
  return (
    <div className="div">
      <h1 className="text-xl font-semibold">{attendancePercentage || "-"}%</h1>
      <span className="text-sm text-gray-400">Attendance</span>
    </div>
  )
}

export default StudentAttendanceCard
