import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Top from './components/Top';
import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import { Nav } from 'react-bootstrap';

import EventBus from "./common/EventBus";
import Signrecommend from "./components/Signrecommend";
import Player from "./components/Player";
import Updateuser from "./components/Updateuser";
import Searchresult from "./components/Searchresult";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const location = useLocation();  
  const [showTop, setShowTop] = useState(true);  
  const [searchResults, setSearchResults] = useState({
    resultdata1: [],
    resultdata2: [],
    resultdata3: []
  });

  const navigate = useNavigate();

  const updateShowTop = (shouldShow) => {
    setShowTop(shouldShow);
  };  

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    const logoutEvent = () => {
      logOut();
    };

    EventBus.on("logout", logoutEvent);

    return () => {
      EventBus.remove("logout", logoutEvent);
    };
  }, []);

  useEffect(() => {
    const isHidden = ["/login", "/register", "/signrecommend"].includes(location.pathname);
    setShowTop(!isHidden);
  }, [location]);  

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);

    navigate('/home');
  };

  return (
    <>
    
      {showTop && (
        <Top setSearchResults={setSearchResults}
          currentUser={currentUser}
          showModeratorBoard={showModeratorBoard}
          showAdminBoard={showAdminBoard}
          logOut={logOut}
        />
      )}

      <div className="container mt-3">
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile logOut = {logOut} />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/signrecommend" element={<Signrecommend />} />
            <Route path="/player" element={<Player />} />
            <Route path="/updateuser" element={<Updateuser />} />
            <Route path="/searchresult" element={<Searchresult searchResults={searchResults} />} />
      </Routes>
      </div>
    </>
  );
}; 
export default App;