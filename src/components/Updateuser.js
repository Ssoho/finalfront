import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 서버와의 HTTP 통신을 위해 axios 사용

function UpdateUser({ currentUser, closeModal }) {
     // 사용자 정보 변경을 위한 상태 변수들
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
    
// 사용자 정보 변경 함수
  const updateUser = () => {
    // 변경된 정보를 담는 객체 생성
    const updatedInfo = {
      password: password,
      email: email,
      profileImage: profileImage,
    };

    axios.post("/api/updateuser", updatedInfo)
      .then((response) => {
        console.log("사용자 정보 업데이트 성공!");
        closeModal();
      })
      .catch((error) => {
        console.error("사용자 정보 업데이트 실패: ", error);
      });
  };

  return (
  
    <div className="modal" >
      <input
        type="password"
        placeholder="새 비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProfileImage(e.target.files[0])}
      />
      <button onClick={updateUser}>저장</button>
      <button onClick={closeModal}>취소</button>
    </div>
  );
}

export default UpdateUser;