import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useDispatch,useSelector } from "react-redux";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart2() {
  const devicePower = useSelector((state)=>(state.chart2_power));
    const data = {
        labels: ['히터', '에어컨', '스마트조명', '환풍기', '가습기', '스마트블라인드'],
        datasets: [
          {
            label: '# of Votes',
            data: devicePower,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
  return <Pie data={data} />;
}
