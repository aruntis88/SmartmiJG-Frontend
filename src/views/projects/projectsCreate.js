// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { segmentDetails } from "../../redux/sagas/projects/fetchSegmentList";
import { salesEngineerFilter } from "../../redux/sagas/users/fetchSalesEngineer";
import { countryList } from "../../redux/sagas/customers/fetchCountryList";
import { fetchCustomerList } from "../../redux/sagas/customers/fetchCustomers";
import { fetchCustomerCList } from "../../redux/sagas/customers/fetchCustomersC";
import { fetchCustomerDCList } from "../../redux/sagas/customers/fetchCustomersDC";
import { fetchCustomerMCList } from "../../redux/sagas/customers/fetchCustomersMC";
import { fetchCustomerOList } from "../../redux/sagas/customers/fetchCustomersO";
import { fetchCustomerSCList } from "../../redux/sagas/customers/fetchCustomersSC";
import { fetchCustomerSCOList } from "../../redux/sagas/customers/fetchCustomersSCO";
import { fetchCustomerTList } from "../../redux/sagas/customers/fetchCustomersT";
import { fetchCustomerMSCList } from "../../redux/sagas/customers/fetchCustomersMSC";
import { projectCreation } from "../../redux/sagas/projects/fetchProjectCreate";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import NumberFormat from "react-number-format";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Geocode from "react-geocode";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import GoogleMapReact from "google-map-react";
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
  InputGroup,
  Button,
  FormText,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Home, Search, AtSign, Info, User } from "react-feather";
import Toggle from "react-toggle";
import Select from "react-select";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import { ThLargeIcon } from "react-line-awesome";
import Redirect from "react-router-dom/Redirect";
import locationIMG from "../../assets/img/location.png";
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
let stageOptions = [
  { value: "T", label: "Tender" },
  { value: "J", label: "Job In Hand" },
];
let statusOptions = [
  { value: "TR", label: "Tender" },
  { value: "JC", label: "JJIH-Main Contractor" },
  { value: "J1", label: "JIH-Stage 1" },
  { value: "J2", label: "JIH-Stage 2" },
  { value: "J3", label: "JIH-Stage 3" },
  { value: "J4", label: "JIH-Stage 4" },
  { value: "CL", label: "Closed" },
  { value: "CA", label: "Cancelled" },
];
let segmentOptions = [];
let countryOptions = [];
let introduceOptions = [];
let clientOptions = [];
let otherOptions = [];
let subcontractorOptions = [];
let traderOptions = [];
let mainContractorOptions = [];
let mainSubContractorOptions = [];
let designConsultantOptions = [];
let supervisionConsultantOptions = [];
const uuidv1 = require("uuid/v1");
const AnyReactComponent = null;

const K_WIDTH = 80;
const K_HEIGHT = 80;
const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: "absolute",
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  // border: "5px solid #f44336",
  // borderRadius: K_HEIGHT,
  // backgroundColor: "white",
  // textAlign: "center",
  // color: "#3f51b5",
  // fontSize: 16,
  // fontWeight: "bold",
  padding: "15px 8px",
};
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

