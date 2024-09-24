"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Image from "next/image"

const data = [
  {
    name: 'Mon',
    present: 21,
    absent: 54
  },
  {
    name: 'Tue',
    present: 65,
    absent: 54
  },
  {
    name: 'Wed',
    present: 77,
    absent: 54
  },
  {
    name: 'Thu',
    present: 54,
    absent: 89
  },
  {
    name: 'Fri',
    present: 66,
    absent: 78
  }
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className='text-lg font-semibold'>Attendance</h1>
        <Image src="/moreDark.png" alt='plus icon' width={20} height={20}/>
      </div>

      {/* CHART */}
      {/* <div className=""> */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd"/>
            <XAxis dataKey="name" axisLine={false} tick={{fill: "#d1d5d3"}} tickLine={false} />
            <YAxis axisLine={false} tick={{fill: "#d1d5d3"}} tickLine={false}/>
            <Tooltip contentStyle={{borderRadius: "10px", borderColor: "lightgray" }}/>
            <Legend align="left" verticalAlign='top'wrapperStyle={{paddingTop:"20px", paddingBottom:"30px"}}/>
            <Bar dataKey="present" fill="#FAE27C" legendType='circle' radius={[10,10,0,0]}/>
            <Bar dataKey="absent" fill="#C3EBFA" legendType='circle' radius={[10,10,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      {/* </div> */}

      {/* BOTTOM */}

    </div>
  )
}

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};


export default AttendanceChart
