// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import userphoto from "../../assets/img/user.png";
import whatsapp from "../../assets/img/Oval.png";
import email from "../../assets/img/email-black-circular-button.png";
import twitter from "../../assets/img/twitter.png";
import snailRed from "../../assets/img/snailRed.png";
import collapseButton from "../../assets/img/collapseButton.png";
import declineGraph from "../../assets/img/declineGraph.svg";
import averageGraph from "../../assets/img/averagegraph.svg";
import goodGraph from "../../assets/img/goodGraph.svg";
import sportsCar from "../../assets/img/sports-car.svg";
import edit from "../../assets/img/edit.png";
import { fetchUser } from "../../redux/sagas/users/fetchUser";
import { companyDetails } from "../../redux/sagas/companyDetails/companyDetails";
import { userUpdation } from "../../redux/sagas/users/fetchUserUpdate";
import { fetchUserList } from "../../redux/sagas/users/fetchUserList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import $ from "jquery";
import {
  Card,
  CardTitle,
  CardText,
  CardHeader,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  Row,
  Col,
  FormGroup,
  Label,
  CardFooter,
  Collapse,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Home, Search, AtSign, Info } from "react-feather";
import ChartistGraph from "react-chartist";
import ChartistLib from "chartist";
import "chartist/dist/chartist.min.css";
import download from "../../assets/img/download.png";

// import internal(own) modules
import Dropzone from "react-dropzone";
import { ChartistData } from "./chartData";
import "../../assets/scss/views/charts/chartist.scss";
import Calendar from "react-calendar";
import Toggle from "react-toggle";
import Select from "react-select";
import validator from 'validator';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const required = (value) => {
  if (!value.toString().trim().length) {
    return "require";
  }
};
const nameErr = (value) => {
  if (!value.toString().trim().length) {
    return <span className="error sticky">First Name cannot be blank.</span>;
  }
};
const usernameErr = (value) => {
  if (!value.toString().trim().length) {
    return <span className="error sticky">Username cannot be blank.</span>;
  }
};
const employeeCodeErr = (value) => {
  if (!value.toString().trim().length) {
    return <span className="error sticky">Employee Code cannot be blank.</span>;
  }
};



const emailErr = (value) => {
  if (!validator.isEmail(value)) {
    return <span className="error">Email not valid/cannot be blank.</span>;
  }
};


const lt = (value, props) => {
  if (!value.toString().trim().length > props.maxLength) {
    // Return jsx
    return (
      <span className="error">
        The value exceeded {props.maxLength} symbols.
      </span>
    );
  }
};

const isEqual = (value, props, components) => {
  const bothUsed =
    components.password[0].isUsed && components.confirm[0].isUsed;
  const bothChanged =
    components.password[0].isChanged && components.confirm[0].isChanged;

  if (
    bothChanged &&
    bothUsed &&
    components.password[0].value !== components.confirm[0].value
  ) {
    return (
      <span className="error form-error is-visible text-danger">
        Passwords are not equal.
      </span>
    );
  }
  if (value.toString().trim().length) {
    return (
    <span className="error">Password cannot be blank. .</span>
    )
  }
};


const mobErr= (str) => {
  if (!validator.isMobilePhone(str, ["en-IN"])) {
    
    return (
      <span className="error sticky">Mobile Number not valid/cannot be blank. .</span>
    );
  }
};









