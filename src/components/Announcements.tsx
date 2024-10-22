import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {

  const {userId, sessionClaims}= auth()
  // console.log(`userId and sessionClaims ${userId}, ${sessionClaims}`)

  const role = (sessionClaims?.metadata as {role?:string})?.role;
  
  const roleConditions = {
    teacher:{lessons:{some:{teacherId:userId!}}},
    student:{students:{some:{id:userId!}}},
    parent:{students:{some:{parentId:userId!}}}, 
  }
  
  const data = await prisma.announcement.findMany({
    take:3,
    orderBy:{date:"desc"},
    where:{
      ...(role !== "admin" && { // use conditions only if not admin 
        OR:[
          {classId:null},{class:roleConditions[role as keyof typeof roleConditions || {}]}
        ]
      })
    }
  })

  // console.log("announcements", data)

  return <div className="bg-white p-4 rounded-md">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">Announcements</h1>
      <span className="text-xs text-gray-400">View All</span>
    </div>
    <div className="flex flex-col gap-4 mt-4">
      {data[0] && <div className="bg-MySchoolSkyLight rounded-md p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">{data[0].title}</h2>
          <span className="text-xs text-gray-400 bg-wwhite rounded-md px-1 py-1">{data[0].date.toLocaleDateString("fr-FR")}</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">
        {data[0].description}
        </p>
      </div>}
      {data[1] && <div className="bg-MySchoolPurpleLight rounded-md p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">{data[1].title}</h2>
          <span className="text-xs text-gray-400 bg-wwhite rounded-md px-1 py-1">{data[1].date.toLocaleDateString("fr-FR")}</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">
        {data[1].description}
        </p>
      </div>}
      {data[2] && <div className="bg-MySchoolYellowLight rounded-md p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">{data[2].title}</h2>
          <span className="text-xs text-gray-400 bg-wwhite rounded-md px-1 py-1">{data[2].date.toLocaleDateString("fr-FR")}</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">
        {data[2].description}
        </p>
      </div>}
      
    </div>
  </div>
};

export default Announcements
