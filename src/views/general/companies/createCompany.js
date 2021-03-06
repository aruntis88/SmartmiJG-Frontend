// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../../components/contentHead/contentHeader";
import ContentSubHeader from "../../../components/contentHead/contentSubHeader";
import { connect } from "react-redux";
import { companiesCreation } from "../../../redux/sagas/companies/fetchCompaniesCreate";
import { bindActionCreators } from "redux";
import commingSoon from "../../../assets/img/commingSoon.png";
import { countryList } from "../../../redux/sagas/customers/fetchCountryList";
import history from '../../../app/history';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  FormGroup,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Toggle from "react-toggle";
import {
  // Moon,
  Home,
  Mail,
  Menu,
  MoreVertical,
  Check,
  Bell,
  User,
  AlertTriangle,
  Inbox,
  Phone,
  Calendar,
  Lock,
  X,
  LogOut,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  AtSign,
  Info,
  Printer,
} from "react-feather";
import Select from "react-select";
import classnames from "classnames";
import product from "../../../assets/img/product@2x.png";
import color from "../../../assets/img/color.png";
import back from "../../../assets/img/back.png";

import { defaultTheme } from "react-select";
import validator from "validator";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
library.add(faCheckSquare, faCoffee, faCloudUploadAlt);
const { colors } = defaultTheme;
const selectStyles = {
  control: (provided) => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" }),
};
let countryOptions = [];

const required = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return <span className="error">Required Fields cannot be blank</span>;
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

const web = (value) => {
  if (!value.includes("www" && ".")) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return <span className="error">Not a valid Url</span>;
  }
};

const email = (value) => {
  if (!validator.isEmail(value)) {
    // return <span className="error">{value} is not a valid email.</span>;
    return <span className="error">Not a valid email.</span>;
  }
};

const mob = (number) => {
  if (!validator.isMobilePhone(number)) {
    return (
      <span className="error">Not a valid Phone Number.</span>
    );
  }
};

class CreateCompany extends Component {
  constructor(props) {
    super(props);
    this.props.countryList();
    this.reader = new FileReader();
    this.state = {
      dropdownOpen: false,
      filesLogo: [],
      filesHeader: [],
      filesFooter: [],
      companyName: "",
      companyCode: "",
      phone: "",
      email: "",
      fax: "",
      website: "",
      country: "",
      address1: "",
      address2: "",
      logo: "",
      header: "",
      footer: "",
      countryOptions: [],
      is_active: false,
      enableReport: false,
      color: "#1ECDA8",
      activeColor: "#1ECDA8",
      logoError: "",
      headerError: "",
      footerError: "",

    };
    this.onDropLogo = this.onDropLogo.bind(this);
  }


