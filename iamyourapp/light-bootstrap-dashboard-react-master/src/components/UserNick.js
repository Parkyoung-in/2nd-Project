import React, {useRef,useState } from "react";
import { 
  MDBBadge, 
  MDBListGroup, 
  MDBListGroupItem,
  MDBCol,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBBtn,
  MDBInput  
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
  Col
} from "react-bootstrap";
;
import { useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import axios from "axios";
function UserNick() {
  // 영인
  const refNick = useRef();
  const userNick = useSelector((state)=>(state.loginNick))
  const [newNick, setNewNick] = useState(userNick);
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector((state)=>(state.loginId))
  function editNick() {
    const nick = refNick.current.value
    const type = 'USER_NICK'
    const userData = {
      nick: nick,
      type: type,
      id:userId,
      img : ''
    }
    console.log(userData)
    if(nick) {
      axios.post('http://localhost:3001/user', userData)
      .then((res) => {
        // console.log(res.data.result)
        if (res.data.result == "변경성공") {
          console.log(res.data.data)
          dispatch({type:'editnick', newNick:res.data.data}) //여기 바꿔야됨
          setNewNick(res.data.data)
          history.push('/admin/mypage');
          
        } else if (res.data.result == "변경실패") {
          console.log('수정실패')
        }
      })
      .catch((res) => {
        console.log(res.data.result)
      })
    }

  }
  //
  return (
    <>
        <div className="NickName" >
            <MDBInput wrapperClass='mb-4' readOnly id='BeforeNick' value={newNick} label='기존 닉네임'  />
            <MDBInput wrapperClass='mb-4' id='AfterNick' label='변경 닉네임' inputRef={refNick} />
            <div className="d-grid gap-2">
            <MDBBtn onClick={editNick}>변경</MDBBtn>
            </div>
        </div>
    </>
  );
}

export default UserNick;