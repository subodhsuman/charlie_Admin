import React from 'react';
import { PieChart,Pie } from "recharts";


const PieCharts = () => {
  const data01 = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "Group F",
      "value": 189
    }
  ];
  const data02 = [
    {
      "name": "Group A",
      "value": 20
    },
    {
      "name": "Group B",
      "value": 20
    },
    {
      "name": "Group C",
      "value": 10
    },
    {
      "name": "Group E",
      "value": 20
    },
    {
      "name": "Group F",
      "value": 30
    }
  ];
  return (
    <div>
      <PieChart width={730} height={180} className="pi-chart">
        <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
        <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={20} outerRadius={50} fill="#82ca9d" label />
      </PieChart>
      <h6 className='text-center mt-0'>Top Trading Five Coins</h6>
    </div>
  )
}

export default PieCharts
