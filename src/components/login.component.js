import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { withRouter } from '../common/with-router';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert" style={{ fontSize : '14px' }}>
        필수 입력란입니다!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.router.navigate("/");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className='signin-background'>
          <img
            src="watermelon_logo.jpg"
            alt="watermelon-img"
            style={{ display: 'block', margin: '50px auto', maxWidth: '70%', cursor : 'pointer' }}
            onClick={() => {this.props.router.navigate('/');}}
          />
          <h6 style={{ color: 'white', textAlign: 'left', marginLeft: '50px', marginBottom: '-40px'}}>로그인</h6>

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="col-form">
              <label htmlFor="username"></label>
              <Input
                type="text"
                className="signin"
                name="username"
                placeholder="아이디"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />

              <label htmlFor="password"></label>
              <Input
                type="password"
                className="signin"
                name="password"
                placeholder="비밀번호"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
              </div>

              <div>
              <button
                className="signin-btn"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>로그인</span>
              </button>
              <p style={{color: 'white', marginTop: '20px', fontSize: '14px'}}>계정이 없으신가요?<button className="signupbtn" onClick={() => {
                this.props.router.navigate('/register');}}>회원가입</button></p>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert" style={{ fontSize : '14px' }}>
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

export default withRouter(Login);