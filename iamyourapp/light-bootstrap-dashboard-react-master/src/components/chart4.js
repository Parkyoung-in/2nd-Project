import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Chart4(){
    const labels = ['1일', '2일', '3일', '4일', '5일', '6일', '7일', '8일', '9일', '10일', '11일', '12일', '13일', '14일', '15일', '16일', '17일', '18일', '19일', '20일', '21일', '22일', '23일', '24일', '25일', '26일', '27일', '28일', '29일', '30일', '31일'];
    const data = {
        labels,
        datasets: [
            {
            fill: true,
            label: '이번달 전력사용량',
            data: [985.656766671, 1332.390133332, 1038.410183336, 1098.616866654, 861.192849994, 801.790050009, 747.165916663, 524.950683343, 851.17005001, 1301.889233326, 781.089116671, 695.335216674, 866.462066662, 766.349549996, 1339.82193332, 1073.203549992, 901.909866686, 1238.111299988, 865.939116644, 1013.383099987, 775.908849998, 1032.292799999, 1159.481166664, 1215.852649993, 1021.690583328, 1076.022550002, 1600.032549985, 730.695083347, 736.966999991, 582.650199984, 1206.498950014] ,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                fill: true,
                label: '다음달 예측 전력사용량',
                data: [875.5153454456046, 934.0139490021348, 1157.9384679351663, 1046.079142107525, 1089.0554268742521, 941.8060546461242, 895.8580398772574, 800.7089401908527, 650.5753098944252, 777.2488366099315, 1077.311354975265, 866.2588642249735, 756.1808308324772, 832.6787311263452, 823.961309060776, 1116.5242530791552, 1042.5646219329337, 967.3752539610517, 1114.5214627327086, 983.7856537323876, 1011.6906496473782, 845.7757875830782, 998.422361547166, 1061.0638226163146, 1154.1358649832885, 1042.9098924915918, 1075.7790520366457, 1393.2756406994552, 973.8472655064935, 860.7857576996709, 693.5901240752817],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Chart.js Line Chart',
            },
        },
    };

    return <Line options={options} data={data} />;
}