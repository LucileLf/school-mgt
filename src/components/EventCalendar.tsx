"use client"
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Image from "next/image"

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY DATA
const events = [
  {
    id: 1,
    title: "fghjklmùloiuhyg",
    description: 'dfgthuijkoplm ùpoiuhy gtfygh u i jklmùlkjhùpo iuhygtfygh uijklmùlkjhùp oiuhygtf y ghuijklm ùlkjhùp oiuhy gtfyghu ijkl mùlkjh',
    time: "2024-11-01"
  },
  {
    id: 2,
    title: "fghjklmùloiuhyg",
    description: 'dfgthuijkoplm ùpoiuhy gtfygh u i jklmùlkjhùpo iuhygtfygh uijklmùlkjhùp oiuhygtf y ghuijklm ùlkjhùp oiuhy gtfyghu ijkl mùlkjh',
    time: "2025-02-12"
  },
  {
    id: 3,
    title: "fghjklmùloiuhyg",
    description: 'dfgthuijkoplm ùpoiuhy gtfygh u i jklmùlkjhùpo iuhygtfygh uijklmùlkjhùp oiuhygtf y ghuijklm ùlkjhùp oiuhy gtfyghu ijkl mùlkjh',
    time: "2025-03-30"
  },
  {
    id: 4,
    title: "fghjklmùloiuhyg",
    description: 'dfgthuijkoplm ùpoiuhy gtfygh u i jklmùlkjhùpo iuhygtfygh uijklmùlkjhùp oiuhygtf y ghuijklm ùlkjhùp oiuhy gtfyghu ijkl mùlkjh',
    time: "2025-05-16"
  },
]

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className='bg-white p-4 rounded-md'>
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className='text-xl font-semibold my-4'>Events</h1>
        <Image src="/moreDark.png" alt="more icon" width={20} height={20}/>
      </div>
      <div className="flex flex-col gap-4">
      {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-MySchoolSky even:border-t-MySchoolPurple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventCalendar
