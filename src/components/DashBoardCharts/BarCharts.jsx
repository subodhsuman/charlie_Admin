import React from 'react'
import { BarChart,XAxis,YAxis,CartesianGrid,Tooltip,Bar,Legend } from "recharts";

const BarCharts = () => {
    const data = [
        {
          "name": "Jan",
          "Withdraw": 4000,
          "Deposit": 2400
        },
        {
          "name": "Feb",
          "Withdraw": 3000,
          "Deposit": 1398
        },
        {
          "name": "Mar",
          "Withdraw": 2000,
          "Deposit": 9800
        },
        {
          "name": "Apr",
          "Withdraw": 2780,
          "Deposit": 3908
        },
        {
          "name": "May",
          "Withdraw": 1890,
          "Deposit": 4800
        },
        {
          "name": "June",
          "Withdraw": 2390,
          "Deposit": 3800
        },
        {
          "name": "July",
          "Withdraw": 3490,
          "Deposit": 4300
        }
      ]
  return (
    <div>
      <BarChart width={730} height={450} data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke='gray'/>
            <XAxis dataKey="name" stroke='var(--white)'/>
            <YAxis stroke='var(--white)'/>
            <Tooltip />
            <Legend />
            <Bar dataKey="Withdraw" fill="#8884d8" />
            <Bar dataKey="Deposit" fill="#82ca9d" />
       </BarChart>
    </div>
  )
}

export default BarCharts
