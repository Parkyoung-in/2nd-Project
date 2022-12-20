import React, { useState } from "react";
import {
  MDBBadge,
  MDBListGroup,
  MDBListGroupItem,
  MDBCol,
  MDBRow,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
 } from 'mdb-react-ui-kit';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import UserImage from "components/UserImage";
import UserNick from "components/UserNick";
import UserAlert from "components/UserAlert";
import {useSelector} from 'react-redux';
import { useEffect } from "react";
function User() {
  const [justifyActive, setJustifyActive] = useState('tab1');
  const userId = useSelector((state)=>(state.loginId))
  const userNick = useSelector((state)=>(state.loginNick))
  const userImage = useSelector((state)=>(state.loginImage))
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };
  // useEffect(()=>{
  //   console.log('userNick:',userNick)
  // },[userNick])
  return (
    <>
    {/* 유저 이름 카드 */}
    <div id="profile">
      <Container fluid>
        <Row>
        <Col id="profilecardF" md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={"https://cdn.pixabay.com/photo/2017/03/15/13/27/rough-horn-2146181_960_720.jpg"}
                ></img>
              </div>
              <Card.Body className="profileCard">
                <div className="author">
                  {/* <a href="#pablo" onClick={(e) => e.preventDefault()}> */}
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/"+userImage+"")}
                    ></img>
                    <h5 className="title">{userNick}</h5>
                  {/* </a> */}
                  <p className="description">{userId}</p>
                </div>
                {/* 프로필 내용 추가 가능 */}
                {/* <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p> */}
              </Card.Body>
            </Card>
          </Col>
      {/* 설정 카드 */}
          <Col id="profilecardS" md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4" className="profileHeader">설정</Card.Title>
              </Card.Header>
              <Card.Body>
              <MDBTabs justify className='mb-3'>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                    사진
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                    닉네임
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleJustifyClick('tab3')} active={justifyActive === 'tab3'}>
                    알림
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>
              <MDBTabsContent>
                <MDBTabsPane show={justifyActive === 'tab1'}>
                  <UserImage></UserImage>
                </MDBTabsPane>
                <MDBTabsPane show={justifyActive === 'tab2'}>
                  <UserNick></UserNick>
                </MDBTabsPane>
                <MDBTabsPane show={justifyActive === 'tab3'}>
                  <UserAlert></UserAlert>
                </MDBTabsPane>
              </MDBTabsContent>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
}
export default User;