let companyOptions = [];
let designationOptions = [
  { value: "SE", label: "Sales Engineer" },
  { value: "SO", label: "Software Engineer" }
];
let departments = [
  { value: "A", label: "Administration" },
  { value: "S", label: "Sales" }
];
let roleOptions = [
  { value: "A", label: "Admin" },
  { value: "S", label: "Sales" }
];
let reportingOptions = [];
let assignCompany = [];
let assignCompany_place = [];
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soupIsReady: false,
      collapse: true,
      activeTab: "2",
      date: new Date(),
      activeTabStat: "1",
      edit: false,
      name: "",
      company: "",
      designation: "",
      department: "",
      role: "",
      employee_code: "",
      phone: "",
      username: "",
      password: "",
      confirmPassword: "",
      photo: "",
      photoErr: "",
      reportTo: "",
      files: [],
      assignCompanies: [],
      assignCompanies_place: [],
      countryOptions: [],
      reportingOptions: [],
      userFilterObj: {
        page: 1,
        activePage: 1
      }
    };
    this.props.companyDetails();
    let pathArray = window.location.pathname.split("/");
    let userId = pathArray[2];
    this.props.fetchUser(userId);
    this.props.fetchUserList(this.state.userFilterObj);
    this.editToggle = this.editToggle.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      this.props.company_details.map((company, key) => {
        var obj = {};
        obj["value"] = company.id;
        obj["label"] = company.name;
        companyOptions.push(obj);

        obj = {};
      });
      if (this.props.user_list.results) {
        this.props.user_list.results.map((user, key) => {
          var obj = {};

          obj["value"] = user.id;
          obj["label"] = user.username;
          reportingOptions.push(obj);
          obj = {};
        });
      }
      this.setState({ companyOptions: companyOptions });
      this.setState({ reportingOptions: reportingOptions });
      companyOptions = [];
      reportingOptions = [];
      if (this.props.user_data) {
        console.log(
          "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv",
          this.props.user_data
        );
        this.setState({ name: this.props.user_data.first_name });
        this.setState({ company: this.props.user_data.company_details.id });
        this.setState({
          company_place: this.props.user_data.company_details.name
        });
        if (this.props.user_data.assigned_companies) {
          this.props.user_data.assigned_company_details.map(assign_company => {
            var obj = {};
            obj["value"] = assign_company.id;
            obj["label"] = assign_company.name;
            assignCompany.push(obj["value"]);
            assignCompany_place.push(obj);
            obj = {};
          });
          this.setState({ assignCompanies: assignCompany });
          this.setState({ assignCompanies_place: assignCompany_place });
          assignCompany = [];
          assignCompany_place = [];
        }

        this.setState({ designation: this.props.user_data.designation });
        if (this.props.user_data.designation == "SE")
          this.setState({ designation_place: "Sales Engineer" });
        else this.setState({ designation_place: "Software Engineer" });
        this.setState({ department: this.props.user_data.department });
        if (this.props.user_data.department == "A")
          this.setState({ department_place: "Administration" });
        else this.setState({ department_place: "Sales" });
        this.setState({ role: this.props.user_data.role });
        if (this.props.user_data.role == "A")
          this.setState({ role_place: "Admin" });
        else this.setState({ role_place: "Sales" });
        this.setState({ employee_code: this.props.user_data.employee_code });
        this.setState({ phone: this.props.user_data.phone });
        this.setState({ username: this.props.user_data.username });
        this.setState({ photo: this.props.user_data.photo});
        this.setState({ email: this.props.user_data.email });
        this.setState({ telephone: this.props.user_data.telephone });
        this.setState({ soupIsReady: this.props.user_data.is_active });
        this.setState({ reportTo: this.props.user_data.reporting });
        this.setState({ reportTo_place: this.props.user_data.reporting_name });
      }
      if (this.props.user_update) {
        let pathArray = window.location.pathname.split("/");
        let userId = pathArray[2];
        this.props.fetchUser(userId);
        this.state.edit = false;
      }
    }, 1000);
  }
   
