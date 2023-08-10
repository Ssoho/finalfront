import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { useState } from "react";
import axios from "axios";
import Searchresult from "./Searchresult";
import "./../App.css";

const Top = ({ currentUser, showModeratorBoard, showAdminBoard, logOut, setSearchResults }) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };

    const handleSearchClick = async (event) => {
        event.preventDefault();
        try{
        const encodedInputValue = encodeURIComponent(inputValue);
        const response1 = await axios.get(`http://localhost:8080/api/search/song?keyword=${encodedInputValue}`);
        const response2 = await axios.get(`http://localhost:8080/api/search/artist?keyword=${encodedInputValue}`);
        const response3 = await axios.get(`http://localhost:8080/api/search/lyric?keyword=${encodedInputValue}`);
        const resultdata1 = typeof response1.data === 'string' ? JSON.parse(response1.data) : response1.data;
        const resultdata2 = typeof response1.data === 'string' ? JSON.parse(response2.data) : response2.data;
        const resultdata3 = typeof response1.data === 'string' ? JSON.parse(response3.data) : response3.data;        

        setSearchResults({
            resultdata1: resultdata1,
            resultdata2: resultdata2,
            resultdata3: resultdata3
          });
    
          navigate("/searchresult");

        }
        catch(e){
            console.log(e)
        }
    };

  return (
    <Nav style={{ marginBottom : '30px' }}>
      <div className="navbar" style={{ display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={handleSearchClick} style={{ display: 'flex', alignItems: 'center' }}>
            <Link to={"/"}>
            <img src="watermelon_logo.jpg" alt="Watermelon" style={{ width: '250px', height: 'auto', margin: '10px', cursor : 'pointer' }}/>
            </Link>
            <div className='search-background' style={{ display: 'flex', alignItems: 'center' }}>
            <button
        className="btn btn-success" type="submit"
        style={{
        background: `url('search.png') no-repeat center`,
        backgroundSize: 'cover',
        width: '20px',
        height: '20px',
        margin: '10px',
        display: 'flex',
        alignItems: 'center',
        border: 'none', // 테두리 제거
        outline: 'none', // 클릭 시 포커스 테두리 제거    
        justifyContent: 'center',
        }}
        
        />
        <input className="search-input" type="text" placeholder="검색어를 입력해주세요"
        value={inputValue}
        onChange={handleInputChange}        
        />

            {showModeratorBoard && (
                <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                    Moderator Board
                </Link>
                </li>
            )}

            {showAdminBoard && (
                <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                    Admin Board
                </Link>
                </li>
            )}
            </div>

            {/* {currentUser && (
                <li className='navbarMenu'>
                <Link to={"/profile"}  style={{ color: "white" }} className="nav-link">
                    {currentUser.username}님의 마이페이지
                </Link>
                </li>
            )} */}
            

            {currentUser ? (
            <div>

                <li className='navbarMenu' style={{ display: 'flex', flexDirection: 'row', marginRight: '10px' }}>
                <Link to={"/profile"}  style={{ color: "white" }} className="nav-link">
                    {currentUser.username}님의 마이페이지
                </Link>

                <a href="/" style={{ color: "white" }} className="nav-link" onClick={logOut}>
                    로그아웃
                </a>
                </li>
            </div>
            ) : (
            <div>
                <li className='navbarMenu' style={{ display: 'flex', flexDirection: 'row', marginRight: '10px' }}>
                <Link to={"/login"} style={{ color: "white" }} className="nav-link">
                    로그인
                </Link>

                <Link to={"/register"} style={{ color: "white" }} className="nav-link">
                    회원가입
                </Link>
                </li>
            </div>
            )}
            </form>

        {/* <AuthVerify logOut={this.logOut}/> */}
        </div>
    </Nav>
  );
};

export default Top;
