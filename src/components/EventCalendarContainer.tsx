import EventList from "./EventList";
import EventCalendar from "./EventCalendar";
import Image from "next/image"

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  
  const {date} = searchParams;
  console.log("searchparams from eventcalendarcontainer", searchParams)
  return (
    <div className="bg-white p-4 rounded-md">
      <EventCalendar />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="more icon" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
         {/* @ts-expect-error Server Component */}
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
