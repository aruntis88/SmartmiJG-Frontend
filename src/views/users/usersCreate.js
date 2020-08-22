// import external modules
import React, { Component, Fragment } from "react";
import { companyDetails } from "../../redux/sagas/companyDetails/companyDetails";
import { connect } from "react-redux";
import { userCreation } from "../../redux/sagas/users/fetchUserCreate";
import { fetchUserList } from "../../redux/sagas/users/fetchUserList";
import { bindActionCreators } from "redux";
import $ from "jquery";
import {
  Card,
  CardHeader,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  FormGroup,
  Label,
  Button,
  //Form,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Home, Search, AtSign, Info, X } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import Toggle from "react-toggle";
import Select from "react-select";
import Redirect from "react-router-dom/Redirect";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Dropzone from "react-dropzone";
//import Button from "react-validation/build/button";
import validator from "validator";

let empReqErr = false;

let usernameReqErr = false;
let emailReqErr = false;
let passReqErr = false;

const required = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return "require";
  }
};
const name = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return <span className="error">First Name cannot be blank.</span>;
  }
};
const username = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return <span className="error">Username cannot be blank.</span>;
  }
};
const employeeCode = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return <span className="error">Employee Code cannot be blank.</span>;
  }
};

let emailErr = false;

const email = (value) => {
  if (!validator.isEmail(value)) {
    emailErr = true;
    // return <span className="error">{value} is not a valid email.</span>;
    return <span className="error">Email not valid/cannot be blank. .</span>;
  } else emailErr = false;
  if (value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    emailReqErr = true;
  }
};


const lt = (value, props) => {
  // get the maxLength from component's props
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
    // We can return string or jsx as the 'error' prop for the validated Component
    passReqErr = true;
  }
};

const mob = (number) => {
  if (!validator.isMobilePhone(number)) {
  
    return (
      <span className="error">Mobile Number not valid/cannot be blank. .</span>
    );
  } 
};

