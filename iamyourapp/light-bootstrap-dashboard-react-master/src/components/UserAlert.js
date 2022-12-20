import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Switch from '@mui/material/Switch';

import {
  MDBBadge,
  MDBListGroup,
  MDBListGroupItem,
  MDBCol,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink
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

import ControlledSwitches from "./Switch";

function UserAlert() {
  const [checked, setChecked] = React.useState(true);
  const [push, setPush] = React.useState(true);
  const [routine, setRoutine] = React.useState(true);
  const [device, setDevice] = React.useState(true);
  const [issue, setIssue] = React.useState(true);

  const handleChange = (event) => {
    console.log(event.target.checked);
    setChecked(event.target.checked);
  };

  return (
    <>
      <MDBListGroup style={{ minWidth: '11rem' }} light>
        <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <div className='ms-3'>
              <p className='fw-bold mb-1'>메시지 알림</p>
            </div>
          </div>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />

        </MDBListGroupItem>
        {checked ?
        <>
            <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                <div className='ms-3'>
                  <p className='mb-1'>루틴</p>
                </div>
              </div>
              <Switch
                checked={routine}
                onChange={(e) => {console.log(e) ; setRoutine(e.target.checked)}}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </MDBListGroupItem>
            <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                <div className='ms-3'>
                  <p className='mb-1'>디바이스</p>
                </div>
              </div>
              <Switch
                checked={device}
                onChange={(e) => {console.log(e) ; setDevice(e.target.checked)}}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </MDBListGroupItem>
            <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                <div className='ms-3'>
                  <p className='mb-1'>특이사항</p>
                </div>
              </div>
              <Switch
                checked={issue}
                onChange={(e) => {console.log(e) ; setIssue(e.target.checked)}}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </MDBListGroupItem>
            </>
          : <></>}
      </MDBListGroup>

    </>
  );
}

export default UserAlert;