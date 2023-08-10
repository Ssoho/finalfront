import React, { useState, useEffect } from "react";
import {Nav} from 'react-bootstrap';
import UserService from "../services/user.service";
import Melresult from './Melresult';
import DCNresult from './DCNresult';
import Songresult from "./Songresult";
import Info from "./Info";
import "./home.css";

const Home = () => {
  const [content, setContent] = useState("");
  const [tab, setTab] = useState(0);

  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        setContent(
          (error.response && error.response.data) ||
            error.message ||
            error.toString()
        );
      }
    );
  }, []);

  return (
    <div>
    
      {userId ?  (    
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div className = "navbar1" style={{ display: 'flex', justifyContent: 'center' }}>
    <Nav className = "nav-tab1" variant="tabs" defaultActiveKey="link0">
    <Nav.Item>
      <Nav.Link onClick={() => { setTab(0) }} eventKey="link1" className={tab === 0 ? "nav-link1 active" : "nav-link1"} >노래가사로 추천</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={() => { setTab(1) }} eventKey="link2"className={tab === 1 ? "nav-link1 active" : "nav-link1"} >노래파형으로 추천</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={() => { setTab(2) }} eventKey="link3" className={tab === 2 ? "nav-link1 active" : "nav-link1"} >사이트 이용패턴으로 추천</Nav.Link>
    </Nav.Item>
  </Nav>
  </div>
  </div>
        ):(
          <Info />
      )}

      {userId && tab === 0 && <Songresult userId={userId} />}
      {userId && tab === 1 && <Melresult userId={userId} />}
      {userId && tab === 2 && <DCNresult userId={userId} />}





    </div>
  );
};

export default Home;