import React from 'react';
import { AreaChart,XAxis,YAxis,CartesianGrid,Tooltip,Area } from "recharts";

const AreaCharts = () => {
    const data = [
        {
          "name": "Jan",
          "Buy": 4000,
          "Sell": 2400,
          "amt": 2400
        },
        {
          "name": "Feb",
          "Buy": 3000,
          "Sell": 1398,
          "amt": 2210
        },
        {
          "name": "Mar",
          "Buy": 2000,
          "Sell": 9800,
          "amt": 2290
        },
        {
          "name": "Apr",
          "Buy": 2780,
          "Sell": 3908,
          "amt": 2000
        },
        {
          "name": "May",
          "Buy": 1890,
          "Sell": 4800,
          "amt": 2181
        },
        {
          "name": "June",
          "Buy": 2390,
          "Sell": 3800,
          "amt": 2500
        },
        {
          "name": "July",
          "Buy": 3490,
          "Sell": 4300,
          "amt": 2100
        }
      ]
  return (
    <div>
        <AreaChart width={1500} height={350} data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="colorBuy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSell" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke='var(--white)'/> 
            <YAxis stroke='var(--white)'/>
            <CartesianGrid strokeDasharray="3 3" stroke='gray' />
            <Tooltip />
            <Area type="monotone" dataKey="Buy" stroke="#8884d8" fillOpacity={1} fill="url(#colorBuy)" />
            <Area type="monotone" dataKey="Sell" stroke="#82ca9d" fillOpacity={1} fill="url(#colorSell)" />
    </AreaChart>
    </div>
  )
}

export default AreaCharts;