// import styled from 'styled-components';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);
import { Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
  Dropdown,
  ButtonGroup,
  ToggleButton,
  Pick,
  Alert,
} from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { useState,Component,useRef,useEffect } from "react";

const Chart1 = () => {
  const [weekend,setWeekend] = useState(['일','월','화','수','목','금','토']);
  const thisPower = useSelector((state)=>(state.chart1_1power));
  const prePower = useSelector((state)=>(state.chart1_2power));
  const diDay = useSelector((state)=>(state.chart1_diDay));
  const label = useSelector((state)=>(state.chart1_1label));
  const label2 = useSelector((state)=>(state.chart1_2label));
  console.log(String(label2).includes('일'));


  if(diDay == 1){
    const data = {
      labels: [label2,label],
      datasets: [
        // {
        //   type: 'line',
        //   label: 'Dataset 1',
        //   borderColor: 'rgb(54, 162, 235)',
        //   borderWidth: 2,
        //   data: [1, 2, 3, 4, 5],
        // },
        {
          type: 'bar',
          label: label2+' 데이터',
          backgroundColor: ['rgb(75, 192, 192)','rgb(255, 99, 132)'],
          data: [prePower,thisPower],
          borderColor: ['rgb(75, 192, 192)','red'],
          borderWidth: 2,
        }
      ],
    };
    return (
      <Container>
        <Line type="line" data={data} />
      </Container>
    );
  }else{
    const data = {
      labels: label,
      datasets: [
        // {
        //   type: 'line',
        //   label: 'Dataset 1',
        //   borderColor: 'rgb(54, 162, 235)',
        //   borderWidth: 2,
        //   data: [1, 2, 3, 4, 5],
        // },
        {
          type: 'bar',
          label: '과거',
          backgroundColor: 'rgb(75, 192, 192)',
          data: prePower,
          borderWidth: 2,
        },
        {
          type: 'bar',
          label: '현재',
          backgroundColor: 'rgb(255, 99, 132) ',
          borderColor: 'red',
          data: thisPower,
        },
      ],
    };
    return (
      <Container>
        <Line type="line" data={data} />
      </Container>
    );
  }


};

export default Chart1;

// const Container = styled.div`
//   width: 90vw;
//   max-width: 900px;
// `;