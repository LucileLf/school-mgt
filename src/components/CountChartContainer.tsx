import prisma from "@/lib/prisma";
import CountChart from "./CountChart";
import Image from "next/image";

const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="more icon" width={20} height={20} />
      </div>

      {/* CHART */}

      <CountChart boys={boys} girls={girls} />

      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-MySchoolSky rounded-full"></div>
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-small text-gray-500">
            Boys ({Math.round((boys / (boys + girls)) * 100)}%)
          </h2>
          {/* <h2 className='text-small text-gray-500'>Girls (45%)</h2> */}
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-MySchoolYellow rounded-full"></div>
          <h1 className="font-bold">{girls}</h1>
          {/* <h2 className='text-small text-gray-500'>`Boys (${55%})`</h2> */}
          <h2 className="text-small text-gray-500">
            Boys ({(girls / (boys + girls)) * 100}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;