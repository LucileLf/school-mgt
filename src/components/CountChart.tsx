"use client"
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import Image from "next/image"


const CountChart = ({boys, girls}:{boys:number, girls:number}) => {
  const data = [
    {
      name: 'Total',
      count: boys+girls,
      fill: 'white',
    },
    {
      name: 'Boys',
      count: boys,
      fill: '#C3EBFA',
    },
    {
      name: 'Girls',
      count: girls,
      fill: '#FAE27C',
    },
  ];

  return (
    <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
            <RadialBar
              background
              dataKey="count"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image src="/maleFemale.png" alt="male and female logos" width={50} height={50} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
     </div>
  )
}

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};


export default CountChart
