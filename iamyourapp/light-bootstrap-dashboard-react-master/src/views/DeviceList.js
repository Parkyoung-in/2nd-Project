import React from "react";
import axios from "axios";
// 추가
import ControlledSwitches1 from 'components/DeviceSwitch.js';
import DropDown from "components/dropDown.js";

// demo.css 60번째줄에 클래스 새로 만들어서 css 내용 추가함

// react-bootstrap components
import {
  Button, // 버튼 활성화
  Card,
  Modal, // 모달 추가, 맨 아래에 코드 추가
  Form, // 폼 추가
  Container,
  Row,
  Col,
  Dropdown,
  Nav,
} from "react-bootstrap";

import _, { showInfo as Icons_showInfo, setShowInfo as Icons_setShowInfo, setDeviceName, setDeviceUid, setDeviceDate, deviceName,checkedArr,setCheckedArr } from "./Device.js";
import { useEffect } from 'react'
import { faTemperatureArrowDown, faTemperatureArrowUp, faDroplet, faWind, faLightbulb, faPersonBooth, faPlug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DeviceList() {
  const icon = { '에어컨': faTemperatureArrowDown, '히터': faTemperatureArrowUp, '가습기': faDroplet, '환풍기': faWind, '스마트조명': faLightbulb, '스마트블라인드': faPersonBooth }
  // 추가
  const [showModal, setShowModal] = React.useState(false);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showNameModal, setShowNameModal] = React.useState(false);
  const [deviceData, setDeviceData] = React.useState([]);
  const [deviceSeq, setDeviceSeq] = React.useState();
  const [cate, setmCate] = React.useState('전체');
  const [addCate, setmAddCate] = React.useState('층 선택');
  const refDeviceName = React.useRef();
  const refDeviceNo = React.useRef();
  const editDeviceName = React.useRef();
  const handleRename = (event) => {
    event.preventDefault();
  }
    ;
  let data = '';

  useEffect(() => {
    // console.log(icon['에어컨'])
    getDeviceList();
  }, [])

  useEffect(() => {
    getDeviceList();
  }, [cate])

  function getData(e) {
    data = e.target.value;
  }
  function chData() {
    setInputData(data);
  }

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

  function device_add() {
    let deviceData = {
      name: refDeviceName.current.value,
      no: refDeviceNo.current.value,
      type: 'add',
      cate:addCate != '층 선택' ? addCate : '',
      option:checkedArr
    }

    axios.post('http://127.0.0.1:3001/device', {
      data: deviceData
    })
      .then((res) => {
        if (res.data.result == 'success') {
          // setDeviceData(res.data.row);
          setmCate('전체');
          listDevice(res.data.row)
          checkedArr.splice(0, checkedArr.length);
          // setmAddCate('층 선택');
          alert('저장성공');
        } else {
          alert('저장실패');
        }

      }).catch(() => { console.log('살패') })
  }

  function device_delete() {

    if (!confirm('삭제 하시겠습니까?')) {
      return false;
    }
    let deviceData = {
      no: deviceSeq,
      type: 'del'
    }

    axios.post('http://127.0.0.1:3001/device', {
      data: deviceData
    })
      .then((res) => {
        if (res.data.result == 'success') {
          // setDeviceData(res.data.row);
          setmCate('전체')
          listDevice(res.data.row)
          alert('삭제성공');
        } else {
          alert('삭제실패');
        }

      }).catch(() => { console.log('살패') })
  }

  function device_edit() {

    if (!confirm('이름 변경 하시겠습니까?')) {
      return false;
    }
    let deviceData = {
      no: deviceSeq,
      name: editDeviceName.current.value,
      type: 'edit',
      select: 'DEVICE_NAME'
    }

    axios.post('http://127.0.0.1:3001/device', {
      data: deviceData
    })
      .then((res) => {
        if (res.data.result == 'success') {
          // setDeviceData(res.data.row);
          setmCate('전체')
          listDevice(res.data.row)
          alert('변경성공');
        } else {
          alert('변경실패');
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
        <Col key={index} className="font-icon-list" lg="2" md="3" sm="4" xs="6">
          <div className="myfont-icon-detail h-75">
            <a href='#' onClick={() => {
              setShowModal(true);
              setDeviceUid(val.DEVICE_UID);
              setDeviceName(val.DEVICE_NAME);
              setDeviceDate(val.REG_DATE);
              setDeviceSeq(val.DEVICE_SEQ)
            }} name='nc-align-left-2'>
              <FontAwesomeIcon icon={dIcon} style={{fontSize:'1.5rem'}}/>
              <p>{val.DEVICE_NAME}</p>
            </a>
            <p align="center"><ControlledSwitches1 state={state} uid={val.DEVICE_SEQ}  name={val.DEVICE_NAME} /></p>
          </div>
        </Col>)
    }

    )
    // console.log(device);

    setDeviceData(device);
  }

  const CheckBoxTest = () => {
    return (
      <div className="cate">
        <input type="checkbox" id="btn1" name="checkWrap" onChange={(e) => changeAllCheck(e)} value="온도" />
        <label htmlFor="btn1">온도</label>
        <input type="checkbox" id="btn2" name="checkWrap" onChange={(e) => changeAllCheck(e)} value="습도" />
        <label htmlFor="btn2">습도</label>
        <input type="checkbox" id="btn3" name="checkWrap" onChange={(e) => changeAllCheck(e)} value="조도" />
        <label htmlFor="btn3">조도</label>
        <input type="checkbox" id="btn4" name="checkWrap" onChange={(e) => changeAllCheck(e)} value="CO2" />
        <label htmlFor="btn4">CO2</label>
      </div>
    )
  }

  const changeAllCheck = (e) => {
    if(e.target.checked){
      checkedArr.push(e.target.value)
    }else{
      for(let i = 0; i < checkedArr.length; i++) {
        if(checkedArr[i] === e.target.value)  {
          checkedArr.splice(i, 1);
          i--;
        }
      }
    }

    // alert(checkedArr)
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  디바이스
                  <Dropdown className="float-right" as={Nav.Item}>
                    <Dropdown.Toggle
                      aria-expanded={false}
                      aria-haspopup={true}
                      as={Nav.Link}
                      data-toggle="dropdown"
                      id="navbarDropdownMenuLink"
                      variant="default"
                      className="m-0  pt-0"
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
                </Card.Title>
              </Card.Header>
              <Card.Body className="all-icons">
                <Row>
                  <Col className="font-icon-list" lg="2" md="3" sm="4" xs="6">
                    <div className="font-icon-detail h-75">
                      <a href='#' onClick={() => setShowAddModal(true)} name='nc-simple-add'>
                        <i className="nc-icon nc-simple-add"></i>
                        <p>디바이스 추가</p>
                      </a>
                    </div>
                  </Col>
                  {deviceData}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>




        <Modal        // 여기부터 추가한 모달 내용
          className="modal modal-primary"
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <hr></hr>
          <Modal.Header className="justify-content-center">
            <div className="modal-profile">
              <i className="nc-icon nc-preferences-circle-rotate"></i>
            </div>
          </Modal.Header>
          <Modal.Body className="text-center">
            <h4>디바이스 관리하기</h4>
          </Modal.Body>
          <hr></hr>
          <div className="modal-footer">
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => {
                Icons_setShowInfo({ ...Icons_showInfo, togle: true });

              }}
            >
              &nbsp;&nbsp;&nbsp;상세정보
            </Button>
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowNameModal(true)}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;이름변경
            </Button>
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => { device_delete(); setShowModal(false) }}
            >
              디바이스 삭제
            </Button>
          </div>
          <hr />
        </Modal>


        <Modal
          className="modal modal-primary"
          show={showNameModal}
          onHide={() => setShowNameModal(false)}
        >
          <Modal.Body className="text-center">
            <h4>디바이스 이름 변경</h4>
            <Form method="post" action='#' onSubmit={handleRename}>
              <Row>
                <Col className="pr-1 m-3">
                  <Form.Group>
                    {/* <label>디바이스 이름</label> */}
                    <Form.Control
                      placeholder="변경할 이름을 입력해주세요."
                      type="text"
                      onChange={getData}
                      ref={editDeviceName}
                    >
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Button
                className="btn-fill float-right m-1"
                type="submit"
                variant="info"
                onClick={() => { device_edit(); setShowNameModal(false) }}
              >
                저장
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal
          className="modal modal-primary"
          size="lg"
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
        >
          <Modal.Body>
            <Card>
              <Card.Header>
                <Card.Title as="h4">디바이스 추가</Card.Title>
              </Card.Header>
              <Card.Body>

                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>디바이스 이름</label>
                      <Form.Control
                        placeholder="Name"
                        type="text"
                        ref={refDeviceName}
                      >
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="6">
                    <Form.Group>
                      <label>시리얼 넘버</label>
                      <Form.Control
                        placeholder="Serial number"
                        type="text"
                        ref={refDeviceNo}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="6">
                    <Form.Group className="pl-2">
                      <label>루틴 활성화 옵션</label><br />
                      <CheckBoxTest />
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="6">
                    <Form.Group className="pl-2">
                      <label>설치 장소</label><br />
                      <Dropdown as={Nav.Item}>
                        <Dropdown.Toggle
                          aria-expanded={false}
                          aria-haspopup={true}
                          as={Nav.Link}
                          data-toggle="dropdown"
                          id="navbarDropdownMenuLink"
                          variant="default"
                          className="m-0  pt-0"
                        >
                          <span className="no-icon">{addCate}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                          <Dropdown.Item
                            href="#pablo"
                            onClick={(e) => {setmAddCate('1층');e.preventDefault() }}
                          >
                            1층
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#pablo"
                            onClick={(e) => {setmAddCate('2층');e.preventDefault() }}
                          >
                            2층
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#pablo"
                            onClick={(e) => {setmAddCate('3층');e.preventDefault() }}
                          >
                            3층
                          </Dropdown.Item>

                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>

                  </Col>

                </Row>
                <Button
                  className="btn-fill float-right" // pull-right는 이제 쓰이지 않으므로 float-right으로 변경
                  type="button"
                  variant="info"
                  onClick={() => device_add()}
                >
                  디바이스 등록
                </Button>
                <div className="clearfix"></div>

              </Card.Body>
            </Card>
          </Modal.Body>
        </Modal>




      </Container>
    </>
  );
}

export default DeviceList;
