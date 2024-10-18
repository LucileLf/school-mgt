"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const AttendanceChart = ({data}:{data:{
  name: string,
  present: number,
  absent: number
}[]}) => {
  return (
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
   
  )
}

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};


export default AttendanceChart
