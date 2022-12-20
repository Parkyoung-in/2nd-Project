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
  MDBIcon,
  MDBBreadcrumb,
  MDBBreadcrumbItem
}
  from 'mdb-react-ui-kit';
import axios from 'axios';
import { useRef, useState } from 'react';
import { Link ,NavLink,useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';

function Login() {
  const refId = useRef();
  const refPw = useRef();
  const [idError, setIdError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [logError, setLogError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      sendLogin(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
  // 인풋에 적용할 Enter 키 입력 함수
  function sendLogin() {
    const id = refId.current.value
    const pw = refPw.current.value
    const userData = {
      id,
      pw
    };

    
    if (id && pw == '') {
      setLogError(true);
    } else {
      setLogError(false);
    }

    if (id == '') {
      setIdError(true);
      setLogError(false);
    } else {
      setIdError(false);
    }

    if (pw == '') {
      setPwError(true);
      setLogError(false);
    } else {
      setPwError(false);
    }

    if (id && pw) {
      axios.post('http://localhost:3001/login', userData)
        .then((res) => {
          console.log(res.data.result)
          if (res.data.result == "로그인성공") {
            // //영인
            dispatch({type:'login',loginId:res.data.userId,loginNick:res.data.userNick,loginImage:res.data.userImage})
            // console.log(res.data.userId+'로그인아이디11')
            // //
            // window.location.href = '/admin/dashboard';
            history.push('/admin/monitoring');
          } else if (res.data.result == "로그인실패") {
            setLogError(true);
            console.log('aaa')
            
          }
        })
        .catch((res) => {
          console.log(res.data.result)

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
                <h4 className='login-info mb-3'>안녕하세요👋</h4>
                <h6 className="font-weight-light mb-5">로그인 후 이용가능합니다.</h6>


                <MDBInput wrapperClass='mb-2' label='아이디' id='form3' type='ID' inputRef={refId} />
                {idError ? <h6 Class='mb-3' style={{color:"red"}}>&nbsp;ID를 입력하세요</h6> : <br></br>}
                <MDBInput wrapperClass='mb-2' label='비밀번호' id='form4' type='password' inputRef={refPw} onKeyPress={handleOnKeyPress} // Enter 입력 이벤트 함수
                />
                {pwError ? <h6 Class='mb' style={{color:"red"}}>&nbsp;비밀번호를 입력하세요</h6> : <br></br>}

                {logError ? <h6 Class='mb-3' style={{color:"red"}}>&nbsp;아이디 또는 비밀번호를 잘못 입력했습니다.</h6> : <br></br>}
                <MDBBtn className='w-100 mb-4' onClick={sendLogin} size='lg'>로그인</MDBBtn>

                <div className="text-center mt-4 font-weight-light">
                  <h6>계정이 없으신가요? &nbsp;<Link to="/join">회원가입</Link></h6>
                </div>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>

        </MDBRow>

      </MDBContainer>
    );
  }


export default Login;