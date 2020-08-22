// import external modules
import React, { Component } from "react";
import { NavLink, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Row,
  Col,
  Input,
  Form,
  FormGroup,
  Button,
  Label,
  Card,
  CardBody,
  CardFooter
} from "reactstrap";
import loginBg from "../../assets/img/loginBg@2x.png";
import logo from "../../assets/img/smartmiLogo.png";
import { loginUser } from "../../redux/sagas/login/fetchLoginUser";
class Login extends Component {
  state = {
    isChecked: true,
    email: "",
    password: ""
  };
  handleChecked = e => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }));
  };
  handleChangeEmail = e => {
    this.setState({ email: e.target.value });
  };
  handleChangePassword = e => {
    this.setState({ password: e.target.value });
  };
  loginForm = e => {
    e.preventDefault();
    let formData = {
      username: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(formData);
  };
  render() {
    if (this.props.login_success) return <Redirect to="/users"></Redirect>;
    return (
      <div className="container-fluid">
        <Row className="full-height-vh">
          <Col
            md="12"
            sm="12"
            xs="12"
            xl={6}
            lg={6}
            className="d-flex align-items-center justify-content-center"
          >
            <Card className="loginBox text-center width-400">
              <CardBody>
                <div className="d-flex justify-content-center">
                  <div>
                    <img src={logo} className="loginLogo" />
                    <h1>Welcome back!</h1>
                  </div>
                </div>
                <Form className="pt-2" onSubmit={this.loginForm}>
                  <FormGroup>
                    <Col md="12">
                      <Input
                        type="text"
                        className="form-control"
                        name="inputEmail"
                        id="inputEmail"
                        placeholder="Username"
                        onChange={this.handleChangeEmail}
                        required
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col md="12">
                      <Input
                        type="password"
                        className="form-control"
                        name="inputPass"
                        id="inputPass"
                        placeholder="Password"
                        onChange={this.handleChangePassword}
                        required
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <div className="d-flex flex-wrap">
                      <Col md="12">
                        <div className="text-right">
                          <Link to="" className="">
                            Forgot password?
                          </Link>
                        </div>
                      </Col>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Col md="12" className="d-flex justify-content-center">
                      {/* <Link to="/users"> */}{" "}
                      <Button
                        type="submit"
                        color="danger"
                        block
                        className="blue-btn"
                      >
                        Login
                      </Button>
                      {/* </Link> */}
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col
            lg={6}
            xl={6}
            className="d-flex justify-content-end align-items-center d-md-none d-lg-flex d-xl-flex"
          >
            <img src={loginBg} className="img-fliud loginBg" />
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  login_success: state.userReducer.loginSuccess
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