const completion = (value) => {
  let numbers = /^[0-9]+$/;
  if (!value.toString().trim().length) {
    return <span className="error">Required Fields cannot be blank</span>;
  }
  if(!value.match(numbers)) {
    return <span className="error">Please input numbers only</span>;
  }
};
class ProjectsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soupIsReady: true,
      selectedDate: "2017-08-13",
      projectName: "",
      stage: "",
      status: "",
      segment: "",
      country: "",
      introduceBy: "",
      introducedDate: "",
      value: "",
      completion: "",
      expectStartDate: "",
      expectEndDate: "",
      mapAddress: "",
      projectAddress: "",
      client: "",
      mainContractor: "",
      mainSubContractor: "",
      designConsultant: "",
      supervisionConsultant: "",
      fields: ["projectName","stage","status","segment","country","introduceBy","introducedDate","value","completion","expectStartDate","expectEndDate","projectAddress","client","mainContractor","mainSubContractor","designConsultant","supervisionConsultant"],
      buttonEnabled:false,
      segmentOptions: [],
      countryOptions: [],
      introduceOptions: [],
      clientOptions: [],
      otherOptions: [],
      subcontractorOptions: [],
      traderOptions: [],
      mainContractorOptions: [],
      mainSubContractorOptions: [],
      designConsultantOptions: [],
      supervisionConsultantOptions: [],
      filterObj: {
        page: 1,
        activePage: 1,
      },
      address: "",
      center: {
        lat: 25.3548,
        lng: 51.1839,
      },
      lat: null,
      lng: null,
      zoom: 8,
    };
    this.onChange = this.onChange.bind(this);
    this.props.segmentDetails();
    this.props.countryList();
    this.props.salesEngineerFilter();
    this.props.fetchCustomerList();
    this.props.fetchCustomerCList();
    this.props.fetchCustomerDCList();
    this.props.fetchCustomerMCList();
    this.props.fetchCustomerMSCList();
    this.props.fetchCustomerOList();
    this.props.fetchCustomerSCList();
    this.props.fetchCustomerSCOList();
    this.props.fetchCustomerTList();
  }
  handleSelect = (address) => {
    this.setState({ address: address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(
        (latLng) => (
          localStorage.setItem("latitude", latLng.lat),
          localStorage.setItem("longitude", latLng.lng),
          this.setState({ lat: latLng.lat }),
          this.setState({ lng: latLng.lng })(
            // (this.state.center.lat = latLng.lat),
            // (this.state.center.lng = latLng.lng),
            (AnyReactComponent = ({ text }) => (
              <div style={greatPlaceStyle}>
                <div className="position-relative">
                  {text}
                  <img src={locationIMG} className="locationIMG img-fluid" />
                </div>
              </div>
            ))
          )
        )
      )
      .catch((error) => console.error("Error", error));
  };
  handleChange = (address) => {
    this.setState({ address });
  };
  componentWillReceiveProps() {
    setTimeout(() => {
      if (this.props.segment_list) {
        this.props.segment_list.map((segment, key) => {
          var obj = {};
          obj["value"] = segment.id;
          obj["label"] = segment.name;
          segmentOptions.push(obj);

          obj = {};
        });
      }
      if(this.props.country_list){
        this.props.country_list.map((country, i) => {
          var obj = {};
  
          obj["value"] = country.id;
          obj["label"] = country.name;
          countryOptions.push(obj);
          obj = {};
        });
      }
     
      if (this.props.sales_engg_user) {
        this.props.sales_engg_user.map((sales_user, key) => {
          var obj = {};

          obj["value"] = sales_user.id;
          obj["label"] = sales_user.username;
          introduceOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.customer_list_C.results) {
        this.props.customer_list_C.results.map((customer, i) => {
          let obj = {};
          obj["value"] = customer.id;
          obj["label"] = customer.name;
          clientOptions.push(obj);
          obj = {};
        });
      }
      
      if (this.props.customer_list_DC.results) {
        this.props.customer_list_DC.results.map((customer, key) => {
          
          let obj = {};
          obj["value"] = customer.id;
          obj["label"] = customer.name;
          designConsultantOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.customer_list_MC.results) {
        this.props.customer_list_MC.results.map((customer, key) => {
          let obj = {};
          obj["value"] = customer.id;
          obj["label"] = customer.name;
          mainContractorOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.customer_list_MSC.results) {
        this.props.customer_list_MSC.results.map((customer, key) => {
          let obj = {};
          obj["value"] = customer.id;
          obj["label"] = customer.name;
          mainSubContractorOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.customer_list_O.results) {
        this.props.customer_list_O.results.map((customer, key) => {
          let obj = {};
          obj["value"] = customer.id;
          obj["label"] = customer.name;
          otherOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.customer_list_SC.results) {
        this.props.customer_list_SC.results.map((customer, key) => {
         
          let obj = {};
          obj["value"] = customer.id;
          obj["label"] = customer.name;
          supervisionConsultantOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.customer_list_SCO.results) {
        this.props.customer_list_SCO.results.map((customer, key) => {
          let obj = {};
          obj["value"] = customer.id;
          obj["label"] = customer.name;
          subcontractorOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.customer_list_T.results) {
        this.props.customer_list_T.results.map((customer, key) => {
          let obj = {};
          obj["value"] = customer.id;
          obj["label"] = customer.name;
          traderOptions.push(obj);
          obj = {};
        });
      }

      this.setState({ segmentOptions: segmentOptions });
      this.setState({ countryOptions: countryOptions });
      this.setState({ introduceOptions: introduceOptions });
      this.setState({ clientOptions: clientOptions });
      this.setState({ traderOptions: traderOptions });
      this.setState({ subcontractorOptions: subcontractorOptions });
      this.setState({ otherOptions: clientOptions });
      this.setState({ mainContractorOptions: mainContractorOptions });
      this.setState({ mainSubContractorOptions: mainSubContractorOptions });
      this.setState({ designConsultantOptions: designConsultantOptions });
      this.setState({
        supervisionConsultantOptions: supervisionConsultantOptions,
      });
      segmentOptions = [];
      countryOptions = [];
      introduceOptions = [];
      clientOptions = [];
      traderOptions = [];
      subcontractorOptions = [];
      otherOptions = [];
      mainContractorOptions = [];
      mainSubContractorOptions = [];
      mainSubContractorOptions = [];
      designConsultantOptions =[];
      supervisionConsultantOptions =[]
    }, 1000);
  }
  onChange(date) {
    this.setState({
      selectedDate: date,
    });
  }
  handleChangeProjectName(e) {
    this.setState({ projectName: e.target.value });
    // if(e.target.value !=""){
    //   this.removeFromFields("projectName");
    // }else {
    //   this.addToFields("projectName");
    // }
  }
  handleFocusName() {
    this.setState({ projectNameFocus: true });
  }
  handleBlurName() {
    this.setState({ projectNameFocus: false });
  }


  handleChangeStage(e) {
    this.setState({ stage: e.value });
    // if(e.value !=""){
    //   this.removeFromFields("stage");
    // }else {
    //   this.addToFields("stage");
    // }
  }
  handleFocusStage() {
    this.setState({ stageFocus: true });
    this.state.stageFocusStyle = true;
  }
  handleBlurStage() {
    this.setState({ stageFocus: false });
  }

  handleChangeStatus(e) {
    this.setState({ status: e.value });
    // if(e.value !=""){
    //   this.removeFromFields("status");
    // }else {
    //   this.addToFields("status");
    // }
  }
  handleFocusStatus() {
    this.setState({ statusFocus: true });
    this.state.statusFocusStyle = true;
  }
  handleBlurStatus() {
    this.setState({ statusFocus: false });
  }

  handleChangeSegment(e) {
    this.setState({ segment: e.value });
    // if(e.value !=""){
    //   this.removeFromFields("segment");
    // }else {
    //   this.addToFields("segment");
    // }
  }
  handleFocusSegment() {
    this.setState({ segmentFocus: true });
    this.state.segmentFocusStyle = true;
  }
  handleBlurSegment() {
    this.setState({ segmentFocus: false });
  }

  handleChangeCountry(e) {
    this.setState({ country: e.value });

  }
  handleFocusCountry() {
    this.setState({ countryFocus: true });
    this.state.countryFocusStyle = true;
  }
  handleBlurCountry() {
    this.setState({ countryFocus: false });
  }

  handleChangeIntroduceby(e) {
    this.setState({ introduceBy: e.value });
  }
  handleFocusIntroduceby() {
    this.setState({ introduceByFocus: true });
    this.state.introduceByFocusStyle = true;
  }
  handleBlurIntroduceby() {
    this.setState({ introduceByFocus: false });
  }

  handleChangeIntroducedDate(date) {
    let dateFormat = moment(date).format("YYYY-MM-DD");
    this.setState({
      introducedDate: dateFormat,
    });
  }
  handleFocusIntroducedDate() {
    this.setState({ introducedDateFocus: true });
    this.state.introducedDateFocusStyle = true;
  }
  handleBlurIntroducedDate() {
    this.setState({ introducedDateFocus: false });
  }

  handleChangeValue(e) {
    this.setState({ value: e.target.value.replace(/\,/g,"") });
  }
  handleFocusValue() {
    this.setState ({ valueFocus: true})
  }
  handleBlurValue() {
    this.setState ({ valueFocus: false})
  }

  handleChangeCompletion(e) {
    this.setState({ completion: e.target.value });
    
  }
  handleFocusCompletion() {
    this.setState({ compFocus: true})
  }
  handleBlurCompletion() {
    this.setState({ compFocus: false})
  }

  handleChangeExpectStartDate(date) {
    let dateFormat = moment(date).format("YYYY-MM-DD");
    this.setState({
      expectStartDate: dateFormat,
    });
  }
  handleFocusExpectStartDate() {
    this.setState({ expectStartDateFocus: true });
    this.state.expectStartDateFocusStyle = true;
  }
  handleBlurExpectStartDate() {
    this.setState({ expectStartDateFocus: false });
  }

  handleChangeExpectEndDate(date) {
    let dateFormat = moment(date).format("YYYY-MM-DD");
    this.setState({
      expectEndDate: dateFormat,
    });
  }
  handleFocusExpectEndDate() {
    this.setState({ expectEndDateFocus: true });
    this.state.expectEndDateFocusStyle = true;
  }
  handleBlurExpectEndDate() {
    this.setState({ expectEndDateFocus: false });
  }

  handleChangeProjectAddress(e) {
    this.setState({ projectAddress: e.target.value });
  }
  handleFocusProjectAddress() {
    this.setState ({ addressFocus: true})
  }
  handleBlurProjectAddress() {
    this.setState ({ addressFocus: false})
  }

  handleChangeClient(e) {
    this.setState({ client: e.value });  
  }
  handleFocusClient() {
    this.setState({ clientFocus: true });
    this.state.clientFocusStyle = true;
  }
  handleBlurClient() {
    this.setState({ clientFocus: false });
  }

  handleChangeMainContractor(e) {
    this.setState({ mainContractor: e.value });
  }
  handleFocusMainContractor() {
    this.setState({ mainContractorFocus: true });
    this.state.mainContractorFocusStyle = true;
  }
  handleBlurMainContractor() {
    this.setState({ mainContractorFocus: false });
  }

  handleChangeSubMainContractor(e) {
    this.setState({ mainSubContractor: e.value });
  }
  handleFocusSubMainContractor() {
    this.setState({ mainSubContractorFocus: true });
    this.state.mainSubContractorFocusStyle = true;
  }
  handleBlurSubMainContractor() {
    this.setState({ mainSubContractorFocus: false });
  }

  handleChangeDesignConsultant(e) {
    this.setState({ designConsultant: e.value });
  }
  handleFocusDesignConsultant() {
    this.setState({ designConsultantFocus: true });
    this.state.designConsultantFocusStyle = true;
  }
  handleBlurDesignConsultant() {
    this.setState({ designConsultantFocus: false });
  }

  handleChangeSupervisionConsultant(e) {
    this.setState({ supervisionConsultant: e.value });
  }
  handleFocusSupervisionConsultant() {
    this.setState({ supervisionConsultantFocus: true });
    this.state.supervisionConsultantFocusStyle = true;
  }
  handleBlurSupervisionConsultant() {
    this.setState({ supervisionConsultantFocus: false });
  }

  checkFields(){         
    let fields = this.state.fields;
    console.log(fields);
    if(fields.length === 0){
      this.setState({buttonEnabled: true});
    } else{
      this.setState({buttonEnabled: false});
    }
    
    //this.setState({fields});
  }
  removeFromFields(str){
    var tempfields = this.state.fields;
    var index = tempfields.indexOf(str);
    if (index !== -1) tempfields.splice(index, 1);
    this.setState({fields:tempfields});
    this.checkFields();
  }
  addToFields(str){
    var tempfields = this.state.fields;
    if (tempfields.indexOf(str)==-1){
      tempfields.push(str);
    }
    this.checkFields();
  }
  handleSubmit() {
    let session_guid = uuidv1();
    let bodyData = {
      reference_no: session_guid,
      name: this.state.projectName,
      stage: this.state.stage,
      status: this.state.status,
      segment: this.state.segment,
      value: this.state.value,
      country: this.state.country,
      intro_by: this.state.introduceBy,
      intro_date: this.state.introducedDate,
      completion: this.state.completion,
      exp_start_date: this.state.expectStartDate,
      exp_end_date: this.state.expectEndDate,
      main_contractor: this.state.mainContractor,
      main_sub_contractor: this.state.mainSubContractor,
      client: this.state.client,
      design_consultant: this.state.designConsultant,
      supervision_consultant: this.state.supervisionConsultant,
      latitude: this.state.lat,
      longitude: this.state.lng,
    };
    this.props.projectCreation(bodyData);
  }
  render() {
    if (this.props.project_create) return <Redirect to="/projects"></Redirect>;
    const AnyReactComponent = ({ text }) => (
      <div style={greatPlaceStyle}>
        <div className="position-relative">
          {text}
          <img src={locationIMG} className="locationIMG img-fluid" />
        </div>
      </div>
    );
    return (
      <Fragment>
        <div className="userModule mT25">
          <Col md={6} className="pL0">
            <Breadcrumb>
              <BreadcrumbItem>
                <a href="/">
                  <Home size={15} />
                </a>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <a href="/projects">Projects</a>
              </BreadcrumbItem>
              <BreadcrumbItem active>Create new project</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0"></Col>
          <Card>
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Create new project</Col>
                <Col className="d-flex justify-content-md-end"></Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col xl="6" lg="6" md="12">
                    <FormGroup
                      className={
                        this.state.projectNameFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.projectName ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        id="projectName"
                        className={
                          this.state.projectName
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeProjectName.bind(this)}
                        onFocus={this.handleFocusName.bind(this)}
                        onBlur={this.handleBlurName.bind(this)}
                        validations={[required]}
                        style={{marginBottom: "3rem"}}
                      />
                      <label className="form-control-placeholder" for="projectName">
                        Project Name*
                      </label>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup
                      className={
                        this.state.stageFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.stage ? "hasValue" : "hasnoValue"}
                    >
                      <Select
                        isSearchable={true}
                        className={
                          this.state.stage
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.stageFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        classNamePrefix="select"
                        style={{marginBottom: "3rem"}}
                        // defaultValue={colourOptions[0]}
                        onChange={this.handleChangeStage.bind(this)}
                        onFocus={this.handleFocusStage.bind(this)}
                        onBlur={this.handleBlurStage.bind(this)}
                        options={stageOptions}
                        placeholder=""
                        id={this.state.stageFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                      />
                      <Label className="form-control-placeholder">
                        Stage*
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup
                      className={
                        this.state.statusFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.status ? "hasValue" : "hasnoValue"}
                    >
                      <Select
                        isSearchable={true}
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        className={
                          this.state.status
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.statusFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        name="color"
                        onChange={this.handleChangeStatus.bind(this)}
                        onFocus={this.handleFocusStatus.bind(this)}
                        onBlur={this.handleBlurStatus.bind(this)}
                        options={statusOptions}
                        placeholder=""
                        id={this.state.statusFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                        style={{marginBottom: "3rem"}}
                      />
                      <Label className="form-control-placeholder">
                        Status*
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12" style={{marginTop: "-12px"}}>
                    <FormGroup
                      className={
                        this.state.segmentFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.segment? "hasValue" : "hasnoValue"}
                    >
                      <Select
                        isSearchable={true}
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        className={
                          this.state.segment
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.segmentFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        style={{marginBottom: "3rem"}}
                        name="color"
                        onChange={this.handleChangeSegment.bind(this)}
                        onFocus={this.handleFocusSegment.bind(this)}
                        onBlur={this.handleBlurSegment.bind(this)}
                        options={this.state.segmentOptions}
                        placeholder=""
                        id={this.state.segmentFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                      />
                      <Label className="form-control-placeholder">
                        Segment*
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12" style={{marginTop: "-12px"}}>
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
                  <Col xl="3" lg="3" md="12" style={{marginTop: "-12px"}}>
                    <FormGroup
                      className={
                        this.state.introducebyFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.introduceBy ? "hasValue" : "hasnoValue"}
                    >
                      
                      <Select
                        isSearchable={true}
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        className={
                          this.state.introduceBy
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.introducebyFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        name="color"
                        style={{marginBottom: "3rem"}}
                        onChange={this.handleChangeIntroduceby.bind(this)}
                        onFocus={this.handleFocusIntroduceby.bind(this)}
                        onBlur={this.handleBlurIntroduceby.bind(this)}
                        options={this.state.introduceOptions}
                        placeholder=""
                        id={this.state.introducebyFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                      />
                      <Label className="form-control-placeholder">introduced by*</Label>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12" style={{marginTop: "-12px"}}>
                    <FormGroup
                      className={
                        this.state.introducedDateFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.introducedDate ? "hasValue" : "hasnoValue"}
                    >
                      <DatePickerInput
                        onChange={this.handleChangeIntroducedDate.bind(this)}
                        onFocus={this.handleFocusIntroducedDate.bind(this)}
                        onBlur={this.handleBlurIntroducedDate.bind(this)}
                        value={this.state.introducedDate}
                        placeholder=""
                        id={this.state.introducedDateFocus ? "focused" : "unfocused"}
                        showOnInputClick
                        style={{top:'.5px', marginBottom: "3rem"}}
                      />
                      <Label className="form-control-placeholder">Introduced date*</Label>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12" style={{marginTop: "-12px"}}>
                    <FormGroup
                      className={
                        this.state.valueFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.value ? "hasValue" : "hasnoValue"}
                    >
                      <div className="position-relative has-icon-right">
                        {/* <Input
                          type="text"
                          id="iconRight"
                          name="iconRight"
                         
                          placeholder="0.00"
                          onChange={this.handleChangeValue.bind(this)}
                        /> */}
                        <NumberFormat
                          onChange={this.handleChangeValue.bind(this)}
                          onFocus={this.handleFocusValue.bind(this)}
                          onBlur={this.handleBlurValue.bind(this)}
                          placeholder=""
                          style={{marginBottom: "3rem"}}
                          thousandSeparator={true}
                          className={
                          this.state.value
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                          validations={[required]}
                        />
                        <Label className="form-control-placeholder">Value*</Label>
                        <div className="form-control-position"  style={{top:'.5px'}}>
                          <AtSign size={16} className="formIcon"/>
                        </div>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12" style={{marginTop: "-12px"}}>
                    <FormGroup
                      className={
                        this.state.compFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.completion ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        className={
                          this.state.completion
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        style={{marginBottom: "3rem"}}
                        id="completion"
                        onChange={this.handleChangeCompletion.bind(this)}
                        onFocus={this.handleFocusCompletion.bind(this)}
                        onBlur={this.handleBlurCompletion.bind(this)}
                        validations={[completion]}
                      />
                      <Label className="form-control-placeholder">Completion (%)*</Label>
                    </FormGroup>            
                  </Col>
                  <Col xl="3" lg="3" md="12" style={{marginTop: "-12px"}}>
                    <FormGroup
                      className={
                        this.state.expectStartDateFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.expectStartDate ? "hasValue" : "hasnoValue"}
                    >
                      
                      <DatePickerInput
                        onChange={this.handleChangeExpectStartDate.bind(this)}
                        onFocus={this.handleFocusExpectStartDate.bind(this)}
                        onBlur={this.handleBlurExpectStartDate.bind(this)}
                        value={this.state.expectStartDate}
                        id={this.state.introducedDateFocus ? "focused" : "unfocused"}
                        showOnInputClick
                        style={{top:'.5px', marginBottom: "3rem"}}
                      />
                      <Label className="form-control-placeholder">Expected start date*</Label>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12" style={{marginTop: "-12px"}}>
                    <FormGroup
                      className={
                        this.state.expectEndDateFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.expectEndDate ? "hasValue" : "hasnoValue"}
                    >
                      
                      <DatePickerInput
                        onChange={this.handleChangeExpectEndDate.bind(this)}
                        onFocus={this.handleFocusExpectEndDate.bind(this)}
                        onBlur={this.handleBlurExpectEndDate.bind(this)}
                        value={this.state.expectEndDate}
                        id={this.state.expectEndDateFocus ? "focused" : "unfocused"}
                        showOnInputClick
                        style={{top:'.5px', marginBottom: "3rem"}}
                      />
                      <Label className="form-control-placeholder">Expected end date*</Label>
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="12" style={{marginTop: "-12px"}}>
                    <FormGroup
                      className={
                        this.state.addressFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.projectAddress ? "hasValue" : "hasnoValue"}
                      style={{marginBottom: "50px"}}
                    >
                      
                      <Input
                        type="text"
                        id="iconRight"
                        name="iconRight"
                        className={
                          this.state.projectAddress
                            ? "form-control input floatingLabel round"
                            : "form-control round"
                        }
                        placeholder=""
                        onChange={this.handleChangeProjectAddress.bind(this)}
                        onFocus={this.handleFocusProjectAddress.bind(this)}
                        onBlur={this.handleBlurProjectAddress.bind(this)}
                        validations={[required]}
                      />
                      <Label className="form-control-placeholder">Project address*</Label>
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="12" style={{marginTop: "-12px"}}>
                    <FormGroup
                      className={
                        this.state.clientFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.client ? "hasValue" : "hasnoValue"}
                      style={{marginBottom: "50px"}}
                    >
                      <Select
                        isSearchable={true}
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        className={
                          this.state.client
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.clientFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        name="color"
                        placeholder=""
                        options={this.state.clientOptions}
                        onChange={this.handleChangeClient.bind(this)}
                        onFocus={this.handleFocusClient.bind(this)}
                        onBlur={this.handleBlurClient.bind(this)}
                        id={this.state.clientFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                      />
                      <Label className="form-control-placeholder">Client*</Label>
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="12" style={{marginTop: "-17px"}}>
                    <FormGroup
                      className={
                        this.state.mainContractorFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.mainContractor ? "hasValue" : "hasnoValue"}
                      style={{marginBottom: "50px"}}
                    >
                      
                      <Select
                        isSearchable={true}
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        className={
                          this.state.mainContractor
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.mainContractorFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        name="color"
                        placeholder=""
                        options={this.state.mainContractorOptions}
                        onChange={this.handleChangeMainContractor.bind(this)}
                        onFocus={this.handleFocusMainContractor.bind(this)}
                        onBlur={this.handleBlurMainContractor.bind(this)}
                        id={this.state.mainContractorFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                      />
                      <Label className="form-control-placeholder">Main contractor*</Label>
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="12" style={{marginTop: "-17px"}}>
                    <FormGroup
                      className={
                        this.state.mainSubContractorFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.mainSubContractor ? "hasValue" : "hasnoValue"}
                      style={{marginBottom: "50px"}}
                    >
                      
                      <Select
                        isSearchable={true}
                        className={
                          this.state.mainSubContractor
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.mainSubContractorFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        placeholder=""
                        options={this.state.mainSubContractorOptions}
                        onChange={this.handleChangeSubMainContractor.bind(this)}
                        onFocus={this.handleFocusSubMainContractor.bind(this)}
                        onBlur={this.handleBlurSubMainContractor.bind(this)}
                        id={this.state.mainSubContractorFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                      />
                      <Label className="form-control-placeholder">Main subcontractor*</Label>
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="12" style={{marginTop: "-17px"}}>
                    <FormGroup
                      className={
                        this.state.designConsultantFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.designConsultant ? "hasValue" : "hasnoValue"}
                      style={{marginBottom: "50px"}}
                    >
                      <Select
                        isSearchable={true}
                        className={
                          this.state.designConsultant
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.designConsultantFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        placeholder=""
                        options={this.state.designConsultantOptions}
                        onChange={this.handleChangeDesignConsultant.bind(this)}
                        onFocus={this.handleFocusDesignConsultant.bind(this)}
                        onBlur={this.handleBlurDesignConsultant.bind(this)}
                        id={this.state.designConsultantFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                      />
                      <Label className="form-control-placeholder">Design consultant*</Label>
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="12" style={{marginTop: "-17px"}}>
                    <FormGroup
                      className={
                        this.state.supervisionConsultantFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.supervisionConsultant ? "hasValue" : "hasnoValue"}
                      style={{marginBottom: "50px"}}
                    >
                      <Select
                        isSearchable={true}
                        className={
                          this.state.supervisionConsultant
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.supervisionConsultantFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        placeholder=""
                        options={this.state.supervisionConsultantOptions}
                        onChange={this.handleChangeSupervisionConsultant.bind(this)}
                        onFocus={this.handleFocusSupervisionConsultant.bind(this)}
                        onBlur={this.handleBlurSupervisionConsultant.bind(this)}
                        id={this.state.supervisionConsultantFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                      />
                      <Label className="form-control-placeholder">Supervision consultant*</Label>
                    </FormGroup>
                  </Col>
                  <Col xl="12" lg="12" md="12" style={{marginTop: "-30px"}}>
                    <FormGroup style={{marginBottom:0}}>
                      <Label for="basicinput">Project location</Label>
                    </FormGroup>

                    <div
                      style={{
                        height: "150px",
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      <div className="searchLocation">
                        <PlacesAutocomplete
                          value={this.state.address}
                          onChange={this.handleChange}
                          onSelect={this.handleSelect}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                          }) => (
                            <div>
                              <input
                                {...getInputProps({
                                  placeholder: "City, state, country…",
                                  className: "location-search-input",
                                })}
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion) => {
                                  const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? {
                                        backgroundColor: "#fafafa",
                                        cursor: "pointer",
                                      }
                                    : {
                                        backgroundColor: "#ffffff",
                                        cursor: "pointer",
                                      };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                      </div>

                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: "AIzaSyCcjzmUVwQgCgui-M1ouF1Ft9TKWuj_QRQ",
                        }}
                        defaultCenter={this.state.center}
                        defaultZoom={this.state.zoom}
                      >
                        <AnyReactComponent
                          lat={this.state.lat}
                          lng={this.state.lng}
                          //text={"Kreyser Avrora"}
                        />
                      </GoogleMapReact>
                    </div>
                  </Col>
                </Row>
                <Row style={{marginTop: "23px"}}>
                  <Col md={6}></Col>
                  <Col md={6} className="justify-content-md-end d-flex">
                    <Button
                      onClick={this.handleSubmit.bind(this)}
                      className="blue-btn"
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
  segment_list: state.projectReducer.segmentList,
  project_create: state.projectReducer.createProject,
  country_list: state.customerReducer.countryList,
  sales_engg_user: state.userReducer.salesEnggUser,
  customer_list: state.customerReducer.customersList,
  customer_list_C: state.customerReducer.customersCList,
  customer_list_DC: state.customerReducer.customersDCList,
  customer_list_MC: state.customerReducer.customersMCList,
  customer_list_MSC: state.customerReducer.customersMSCList,
  customer_list_O: state.customerReducer.customersOList,
  customer_list_SC: state.customerReducer.customersSCList,
  customer_list_SCO: state.customerReducer.customersSCOList,
  customer_list_T: state.customerReducer.customersTList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      segmentDetails,
      countryList,
      salesEngineerFilter,
      fetchCustomerList,
      fetchCustomerCList,
      fetchCustomerDCList,
      fetchCustomerMCList,
      fetchCustomerMSCList,
      fetchCustomerOList,
      fetchCustomerSCList,
      fetchCustomerSCOList,
      fetchCustomerTList,
      projectCreation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsCreate);
