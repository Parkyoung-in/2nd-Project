import React from "react";
import ChartistGraph from "react-chartist";

import {
  Button,
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";

import _, { showInfo as Icons_showInfo, setShowInfo as Icons_setShowInfo } from "./Device.js";

function DeviceInfo(props) {
  return (
    <>
      <Container fluid>
        <Col lg="8">
          <Card>
            <Card.Header>
              <Card.Title as="h3">디바이스 상세 정보</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md='12' className="p-4">
                  <div className="typography-line">
                    <h4>
                      <span>이름 :</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.name}
                    </h4>
                  </div>
                  <div className="typography-line">
                    <h4>
                      <span>시리얼 넘버 :</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.uid}
                    </h4>
                  </div>
                  <div className="typography-line">
                    <h4>
                      <span>등록한 날짜 :</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.date}
                    </h4>
                  </div>

                  <div className="clearfix"></div>
                </Col>

              </Row>
            </Card.Body>
            <Card.Footer>
              <Button
                className="btn-fill float-right" // pull-right는 이제 쓰이지 않으므로 float-right으로 변경
                type="submit"
                variant="info"
                onClick={() => Icons_setShowInfo({ ...Icons_showInfo, togle: false })}
              >
                뒤로가기
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Container>
    </>
  )
}

export default DeviceInfo;