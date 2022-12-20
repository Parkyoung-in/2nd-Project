import React from "react";
import ChartistGraph from "react-chartist";
import { useState,Component,useRef,useEffect } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
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
const DatePickerComponent = () => {
    const [startDate, setStartDate] = useState(new Date('2016-01-01'));
    const [endDate, setEndDate] = useState(new Date('2016-01-01'));
    let refStartd = useRef();
    let refEndd = useRef();
    let DateData ={
      start : startDate,
      end : endDate
    }
    function dateAxios(event){
      console.log(DateData.start);
      axios.post('http://127.0.0.1:3001/db',{
        date:DateData,
        type:'power'
      })
      .then((res)=>{
          console.log('성공');
          setTime(res.data.time);
          setPower(res.data.power);
          setMaxPower(res.data.maxVal);
          console.log(time);
          console.log(power);
          console.log(Maxpower);
        
      })
      // .catch(()=>{console.log('살패')})
      event.preventDefault();
    }
  
    return (
      <>
        <form  onSubmit={dateAxios}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            name='strDate'
            ref={refStartd}
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            name='endDate'
            ref={refEndd}
            dateFormat="yyyy-MM-dd"
          />
          <Button
            className="btn-fill pull-right"
            type="submit"
            variant="info"
            style={{
              lineHeight:0.7
            }}
          >
            조회
          </Button>
        </form>
      </>
    );
  };

  export default DatePickerComponent;