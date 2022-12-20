// 예를 App.js 라고 생각하자.
import { useState, useRef, useCallback } from "react";
import ControlledSwitches from "../components/Switch_routine.js";
import RoutineList from "../components/RoutineList.js";
import { MdDelete } from "react-icons/md";
import "jquery/dist/jquery.js";
import $ from "jquery";
import "ion-rangeslider/css/ion.rangeSlider.min.css";
import "ion-rangeslider/js/ion.rangeSlider.min.js";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  NavLink,
  Container,
  Row,
  Col,
  Table,
  Dropdown,
} from "react-bootstrap";
import React from "react";
import axios from "axios";
import BasicTimePicker from "components/time.js";
import SliderRange from "components/slider.js";
import SliderRange2 from "components/slider2.js";
import SliderRange3 from "components/slider3.js";
import SliderTemp from "components/sliderTemp.js";
import { faTemperatureArrowDown, faTemperatureArrowUp, faDroplet, faWind, faLightbulb, faPersonBooth, faPlug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from 'react'
function Routine() {
  // RoutineList 위한 props 설정 부분
  // useState 등을 이용해 저장된 루틴 목록을 띄워보려 했으나 아직 미완성이다.
  const [option1, setOption1] = useState()
  const [option2, setOption2] = useState()
  const [option3, setOption3] = useState()
  const [option4, setOption4] = useState()
  const [chk1, setChk1] = useState(true)
  const [chk2, setChk2] = useState(true)
  const [chk3, setChk3] = useState(true)
  const [chk4, setChk4] = useState(true)
  const [chk5, setChk5] = useState(true)
  const [chk6, setChk6] = useState(false)
  const [chk7, setChk7] = useState(false)
  const icon = { '에어컨': faTemperatureArrowDown, '히터': faTemperatureArrowUp, '가습기': faDroplet, '환풍기': faWind, '스마트조명': faLightbulb, '스마트블라인드': faPersonBooth }
  const [cate, setmCate] = React.useState('3층');
  const [routines, setRoutines] = useState([
    // {
    //   name: "",
    //   startTime: "",
    //   endTime: "",
    //   temperature: "",
    //   humid: "",
    //   light: "",
    //   co2: "",
    //   devices: {
    //     airconditioner: false,
    //     heater: false,
    //     humidifier: false,
    //     ventilator: false,
    //     illuminator: false,
    //     blinder: false,
    //   },
    // },
  ]);
  const [test, updateState] = useState()
  const forceUdate = useCallback(() => updateState({}), [])
  const [deviceData, setDeviceData] = useState([]);
  const [routine, setRoutine] = useState({});
  const [errors, setErrors] = useState({});
  const [routineList, setRoutineList] = useState([]);
  const setField = (field, value) => {
    setRoutine({
      ...routine,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(1);
  const [chk, setChk] = useState();
  // 루틴 추가
  // const onAdd = useCallback(() => {
  //   const routineCreate = {
  //     name: "",
  //     startTime: "",
  //     endTime: "",
  //     temperature: "",
  //     humid: "",
  //     light: "",
  //     co2: "",
  //     devices: {
  //       airconditioner: false,
  //       heater: false,
  //       humidifier: false,
  //       ventilator: false,
  //       illuminator: false,
  //       blinder: false,
  //     },
  //   };
  //   setRoutines(routines.concat(routineCreate));
  // }, [routines]);
  useEffect(() => {
    // console.log(icon['에어컨'])
    getDeviceList();
  }, [])
  useEffect(() => {
    getDeviceList();
  }, [cate])

 
  function getDeviceList() {
    let deviceData = {
      type: 'list',
      cate: cate
    }
    axios.post('http://127.0.0.1:3001/device', {
      data: deviceData
    })
      .then((res) => {
        if (res.data.result == 'success') {
          // setDeviceData(res.data.row);
          listDevice(res.data.row)
          console.log('가져오기')
        } else {
          console.log('가져오기실패')
        }

      }).catch(() => { console.log('살패') })
  }

  function listDevice(data) {
    let device = data.map((val, index) => {
      let dIcon = faPlug
      if (icon[val.DEVICE_NAME]) {
        dIcon = icon[val.DEVICE_NAME]
      }
      let optionNo;
      let optionName='';
      if(val.DEVICE_OPTION == '온도'){
        optionNo = <SliderTemp/>;
        optionName='온도 루틴'
    //     setOption1(
    //       <Col md="6">
    //   <Form.Group controlId="routineCreate-temperature">
    //     <Form.Label>온도 루틴</Form.Label>
    //     <SliderTemp />
    //   </Form.Group>
    // </Col>
    //     )
      }

      if(val.DEVICE_OPTION == '습도'){
        optionNo = <SliderRange/>;
        optionName='습도 루틴'
    //     setOption2(
    //       <Col md="6">
    //   <Form.Group controlId="routineCreate-temperature">
    //     <Form.Label>습도 루틴</Form.Label>
    //     <SliderTemp />
    //   </Form.Group>
    // </Col>
    //     )
      }
      if(val.DEVICE_OPTION == '조도'){
        optionNo = <SliderRange2/>;
        optionName='조도 루틴'
    //     setOption3(
    //       <Col md="6">
    //   <Form.Group controlId="routineCreate-temperature">
    //     <Form.Label>조도 루틴</Form.Label>
    //     <SliderTemp />
    //   </Form.Group>
    // </Col>
    //     )
      }

      if(val.DEVICE_OPTION == 'CO2'){
        optionNo = <SliderRange3/>;
        optionName='CO2 루틴'
    //     setOption4(
    //       <Col md="6">
    //   <Form.Group controlId="routineCreate-temperature">
    //     <Form.Label>CO2 루틴</Form.Label>
    //     <SliderTemp />
    //   </Form.Group>
    // </Col>
    //     )
      }

      return (
        <Col key={index} className="font-icon-list" lg="6" md="3" sm="4" xs="6">
          <div className="device_list">
            <a href='#' onClick={() => {
              // setShowModal(true);
              setOption1(
                <Col md="6">
                <Form.Group controlId="routineCreate-temperature">
                  <Form.Label>{optionName}</Form.Label>
                  {optionNo}
                </Form.Group>
              </Col>
              )
              // setDeviceName(val.DEVICE_NAME);
              // setDeviceDate(val.REG_DATE);
              // setDeviceSeq(val.DEVICE_SEQ)
            }} name='nc-align-left-2'>
              <FontAwesomeIcon icon={dIcon} />
              <p>{val.DEVICE_NAME}</p>
            </a>
            <p align="center"><ControlledSwitches /></p>
          </div>
        </Col>)
    }

    )
    // console.log(device);
    setDeviceData(device);
  }

  function deleRoutine() {
    //db삭제 날려주고 listRoutine() 다시 호출
    if (confirm('삭제하시겠습니까?')) {
      routineList.splice(0, routineList.length);
      setRoutineList(routines);
    }

  }


  function listRoutine(data = [1]) {
    let routines = data.map((val, index) => {

      return (
        <tr key={index}>
          <td>1</td>
          <td>
            <NavLink to="/admin/Routine">회의실2</NavLink>
          </td>
          <td>오전 9:00</td>
          <td>에어컨,가습기,스마트조명,TV</td>
          <td>오후 7:00</td>
          <td>월,화,수,목,금</td>
          <td>
            <ControlledSwitches />
          </td>
          <td>
            <MdDelete
              padding="1rem"
              align-items="center"
              font-size="1.5rem"
              color="#fa0202"
              cursor="pointer"
              onClick={() => deleRoutine()}
            />
          </td>
        </tr>
      )
    })
    // console.log(device);
    setRoutineList(routines);
  }

  const CheckBoxTest = () => {

    return (
      <div className="cate" lg='12'>
        <input type="checkbox" id="btn0" name="checkWrap" checked={chk1} onChange={(e)=>setChk1(e.target.checked)} value="월" />
        <label htmlFor="btn0">월</label>
        <input type="checkbox" id="btn1" name="checkWrap" checked={chk2} onChange={(e)=>setChk2(e.target.checked)} value="화" />
        <label htmlFor="btn1">화</label>
        <input type="checkbox" id="btn2" name="checkWrap"  checked={chk3} onChange={(e)=>setChk3(e.target.checked)} value="수" />
        <label htmlFor="btn2">수</label>
        <input type="checkbox" id="btn3" name="checkWrap" checked={chk4} onChange={(e)=>setChk4(e.target.checked)}  value="목" />
        <label htmlFor="btn3">목</label>
        <input type="checkbox" id="btn4" name="checkWrap" checked={chk5}  onChange={(e)=>setChk5(e.target.checked)} value="금" />
        <label htmlFor="btn4">금</label>
        <input type="checkbox" id="btn5" name="checkWrap" checked={chk6} onChange={(e)=>setChk6(e.target.checked)} value="토" />
        <label htmlFor="btn5">토</label>
        <input type="checkbox" id="btn6" name="checkWrap" checked={chk7} onChange={(e)=>setChk7(e.target.checked)} value="일" />
        <label htmlFor="btn6">일</label>
      </div>
    )
  }

  return (
    <>
      <Container id="routine-form-container" fluid>
        <Form id="routine-create-form">
          <Row>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">루틴 생성</Card.Title>
                  <Form.Group controlId="routineCreate-name">
                    <Form.Label>루틴 명칭</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue="기본 루틴"
                      placeholder="루틴 명칭"
                      value={routine.name}
                      onChange={(e) =>
                        setField("routineCreate-name", e.target.value)
                      }
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Card.Header>
                <Card.Body
                  style={{
                    paddingBottom: 15,
                  }}
                >
                  <Row>
                    <Col md="4">
                      <Form.Group controlId="routineCreate-startTime">
                        <Form.Label>루틴시작 시간</Form.Label>{" "}
                        {/* 화면 좁게 했을 때 이 라벨 옆에 BasicTimePicker 안 오게 css 수정해야 한다. */}
                        <BasicTimePicker // 얘를 어떻게 Form 전달하는지 모르겠다.
                        // id="startTime"
                        // name="startTime"
                        // valueAs="id"
                        // value={routine.startTime}
                        // onChange={(e) => {
                        //   console.log(e.target.value);
                        //   setField("routineCreate-startTime", e.target.value);
                        // }}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="" md="4">
                      <Form.Group controlId="routineCreate-endTime">
                        <Form.Label>루틴종료 시간</Form.Label>{" "}
                        {/* 화면 좁게 했을 때 이 라벨 옆에 BasicTimePicker 안 오게 css 수정해야 한다. */}
                        <BasicTimePicker />
                      </Form.Group>
                    </Col>
                    <Col className="" md="4">
                      <Form.Group >
                        <Form.Label>요일선택</Form.Label>
                        <CheckBoxTest />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    {option1}
                    {option2}
                  </Row>
                  <Row>
                    {option3}
                    {option4}
                  </Row>
                  <Button
                    className="btn-fill pull-right mt-4"
                    // type="submit"
                    variant="primary"
                    onClick={() => listRoutine()}
                  >
                    루틴 저장
                  </Button>
                  <div className="clearfix"></div>
                </Card.Body>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <Card.Body className="all-icons">
                  <Row className="pl-2 pr-2">
                    <Dropdown className="float-right" as={Nav.Item}>
                      <Dropdown.Toggle
                        aria-expanded={false}
                        aria-haspopup={true}
                        as={Nav.Link}
                        data-toggle="dropdown"
                        id="navbarDropdownMenuLink"
                        variant="default"
                        className="m-0  p-0"
                      >
                        <span className="no-icon">{cate}</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                        <Dropdown.Item
                          href="#pablo"
                          onClick={(e) => { setmCate('전체'); e.preventDefault() }}
                        >
                          전체
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#pablo"
                          onClick={(e) => { setmCate('1층'); e.preventDefault() }}
                        >
                          1층
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#pablo"
                          onClick={(e) => { setmCate('2층'); e.preventDefault() }}
                        >
                          2층
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#pablo"
                          onClick={(e) => { setmCate('3층'); e.preventDefault() }}
                        >
                          3층
                        </Dropdown.Item>

                      </Dropdown.Menu>
                    </Dropdown>
                  </Row>
                  <Row>
                    {deviceData}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
        <RoutineList />
      </Container>

      {/* 이 밑은 화면설계서를 위한 임시 테이블이다. */}

      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">루틴 목록</Card.Title>
                <p className="card-category">루틴 이름을 클릭</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">번호</th>
                      <th className="border-0">루틴이름</th>
                      <th className="border-0">시작조건</th>
                      <th className="border-0">동작디바이스</th>
                      <th className="border-0">종료조건</th>
                      <th className="border-0">설정된 요일</th>
                      <th className="border-0">ON/OFF</th>
                      <th className="border-0">삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routineList}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Routine;