onDrop = (files) => {
    const imageFile = files[0];
    
    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      this.setState({ photoErr: 'Please select valid image' });
      return false;
    }
    if (imageFile.size > 1000000 ) {
      this.setState({ photoErr: 'File size is greater than 1 Mb' });
      return false;
    }
    this.setState({
      files,
      photoErr: ""
    });
    
        let userBody = {
      first_name: this.state.name,
      company: this.state.company,
      designation: this.state.designation,
      department: this.state.department,
      employee_code: this.state.employee_code,
      role: this.state.role,
      phone: this.state.phone,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      reporting: this.state.reportTo,
      photo: this.state.files[0],
      assigned_companies: this.state.assignCompanies,
      telephone: this.state.telephone,
      is_active: this.state.soupIsReady
    };
    let pathArray = window.location.pathname.split("/");
    let userId = pathArray[2];
    this.props.userUpdation(userBody, userId)
  };
  editToggle=() => {
    this.setState({ edit: !this.state.edit });
  };
  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };
  onChange = date => {
    this.setState({ date });
  };
  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };
  toggleTabStat = tabStat => {
    if (this.state.activeTabStat !== tabStat) {
      this.setState({
        activeTabStat: tabStat
      });
    }
  };

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }
   handleFocusName() {
    this.setState({ nameFocus: true });
  }
  handleBlurName() {
    this.setState({ nameFocus: false });
  }


  handleChangeCompany(e) {
    this.setState({ company: e.value });
  }
  handleFocusCompany() {
    this.setState({ companyFocus: true });
    this.state.companyFocusStyle = true;
  }
  handleBlurCompany() {
    this.setState({ companyFocus: false });
  }


  handleChangeAssignCompany(assignCompanies) {
    assignCompanies.map((value, key) => {
      var value = value.value;
      assignCompany.push(value);
    });
    setTimeout(() => {
      this.setState({ assignCompanies: assignCompany });
      console.log("this.state.assignCompanies", this.state.assignCompanies);
      assignCompany = [];
    }, 100);
  }
  handleFocusAssignCompany() {
    this.setState({ assignCompaniesFocus: true });
  }
  handleBlurAssignCompany() {
    this.setState({ assignCompaniesFocus: false });
  }


  handleChangeDesignation(e) {
    this.setState({ designation: e.value });
  }
   handleFocusDesination() {
    this.setState({ desinationFocus: true });
  }
  handleBlurDesination() {
    this.setState({ desinationFocus: false });
  }


  handleChangeDepartment(e) {
    this.setState({ department: e.value });
  }
  handleFocusDepartment() {
    this.setState({ departmentFocus: true });
  }
  handleBlurDepartment() {
    this.setState({ departmentFocus: false });
  }


  handleChangeRole(e) {
    this.setState({ role: e.value });
  }
  handleFocusRole() {
    this.setState({ roleFocus: true });
  }
  handleBlurRole() {
    this.setState({ roleFocus: false });
  }


  handleChangeEmployeeCode(e) {
    this.setState({ employee_code: e.target.value });
  }
   handleFocusEmployeeCode() {
    this.setState({ employeeCodeFocus: true });
  }
  handleBlurEmployeeCode() {
    this.setState({ employeeCodeFocus: false });
  }


  handleChangeMobile(e) {
    this.setState({ phone: e.target.value });
  }
    handleFocusMobile() {
    this.setState({ mobileFocus: true });
  }
  handleBlurMobile() {
    this.setState({ mobileFocus: false });
  }


  handleChangeTelePhone(e) {
    this.setState({ telephone: e.target.value });
  }
   handleFocusTelePhone() {
    this.setState({ telephoneFocus: true });
  }
  handleBlurTelePhone() {
    this.setState({ telephoneFocus: false });
  }


  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  handleFocusEmail() {
    this.setState({ emailFocus: true });
  }
  handleBlurEmail() {
    this.setState({ emailFocus: false });
  }


  handleChangeUserName(e) {
    this.setState({ username: e.target.value });
  }
  handleFocusUserName() {
    this.setState({ userNameFocus: true });
  }
  handleBlurUserName() {
    this.setState({ userNameFocus: false });
  }


  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleFocusPassword() {
    this.setState({ passwordFocus: true });
  }
  handleBlurPassword() {
    this.setState({ passwordFocus: false });
  }


  handleChangeConfirmPassword(e) {
    this.setState({ confirmPassword: e.target.value });
  }
  handleFocusConfirmPassword() {
    this.setState({ confirmPasswordFocus: true });
  }
  handleBlurConfirmPassword() {
    this.setState({ confirmPasswordFocus: false });
  }


  handleChangeReportingTo(e) {
    this.setState({ reportTo: e.value });
  }
  handleFocusReportingTo() {
    this.setState({ reportingToFocus: true });
  }
  handleBlurReportingTo() {
    this.setState({ reportingToFocus: false });
  }


  handleSoupChange(e) {
    if (e.target.checked) this.setState({ soupIsReady: true });
    else this.setState({ soupIsReady: false });
  }
  handleSubmit(e) {
    e.preventDefault();
    let userBody = {
      first_name: this.state.name,
      company: this.state.company,
      designation: this.state.designation,
      department: this.state.department,
      employee_code: this.state.employee_code,
      role: this.state.role,
      phone: this.state.phone,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      reporting: this.state.reportTo,
      photo: this.state.files[0],
      assigned_companies: this.state.assignCompanies,
      telephone: this.state.telephone,
      is_active: this.state.soupIsReady
    };
    let pathArray = window.location.pathname.split("/");
    let userId = pathArray[2];
    this.props.userUpdation(userBody, userId);
    this.state.password = "";
    this.state.confirmPassword = "";
  }

  componentDidUpdate() {
    if ($("#email").hasClass("is-invalid-input")) {
      $("#emailContainer").addClass("errorInput");
    } else {
      $("#emailContainer").removeClass("errorInput");
    }
  }


  render() {
    console.log("ffffffffffffffffffffffff", this.props.user_update);
    const colourOptions = [
      { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
      { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
      { value: "purple", label: "Purple", color: "#5243AA" },
      { value: "red", label: "Red", color: "#FF5630", isFixed: true },
      { value: "orange", label: "Orange", color: "#FF8B00" },
      { value: "yellow", label: "Yellow", color: "#FFC400" },
      { value: "green", label: "Green", color: "#36B37E" },
      { value: "forest", label: "Forest", color: "#00875A" },
      { value: "slate", label: "Slate", color: "#253858" },
      { value: "silver", label: "Silver", color: "#666666" }
    ];

    return (
      <Fragment>
        {this.props.user_data ? (
          <div className="userModule mT25">
            <Col md={6} className="pL0">
              <Breadcrumb>
                <BreadcrumbItem>
                  <a href="">
                    <Home size={15} />
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <a href="/users">Users</a>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  {this.props.user_data.first_name}
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col md={6} className="justify-content-end d-flex pR0"></Col>
            <Card className="col-md-12">
              {/* <CardHeader></CardHeader> */}
              <Collapse
                isOpen={this.state.collapse}
                className={this.state.collapse ? "collapseUp" : "collapseDown"}
              >
                <CardBody className="padding24-10">
                  <div className="d-flex">
                    <Col md={4} lg={4} xl="4" sm={12} className="borderRight">
                      <Row>
                        <Col md={4} lg={4} xl="4" sm={12}>
                          <div className="userImage">
                            <img src={
                              this.props.user_data.photo ? this.props.user_data.photo 
                              : userphoto } 
                              className="img-fluid"
                              style={{maxWidth:130, height:130}} />
                            <Dropzone
                              onDrop={this.onDrop.bind(this)}
                              className="drophere"
                             style={{
                                minHeight: "auto",
                                padding: 5,
                              }}
                            >
                            <span className="employeePhotoUpload">
                              <i class="fa fa-camera" style={{ left: "8px" }}></i>
                            </span>
                            </Dropzone>
                          </div>
                        </Col>
                        <Col md={8} lg={8} xl="8" sm={12}>
                          <div className="employeeName">
                            {this.props.user_data.first_name}
                          </div>
                          <div className="employeeAt userNameColor">
                            @{this.props.user_data.username}
                          </div>
                          <div className="employessPosition">
                            {this.props.user_data.designation == "SE"
                              ? "Sales engineer"
                              : "Software Engineer'"}
                          </div>
                          <div className="employeeCompany">
                            {this.props.user_data.company_details.name}
                          </div>
                          <div className="employeeCode">
                            Employee code :{" "}
                            <span> {this.props.user_data.employee_code}</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      md={4}
                      lg={4}
                      xl="4"
                      sm={12}
                      className="borderRight d-flex justify-content-center align-items-center"
                    >
                      <div className="d-inline-block">
                        <div className="employeeSocial">
                          <span>
                            <img src={whatsapp} />
                            {this.props.user_data.phone}
                          </span>
                        </div>
                        <div className="employeeSocial">
                          <span>
                            <img src={email} />
                            {this.props.user_data.email}
                          </span>
                        </div>
                        <div className="employeeSocial">
                          <span>
                            <img src={twitter} />
                            {this.props.user_data.telephone}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col
                      md={4}
                      lg={4}
                      xl="4"
                      sm={12}
                      className=" d-flex justify-content-center align-items-center"
                    >
                      <div className="employessKPI">
                        KPI SUMMARY <br />
                        <span>(Will be updated)</span>
                      </div>
                    </Col>
                  </div>
                </CardBody>
              </Collapse>
              <span className="employeeScore  d-flex justify-content-center align-items-center">
                <span>
                  <img src={snailRed} />
                  <br />
                  SCORE:
                </span>
              </span>
              <CardFooter className={this.state.collapse ? "" : "colapsed"}>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1"
                      })}
                      onClick={() => {
                        this.toggleTab("1");
                      }}
                    >
                      Dashboard
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "2"
                      })}
                      onClick={() => {
                        this.toggleTab("2");
                      }}
                    >
                      Account & Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "3"
                      })}
                      onClick={() => {
                        this.toggleTab("3");
                      }}
                    >
                      Activities
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "4"
                      })}
                      onClick={() => {
                        this.toggleTab("4");
                      }}
                    >
                      Schedules & Tasks
                    </NavLink>
                  </NavItem>
                </Nav>
                <span
                  color="primary"
                  onClick={this.toggle}
                  style={{ marginBottom: "1rem" }}
                  className="collapseButton pointer"
                >
                  <img src={collapseButton} />
                </span>
              </CardFooter>
            </Card>

            <TabContent activeTab={this.state.activeTab} className="col-12">
              <TabPane tabId="1">
                <Row>
                  <Col md={4}>
                    <Card className="trendingProjects">
                      <CardBody>
                        <h1>Trending projects</h1>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={8}>
                    <Card className="kpiStatic">
                      <CardHeader>KPI Statistics</CardHeader>
                      <CardBody>
                        <Nav tabs className="d-flex">
                          <NavItem className="col-md-3">
                            <NavLink
                              className={
                                classnames({
                                  active: this.state.activeTabStat === "1"
                                }) + "decline"
                              }
                              onClick={() => {
                                this.toggleTabStat("1");
                              }}
                            >
                              <span className="KPITitle">Punctuality</span>
                              <br />
                              <span className="KPIStatus decline">Decline</span>
                              <img
                                src={declineGraph}
                                className="KPIGraph img-fliud"
                              />
                            </NavLink>
                          </NavItem>
                          <NavItem className="col-md-3">
                            <NavLink
                              className={
                                classnames({
                                  active: this.state.activeTabStat === "2"
                                }) + "average"
                              }
                              onClick={() => {
                                this.toggleTabStat("2");
                              }}
                            >
                              <span className="KPITitle">Business Leads</span>
                              <br />
                              <span className="KPIStatus average">Average</span>
                              <img
                                src={averageGraph}
                                className="KPIGraph img-fliud"
                              />
                            </NavLink>
                          </NavItem>
                          <NavItem className="col-md-3">
                            <NavLink
                              className={
                                classnames({
                                  active: this.state.activeTabStat === "3"
                                }) + "good"
                              }
                              onClick={() => {
                                this.toggleTabStat("3");
                              }}
                            >
                              <span className="KPITitle">Quote Movement</span>
                              <br />
                              <span className="KPIStatus good">Good</span>
                              <img
                                src={goodGraph}
                                className="KPIGraph img-fliud"
                              />
                            </NavLink>
                          </NavItem>
                          <NavItem className="col-md-3">
                            <NavLink
                              className={
                                classnames({
                                  active: this.state.activeTabStat === "4"
                                }) + "good"
                              }
                              onClick={() => {
                                this.toggleTabStat("4");
                              }}
                            >
                              <span className="KPITitle">Order Booking</span>
                              <br />
                              <span className="KPIStatus good">Good</span>
                              <img
                                src={goodGraph}
                                className="KPIGraph img-fliud"
                              />
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTabStat}>
                          <TabPane tabId="1">
                            <Row>
                              <Col sm="12">
                                <ChartistGraph
                                  data={ChartistData.LineArea1Data}
                                  type="Line"
                                  options={{
                                    height: "400px",
                                    low: 0,
                                    showArea: true,
                                    fullWidth: true,
                                    onlyInteger: true,
                                    axisY: {
                                      low: 0,
                                      scaleMinSpace: 50
                                    },
                                    axisX: {
                                      showGrid: false
                                    }
                                  }}
                                />
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="2">
                            <Row>
                              <Col sm="12">
                                <ChartistGraph
                                  data={ChartistData.LineArea1Data}
                                  type="Line"
                                  options={{
                                    height: "400px",
                                    low: 0,
                                    showArea: true,
                                    fullWidth: true,
                                    onlyInteger: true,
                                    axisY: {
                                      low: 0,
                                      scaleMinSpace: 50
                                    },
                                    axisX: {
                                      showGrid: false
                                    }
                                  }}
                                />
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="3">
                            <Row>
                              <Col sm="12">
                                <ChartistGraph
                                  data={ChartistData.LineArea1Data}
                                  type="Line"
                                  options={{
                                    height: "400px",
                                    low: 0,
                                    showArea: true,
                                    fullWidth: true,
                                    onlyInteger: true,
                                    axisY: {
                                      low: 0,
                                      scaleMinSpace: 50
                                    },
                                    axisX: {
                                      showGrid: false
                                    }
                                  }}
                                />
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="4">
                            <Row>
                              <Col sm="12">
                                <ChartistGraph
                                  data={ChartistData.LineArea1Data}
                                  type="Line"
                                  options={{
                                    height: "400px",
                                    low: 0,
                                    showArea: true,
                                    fullWidth: true,
                                    onlyInteger: true,
                                    axisY: {
                                      low: 0,
                                      scaleMinSpace: 50
                                    },
                                    axisX: {
                                      showGrid: false
                                    }
                                  }}
                                />
                              </Col>
                            </Row>
                          </TabPane>
                        </TabContent>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col md={8} className="mT25">
                    <Card className="scheduleTask">
                      <CardHeader>
                        {" "}
                        <Row className="row align-items-center">
                          <Col>Schedules & Tasks</Col>
                          <Col className="d-flex justify-content-md-end align-items-center">
                            <Link to="">View more</Link>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col
                            xl={6}
                            md={5}
                            sm={12}
                            className="borderRight p-relative"
                          >
                            <div className="d-flex flex-wrap col-12  mb50">
                              <Col
                                md="12"
                                className="userNameColor"
                                style={{ marginBottom: 20 }}
                              >
                                <Row>TODAY</Row>
                              </Col>
                              <Col md={12} className="inProgress progressCard">
                                <Row>
                                  <Col md={10}>
                                    Project, Quote No. comes here
                                    <br />
                                    <span>3:00 PM - 4:00 PM</span>
                                  </Col>
                                  <Col
                                    md={2}
                                    className="d-flex justify-content-center align-items-center"
                                  >
                                    <img src={sportsCar} />
                                  </Col>
                                </Row>
                              </Col>
                              <Col md={12} className="closed progressCard">
                                <Row>
                                  <Col md={10}>
                                    Project, Quote No. comes here
                                    <br />
                                    <span>Rescheduled</span>
                                  </Col>
                                  <Col
                                    md={2}
                                    className="d-flex justify-content-center align-items-center"
                                  >
                                    <img src={sportsCar} />
                                  </Col>
                                </Row>
                              </Col>
                              <Col md={12} className="onGoing progressCard">
                                <Row>
                                  <Col md={10}>
                                    Project, Quote No. comes here
                                    <br />
                                    <span>3:00 PM - 4:00 PM</span>
                                  </Col>
                                  <Col
                                    md={2}
                                    className="d-flex justify-content-center align-items-center"
                                  >
                                    <img src={sportsCar} />
                                  </Col>
                                </Row>
                              </Col>
                            </div>
                            <div className="variables">
                              <span className="Rescheduled">Rescheduled</span>
                              <span className="Pending">Pending</span>
                              <span className="Completed">Completed</span>
                            </div>
                          </Col>
                          <Col xl={6} md={7} sm={12}>
                            <Calendar
                              onChange={this.onChange}
                              value={this.state.date}
                              className="mb50"
                            />
                            <div className="variables">
                              <span className="Upcoming">Upcoming</span>
                              <span className="Rescheduled">Rescheduled</span>
                              <span className="Holidays">Holidays</span>
                              <span className="Completed">Completed</span>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={4} className="mT25">
                    <Card className="allocatedProject">
                      <CardHeader>
                        <Row className="row align-items-center">
                          <Col>Allocated projects</Col>
                          <Col className="d-flex justify-content-md-end align-items-center">
                            <span className="export">
                              <img className="exportIcon" src={download} />
                              Export
                            </span>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col>
                            <div className="apTitle">Project name</div>
                          </Col>
                          <Col>
                            <div className="apTitle">Quoted value</div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="apItemTitle">
                              44 Duplex villas at al rayyan
                            </div>
                            <div className="apProgress"></div>
                          </Col>
                          <Col>
                            <div className="apItemValue">12,00000.00</div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <Card>
                      <CardHeader>
                        {" "}
                        <Row className="row align-items-center">
                          <Col>Employee details</Col>
                          <Col className="d-flex justify-content-md-end align-items-center">
                            <span onClick={this.editToggle} className="pointer">
                              <img src={edit} />
                            </span>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody
                        style={
                          this.state.edit
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      >
                        <Form>
                          <Row>
                            <Col xl="3" lg="3" md="12">
                              <FormGroup>
                                <Label>Full name</Label>
                                <p className="liteFontColor">
                                  {" "}
                                  {this.props.user_data.first_name}
                                </p>
                              </FormGroup>
                            </Col>
                            <Col xl="3" lg="3" md="12">
                              <FormGroup>
                                <Label>Company</Label>
                                <p className="liteFontColor">
                                  {" "}
                                  {this.props.user_data.company_details.name}
                                </p>
                              </FormGroup>
                            </Col>
                            <Col xl="3" lg="3" md="12">
                              <FormGroup>
                                <Label for="basicinput">
                                  Assigned Companies
                                </Label>
                                <p className="liteFontColor">
                                  {" "}
                                  {this.props.user_data.assigned_company_details.map(
                                    (assign_company, i, arr) => {
                                      return (
                                        <span key={i}>
                                          {" "}
                                          {assign_company.name}
                                          {arr.length - 1 == i ? "" : ","}
                                        </span>
                                      );
                                    }
                                  )}
                                </p>
                              </FormGroup>
                            </Col>
                            <Col xl="3" lg="3" md="12">
                              <FormGroup>
                                <Label>Designation</Label>
                                <p className="liteFontColor">
                                  {" "}
                                  {this.props.user_data.designation == "SE"
                                    ? "Sales Engineer"
                                    : "Software Engineer"}
                                </p>
                              </FormGroup>
                            </Col>

                            <Col xl="3" lg="3" md="12">
                              <FormGroup>
                                <Label>Department</Label>
                                <p className="liteFontColor">
                                  {" "}
                                  {this.props.user_data.department == "A"
                                    ? "Administration"
                                    : "Sales"}
                                </p>
                              </FormGroup>
                            </Col>
                            <Col xl="3" lg="3" md="12">
                              <FormGroup>
                                <Label>Reporting to</Label>
                                <p className="liteFontColor">
                                  {" "}
                                  {this.props.user_data.reporting_name}
                                </p>
                              </FormGroup>
                            </Col>
                            <Col xl="3" lg="3" md="12">
                              <FormGroup>
                                <Label>Role</Label>
                                <p className="liteFontColor">
                                  {" "}
                                  {this.props.user_data.role == "S"
                                    ? "Sales"
                                    : "Admin"}
                                </p>
                              </FormGroup>
                            </Col>
                            <Col xl="3" lg="3" md="12">
                              <FormGroup>
                                <Label>Employee code</Label>
                                <p className="liteFontColor">
                                  {" "}
                                  {this.props.user_data.employee_code}
                                </p>
                              </FormGroup>
                            </Col>
                            <Col xl="3" lg="3" md="12">
                              <FormGroup>
                                <Label>Mobile number</Label>
                                <p className="liteFontColor">
                                  {" "}
                                  {this.props.user_data.phone}
                                </p>
                              </FormGroup>
                            </Col>
                            <Col xl="3" lg="3" md="12">
                              <FormGroup>
                                <Label>Telephone number</Label>
                                <p className="liteFontColor">
                                  {" "}
                                  {this.props.user_data.telephone}
                                </p>
                              </FormGroup>
                            </Col>
                            <Col xl="3" lg="3" md="12">
                              <FormGroup>
                                <Label>Email id</Label>
                                <p className="liteFontColor">
                                  {" "}
                                  {this.props.user_data.email}
                                </p>
                              </FormGroup>
                            </Col>
                            <Col xl="3" lg="3" md="12">
                              <FormGroup>
                                <Label>Username</Label>
                                <p className="liteFontColor">
                                  {" "}
                                  {this.props.user_data.username}
                                </p>
                              </FormGroup>
                            </Col>
                          </Row>

                          {/* Custom icons */}

                          <label>
                            <Toggle
                              checked={this.state.soupIsReady}
                              icons={{
                                checked: "Active",
                                unchecked: "Inactive"
                              }}
                              onChange={this.handleSoupChange.bind(this)}
                            />
                          </label>
                        </Form>
                      </CardBody>
                      <CardBody
                        style={
                          this.state.edit
                            ? { display: "block" }
                            : { display: "none" }
                        }
                        className="editModule"
                      >
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                          <Row>
                            <Col xl="4" lg="4" md="12">
                              <FormGroup 
                                id={this.state.name ? "hasValue" : "hasnoValue"}
                              >
                                <Label for="name">Full name*</Label>
                                <Input
                                  type="text"
                                  className={
                                    this.state.name
                                      ? "form-control input floatingLabel"
                                      : "form-control"
                                  }
                                  
                                  value={this.state.name}
                                  onChange={this.handleChangeName.bind(this)}
                                  onFocus={this.handleFocusName.bind(this)}
                                  onBlur={this.handleBlurName.bind(this)}
                                  id="name"
                                  validations={[nameErr]}
                                />
                              </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                              <FormGroup 
                                id={this.state.company ? "hasValue" : "hasnoValue"}
                              >
                                <Label>Company*</Label>
                                <Select
                                  className="basic-single "
                                  classNamePrefix="select"
                                  // defaultValue={colourOptions[0]}
                                  placeholder={this.state.company_place}
                                  onChange={this.handleChangeCompany.bind(this)}
                                  onFocus={this.handleFocusCompany.bind(this)}
                                  onBlur={this.handleBlurCompany.bind(this)}
                                  options={this.state.companyOptions}
                                  validations={[required, lt]}
                                />
                              </FormGroup>
                            </Col>
                            {this.state.assignCompanies_place.length>0 ?( <Col xl="4" lg="4" md="12">
                              <FormGroup
                                className={
                                  this.state.assignCompaniesFocus
                                    ? "hasFloatingLabel selectInput isFocused"
                                    : "hasFloatingLabel selectInput notFocused"
                                }
                              >
                                <Label>Assigned companies</Label>
                                {console.log("ggggggggggggggg",this.state.assignCompanies_place)}
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  defaultValue={this.state.assignCompanies_place}
                                  isMulti
                                  onChange={this.handleChangeAssignCompany.bind(
                                    this
                                  )}
                                  options={this.state.companyOptions}
                                  // placeholder={this.state.assignCompanies_place.map(
                                  //   (assign_company, i, arr) => {
                                  //     return (
                                  //       assign_company +
                                  //       (arr.length - 1 == i ? "" : ", ")
                                  //     );
                                  //   }
                                  // )}
                                />
                                
                              </FormGroup>
                            </Col>):( <Col xl="4" lg="4" md="12">
                              <FormGroup
                                id={
                                  this.state.assignCompanies.length > 0
                                    ? "hasValue"
                                    : "hasnoValue"
                                }
                              >
                                <Label>Assigned companies</Label>
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select1"
                                  isMulti
                                  onChange={this.handleChangeAssignCompany.bind(
                                    this
                                  )}
                                  value={this.companyOption}
                                  options={this.state.companyOptions}
                                  onFocus={this.handleFocusAssignCompany.bind(this)}
                                  onBlur={this.handleBlurAssignCompany.bind(this)}
                                  id={this.state.assignCompaniesFocus ? "focused" : null}
                                  placeholder={this.state.companyOption}
                                />
                                
                              </FormGroup>
                            </Col>)}
                            <Col xl="4" lg="4" md="12">
                              <FormGroup id={this.state.designation ? "hasValue" : "hasnoValue"}>
                                <Label>Designation*</Label>
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  placeholder={this.state.designation_place}
                                  onChange={this.handleChangeDesignation.bind(
                                    this
                                  )}
                                  onFocus={this.handleFocusDesination.bind(this)}
                                  onBlur={this.handleBlurDesination.bind(this)}
                                  options={designationOptions}
                                  id={this.state.designationFocus ? "focused" : null}
                                />
                              </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                              <FormGroup id={this.state.department ? "hasValue" : "hasnoValue"}>
                                <Label>Department*</Label>
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  // defaultValue={colourOptions[0]}
                                  placeholder={this.state.department_place}
                                  onChange={this.handleChangeDepartment.bind(
                                    this
                                  )}
                                  options={departments}
                                  onFocus={this.handleFocusDepartment.bind(this)}
                                  onBlur={this.handleBlurDepartment.bind(this)}
                                  id={this.state.departmentFocus ? "focused" : null}
                                />
                              </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                              <FormGroup id={this.state.reportTo ? "hasValue" : "hasnoValue"}>
                                <Label>Reporting to*</Label>
                                <Select
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  // defaultValue={colourOptions[0]}
                                  // value={this.companyOption}
                                  placeholder={this.state.reportTo_place}
                                  onChange={this.handleChangeReportingTo.bind(
                                    this
                                  )}
                                  options={this.state.reportingOptions}
                                  onFocus={this.handleFocusReportingTo.bind(this)}
                                  onBlur={this.handleBlurReportingTo.bind(this)}
                                  id={this.state.reportingToFocus ? "focused" : null}
                                />
                              </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                              <FormGroup id={this.state.role ? "hasValue" : "hasnoValue"}>
                                <Label>Role*</Label>
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  placeholder={this.state.role_place}
                                  // defaultValue={colourOptions[0]}
                                  onChange={this.handleChangeRole.bind(this)}
                                  options={roleOptions}
                                  onFocus={this.handleFocusRole.bind(this)}
                                  onBlur={this.handleBlurRole.bind(this)}
                                  id={this.state.roleFocus ? "focused" : null}
                                />
                              </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                              <FormGroup id={this.state.employeeCode ? "hasValue" : "hasnoValue"}>
                                <Label>Employee code*</Label>
                                <Input
                                  className={
                                    this.state.employeeCode
                                      ? "form-control input floatingLabel"
                                      : "form-control"
                                  }
                                  type="text"
                                  placeholder="E.g 1352"
                                  value={this.state.employee_code}
                                  onChange={this.handleChangeEmployeeCode.bind(
                                    this
                                  )}
                                  onFocus={this.handleFocusEmployeeCode.bind(this)}
                                  onBlur={this.handleBlurEmployeeCode.bind(this)}
                                  id="employeecode"
                                  validations={[employeeCodeErr]}
                                />
                              </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                              <FormGroup id={this.state.mobile ? "hasValue" : "hasnoValue"}>
                                <Label>Mobile number*</Label>
                                <Input
                                  className={
                                    this.state.mobile
                                      ? "form-control input floatingLabel"
                                      : "form-control"
                                  }
                                  type="text"
                                  placeholder="Mobile number"
                                  value={this.state.phone}
                                  onChange={this.handleChangeMobile.bind(this)}
                                  onFocus={this.handleFocusMobile.bind(this)}
                                  onBlur={this.handleBlurMobile.bind(this)}
                                  id="mobile"
                                  validations={[mobErr]}
                                />
                              </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12" >
                              <FormGroup id={this.state.telephone ? "hasValue" : "hasnoValue"}>
                                <Label>Telephone number</Label>
                                <Input
                                  className={
                                    this.state.telephone
                                      ? "form-control input floatingLabel round"
                                      : "form-control round"
                                  }
                                  type="text"
                                  placeholder="Telephone"
                                  value={this.state.telephone}
                                  onChange={this.handleChangeTelePhone.bind(
                                    this
                                  )}
                                  onFocus={this.handleFocusTelePhone.bind(this)}
                                  onBlur={this.handleBlurTelePhone.bind(this)}
                                  id="telephone"
                                />
                              </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12" id="emailContainer">
                              <FormGroup id={this.state.email ? "hasValue" : "hasnoValue"}>
                                <Label>Email id*</Label>
                                <div className="position-relative has-icon-right">
                                  <Input
                                    className={
                                      this.state.email
                                        ? "form-control input floatingLabel round"
                                        : "form-control round"
                                    }
                                    type="text"
                                    placeholder={this.state.email}
                                    onChange={this.handleChangeEmail.bind(this)}
                                    onFocus={this.handleFocusEmail.bind(this)}
                                    onBlur={this.handleBlurEmail.bind(this)}
                                    id="email"
                                    validations={[emailErr]}
                                  />
                                  <div className="form-control-position">
                                    <AtSign size={16} className="formIcon" />
                                  </div>
                                </div>
                              </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                              <FormGroup id={this.state.userName ? "hasValue" : "hasnoValue"}>
                                <Label>Username*</Label>
                                <Input
                                  type="text"
                                  className={
                                    this.state.userName
                                      ? "form-control input floatingLabel"
                                      : "form-control"
                                  }
                                  placeholder="Full name"
                                  value={this.state.username}
                                  onChange={this.handleChangeUserName.bind(
                                    this
                                  )}
                                  onFocus={this.handleFocusUserName.bind(this)}
                                  onBlur={this.handleBlurUserName.bind(this)}
                                  id="username"
                                  validations={[usernameErr]}
                                />
                              </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                              <FormGroup id={this.state.password ? "hasValue" : "hasnoValue"}>
                                <Label>Password*</Label>
                                <div className="position-relative has-icon-right">
                                  <Input
                                    type="password"
                                    className={
                                      this.state.password
                                        ? "form-control input floatingLabel round"
                                        : "form-control round"
                                    }
                                    onChange={this.handleChangePassword.bind(
                                      this
                                    )}
                                    onFocus={this.handleFocusPassword.bind(this)}
                                    onBlur={this.handleBlurPassword.bind(this)}
                                    id="password"
                                    name="password"
                                    validations={[isEqual]}
                                  />
                                  <div className="form-control-position">
                                    <Info size={16} className="formIcon" />
                                  </div>
                                </div>
                              </FormGroup>
                            </Col>
                            <Col xl="4" lg="4" md="12">
                              <FormGroup id={
                                   this.state.confirmPassword ? "hasValue" : "hasnoValue"}>
                                <Label>Confirm password</Label>
                                <div className="position-relative has-icon-right">
                                  <Input
                                    type="password"
                                    className={
                                      this.state.confirmPassword
                                        ? "form-control input floatingLabel round"
                                        : "form-control round"
                                    }
                                    onChange={this.handleChangeConfirmPassword.bind(
                                      this
                                    )}
                                    onFocus={this.handleFocusConfirmPassword.bind(this)}
                                    onBlur={this.handleBlurConfirmPassword.bind(this)}
                                    id="confirmpassword"
                                    name="confirm"
                                    validations={[isEqual]}
                                  />
                                  <div className="form-control-position">
                                    <Info size={16} className="formIcon" />
                                  </div>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="mT-13">
                            <Col md={6}>
                              <form ref="breakfastForm">
                                {/* Custom icons */}

                                <label>
                                  <Toggle
                                    checked={this.state.soupIsReady}
                                    icons={{
                                      checked: "Active",
                                      unchecked: "Inactive"
                                    }}
                                    onChange={this.handleSoupChange.bind(this)}
                                  />
                                </label>
                              </form>
                            </Col>
                            <Col
                              md={6}
                              className="justify-content-md-end d-flex"
                            >
                              <Button type="submit" className="blue-btn mR25">
                                Save
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12">
                    <h4>Tab 3 Contents</h4>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col sm="12">
                    <h4>Tab 4 Contents</h4>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        ) : null}
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  user_data: state.userReducer.userData,
  user_update: state.userReducer.updateUser,
  company_details: state.companyDetailsReducer.companyDetails,
  user_list: state.userReducer.usersList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUser,
      companyDetails,
      userUpdation,
      fetchUserList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(User);
