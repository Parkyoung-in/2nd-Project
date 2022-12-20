import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
import { useState,Component,useRef,useEffect } from "react";
// react-bootstrap components
import {
  Alert,
  Badge,
  Button,
  Card,
  Modal,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
function Notifications() {
  console.log('alert');
    useEffect(()=>{
      // notify("tc");
        // setInterval(function() {
        // notify("tc");
        // }, 10000);
    },[])
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const notificationAlertRef = useRef(null);
    const notify = (place) => {
      console.log('1');
      const alertText = ['작년도 대비 전력사용량이 20% 증가하였습니다.','오후 9시이후 실내 전등을 모두 소등하였습니다.',
      '어제 대비 전력량이 4%증가하였습니다.','실내온도가 어제와 달리 2도 높습니다.','에어컨 자동가동 시작합니다.','가습기 자동가동 시작합니다.',
      '실내공기 이산화탄소 증가로인해 환풍기 가동시작합니다.','실내 습도가 낮으므로 가습기 가동시작합니다.'                  
      ];
      var color = Math.floor(Math.random() * 5 +1);
      let rcnt = Math.floor(Math.random()*alertText.length);
      var type;
      let list = ["<tr><td>● </td><td>"+alertText[rcnt]+"</td><td></td></tr>"];
      // ualertText.push(list);
      // setAlertCnt(rcnt);
      // setAlertText(list);

      dispatch({type:'alertCount'});
      dispatch({type:'addReport',addText:list});
      switch (color) {
        case 1:
          type = "primary";
          break;
        case 2:
          type = "success";
          break;
        case 3:
          type = "danger";
          break;
        case 4:
          type = "warning";
          break;
        case 5:
          type = "info";
          break;
        default:
          break;
      }
      var options = {};
      options = {
        place: place,
        message: (
          <div>
            <div>
              {alertText[rcnt]}
            </div>
          </div>
        ),
        type: type,
        icon: "nc-icon nc-bell-55",
        autoDismiss: 7,
      };
      notificationAlertRef.current.notificationAlert(options);
    };


    return (
      <>
        <div className="rna-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
      </>
    );
  }

export default Notifications;