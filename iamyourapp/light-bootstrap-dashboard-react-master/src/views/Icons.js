import React from "react";

// 추가
import { Link } from "react-router-dom";
import ControlledSwitches from "../components/Switch.js";
import IconInfoRoute from "views/Info";

// 이 2개는 스위치용으로 만들었다가 이제 안 쓰는데 혹시 몰라서 넣어둠
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// demo.css 60번째줄에 클래스 새로 만들어서 css 내용 추가함

// react-bootstrap components
import {
  Badge,
  Button, // 버튼 활성화
  Card,
  Modal, // 모달 추가, 맨 아래에 코드 추가
  Form, // 폼 추가
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Icons() {
  // 추가
  const [showModal, setShowModal] = React.useState(false);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showNameModal, setShowNameModal] = React.useState(false);
  const [inputData, setInputData] = React.useState("디바이스 1");
  const handleRename = (event) => {
    event.preventDefault();
  };

  let data = "";

  function getData(e) {
    data = e.target.value;
  }
  function chData() {
    setInputData(data);
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Device</Card.Title>
              </Card.Header>
              <Card.Body className="all-icons">
                <Row>
                  <Col className="font-icon-list" lg="2" md="3" sm="4" xs="6">
                    <div className="myfont-icon-detail">
                      <i className="nc-icon nc-air-baloon"></i>
                      <p>nc-air-baloon</p>
                      <p align="center">
                        <ControlledSwitches />
                      </p>
                    </div>
                  </Col>
                  <Col className="font-icon-list" lg="2" md="3" sm="4" xs="6">
                    <div className="myfont-icon-detail">
                      <i className="nc-icon nc-album-2"></i>
                      <p>nc-album-2</p>
                      <p align="center">
                        <ControlledSwitches />
                      </p>
                    </div>
                  </Col>
                  <Col className="font-icon-list" lg="2" md="3" sm="4" xs="6">
                    <div className="myfont-icon-detail">
                      <i className="nc-icon nc-alien-33"></i>
                      <p>nc-alien-33</p>
                      <p align="center">
                        <ControlledSwitches />
                      </p>
                    </div>
                  </Col>
                  <Col className="font-icon-list" lg="2" md="3" sm="4" xs="6">
                    <div className="myfont-icon-detail">
                      <i className="nc-icon nc-align-center"></i>
                      <p>nc-align-center</p>
                      <p align="center">
                        <ControlledSwitches />
                      </p>
                    </div>
                  </Col>
                  <Col className="font-icon-list" lg="2" md="3" sm="4" xs="6">
                    <div className="myfont-icon-detail">
                      <a
                        href="#"
                        onClick={() => setShowModal(true)}
                        name="nc-align-left-2"
                      >
                        <i className="nc-icon nc-align-left-2"></i>
                        <p>{inputData}</p>
                      </a>
                      <p align="center">
                        <ControlledSwitches />
                      </p>
                    </div>
                  </Col>
                  <Col className="font-icon-list" lg="2" md="3" sm="4" xs="6">
                    <div className="font-icon-detail">
                      <a
                        href="#"
                        onClick={() => setShowAddModal(true)}
                        name="nc-simple-add"
                      >
                        <i className="nc-icon nc-simple-add"></i>
                        <p>디바이스 추가</p>
                      </a>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal // 여기부터 추가한 모달 내용
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
            <Link to="/info">
              <Button
                className="btn-simple"
                type="button"
                variant="link"
                onClick={() => setShowModal(false)}
              >
                상세정보
              </Button>
            </Link>
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowNameModal(true)}
            >
              이름변경
            </Button>
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowModal(false)}
            >
              기기삭제
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
            <Card>
              <Card.Header>
                <Card.Title as="h4">디바이스 이름 변경</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form method="post" action="#" onSubmit={handleRename}>
                  <Row>
                    <Col className="pr-1">
                      <Form.Group>
                        {/* <label>디바이스 이름</label> */}
                        <Form.Control
                          placeholder="변경할 이름을 입력해주세요."
                          type="text"
                          onChange={getData}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill float-right m-1"
                    type="submit"
                    variant="info"
                    onClick={chData}
                  >
                    저장
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
        </Modal>

        <Modal
          className="modal modal-primary"
          size="lg"
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
        >
          {/*           <Modal.Header>
          <Modal.Header className="justify-content-center">   글자 중앙정렬이 좋을 것 같으면 이걸로       
            <h4>디바이스 추가</h4>
          </Modal.Header> */}
          <Modal.Body>
            <Card>
              <Card.Header>
                <Card.Title as="h4">디바이스 추가</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>디바이스 이름</label>
                        <Form.Control
                          placeholder="Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>시리얼 넘버</label>
                        <Form.Control
                          placeholder="Serial number"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About</label>
                        <Form.Control
                          cols="80"
                          placeholder="설명 추가"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill float-right" // pull-right는 이제 쓰이지 않으므로 float-right으로 변경
                    type="submit"
                    variant="info"
                  >
                    기기 등록
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default Icons;
