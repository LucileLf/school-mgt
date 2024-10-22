import prisma from "@/lib/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {

    console.log("dateParam",dateParam)
    const date = dateParam ? new Date(dateParam) : new Date();
  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)), // start of day
        lte: new Date(date.setHours(23, 56, 56, 999)), // end of day
      },
    },
  });
  return (
    <div className="">
      {data.length > 0 ? data.map((event) => (
        <div
          className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-MySchoolSky even:border-t-MySchoolPurple"
          key={event.id}
        >
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-gray-600">{event.title}</h1>
            <span className="text-gray-300 text-xs">
              {event.startTime.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          </div>
          <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
        </div>
      )) : <p className="mt-2 text-gray-400 text-sm">No events today</p>}
    </div>
  );
};

export default EventList;