const password = (value, props, components) => {
  // NOTE: Tricky place. The 'value' argument is always current component's value.
  // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
  // But if we're changing 'confirm' component - the condition will always be true
  // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
  if (value !== components["confirm"][0].value) {
    // components['password'][0].value !== components['confirm'][0].value
    // 'confirm' - name of input
    // components['confirm'] - array of same-name components because of checkboxes and radios
    return <span className="error">Passwords are not equal.</span>;
  }
};
// import { colourOptions } from "./selectData";
const Heart = () => (
  <div
    style={{
      color: "#fff",
      fontSize: "1.2em",
      position: "absolute",
      top: "0.4em",
    }}
  >
    ❤
  </div>
);
let companyOptions = [];
let assignCompany = [];
let departments = [
  { value: "A", label: "Administration" },
  { value: "S", label: "Sales" },
];
let roleOptions = [
  { value: "A", label: "Admin" },
  { value: "S", label: "Sales" },
];
let designationOptions = [
  { value: "SE", label: "Sales Engineer" },
  { value: "SO", label: "Software Engineer" },
];
let reportingOptions = [];
class UsersCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soupIsReady: true,
      name: "",
      company: "",
      companyOption: "",
      designation: "",
      department: "",
      employeeCode: "",
      role: "",
      mobile: "",
      telephone: "",
      email: "",
      files: [],
      photo: "",
      photoErr: "",
      userName: "",
      password: "",
      reportTo: "",
      confirmPassword: "",
      companyOptions: [],
      assignCompanies: [],
      reportingOptions: [],
      userFilterObj: {
        page: 1,
        activePage: 1,
      },
    };
    this.props.companyDetails();
    this.props.fetchUserList();
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
      if (this.props.user_list) {
        try {
          this.props.user_list.map((user, key) => {
            var obj = {};

            obj["value"] = user.id;
            obj["label"] = user.username;
            reportingOptions.push(obj);
            obj = {};
          });
        } catch (error) {
          console.log(error)
        }
        
      }
      this.setState({ companyOptions: companyOptions });
      this.setState({ reportingOptions: reportingOptions });
      companyOptions = [];
      reportingOptions = [];
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
  };

  clearPreview() {
    this.state.files = [];
    this.forceUpdate();
  }

  // Name Handle
  handleChangeName(e) {
    // nameReqErr = true;
    this.setState({ name: e.target.value });
  }
  handleFocusName() {
    this.setState({ nameFocus: true });
  }
  handleBlurName() {
    this.setState({ nameFocus: false });
    // if (emailErr == true) {
    //   emailErr = false;
    // }
  }
  // Name Handle

  // Company Handle
  handleChangeCompany = (companyOption) => {
    console.log("ddddcompanyOption", companyOption);
    this.setState({ company: companyOption.value });
  };
  handleFocusCompany() {
    this.setState({ companyFocus: true });
    this.state.companyFocusStyle = true;
  }
  handleBlurCompany() {
    this.setState({ companyFocus: false });
  }
  // Company Handle

  // Assign Companies Handle
  handleChangeAssignCompany(assignCompanies) {
    assignCompanies.map((value, key) => {
      var value = value.value;
      assignCompany.push(value);
    });
    this.setState({ selectClassAssCompany: true });
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
  // Assign Companies Handle

  // Employee Code Handle

  handleChangeEmployeeCode(e) {
    empReqErr = true;
    this.setState({ employeeCode: e.target.value });
  }
  handleFocusEmployeeCode() {
    this.setState({ employeeCodeFocus: true });
  }
  handleBlurEmployeeCode() {
    this.setState({ employeeCodeFocus: false });
    // if (emailErr == true) {
    //   emailErr = false;
    // }
  }
  // Employee Code Handle

  // Department Handle

  handleChangeDepartment(e) {
    this.setState({ department: e.value });
  }
  handleFocusDepartment() {
    this.setState({ departmentFocus: true });
  }
  handleBlurDepartment() {
    this.setState({ departmentFocus: false });
  }
  // Department Handle

  // Desination Handle
  handleChangeDesignation(e) {
    this.setState({ designation: e.value });
  }
  handleFocusDesination() {
    this.setState({ desinationFocus: true });
  }
  handleBlurDesination() {
    this.setState({ desinationFocus: false });
  }
  // Desination Handle

  // Mobile Handle
  handleChangeMobile(e) {
    
    this.setState({ mobile: e.target.value });
  }
  handleFocusMobile() {
    this.setState({ mobileFocus: true });
  }
  handleBlurMobile() {
    this.setState({ mobileFocus: false });
    // if (emailErr == true) {
    //   emailErr = false;
    // }
  }
  // Mobile Handle

  // Telephone Handle

  handleChangeTelePhone(e) {
    this.setState({ telephone: e.target.value });
  }
  handleFocusTelePhone() {
    this.setState({ telephoneFocus: true });
  }
  handleBlurTelePhone() {
    this.setState({ telephoneFocus: false });
    // if (emailErr == true) {
    //   emailErr = false;
    // }
  }
  // Telephone Handle

  // Email Handle

  handleChangeEmail(e) {
    //emailReqErr = true;
    this.setState({ email: e.target.value });
  }
  handleFocusEmail() {
    this.setState({ emailFocus: true });
  }
  handleBlurEmail() {
    this.setState({ emailFocus: false });
    // if (emailErr == true) {
    //   emailErr = false;
    // }
  }
  // Email Handle

  // Role Handle

  handleChangeRole(e) {
    this.setState({ role: e.value });
  }
  handleFocusRole() {
    this.setState({ roleFocus: true });
  }
  handleBlurRole() {
    this.setState({ roleFocus: false });
  }
  // Role Handle

  // User Name Handle
  handleChangeUserName(e) {
    usernameReqErr = true;
    this.setState({ userName: e.target.value });
  }
  handleFocusUserName() {
    this.setState({ userNameFocus: true });
  }
  handleBlurUserName() {
    this.setState({ userNameFocus: false });
    // if (emailErr == true) {
    //   emailErr = false;
    // }
  }
  // User Name Handle

  // Password Handle

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleFocusPassword() {
    this.setState({ passwordFocus: true });
  }
  handleBlurPassword() {
    this.setState({ passwordFocus: false });
    // if (emailErr == true) {
    //   emailErr = false;
    // }
  }

  // Password Handle

  // Confirm Password Handle
  handleChangeConfirmPassword(e) {
    this.setState({ confirmPassword: e.target.value });
  }
  handleFocusConfirmPassword() {
    this.setState({ confirmPasswordFocus: true });
  }
  handleBlurConfirmPassword() {
    this.setState({ confirmPasswordFocus: false });
    // if (emailErr == true) {
    //   emailErr = false;
    // }
  }
  // Confirm Password Handle

  // Reporting to Handle

  handleChangeReportingTo(e) {
    this.setState({ reportTo: e.value });
  }
  handleFocusReportingTo() {
    this.setState({ reportingToFocus: true });
  }
  handleBlurReportingTo() {
    this.setState({ reportingToFocus: false });
  }

  // Reporting to Handle

  // Active  Handle
  handleSoupChange(e) {
    console.log("kkkkkkkkkkkkkkk", e.target.checked);
    if (e.target.checked) this.setState({ soupIsReady: true });
    else this.setState({ soupIsReady: false });
  }
  // Active  Handle

  // Submit  Handle

  handleSubmit(e) {
    if (!this.state.files) {
      this.setState({ photoErr: 'User Photo Required' });
      return false;
    }else return this.setState({ photoErr: "" })

    e.preventDefault();
    let userBody = {
      first_name: this.state.name,
      company: this.state.company,
      designation: this.state.designation,
      department: this.state.department,
      employee_code: this.state.employeeCode,
      role: this.state.role,
      phone: this.state.mobile,
      email: this.state.email,
      username: this.state.userName,
      password: this.state.password,
      reporting: this.state.reportTo,
      photo: null,
      assigned_companies: this.state.assignCompanies,
      telephone: this.state.telephone,
      is_active: this.state.soupIsReady,
    };
    this.props.userCreation(userBody);
  }
  // Submit  Handle
  componentDidUpdate() {
    if ($("#email").hasClass("is-invalid-input")) {
      $("#emailContainer").addClass("errorInput");
    } else {
      $("#emailContainer").removeClass("errorInput");
    }
    if ($("#password").hasClass("is-invalid-input")) {
      $("#passwordContainer").addClass("errorInput");
    } else {
      $("#passwordContainer").removeClass("errorInput");
    }
    if ($("#confirmpassword").hasClass("is-invalid-input")) {
      $("#confirmpasswordContainer").addClass("errorInput");
    } else {
      $("#confirmpasswordContainer").removeClass("errorInput");
    }
  }

  render() {
    if (this.props.user_create) return <Redirect to="/users"></Redirect>;

    return (
      <Fragment>
        <div className="userModule mT25">
          <Col md={6} className="pL0">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">
                  <Home size={15} />
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to="/users">Users</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Create new user</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0"></Col>
          <Card>
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Create new user</Col>
                <Col className="d-flex justify-content-md-end"></Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <Row>
                  <Col xl="4" lg="4" md="12">
                    <FormGroup
                      className={
                        this.state.nameFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.name ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        className={
                          this.state.name
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeName.bind(this)}
                        onFocus={this.handleFocusName.bind(this)}
                        onBlur={this.handleBlurName.bind(this)}
                        id="name"
                        validations={[name]}
                      />
                      <label className="form-control-placeholder" for="name">
                        Full name*
                      </label>
                    </FormGroup>
                  </Col>
                  <Col xl="4" lg="4" md="12">
                    <FormGroup
                      className={
                        this.state.companyFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.company ? "hasValue" : "hasnoValue"}
                    >
                      <Select
                        isSearchable={true}
                        className={
                          this.state.company
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.companyFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        value={this.companyOption}
                        onChange={this.handleChangeCompany.bind(this)}
                        options={this.state.companyOptions}
                        placeholder=""
                        onFocus={this.handleFocusCompany.bind(this)}
                        onBlur={this.handleBlurCompany.bind(this)}
                        id={this.state.companyFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                      />
                      <Label className="form-control-placeholder">
                        Company*
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xl="4" lg="4" md="12">
                    <FormGroup
                      className={
                        this.state.assignCompaniesFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={
                        this.state.assignCompanies.length > 0
                          ? "hasValue"
                          : "hasnoValue"
                      }
                    >
                      <Select
                        isSearchable={true}
                        className={
                          this.state.assignCompanies.length > 0
                            ? "basic-single floatingLabel"
                            : "basic-single"
                        }
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        isMulti
                        value={this.companyOption}
                        onChange={this.handleChangeAssignCompany.bind(this)}
                        onFocus={this.handleFocusAssignCompany.bind(this)}
                        onBlur={this.handleBlurAssignCompany.bind(this)}
                        options={this.state.companyOptions}
                        id={this.state.assignCompaniesFocus ? "focused" : null}
                        placeholder=""
                      />
                      <Label className="form-control-placeholder">
                        Assigned companies
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xl="4" lg="4" md="12">
                    <FormGroup
                      className={
                        this.state.designationFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.designation ? "hasValue" : "hasnoValue"}
                    >
                      <Select
                        isSearchable={true}
                        className={
                          this.state.designation
                            ? "basic-single floatingLabel"
                            : "basic-single"
                        }
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        onChange={this.handleChangeDesignation.bind(this)}
                        options={designationOptions}
                        placeholder=""
                        onFocus={this.handleFocusDesination.bind(this)}
                        onBlur={this.handleBlurDesination.bind(this)}
                        id={this.state.designationFocus ? "focused" : null}
                      />
                      <Label className="form-control-placeholder">
                        Designation*
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xl="4" lg="4" md="12">
                    <FormGroup
                      className={
                        this.state.departmentFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.department ? "hasValue" : "hasnoValue"}
                    >
                      <Select
                        isSearchable={true}
                        className={
                          this.state.department
                            ? "basic-single floatingLabel"
                            : "basic-single"
                        }
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        // value={this.companyOption}
                        onChange={this.handleChangeDepartment.bind(this)}
                        options={departments}
                        placeholder=""
                        onFocus={this.handleFocusDepartment.bind(this)}
                        onBlur={this.handleBlurDepartment.bind(this)}
                        id={this.state.departmentFocus ? "focused" : null}
                      />
                      <Label className="form-control-placeholder">
                        Department*
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xl="4" lg="4" md="12">
                    <FormGroup
                      className={
                        this.state.reportToFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.reportTo ? "hasValue" : "hasnoValue"}
                    >
                      <Select
                        isSearchable={true}
                        className={
                          this.state.reportTo
                            ? "basic-single floatingLabel"
                            : "basic-single"
                        }
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        // value={this.companyOption}
                        onChange={this.handleChangeReportingTo.bind(this)}
                        options={this.state.reportingOptions}
                        placeholder=""
                        onFocus={this.handleFocusReportingTo.bind(this)}
                        onBlur={this.handleBlurReportingTo.bind(this)}
                        id={this.state.reportingToFocus ? "focused" : null}
                      />
                      <Label className="form-control-placeholder">
                        Reporting to*
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xl="4" lg="4" md="12">
                    <FormGroup
                      className={
                        this.state.roleFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.role ? "hasValue" : "hasnoValue"}
                    >
                      <Select
                        isSearchable={true}
                        className={
                          this.state.role
                            ? "basic-single floatingLabel"
                            : "basic-single"
                        }
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        onChange={this.handleChangeRole.bind(this)}
                        options={roleOptions}
                        placeholder=""
                        onFocus={this.handleFocusRole.bind(this)}
                        onBlur={this.handleBlurRole.bind(this)}
                        id={this.state.roleFocus ? "focused" : null}
                      />
                      <Label className="form-control-placeholder">Role*</Label>
                    </FormGroup>
                  </Col>
                  <Col xl="4" lg="4" md="12">
                    <FormGroup
                      className={
                        this.state.employeeCodeFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.employeeCode ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        onChange={this.handleChangeEmployeeCode.bind(this)}
                        onFocus={this.handleFocusEmployeeCode.bind(this)}
                        onBlur={this.handleBlurEmployeeCode.bind(this)}
                        id="employeecode"
                        className={
                          this.state.employeeCode
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        validations={[employeeCode]}
                      />
                      <label
                        className="form-control-placeholder"
                        for="employeecode"
                      >
                        Employee code*
                      </label>
                    </FormGroup>
                  </Col>
                  <Col xl="4" lg="4" md="12">
                    <FormGroup
                      className={
                        this.state.mobileFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.mobile ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        className={
                          this.state.mobile
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeMobile.bind(this)}
                        onFocus={this.handleFocusMobile.bind(this)}
                        onBlur={this.handleBlurMobile.bind(this)}
                        id="mobile"
                        validations={[mob]}
                      />
                      <label className="form-control-placeholder" for="mobile">
                        Mobile number*
                      </label>
                    </FormGroup>
                  </Col>
                  <Col xl="4" lg="4" md="12">
                    <FormGroup
                      className={
                        this.state.telephoneFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.telephone ? "hasValue" : "hasnoValue"}
                    >
                      <input
                        type="text"
                        className={
                          this.state.telephone
                            ? "form-control input floatingLabel round"
                            : "form-control round"
                        }
                        onChange={this.handleChangeTelePhone.bind(this)}
                        onFocus={this.handleFocusTelePhone.bind(this)}
                        onBlur={this.handleBlurTelePhone.bind(this)}
                        id="telephone"
                      />
                      <label class="form-control-placeholder" for="telephone">
                        Telephone number
                      </label>
                    </FormGroup>
                  </Col>
                  <Col xl="4" lg="4" md="12" id="emailContainer">
                    <FormGroup
                      className={
                        this.state.emailFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.email ? "hasValue" : "hasnoValue"}
                    >
                      <div className="position-relative has-icon-right">
                        <Input
                          className={
                            this.state.email
                              ? "form-control input floatingLabel round"
                              : "form-control round"
                          }
                          onChange={this.handleChangeEmail.bind(this)}
                          onFocus={this.handleFocusEmail.bind(this)}
                          onBlur={this.handleBlurEmail.bind(this)}
                          id="email"
                          validations={[email]}
                        />
                        <label className="form-control-placeholder" for="email">
                          Email*
                        </label>
                        <div className="form-control-position" style={{top: ".5px"}}>
                          <AtSign size={16} className="formIcon" />
                        </div>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xl="4" lg="4" md="12">
                    <FormGroup
                      className={
                        this.state.userNameFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.userName ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        className={
                          this.state.userName
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeUserName.bind(this)}
                        onFocus={this.handleFocusUserName.bind(this)}
                        onBlur={this.handleBlurUserName.bind(this)}
                        id="username"
                        validations={[username]}
                      />
                      <label
                        className="form-control-placeholder"
                        for="username"
                      >
                        Username*
                      </label>
                    </FormGroup>
                  </Col>
                  <Col xl="4" lg="4" md="12" id="passwordContainer">
                    <FormGroup
                      className={
                        this.state.passwordFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.password ? "hasValue" : "hasnoValue"}
                    >
                      <div className="position-relative has-icon-right">
                        <Input
                          type="password"
                          className={
                            this.state.password
                              ? "form-control input floatingLabel round"
                              : "form-control round"
                          }
                          onChange={this.handleChangePassword.bind(this)}
                          onFocus={this.handleFocusPassword.bind(this)}
                          onBlur={this.handleBlurPassword.bind(this)}
                          id="password"
                          name="password"
                          validations={[isEqual]}
                        />
                        <label class="form-control-placeholder" for="password">
                          Password
                        </label>

                        <div className="form-control-position">
                          <Info size={16} className="formIcon" />
                        </div>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xl="4" lg="4" md="12" id="confirmpasswordContainer">
                    <FormGroup
                      className={
                        this.state.confirmPasswordFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={
                        this.state.confirmPassword ? "hasValue" : "hasnoValue"
                      }
                    >
                      <div className="position-relative has-icon-right">
                        <Input
                          type="password"
                          className={
                            this.state.confirmPassword
                              ? "form-control input floatingLabel round"
                              : "form-control round"
                          }
                          onChange={this.handleChangeConfirmPassword.bind(this)}
                          onFocus={this.handleFocusConfirmPassword.bind(this)}
                          onBlur={this.handleBlurConfirmPassword.bind(this)}
                          id="confirmpassword"
                          name="confirm"
                          validations={[isEqual]}
                        />
                        <label
                          class="form-control-placeholder"
                          for="confirmpassword"
                        >
                          Confirm password
                        </label>

                        <div className="form-control-position">
                          <Info size={16} className="formIcon" />
                        </div>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mT-13">
                  <Col md={6}>
                    <form ref="breakfastForm" style={{ padding: 0 }}>
                      {/* Custom icons */}

                      <label>
                        <Toggle
                          defaultChecked={this.state.soupIsReady}
                          icons={{
                            checked: "Active",
                            unchecked: "Inactive",
                          }}
                          onChange={this.handleSoupChange.bind(this)}
                        />
                      </label>
                    </form>
                  </Col>
                 
                  <Col md={6} className="justify-content-md-end d-flex">
                    {console.log(
                      "sdfsdfsdfweeeeeeeeee",
                      this.state.company,
                      this.state.department
                    )}
                    <Button
                      type="submit"
                      className="blue-btn mR25"
                      disabled={
                        !this.state.company ||
                        !this.state.department ||
                        !this.state.designation ||
                        !this.state.reportTo ||
                        !this.state.role||
                        !this.state.name ||
                        !this.state.employeeCode ||
                        !this.state.mobile ||
                        !this.state.email ||
                        !this.state.userName ||
                        !this.state.password
                      }
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  company_details: state.companyDetailsReducer.companyDetails,
  user_create: state.userReducer.createUser,
  user_list: state.userReducer.usersList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      userCreation,
      companyDetails,
      fetchUserList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UsersCreate);
