import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { withRouter } from '../common/with-router';

import AuthService from "../services/auth.service";


// 210번째 줄에 style={{ fontSize: '14px' }} 추가

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert" style={{ fontSize: '14px' }}>
        필수 입력란입니다!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert" style={{ fontSize: '14px' }}>
        유효한 이메일이 아닙니다.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 15) {
    return (
      <div className="alert alert-danger" role="alert" style={{ fontSize: '14px' }}>
        아이디는 3~15자 사이여야 합니다.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert" style={{ fontSize: '14px' }}>
        비밀번호는 6~20자 사이여야 합니다.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  async handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      try {
        await AuthService.register(
          this.state.username,
          this.state.email,
          this.state.password
        );

         // 회원가입 성공 시에 로그인 처리를 위해 handleLogin 메서드 호출
         await this.handleLogin(this.state.username, this.state.password);
      } catch (error) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

          this.setState({
            successful: false,
            message: resMessage
      });
    }
  }  
}

async handleLogin(username, password) {
  try {
    const response = await AuthService.login(username, password);
    this.props.router.navigate("/signrecommend");
    window.location.reload();
  } catch (error) {
    console.error("Login error:", error);
    // 로그인 실패 시에 에러 처리
    this.setState({
      successful: false,
      message: "로그인에 실패했습니다."
    });
  }
}

  render() {
    return (
      <div className="col-md-12">
        <div className='signup-background'>
          <img
            src="watermelon_logo.jpg"
            alt="watermelon-img"
            style={{ display: 'block', margin: '50px auto', maxWidth: '70%', cursor : 'pointer' }}
            onClick={() => {this.props.router.navigate('/home');}}
          />
          <h6 style={{ color: 'white', textAlign: 'left', marginLeft: '50px', marginBottom: '-40px'}}>회원가입</h6>

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="col-form">
                  <label htmlFor="username"></label>
                  <Input
                    type="text"
                    className="signin"
                    name="username"
                    placeholder="아이디"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  /> 

                  <label htmlFor="email"></label>
                  <Input
                    type="text"
                    className="signin"
                    name="email"
                    placeholder="이메일"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />

                  <label htmlFor="password"></label>
                  <Input
                    type="password"
                    className="signin"
                    name="password"
                    placeholder="비밀번호"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="signup-btn">회원가입</button>
                </div>

                <p style={{color: 'white', marginTop: '20px', fontSize: '14px'}}>로그인 화면으로 돌아가기<button className="signinbtn" onClick={() => {
                this.props.router.navigate('/login');}}>로그인</button></p>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                  style={{ fontSize: '14px' }}
                  
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);