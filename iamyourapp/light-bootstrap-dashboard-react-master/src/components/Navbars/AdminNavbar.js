/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component, useState, useRef, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import { faCloud, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector,useDispatch } from "react-redux";
import routes from "routes.js";

function Header() {
  useEffect(() => {

    winter();
  }, []);
  const dispatch = useDispatch();
  const alertCount = useSelector((state) => (state.alertCount));
  const addList = useSelector((state) => (state.addReport));
  const [id, setId] = useState('Logout');
  const [temp, setTemp] = useState('0');
  const [hum, setHum] = useState('0');
  const location = useLocation();
  function winter() {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=Gwangju&appid=c43b8b477c2f0c0412ba3e3e043024ec&units=metric&lang=kr'
    fetch(url)
      .then(res => res.json())
      .then((out) => {
        setTemp(out['main']['temp']);
        setHum(out['main']['humidity']);
        console.log('Checkout this JSON! ', out);
      })
      .catch(err => { throw err });

  }

  useEffect(() => {
    AddHtml();
  }, [addList])

  const AddHtml = () => {
    // console.log('addHtml'+addList);
    const arrtext = addList.substr(1).split(",");
    let html = "";
    for (let i = 0; i < arrtext.length; i++) {
      html += arrtext[i];
      // console.log('html'+html);
    }
    return (
      <>
        <Dropdown.Item
          href="#pablo"
          onClick={(e) => e.preventDefault()}
          dangerouslySetInnerHTML={{ __html: html }}
        >
        
        </Dropdown.Item>
        {/* <tbody dangerouslySetInnerHTML={{ __html: html }}></tbody> */}
      </>
    );
  };

  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            {/* <Nav.Item>
              <Nav.Link
                data-toggle="dropdown"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                className="m-0"
              >
                <i className="nc-icon nc-palette"></i>
                <span className="d-lg-none ml-1">Dashboard</span>
              </Nav.Link>
            </Nav.Item> */}
            <Dropdown as={Nav.Item}  onClick={()=>dispatch({type:'alertCountRe'})}>
              <Dropdown.Toggle
                as={Nav.Link}
                data-toggle="dropdown"
                id="dropdown-67443507"
                variant="default"
                className="m-0"
              >
                <FontAwesomeIcon icon={faBell} style={
                  {
                    marginTop: '7',
                    fontSize: '20'
                  }
                }></FontAwesomeIcon>
                <span className="notification">{alertCount}</span>
                <span className="d-lg-none ml-1">Notification</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
             
                <AddHtml/>
              </Dropdown.Menu>
            </Dropdown>
            {/* <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="nc-icon nc-zoom-split"></i>
                <span className="d-lg-block"> Search</span>
              </Nav.Link>
            </Nav.Item> */}
          </Nav>
          <Nav className="ml-auto" navbar>
            {/* <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="no-icon">Account</span>
              </Nav.Link>
            </Nav.Item>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                aria-expanded={false}
                aria-haspopup={true}
                as={Nav.Link}
                data-toggle="dropdown"
                id="navbarDropdownMenuLink"
                variant="default"
                className="m-0"
              >
                <span className="no-icon">Dropdown</span>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Action
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Another action
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Something
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Something else here
                </Dropdown.Item>
                <div className="divider"></div>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Separated link
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
            <Nav.Item>
              <Nav.Link className="m-0">
                <i className="nc-icon nc-explore-2"></i>
                <span className="pl-1">{temp} ℃</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="m-0">
                <FontAwesomeIcon icon={faCloud} style={
                  {
                    marginTop: '10'
                  }
                }></FontAwesomeIcon>
                <span className="pl-1">{hum} %</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <NavLink to={'/login'}><span className="no-icon">{id}</span></NavLink>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
