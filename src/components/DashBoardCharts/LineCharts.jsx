import React from 'react'
import { LineChart,XAxis,YAxis,CartesianGrid,Tooltip,Line,Legend } from "recharts";

const LineCharts = () => {
    const data = [
        {
          "name": "Jan",
          "Commission": 2400,
          "amt": 2400
        },
        {
          "name": "Feb",
          "Commission": 1398,
          "amt": 2210
        },
        {
          "name": "Mar",
          "Commission": 9800,
          "amt": 2290
        },
        {
          "name": "Apr",
          "Commission": 3908,
          "amt": 2000
        },
        {
          "name": "May",
          "Commission": 4800,
          "amt": 2181
        },
        {
          "name": "June",
          "Commission": 3800,
          "amt": 2500
        },
        {
          "name": "July",
          "Commission": 4300,
          "amt": 2100
        }
      ]
      
  return (
    <div>
      <LineChart width={700} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke='gray'/>
            <XAxis dataKey="name" stroke='var(--white)'/>
            <YAxis stroke='var(--white)'/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Commission" stroke="#8884d8" />
      </LineChart>
    </div>
  )
}

export default LineCharts
