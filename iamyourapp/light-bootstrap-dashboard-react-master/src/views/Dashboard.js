import React from "react";
import ChartistGraph from "react-chartist";
import { useState, Component, useRef, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ControlledSwitches from '../components/Switch.js';
import ControlledSwitches1 from '../components/DeviceSwitch.js';
import { useDispatch, useSelector } from "react-redux";
import Chart1 from "components/chart1.js";
import Chart2 from "components/chart2.js";
import Chart3 from "components/chart3.js";
import ToggleButtonExample from 'components/toggle.js'
import ApexChart from "components/ApexChart";
import { faSmog, faTemperature0, faTemperatureArrowDown, faTemperatureArrowUp, faDroplet, faWind, faLightbulb, faPersonBooth, faPlug } from "@fortawesome/free-solid-svg-icons";
import DropDown from "components/dropDown.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// react-bootstrap components
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
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore.js";
import { forEachChild } from "typescript";

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Dashboard = () => {
  const addList = useSelector((state) => (state.addReport));
  const dispatch = useDispatch();
  const [cate, setmCate] = useState('3층');
  const [power, setPower] = useState([]);
  const [mpower, setmPower] = useState('0');
  const [wpower, setwPower] = useState('0');
  const [deviceCnt, setDeviceCnt] = useState('0');
  const [startDate, setStartDate] = useState(new Date('2016-02-01'));
  const [endDate, setEndDate] = useState(new Date('2016-02-01'));
  const icon = { '에어컨': faTemperatureArrowDown, '히터': faTemperatureArrowUp, '가습기': faDroplet, '환풍기': faWind, '스마트조명': faLightbulb, '스마트블라인드': faPersonBooth }
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {

    loadPower();
    greetData("wPower");
    greetData("mPower");
    greetData("device");
    greetData("wPowerChk1");
    greetData("wPowerChk2");
    greetData('deviceUse');
    getDeviceList();
  }, []);

  useEffect(() => {
    AddHtml();
  }, [addList])

  useEffect(() => {
    getDeviceList();
  }, [cate])

  useEffect(() => {
    greetData('wPowerChk1');
    greetData('wPowerChk2');
    greetData('deviceUse');
  }, [endDate])

  const loadPower = () => {

    console.log('loadPower function')
    if (power.length == 0) {

      axios.post('http://127.0.0.1:3001/db', {
        type: 'power'
      })
        .then((res) => {

          console.log('성공');
          dispatch({ type: 'chart3', chart3_power: res.data.power, chart3_time: res.data.time });

        })
        .catch(() => { console.log('살패') })
    }
  };

  function greetData(type) {

    let d1 = new Date(endDate);
    let d2 = new Date(startDate);

    console.log((d1.getDate() - d2.getDate()) + '빼기날자');
    let DateData = {
      start: startDate,
      end: endDate,
      diDay: d1.getDate() - d2.getDate()
    }
    axios.post('http://127.0.0.1:3001/total', {
      type: type,
      date: DateData
    })
      .then((res) => {

        console.log('성공');

        if (type == "mPower") {
          setmPower(res.data.power);
          console.log(mpower);
        } else if (type == "wPower") {
          setwPower(res.data.power);
          console.log(wpower);
        } else if (type == "device") {
          setDeviceCnt(res.data.device);
          console.log(deviceCnt);
        } else if (type == "wPowerChk1") {
          //이번주
          console.log('이번주' + res.data.power);
          dispatch({ type: 'chart1', chart1_1power: res.data.power, chart1_1label: res.data.label });
          // setthisPower(res.data.power);
          // console.log('이번주'+thisPower);
        } else if (type == "wPowerChk2") {
          // const wPowe = res.data.power; //지난주
          // setLastPower(res.data.power);
          dispatch({ type: 'chart1', chart1_2power: res.data.power, chart1_2label: res.data.label, chart1_diDay: res.data.did });
          console.log('지난주' + res.data.power);
        } else if (type == "deviceUse") {
          dispatch({ type: 'chart2', chart2_power: res.data.power });
          // console.log('디바이스 사용률'+res.data.power);
        }

      })
      .catch(() => { console.log('살패') })
  }



  const AddHtml = () => {
    // console.log('addHtml'+addList);
    const arrtext = addList.substr(1).split(",");
    let html = "";
    for (let i = 0; i < arrtext.length; i++) {
      html += arrtext[i];
      // console.log('html'+html);
    }
    return (
      <>
        <tbody dangerouslySetInnerHTML={{ __html: html }}></tbody>
      </>
    );
  };

  const DatePickerComponent = () => {
    let refStartd = useRef();
    let refEndd = useRef();
    let DateData = {
      start: startDate,
      end: endDate
    }

    function dateAxios() {
      axios.post('http://127.0.0.1:3001/db', {
        date: DateData,
        type: 'power'
      })
        .then((res) => {
          console.log('성공');
          dispatch({ type: 'chart3', chart3_power: res.data.power, chart3_time: res.data.time });
        })
        .catch(() => { console.log('살패') })
    }

    return (
      <>
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
          type="button"
          variant="info"
          style={{
            lineHeight: 1.2
          }}
          onClick={() => dateAxios()}
        >
          조회
        </Button>
      </>
    );
  };

  function getDeviceList() {
    let deviceData = {
      type: 'list',
      cate:cate
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
      let ckName = val.DEVICE_NAME;
      if (String(val.DEVICE_NAME).indexOf('_') > 0) {
        ckName = String(val.DEVICE_NAME).split('_')[0];
      }

      if (icon[ckName]) {
        dIcon = icon[ckName]
      }
      let state = val.DEVICE_STATUS == 'OFF' ? false : true
      return (
        <Col key={index} className="font-icon-list" lg="3" md="3" sm="4" xs="6">
          <div className="device_list">
            <a href='#' onClick={() => {
              // setShowModal(true);
              // setDeviceUid(val.DEVICE_UID);
              // setDeviceName(val.DEVICE_NAME);
              // setDeviceDate(val.REG_DATE);
              // setDeviceSeq(val.DEVICE_SEQ)
            }} name='nc-align-left-2'>
              <FontAwesomeIcon icon={dIcon} />
              <p>{val.DEVICE_NAME}{state}</p>
            </a>
            <p align="center"><ControlledSwitches1 state={state} uid={val.DEVICE_SEQ} name={val.DEVICE_NAME} /></p>
          </div>
        </Col>)
    }

    )
    // console.log(device);
    setDeviceData(device);
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">이달 전력 총 사용량</p>
                      <Card.Title as="h5">{mpower} kw</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <Button
                    className="border-0 p-1"
                    onClick={() => greetData("mPower")}
                  >
                    <i className="fas fa-redo mr-1"></i>
                    Update Now
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">주간 전력 총 사용량</p>
                      <Card.Title as="h5">{wpower} kw</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <Button
                    className="border-0 p-1"
                    onClick={() => greetData("wPower")}
                  >
                    <i className="fas fa-redo mr-1"></i>
                    Update Now
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">전달대비 전력사용</p>
                      <Card.Title as="h5">+6% 사용</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <Button className="border-0 p-1">
                    <i className="fas fa-redo mr-1"></i>
                    Update Now
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-preferences-circle-rotate text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">사용중인 디바이스</p>
                      <Card.Title as="h5">{deviceCnt}대 가동중</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <Button className="border-0 p-1 line-he" onClick={() => greetData("device")}>
                    <i className="fas fa-redo mr-1"></i>

                    Update Now
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4" className="mb-2">전력 총 사용량</Card.Title>
                <DatePickerComponent />
              </Card.Header>
              <Card.Body>
                <Chart3 />
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  Room 실시간 정보
                  <DropDown/>
                </Card.Title>
              </Card.Header>
              <Card.Body className="all-icons" style={{ paddingTop: 0 }}>
                <Row>
                  <Col className="font-icon-list" lg="6" md="3" sm="12" xs="12">
                    <div className="room_list ">
                      <h5>사장실 루틴<span className="rbtn"><ControlledSwitches /></span></h5>
                      <Col lg='4' className="sensing_info">
                        <FontAwesomeIcon icon={faSmog} />
                        <p>441</p>
                      </Col>
                      <Col lg='4' className="sensing_info">
                        <FontAwesomeIcon icon={faTemperature0} />
                        <p>26 ℃</p>
                      </Col>
                      <Col lg='4' className="sensing_info">
                        <FontAwesomeIcon icon={faDroplet} />
                        <p>26 %</p>
                      </Col>
                    </div>
                  </Col>
                  <Col className="font-icon-list" lg="6" md="3" sm="12" xs="12">
                    <div className="room_list ">
                      <h5>사무실 루틴<span className="rbtn"><ControlledSwitches /></span></h5>
                      <Col lg='4' className="sensing_info">
                        <FontAwesomeIcon icon={faSmog} />
                        <p>342</p>
                      </Col>
                      <Col lg='4' className="sensing_info">
                        <FontAwesomeIcon icon={faTemperature0} />
                        <p>24 ℃</p>
                      </Col>
                      <Col lg='4' className="sensing_info">
                        <FontAwesomeIcon icon={faDroplet} />
                        <p>13 %</p>
                      </Col>
                      <p>
                        {/* 루틴3 ON */}
                      </p>
                    </div>
                  </Col>
                  <Col className="font-icon-list" lg="6" md="3" sm="12" xs="12">
                    <div className="room_list ">
                      <h5>휴게실 루틴<span className="rbtn"><ControlledSwitches /></span></h5>
                      <Col lg='4' className="sensing_info">
                        <FontAwesomeIcon icon={faSmog} />
                        <p>380</p>
                      </Col>
                      <Col lg='4' className="sensing_info">
                        <FontAwesomeIcon icon={faTemperature0} />
                        <p>25 ℃</p>
                      </Col>
                      <Col lg='4' className="sensing_info">
                        <FontAwesomeIcon icon={faDroplet} />
                        <p>16 %</p>
                      </Col>
                      <p>
                        {/* 루틴3 ON */}
                      </p>
                    </div>
                  </Col>
                  <Col className="font-icon-list" lg="6" md="3" sm="12" xs="12">
                    <div className="room_list ">
                      <h5>회의실 루틴<span className="rbtn"><ControlledSwitches /></span></h5>
                      <Col lg='4' className="sensing_info">
                        <FontAwesomeIcon icon={faSmog} />
                        <p>234</p>
                      </Col>
                      <Col lg='4' className="sensing_info">
                        <FontAwesomeIcon icon={faTemperature0} />
                        <p>28 ℃</p>
                      </Col>
                      <Col lg='4' className="sensing_info">
                        <FontAwesomeIcon icon={faDroplet} />
                        <p>22 %</p>
                      </Col>
                      {/* <ToggleButtonExample/> */}
                      <p>
                        {/* 루틴3 ON */}
                      </p>
                    </div>
                  </Col>

                </Row>

              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">디바이스별 전력사용률</Card.Title>
              </Card.Header>
              <Card.Body>
                <Chart2 />
              </Card.Body>
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  디바이스 관리
                  <Dropdown className="float-right"  as={Nav.Item}>
                    <Dropdown.Toggle
                      aria-expanded={false}
                      aria-haspopup={true}
                      as={Nav.Link}
                      data-toggle="dropdown"
                      id="navbarDropdownMenuLink"
                      variant="default"
                      className="m-0"
                    >
                      <span className="no-icon">{cate}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu  aria-labelledby="navbarDropdownMenuLink">
                      <Dropdown.Item
                        href="#pablo"
                        onClick={(e) => {setmCate('1층');e.preventDefault()}}
                      >
                        1층
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#pablo"
                        onClick={(e) => {setmCate('2층');e.preventDefault()}}
                      >
                        2층
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#pablo"
                        onClick={(e) => {setmCate('3층');e.preventDefault()}}
                      >
                        3층
                      </Dropdown.Item>

                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Title>
              </Card.Header>
              <Card.Body className="all-icons">
                <Row>
                  {deviceData}
                </Row>

              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">과거 전력 사용량 비교</Card.Title>
              </Card.Header>
              <Card.Body>
                <Chart1 />
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">최신 주요 리포트</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <AddHtml />
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
