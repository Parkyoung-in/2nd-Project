import React from "react";
import { Link } from "react-router-dom";
import ChartistGraph from "react-chartist";

import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

function Info() {
  return(
    <>
      <Container fluid>
        <Row>
          <Col md="7">
            <Card>
              <Card.Header>
                <Card.Title as="h3">디바이스 상세 정보</Card.Title>
              </Card.Header>
              <Card.Body>
                <div>
                  <p></p>
                </div>
                <div className="typography-line">
                  <h4>
                    <span>이름 :</span>
                    디바이스 1
                  </h4>
                </div>
                <div className="typography-line">
                  <h4>
                    <span>UID :</span>
                    123-45678-90
                  </h4>
                </div>
                <div className="typography-line">
                  <h4>
                    <span>시리얼 넘버 :</span>
                    9876543210
                  </h4>
                </div>
                <div className="typography-line">
                  <h4>
                    <span>등록한 날짜 :</span>
                    ;;
                  </h4>
                </div>
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
                          placeholder="SerialNum"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>내 설명</label>
                        <Form.Control
                          cols="80"
                          defaultValue="디바이스 추가 모달창에서 등록하면서 적어둔 설명이 여기로 오도록?"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Link to='/admin/icons'>
                    <Button
                      className="btn-fill float-right"
                      type="submit"
                      variant="link"
                    >
                      뒤로가기
                    </Button>
                  </Link>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="5">
            <Card>
              <Card.Header>
                <Card.Title as="h4">전력사용 그래프??</Card.Title>
                <p className="card-category">안되면안넣고</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      series: [
                        [
                          542,
                          443,
                          320,
                          780,
                          553,
                          453,
                          326,
                          434,
                          568,
                          610,
                          756,
                          895,
                        ],
                        [
                          412,
                          243,
                          280,
                          580,
                          453,
                          353,
                          300,
                          364,
                          368,
                          410,
                          636,
                          695,
                        ],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Tesla Model S <i className="fas fa-circle text-danger"></i>
                  BMW 5 Series
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Info;