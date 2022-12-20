import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
  from 'mdb-react-ui-kit';
import axios from 'axios';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';


function Join() {
  const refId = useRef();
  const refPw = useRef();
  const refName = useRef();
  const refNick = useRef();
  const refHp = useRef();
  const [idError, setIdError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [nickError, setNickError] = useState(false);
  const [hpError, setHpError] = useState(false);
 
  function sendJoin() {

    const id = refId.current.value;
    const pw = refPw.current.value;
    const name = refName.current.value;
    const nick = refNick.current.value;
    const hp = refHp.current.value;
    const userData = {
      id,
      pw,
      name,
      nick,
      hp
    };
    if (id == '') {
      setIdError(true);
    } else {
      setIdError(false);
    }

    if (pw == '') {
      setPwError(true);
    } else {
      setPwError(false);
    }

    if (name == '') {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (nick == '') {
      setNickError(true);
    } else {
      setNickError(false);
    }

    if (hp == '') {
      setHpError(true);
    } else {
      setHpError(false)
    }

    if (id && pw && name && nick && hp) {
      axios.post('http://localhost:3001/join', userData)
        .then((res) => {
          console.log(res.data)
          if (res.data == "가입성공") {
            window.location.href = '/login';
          } 
        })
        .catch((res) => {
          console.log(res.data)
          if (res.data == "가입실패") {

          }
        })
    }
  }

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Smart Office Solution <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>CUBE Office</span>
          </h1>

          <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
          스마트 오피스 솔루션 CUBE Office 입니다.
          </p>

        </MDBCol>

        <MDBCol md='6' className='position-relative'>

          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <h4 className='login-info mb-5'>회원가입</h4>

              <MDBInput wrapperClass='mb-2' label='아이디' lab id='form1' type='ID' inputRef={refId} name='id' />
              {idError ? <h6 Class='mb-3' style={{color:"red"}}>&nbsp;아이디를 입력하세요</h6> : <br></br>}

              <MDBInput wrapperClass='mb-2' label='비밀번호' id='form2' type='password' inputRef={refPw} name='pw' />
              {pwError ? <h6 Class='mb-3' style={{color:"red"}}>&nbsp;비밀번호를 입력하세요</h6> : <br></br>}

              <MDBInput wrapperClass='mb-2' label='이름' id='form3' type='name' inputRef={refName} name='name' />
              {nameError ? <h6 Class='mb-3' style={{color:"red"}}>&nbsp;이름을 입력하세요</h6> : <br></br>}

              <MDBInput wrapperClass='mb-2' label='닉네임' id='form4' type='nickname' inputRef={refNick} name='nick' />
              {nickError ? <h6 Class='mb-3' style={{color:"red"}}>&nbsp;닉네임을 입력하세요</h6> : <br></br>}

              <MDBInput wrapperClass='mb-2' label='휴대폰번호' id='form5' type='hp' inputRef={refHp} name='hp' />
              {hpError ? <h6 Class='mb-5' style={{color:"red"}}>&nbsp;휴대폰번호를 입력하세요</h6> : <br></br>}

              <MDBBtn onClick={sendJoin} className='w-100 mb-4' size='lg'>회원가입</MDBBtn>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>

  );
}

export default Join;