import React from "react";
import ControlledSwitches from "../components/Switch.js";
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
} from "react-bootstrap";
import { useLocation, NavLink } from "react-router-dom";
import { useHistory } from "react-router";

function TableList() {
  const history = useHistory();
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">
                  루틴 리스트
                  <Button
                  className="btn-fill pull-right ml-3"
                  type="button"
                  variant="info"
                  style={{
                    lineHeight:1.2,
                    background:'#FFBB00'
                  }}
                  onClick={()=>history.push('/admin/info')}
                >
                  루틴 생성
                </Button>
                </Card.Title>
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <NavLink to="/admin/info">사장실 루틴 </NavLink>
                      </td>
                      <td>오전 9:00</td>
                      <td>에어컨,가습기</td>
                      <td>오후 7:00</td>
                      <td>월,화,수,목,금</td>
                      <td>
                        <ControlledSwitches />
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <NavLink to="/admin/info">사무실 루틴 </NavLink>
                      </td>
                      <td>오전 9:00</td>
                      <td>에어컨,가습기,스마트조명,스마트블라인드</td>
                      <td>오후 7:00</td>
                      <td>월,화,수,목,금</td>
                      <td>
                        <ControlledSwitches />
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        <NavLink to="/admin/info">휴게실 루틴 </NavLink>
                      </td>
                      <td>오전 9:00</td>
                      <td>에어컨,가습기,스마트조명,냉장고</td>
                      <td>오후 7:00</td>
                      <td>월,화,수,목,금</td>
                      <td>
                        <ControlledSwitches />
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>
                        <NavLink to="/admin/info">회의실 루틴 </NavLink>
                      </td>
                      <td>오전 9:00</td>
                      <td>에어컨,가습기,스마트조명,TV</td>
                      <td>오후 7:00</td>
                      <td>월,화,수,목,금</td>
                      <td>
                        <ControlledSwitches />
                      </td>
                    </tr>
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

export default TableList;
