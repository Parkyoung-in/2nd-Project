import React from "react";
import ChartistGraph from "react-chartist";
import { useState, Component, useRef, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ControlledSwitches from "../components/Switch.js";
import { useDispatch, useSelector } from "react-redux";
import Chart1 from "components/chart1.js";
import Chart2 from "components/chart2.js";
import Chart3 from "components/chart3.js";
import Chart4 from "components/chart4.js";
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

const Report = () => {
  const addList = useSelector((state) => (state.addReport));
  const dispatch = useDispatch();
  const [power, setPower] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2016-02-01'));
  const [endDate, setEndDate] = useState(new Date('2016-02-01'));
  const [report1, setReport1] = useState(
    <>
      <tr>
        <td>
          1.
        </td>
        <td colSpan={2}>
          가장 전력을 <b style={{ color: '#FF4848' }}>많이</b> 사용한 시간대는 <b style={{ color: '#FF4848' }}>22시</b> 입니다.
        </td>
      </tr>
      <tr>
        <td>
          2.
        </td>
        <td colSpan={2}>
          가장 전력을 <b style={{ color: '#FF4848' }}>적게</b> 사용한 시간대는 <b style={{ color: '#FF4848' }}>06시</b> 입니다.
        </td>
      </tr>
    </>

  );
  const [report2, setReport2] = useState(
    <>
      <tr>
        <td>
          1.
        </td>
        <td colSpan={2}>
          가장 전력을 <b style={{ color: '#FF4848' }}>많이</b> 사용한 디바이스는 <b style={{ color: '#FF4848' }}>히터</b> 입니다.
        </td>
      </tr>
      <tr>
        <td>
          2.
        </td>
        <td colSpan={2}>
          가장 전력을 <b style={{ color: '#FF4848' }}>적게</b> 사용한 디바이스는 <b style={{ color: '#FF4848' }}>스마트블라인드</b> 입니다.
        </td>
      </tr>
    </>

  );
  const [report3, setReport3] = useState(
    <>
      <tr>
        <td>
          1.
        </td>
        <td colSpan={2}>
          전일대비 사용 전력이 <b style={{ color: '#FF4848' }}>3% 감소</b> 하였습니다.
        </td>
      </tr>
    </>

  );
  const [report4, setReport4] = useState(
    <>
      <tr>
        <td>
          1.
        </td>
        <td colSpan={2}>
          전반적으로 다음달 예상되는 사용 전력량은 이번달 대비 <b style={{ color: '#FF4848' }}>4% 감소</b>할 것으로 보입니다.
        </td>
      </tr>
      <tr>
        <td>
          2.
        </td>
        <td colSpan={2}>
          <b style={{ color: '#FF4848' }}>28일</b> 이후로 <b style={{ color: '#FF4848' }}>기온이 떨어질수</b> 있으므로 난방 디바이스 사용량이 <b style={{ color: '#FF4848' }}> 증가</b> 할 우려가 있어 전력 사용량이 <b style={{ color: '#FF4848' }}>상승</b> 할 것으로 보입니다.
        </td>
      </tr>
    </>

  );
  const [diDay, setDiDay] = useState(0);
  useEffect(() => {
    loadPower();
    greetData('wPowerChk1');
    greetData('wPowerChk2');
    greetData('deviceUse');
  }, [])

  useEffect(() => {
    AddHtml();
  }, [addList]);

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
          // setTime(res.data.time);
          // setPower(res.data.power);
          // setMaxPower(res.data.maxVal);
          // console.log(time);
          // console.log(power);
          // console.log(Maxpower);

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

        if (type == 'wPowerChk1') {
          //이번주
          console.log('이번주' + res.data.power);
          dispatch({ type: 'chart1', chart1_1power: res.data.power, chart1_1label: res.data.label });
          if (String(res.data.label).indexOf('월') > 0) {
            setReport3(
              <>
                <tr>
                  <td>
                    1.
                  </td>
                  <td colSpan={2}>
                    전월대비 사용 전력이 <b style={{ color: '#FF4848' }}>2% 감소</b> 하였습니다.
                  </td>
                </tr>
              </>

            );
          } else if (String(res.data.label).indexOf('목') > 0) {
            setReport3(
              <>
                <tr>
                  <td>
                    1.
                  </td>
                  <td colSpan={2}>
                    전주대비 월요일 사용 전력이 가장 <b style={{ color: '#FF4848' }}>크게 5% 증가 </b> 하였습니다.
                  </td>
                </tr>
                <tr>
                  <td>
                    2.
                  </td>
                  <td colSpan={2}>
                    전주대비 목요일 사용 전력이 가장 <b style={{ color: '#FF4848' }}>적게 7% 감소 </b> 하였습니다.
                  </td>
                </tr>
              </>

            );
          } else {
            setReport3(<>
              <tr>
                <td>
                  1.
                </td>
                <td colSpan={2}>
                  전일대비 사용 전력이 <b style={{ color: '#FF4848' }}>3% 감소</b> 하였습니다.
                </td>
              </tr>
            </>)
          }
        } else if (type == "wPowerChk2") {
          dispatch({ type: 'chart1', chart1_2power: res.data.power, chart1_2label: res.data.label, chart1_diDay: res.data.did });
          console.log('지난주' + res.data.power);
        } else if (type == "deviceUse") {
          dispatch({ type: 'chart2', chart2_power: res.data.power });
          // console.log('디바이스 사용률'+res.data.power);
        }
      })
      .catch(() => {
        console.log("살패");
      });
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

  function moveDate(sel) {
    let DateData = {
      start: startDate,
      end: endDate
    }

    if (sel == 1) {
      setStartDate(new Date('2016-02-18'));
      setEndDate(new Date('2016-02-18'));
      DateData = {
        start: '2016-02-18',
        end: '2016-02-18'
      }

    } else if (sel == 3) {
      setStartDate(new Date('2016-02-08'));
      setEndDate(new Date('2016-02-08'));
      DateData = {
        start: '2016-02-08',
        end: '2016-02-08'
      }
    } else {
      setStartDate(new Date('2016-02-04'));
      setEndDate(new Date('2016-02-04'));
      DateData = {
        start: '2016-02-04',
        end: '2016-02-04'
      }
    }


    axios.post('http://127.0.0.1:3001/db', {
      date: DateData,
      type: 'power'
    })
      .then((res) => {
        console.log('성공');
        dispatch({ type: 'chart3', chart3_power: res.data.power, chart3_time: res.data.time });
        setReport1(
          <>
            <tr>
              <td>
                1.
              </td>
              <td colSpan={2}>
                가장 전력을 <b style={{ color: '#FF4848' }}>많이</b> 사용한 시간대는 <b style={{ color: '#FF4848' }}>22시</b> 입니다.
              </td>
            </tr>
            <tr>
              <td>
                2.
              </td>
              <td colSpan={2}>
                가장 전력을 <b style={{ color: '#FF4848' }}>적게</b> 사용한 시간대는 <b style={{ color: '#FF4848' }}>12시</b> 입니다.
              </td>
            </tr>
          </>

        );
      })
      .catch(() => { console.log('살패') })

  }

  const DatePickerComponent = () => {
    let refStartd = useRef();
    let refEndd = useRef();
    let DateData = {
      start: startDate,
      end: endDate
    }


    function dateAxios() {

      let d1 = new Date(endDate);
      let d2 = new Date(startDate);

      const diDay = d1.getDate() - d2.getDate();

      axios.post('http://127.0.0.1:3001/db', {
        date: DateData,
        type: 'power'
      })
        .then((res) => {
          console.log('성공');
          dispatch({ type: 'chart3', chart3_power: res.data.power, chart3_time: res.data.time });
          if (diDay == 0) {
            setReport1(
              <>
                <tr>
                  <td>
                    1.
                  </td>
                  <td colSpan={2}>
                    가장 전력을 <b style={{ color: '#FF4848' }}>많이</b> 사용한 시간대는 <b style={{ color: '#FF4848' }}>22시</b> 입니다.
                  </td>
                </tr>
                <tr>
                  <td>
                    2.
                  </td>
                  <td colSpan={2}>
                    가장 전력을 <b style={{ color: '#FF4848' }}>적게</b> 사용한 시간대는 <b style={{ color: '#FF4848' }}>06시</b> 입니다.
                  </td>
                </tr>
              </>

            );
          } else if (diDay == 7) {
            setReport1(
              <>
                <tr>
                  <td>
                    1.
                  </td>
                  <td colSpan={2}>
                    가장 전력을 <b style={{ color: '#FF4848' }}>많이</b> 사용한 일자는  <b style={{ color: '#FF4848' }}>8일</b> 입니다.시간대별로 확인 할려면 <b onClick={() => moveDate(3)} style={{ color: '#368AFF', cursor: 'pointer' }}>클릭</b>해주세요.
                  </td>
                </tr>
                <tr>
                  <td>
                    2.
                  </td>
                  <td colSpan={2}>
                    가장 전력을 <b style={{ color: '#FF4848' }}>적게</b> 사용한 일자는 <b style={{ color: '#FF4848' }}>04일</b> 입니다.시간대별로 확인 할려면 <b onClick={() => moveDate(2)} style={{ color: '#368AFF', cursor: 'pointer' }}>클릭</b>해주세요.
                  </td>
                </tr>
              </>

            );
          } else {
            setReport1(
              <>
                <tr>
                  <td>
                    1.
                  </td>
                  <td colSpan={2}>
                    가장 전력을 <b style={{ color: '#FF4848' }}>많이</b> 사용한 일자는  <b style={{ color: '#FF4848' }}>18일</b> 입니다.시간대별로 확인 할려면 <b onClick={() => moveDate(1)} style={{ color: '#368AFF', cursor: 'pointer' }}>클릭</b>해주세요.
                  </td>
                </tr>
                <tr>
                  <td>
                    2.
                  </td>
                  <td colSpan={2}>
                    가장 전력을 <b style={{ color: '#FF4848' }}>적게</b> 사용한 일자는 <b style={{ color: '#FF4848' }}>04일</b> 입니다.시간대별로 확인 할려면 <b onClick={() => moveDate(2)} style={{ color: '#368AFF', cursor: 'pointer' }}>클릭</b>해주세요.
                  </td>
                </tr>
              </>

            );
          }
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
        <Button
          className="btn-fill pull-right ml-3"
          type="button"
          variant="info"
          style={{
            lineHeight: 1.2,
            background: '#FFBB00'
          }}
          onClick={() => alert('준비중입니다.')}
        >
          전체 리포트 다운
        </Button>
      </>
    );
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="7">
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
          <Col md="5">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">전력 총 사용량 주요 리포트</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      {report1}
                    </tbody>
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
        <Row>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">디바이스별 전력 사용률</Card.Title>
              </Card.Header>
              <Card.Body>
                <Chart2 />
              </Card.Body>
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">과거 전력 사용량 비교</Card.Title>
              </Card.Header>
              <Card.Body className="all-icons">
                <Row>
                  <Col className="font-icon-list" lg="12" md="12" sm="12" xs="12">
                    <Chart1 />
                  </Col>

                </Row>

              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">디바이스별 전력사용률 주요 리포트</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      {report2}
                    </tbody>
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
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">과거 전력 사용량 비교 주요 리포트</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      {report3}
                    </tbody>
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
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">다음달 전력 사용량 예측 </Card.Title>
              </Card.Header>
              <Card.Body>
                <Chart4 />
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
                <Card.Title as="h4">다음달 전력 사용량 예측 주요 리포트</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      {report4}
                    </tbody>
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

export default Report;