  componentWillReceiveProps() {
    setTimeout(() => {
      this.props.country_list.map((country, i) => {
        var obj = {};

        obj["value"] = country.id;
        obj["label"] = country.name;
        countryOptions.push(obj);
        obj = {};
      });
      this.setState({ countryOptions: countryOptions });
    }, 1000);
  }
  toggle = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };
  onDropLogo = (filesLogo) => {
    const imageFile = filesLogo[0];
    
    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      this.setState({ logoError: 'Please select valid image' });
      return false;
    }
    if (imageFile.size > 1000000 ) {
      this.setState({ logoError: 'File size is greater than 1 Mb' });
      return false;
    }

    this.setState({
      filesLogo,
      logoError: ""
    });
  };
  clearPreviewLogo() {
    this.state.filesLogo = [];
    this.forceUpdate();
  }
  onDropHeader = (filesHeader) => {
    const imageFile = filesHeader[0];
    
    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      this.setState({ headerError: 'Please select valid image' });
      return false;
    }
    if (imageFile.size > 1000000 ) {
      this.setState({ headerError: 'File size is greater than 1 Mb' });
      return false;
    }
    this.setState({
      filesHeader,
      headerError: ""
    });
  };
  clearPreviewHeader() {
    this.state.filesHeader = [];
    this.forceUpdate();
  }
  onDropFooter = (filesFooter) => {
    const imageFile = filesFooter[0];
    
    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      this.setState({ footerError: 'Please select valid image' });
      return false;
    }
    if (imageFile.size > 1000000 ) {
      this.setState({ footerError: 'File size is greater than 1 Mb' });
      return false;
    }
    this.setState({
      filesFooter,
      footerError: "",
    });
  };
  clearPreviewFooter() {
    this.state.filesFooter = [];
    this.forceUpdate();
  }
  handleChangeCountry(e) {
    this.setState({ country: e.value });
    console.log(e)
  }
  handleFocusCountry() {
    this.setState({ countryFocus: true });
  }
  handleBlurCountry() {
    this.setState({ countryFocus: false });
  }

  handleChangeCompanyName(e) {
    this.setState({ companyName: e.target.value });
  }
  handleFocusCompanyName() {
    this.setState({ companyNameFocus: true });
  }
  handleBlurCompanyName() {
    this.setState({ companyNameFocus: false });
  }

  handleChangeCompanyCode(e) {
    this.setState({ companyCode: e.target.value });
  }
  handleFocusCompanyCode() {
    this.setState({ companyCodeFocus: true });
  }
  handleBlurCompanyCode() {
    this.setState({ companyCodeFocus: false });
  }

  handleChangePhone(e) {
    this.setState({ phone: e.target.value });
  }
  handleFocusPhone() {
    this.setState({ phoneFocus: true });
  }
  handleBlurPhone() {
    this.setState({ phoneFocus: false });
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

  handleChangeFax(e) {
    this.setState({ fax: e.target.value });
  }
  handleFocusFax() {
    this.setState({ faxFocus: true });
  }
  handleBlurFax() {
    this.setState({ faxFocus: false });
  }

  handleChangeWebsite(e) {
    this.setState({ website: e.target.value });
  }
  handleFocusWebsite() {
    this.setState({ websiteFocus: true });
  }
  handleBlurWebsite() {
    this.setState({ websiteFocus: false });
  }

  handleChangeAddress1(e) {
    this.setState({ address1: e.target.value });
  }
  handleFocusAddress1() {
    this.setState({ address1Focus: true });
  }
  handleBlurAddress1() {
    this.setState({ address1Focus: false });
  }

  handleChangeAddress2(e) {
    this.setState({ address2: e.target.value });
  }
  handleFocusAddress2() {
    this.setState({ address2Focus: true });
  }
  handleBlurAddress2() {
    this.setState({ address2Focus: false });
  }
  handleChangeStatus(e) {
    this.setState({ is_active: e.target.checked });
  }
  handleChangeER(e) {
    this.setState({ enableReport: e.target.value });
  }

  validate = () => {
    console.log(this.state.filesLogo)
    
    let logoError = "";
    let headerError = "";
    let footerError = "";

    if (this.state.filesLogo.length < 1) {
      logoError = "Upload your logo image"
    }

    if (this.state.filesHeader.length < 1) {
      headerError = "Upload your header image"
    }

    if (this.state.filesFooter.length < 1) {
      footerError = "Upload your footer image"
    }


    if ( logoError || headerError || footerError) {
      this.setState({ logoError, headerError, footerError});
      return false;
    }

    return true;
  }

  handleSubmitCompanies(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState({
      logoError: "",
      headerError: "",
      footerError: "",
      });

      let bodyData = {
      name: this.state.companyName,
      logo: this.state.filesLogo[0],
      code: this.state.companyCode,
      address1: this.state.address1,
      address2: this.state.address2,
      phone: this.state.phone,
      fax: this.state.fax,
      email: this.state.email,
      website: this.state.website,
      is_active: this.state.is_active,
      enable_reports: this.state.enableReport,
      is_group: false,
      header_img: this.state.filesHeader[0],
      footer_img: this.state.filesFooter[0],
      country: this.state.country,
      color: this.state.activeColor,
    };
    
    this.props.companiesCreation(bodyData)
    history.push({
             pathname:"/general",
             state: "company"
            });
    }
    
  }
  chooseColor(colorId) {
    // this.setState({ color: colorId });
    console.log("colorId", colorId);
    this.setState({ color: colorId });

    console.log("this.state.color", this.state.color);
  }
  chosenColor() {
    this.setState({ activeColor: this.state.color });
    console.log("this.activeColor.color", this.state.activeColor);
    this.toggle();
  }
  render() {
    if (this.props.companies_create) return <Redirect to="/general"></Redirect>;
    return (
      <Fragment>
        <div className="userModule generalModule mT25">
          <Col md={6}>
            <Breadcrumb>
              <BreadcrumbItem>
                <a href="">
                  <Home size={15} />
                </a>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <a href="/general">companies</a>
              </BreadcrumbItem>
              <BreadcrumbItem active>Create new company</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0">
            <Form>
              <FormGroup className="searchInput">
                <div className="position-relative has-icon-left">
                  <Input type="text" id="iconLeft" name="iconLeft" />
                  <div className="form-control-position">
                    <Search size={16} />
                  </div>
                </div>
              </FormGroup>
            </Form>
          </Col>
          <Card className="col-md-12">
            <CardHeader>
              <Row className="row align-items-center">
                <Col style={{fontWeight: "600"}}>
                  <Link to="/general">
                    <img src={back} style={{ marginRight: 15 }} />
                  </Link>
                  Create New Company
                </Col>
                <Col className="d-flex justify-content-md-end align-items-center">
                  <span style={{ marginRight: 15 }}>Select a color</span>
                  <Dropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                    className="colorSelector"
                  >
                    <DropdownToggle className="dotMenuButton">
                      {this.state.color ? (
                        <span
                          className="colorCircle"
                          style={{ background: this.state.color }}
                        />
                      ) : (
                        <img src={color} />
                      )}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <Card>
                        <CardHeader>Select a color</CardHeader>
                        <CardBody>
                          <div
                            style={{ display: "inline-block", width: "100%" }}
                          >
                            <span
                              className="colorCircle"
                              style={{ background: this.state.color }}
                            />
                            <span className="colorCode">
                              {this.state.color}
                            </span>
                            <span
                              className="colorSave"
                              onClick={() => this.chosenColor()}
                            >
                              Save
                            </span>
                          </div>
                          <hr
                            style={{ borderColor: "#EAEDF1", margin: "5px 0" }}
                          />
                          <Row>
                            <Col md={3}>
                              <span
                                className="colorCircle main"
                                style={{ background: "#1ECDA8" }}
                                onClick={() => this.chooseColor("#1ECDA8")}
                              />
                            </Col>
                            <Col md={3}>
                              <span
                                className="colorCircle main"
                                style={{ background: "#1EBEDE" }}
                                onClick={() => this.chooseColor("#1EBEDE")}
                              />
                            </Col>
                            <Col md={3}>
                              <span
                                className="colorCircle main"
                                style={{ background: "#85796C" }}
                                onClick={() => this.chooseColor("#85796C")}
                              />
                            </Col>
                            <Col md={3}>
                              <span
                                className="colorCircle main"
                                style={{ background: "#FDA633" }}
                                onClick={() => this.chooseColor("#FDA633")}
                              />
                            </Col>
                            <Col md={3}>
                              <span
                                className="colorCircle main"
                                style={{ background: "#FD4577" }}
                                onClick={() => this.chooseColor("#FD4577")}
                              />
                            </Col>
                            <Col md={3}>
                              <span
                                className="colorCircle main"
                                style={{ background: "#447EFF" }}
                                onClick={() => this.chooseColor("#447EFF")}
                              />
                            </Col>
                            {/* <Col md={3}>
                              <span
                                className="colorCircle main"
                                style={{ background: "#1ECDA8" }}
                              />
                            </Col> */}
                          </Row>
                        </CardBody>
                      </Card>
                    </DropdownMenu>
                  </Dropdown>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form style={{ padding: 0 }}>
                <Row>
                  <Col md={6}>
                    <FormGroup
                      className={
                        this.state.companyNameFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.companyName ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        id="companyName"
                        className={
                          this.state.companyName
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeCompanyName.bind(this)}
                        onFocus={this.handleFocusCompanyName.bind(this)}
                        onBlur={this.handleBlurCompanyName.bind(this)}
                        validations={[required]}
                        style={{marginBottom: "3rem"}}
                      />
                      <Label className="form-control-placeholder">Company name*</Label>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup
                      className={
                        this.state.companyCodeFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.companyCode ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        id="companyCode"
                        className={
                          this.state.companyCode
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeCompanyCode.bind(this)}
                        onFocus={this.handleFocusCompanyCode.bind(this)}
                        onBlur={this.handleBlurCompanyCode.bind(this)}
                        validations={[required]}
                        style={{marginBottom: "3rem"}}
                      />
                      <Label className="form-control-placeholder"> Company code</Label>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup
                      className={
                        this.state.phoneFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.phone ? "hasValue" : "hasnoValue"}
                    >
                      <div className="position-relative has-icon-right">
                        <Input
                          type="text"
                          id="iconRight"
                          name="iconRight"
                          className={
                          this.state.phone
                            ? "form-control input floatingLabel round"
                            : "form-control round"
                          }
                          onChange={this.handleChangePhone.bind(this)}
                          onFocus={this.handleFocusPhone.bind(this)}
                          onBlur={this.handleBlurPhone.bind(this)}
                          validations={[required, mob]}
                          style={{marginBottom: "3rem"}}
                        />
                        <label className="form-control-placeholder" for="mobile">
                          Phone*
                        </label>
                        <div className="form-control-position" style={{height: "42.5px"}}>
                          <Phone size={16} className="formIcon" />
                        </div>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
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
                          validations={[required, email]}
                          style={{marginBottom: "3rem"}}
                        />
                        <label className="form-control-placeholder" for="email">
                          Email*
                        </label>
                        <div className="form-control-position" style={{height: "42.5px"}}>
                          <AtSign size={16} className="formIcon" />
                        </div>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup
                      className={
                        this.state.faxFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.fax ? "hasValue" : "hasnoValue"}
                    >
                      <div className="position-relative has-icon-right">
                        <Input
                          type="text"
                          id="iconRight"
                          name="iconRight"
                          className={
                          this.state.fax
                            ? "form-control input floatingLabel round"
                            : "form-control round"
                          }
                          onChange={this.handleChangeFax.bind(this)}
                          onFocus={this.handleFocusFax.bind(this)}
                          onBlur={this.handleBlurFax.bind(this)}
                          style={{marginBottom: "3rem"}}
                        />
                        <label className="form-control-placeholder">
                          Fax*
                        </label>
                        <div className="form-control-position" style={{height: "42.5px"}}>
                          <Printer size={16} className="formIcon" />
                        </div>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup
                      className={
                        this.state.websiteFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.website ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                          id="iconRight"
                          name="iconRight"
                          className={
                          this.state.website
                            ? "form-control input floatingLabel round"
                            : "form-control round"
                          }
                        onChange={this.handleChangeWebsite.bind(this)}
                        onFocus={this.handleFocusWebsite.bind(this)}
                        onBlur={this.handleBlurWebsite.bind(this)}
                        validations={[required, web]}
                        style={{marginBottom: "3rem"}}
                      />
                      <label className="form-control-placeholder">
                          Website*
                        </label>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup
                      className={
                        this.state.countryFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.country ? "hasValue" : "hasnoValue"}
                    >
                      <Select
                        isSearchable={true}
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        className={
                          this.state.country
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.countryFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        name="color"
                        style={{marginBottom: "3rem"}}
                        onChange={this.handleChangeCountry.bind(this)}
                        onFocus={this.handleFocusCountry.bind(this)}
                        onBlur={this.handleBlurCountry.bind(this)}
                        options={this.state.countryOptions}
                        placeholder=""
                        id={this.state.countryFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                      />
                      <Label className="form-control-placeholder">
                        Country*
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup
                      className={
                        this.state.address1Focus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.address1 ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        className={
                          this.state.address1
                            ? "form-control input floatingLabel"
                            : "form-control"
                          }
                        onChange={this.handleChangeAddress1.bind(this)}
                        onFocus={this.handleFocusAddress1.bind(this)}
                        onBlur={this.handleBlurAddress1.bind(this)}
                        validations={[required]}
                        style={{marginBottom: "3rem"}}
                      />
                      <label className="form-control-placeholder">
                          Address line 1*
                        </label>
                    </FormGroup>

                    {/* Custom icons */}
                    <Label for="basicinput"> Status</Label>

                    <label>
                      <Toggle
                        defaultChecked={this.state.is_active}
                        icons={{
                          checked: "Active",
                          unchecked: "Inactive",
                        }}
                        onChange={this.handleChangeStatus.bind(this)}
                      />
                    </label>
                  </Col>
                  <Col md={3}>
                    <FormGroup
                      className={
                        this.state.address2Focus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.address2 ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        className={
                          this.state.address2
                            ? "form-control input floatingLabel"
                            : "form-control"
                          }
                        onChange={this.handleChangeAddress2.bind(this)}
                        onFocus={this.handleFocusAddress2.bind(this)}
                        onBlur={this.handleBlurAddress2.bind(this)}
                        validations={[required]}
                        style={{marginBottom: "3rem"}}
                      />
                      <label className="form-control-placeholder">
                          Address line 2*
                        </label>
                    </FormGroup>

                    {/* Custom icons */}
                    <Label for="basicinput"> Enable reports</Label>
                    <label>
                      <Toggle
                        defaultChecked={this.state.enable_reports}
                        icons={{
                          checked: "Active",
                          unchecked: "Inactive",
                        }}
                        onChange={this.handleChangeER.bind(this)}
                      />
                    </label>
                  </Col>
                  <Col md={2} className="position-relative">
                    <div className="dropzone">
                      <FormGroup>
                        <Label for="basicinput">Logo</Label>
                        {this.state.filesLogo.length > 0 ? (
                          <div className="position-relative">
                            {this.state.filesLogo.map((file) => (
                              <img
                                src={file.preview}
                                className="img-fluid imgPreview"
                              />
                            ))}
                            <X
                              size={15}
                              className="imgPreviewClose"
                              onClick={this.clearPreviewLogo.bind(this)}
                            />
                          </div>
                        ) : (
                          <Dropzone
                            onDrop={this.onDropLogo.bind(this)}
                            className="drophere"
                            style={{
                              minHeight: "auto",
                              padding: 5,
                            }}
                          >
                            <div>
                              <FontAwesomeIcon icon="cloud-upload-alt" />
                              <p>
                                Upload logo <br />
                                500x500px
                              </p>
                            </div>
                          </Dropzone>
                        )}
                        {this.state.logoError ? (
                          <div style={{color:"red"}}> 
                            {this.state.logoError}
                          </div>
                          ): null}
                      </FormGroup>
                    </div>
                  </Col>
                  <Col md={2} className="position-relative">
                    <div className="dropzone">
                      <FormGroup>
                        <Label for="basicinput">Header</Label>
                        {this.state.filesHeader.length > 0 ? (
                          <div className="position-relative">
                            {this.state.filesHeader.map((file) => (
                              <img
                                src={file.preview}
                                className="img-fluid imgPreview"
                              />
                            ))}
                            <X
                              size={15}
                              className="imgPreviewClose"
                              onClick={this.clearPreviewHeader.bind(this)}
                            />
                          </div>
                        ) : (
                          <Dropzone
                            onDrop={this.onDropHeader.bind(this)}
                            className="drophere"
                            style={{
                              minHeight: "auto",
                              padding: 5,
                            }}
                          >
                            <div>
                              <FontAwesomeIcon icon="cloud-upload-alt" />
                              <p>
                                Upload quote header <br />
                                1200x200px
                              </p>
                            </div>
                          </Dropzone>
                        )}
                        {this.state.headerError ? (
                          <div style={{color:"red"}}>
                            {this.state.headerError}
                          </div>
                          ): null}
                      </FormGroup>
                    </div>
                  </Col>
                  <Col md={2} className="position-relative">
                    <div className="dropzone">
                      <FormGroup>
                        <Label for="basicinput">Footer</Label>
                        {this.state.filesFooter.length > 0 ? (
                          <div className="position-relative">
                            {this.state.filesFooter.map((file) => (
                              <img
                                src={file.preview}
                                className="img-fluid imgPreview"
                              />
                            ))}
                            <X
                              size={15}
                              className="imgPreviewClose"
                              onClick={this.clearPreviewFooter.bind(this)}
                            />
                          </div>
                        ) : (
                          <Dropzone
                            onDrop={this.onDropFooter.bind(this)}
                            className="drophere"
                            style={{
                              minHeight: "auto",
                              padding: 5,
                            }}
                          >
                            <div>
                              <FontAwesomeIcon icon="cloud-upload-alt" />
                              <p>
                                Upload quote footer <br />
                                1200x200px
                              </p>
                            </div>
                          </Dropzone>
                        )}
                        {this.state.footerError ? (
                          <div style={{color:"red"}}> 
                            {this.state.footerError}
                          </div>
                          ): null}
                      </FormGroup>
                    </div>
                  </Col>
                  <Col md={12} className="justify-content-md-end d-flex">
                    <Button
                      type="submit"
                      className="blue-btn"
                      onClick={this.handleSubmitCompanies.bind(this)}
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
  companies_create: state.companiesReducer.createCompanies,
  country_list: state.customerReducer.countryList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      companiesCreation,
      countryList,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CreateCompany);
