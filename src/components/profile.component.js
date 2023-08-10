import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import axios from 'axios';

function Profile({ logOut }) {
  const navigate = useNavigate();
  const [userReady, setUserReady] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: "" });

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      navigate("/home");
    } else {
      setCurrentUser(currentUser);
      setUserReady(true);
    }
  }, [navigate]);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const id = userReady ? JSON.parse(localStorage.getItem('user')).id : null;

  const handleDeleteClick = () => {
    if (id) {
      axios.delete(`http://localhost:8080/api/user/delete/${id}`, axiosConfig)
        .then((response) => {
          AuthService.logout();
          setCurrentUser(undefined);          
          console.log(response);
          console.log("User information has been successfully deleted.");
          logOut();
          navigate("/home");
        })
        .catch((error) => {
          console.error("An error occurred while deleting user information.", error);
        });
    }
  };  

  const handleUpdateClick = () => {
    // 예제로 회원정보 변경 페이지로 이동하도록 설정
    // setRedirect("/"); 
  };

  // if (redirect) {
  //   return <Navigate to={redirect} />;
  // }

  if (!userReady) {
    // Render a loading state while waiting for the user data to be ready
    return <div>Loading...</div>;
  }
  
  // If there's no current user, we have already navigated to /home in useEffect.
  // So we don't need to render anything else here.
  if (!currentUser) {
    return null;
  }  

  return (
    <div className="container" style={{ margin: "20px", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
      {userReady ? (
        <div>
          <header className="jumbotron">
            <div style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "40px", width: "600px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <img
                    src={currentUser.profileImage || "//ssl.gstatic.com/accounts/ui/avatar_2x.png"}
                    alt="profile-img"
                    className="profile-img-card"
                  />
                </div>
                <div>
                  <h4>{currentUser.username}님 환영합니다!</h4>
                  <p style={{ marginLeft : "10px", color: "gray" }}>{" "}
                    {currentUser.email}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {/* <button className="btn btn-profileg" onClick={handleUpdateClick}>
                      회원정보 변경
                    </button> */}
                    <button className="btn btn-profiler" onClick={handleDeleteClick}>회원정보 탈퇴</button>
                  </div>
                </div>
              </div>
              <div style={{ margin: "10px 0" }}>
                <hr style={{ border: "1px solid #ccc", width: "100%" }} />
              </div>
              <div>
                <p>회원님은<strong> 일반</strong> 유저입니다.</p>
              </div>
            </div>
          </header>
          {/* <p>
            <strong>Token:</strong>{" "}
            {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
          </p>
          <p>
            <strong>Id:</strong>{" "}
            {currentUser.id}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul> */}
        </div>
      ) : null}
    </div>
    </div>
  );
}

export default Profile;