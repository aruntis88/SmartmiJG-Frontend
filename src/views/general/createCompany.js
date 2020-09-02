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
  Form,
  FormGroup,
  Input,
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
} from "react-feather";
import Select from "react-select";
import classnames from "classnames";
import product from "../../../assets/img/product@2x.png";
import color from "../../../assets/img/color.png";
import back from "../../../assets/img/back.png";

import { defaultTheme } from "react-select";
import Dropzone from "react-dropzone";
import validator from "validator";
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

const mobErr= (str) => {
  if (!validator.isMobilePhone(str, ["en-IN"])) {
    
    return (
      <span className="error sticky">Mobile Number not valid/cannot be blank. .</span>
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
      nameError: "",
      codeError: "",
      phoneError: "",
      emailError: "",
      countryError: "",
      addressError: "",
      logoError: "",
      headerError: "",
      footerError: "",
      webError: "",

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
  }
  

  handleChangeCompanyName(e) {
    this.setState({ companyName: e.target.value });
  }
 


  handleChangeCompanyCode(e) {
    this.setState({ companyCode: e.target.value });
  }
  
  handleChangePhone(e) {
    this.setState({ phone: e.target.value });
  }
  
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  
  handleChangeFax(e) {
    this.setState({ fax: e.target.value });
  }
  
  handleChangeWebsite(e) {
    this.setState({ website: e.target.value });
  }
  
  handleChangeAddress1(e) {
    this.setState({ address1: e.target.value });
  }
  
  handleChangeAddress2(e) {
    this.setState({ address2: e.target.value });
  }
  
  handleChangeStatus(e) {
    this.setState({ is_active: e.target.checked });
  }
  
  handleChangeER(e) {
    this.setState({ enableReport: e.target.value });
  }

  validate = () => {
    console.log(this.state.filesLogo)
    let nameError="";
    let codeError="";
    let phoneError="";
    let emailError="";
    let countryError="";
    let addressError="";
    let logoError = "";
    let webError = "";
    let headerError = "";
    let footerError = "";

    let numbers = /^[0-9]+$/;
    let letters = /^[a-zA-Z,. ]*$/;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let phoneno = /^\d{10}$/;
    let alphanumeric = /^[0-9a-zA-Z,/ ]+$/;

    if (this.state.companyName.length < 1) {
      nameError = "You can't leave this field blank";
    }

   if (!this.state.companyName.match(letters)) {
      nameError = 'Please input alphabet characters only'
    }

    if (this.state.companyCode.length < 1) {
      codeError = "Code should not be empty"

    if (this.state.companyCode.length < 3 || this.state.companyCode.length > 6) {
      codeError = "Code should not be empty / length be between 3 to 6"
    }

    if (!this.state.phone.match(phoneno)) {
      phoneError = "Not a valid phone number"
    }

    if (!this.state.email.match(mailformat)) {
      emailError = "Enter a valid email address"
    }

    if (!this.state.country) {
      countryError = "Choose your country"
    }

    if (!this.state.address1.match(alphanumeric)) {

      addressError = "Not a valid address pattern"

      addressError = "User address must have alphanumeric characters only"

    }

    if (this.state.filesLogo.length < 1) {
      logoError = "Upload your logo image"
    }

    if (this.state.filesHeader.length < 1) {
      headerError = "Upload your header image"
    }

    if (this.state.filesFooter.length < 1) {
      footerError = "Upload your footer image"
    }

    if (!this.state.website.includes("www") && !this.state.website.includes(".")) {
      webError = "Enter a valid URL"
    }

    if (nameError || codeError || phoneError || emailError || countryError || addressError || logoError || webError || headerError || footerError) {
      this.setState({ nameError, codeError, phoneError, emailError, countryError, addressError, logoError, webError, headerError, footerError});
      return false;
    }

    return true;
  }

  handleSubmitCompanies =(e) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState({ nameError: "",
      codeError: "",
      phoneError: "",
      emailError: "",
      countryError: "",
      addressError: "",
      logoError: "",
      webError: "",
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
  chooseColor=(colorId)=> {
    // this.setState({ color: colorId });
    console.log("colorId", colorId);
    this.setState({ color: colorId });

    console.log("this.state.color", this.state.color);
  }
  chosenColor=()=> {
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
                <Col>
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
                    <FormGroup>
                      <Label for="basicinput">Company name</Label>
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        placeholder="Company name"
                        onChange={this.handleChangeCompanyName.bind(this)}
                      />
                      {this.state.nameError ? (
                          <div className="cValidation"> 
                            {this.state.nameError}
                          </div>
                        ): null }
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="basicinput"> Company code</Label>
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        placeholder="E.g. QIC, KMCProduct name"
                        onChange={this.handleChangeCompanyCode.bind(this)}
                      />
                      {this.state.codeError ? (
                          <div className="cValidation"> 
                            {this.state.codeError}
                          </div>
                          ): null}
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label>Phone</Label>
                      <div className="position-relative has-icon-right">
                        <Input
                          type=""
                          className="round"
                          placeholder="Phone"
                          onChange={this.handleChangePhone.bind(this)}
                        />
                        <div className="form-control-position">
                          <Info size={16} className="formIcon" />
                        </div>
                      </div>
                      {this.state.phoneError ? (
                          <div className="cValidation"> 
                            {this.state.phoneError}
                          </div>
                          ): null}
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label>Email</Label>
                      <div className="position-relative has-icon-right">
                        <Input
                          type=""
                          className="round"
                          placeholder="Email id"
                          onChange={this.handleChangeEmail.bind(this)}
                        />
                        <div className="form-control-position">
                          <AtSign size={16} className="formIcon" />
                        </div>
                      </div>
                      {this.state.emailError ? (
                          <div className="cValidation"> 
                            {this.state.emailError}
                          </div>
                          ): null}
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label>Fax</Label>
                      <div className="position-relative has-icon-right">
                        <Input
                          type=""
                          className="round"
                          placeholder="Fax"
                          onChange={this.handleChangeFax.bind(this)}
                        />
                        <div className="form-control-position">
                          <Info size={16} className="formIcon" />
                        </div>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label>Website</Label>

                      <Input
                        type=""
                        className="round"
                        placeholder="www.sample.com"
                        onChange={this.handleChangeWebsite.bind(this)}
                      />
                      {this.state.webError ? (
                          <div className="cValidation"> 
                            {this.state.webError}
                          </div>
                          ): null}
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label>Country</Label>

                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        options={this.state.countryOptions}
                        onChange={this.handleChangeCountry.bind(this)}
                      />
                      {this.state.countryError ? (
                          <div className="cValidation"> 
                            {this.state.countryError}
                          </div>
                          ): null}
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="basicinput"> Address line 1</Label>
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        placeholder="Street, Area, Zip"
                        onChange={this.handleChangeAddress1.bind(this)}
                      />
                       {this.state.addressError ? (
                          <div className="cValidation"> 
                            {this.state.addressError}
                          </div>
                          ): null}
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
                    <FormGroup>
                      <Label for="basicinput"> Address line 2</Label>
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        placeholder="City, State"
                        onChange={this.handleChangeAddress2.bind(this)}
                      />
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
                          <div className="cValidation"> 
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
                          <div className="cValidation"> 
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
                          <div className="cValidation"> 
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
