// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { fetchProject } from "../../redux/sagas/projects/fetchProject";
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
import { projectUpdation } from "../../redux/sagas/projects/fetchUpdateProject";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import NumberFormat from "react-number-format";
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
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
import locationIMG from "../../assets/img/location.png";
import { Link } from "react-router-dom";
import { Home, Search, AtSign, Info, User } from "react-feather";
import Toggle from "react-toggle";
import Select from "react-select";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
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


class ProjectsEdit extends Component {
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
      projectAddress: "",
      client: "",
      mainContractor: "",
      mainSubContractor: "",
      designConsultant: "",
      supervisionConsultant: "",
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
      soupChange:false,
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
    let pathArray = window.location.pathname.split("/");
    let projectId = pathArray[2];
    this.props.fetchProject(projectId);
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
    this.onChange = this.onChange.bind(this);
  }
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

      this.props.country_list.map((country, i) => {
        var obj = {};

        obj["value"] = country.id;
        obj["label"] = country.name;
        countryOptions.push(obj);
        obj = {};
      });
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
      supervisionConsultantOptions=[]
      // console.log(
      //   this.props.project_data.stage,
      //   "this.props.project_data.stage "
      // );
      if (this.props.project_data) {
        this.setState({ projectName: this.props.project_data.name });
        this.setState({ stage: this.props.project_data.stage });
        if (this.props.project_data.stage == "T")
          this.setState({ stage_place: "Tender" });
        else this.setState({ stage_place: "Job In Hand" });
        this.setState({ status: this.props.project_data.status });
        switch (this.props.project_data.status) {
          case "TR":
            this.setState({ status_place: "Tender" });
            break;
          case "JC":
            this.setState({ status_place: "JJIH-Main Contractor" });
            break;
          case "J1":
            this.setState({ status_place: "JIH-Stage 1" });
            break;
          case "J2":
            this.setState({ status_place: "JIH-Stage 2" });
            break;
          case "J3":
            this.setState({ status_place: "JIH-Stage 3" });
            break;
          case "J4":
            this.setState({ status_place: "JIH-Stage 4" });
            break;
          case "CL":
            this.setState({ status_place: "Closed" });
            break;
          case "CA":
            this.setState({ status_place: "Cancelled" });
            break;
          default:
          // code block
        }
        this.setState({ segment: this.props.project_data.segment });
        this.setState({
          segment_place: this.props.project_data.segment_details.name,
        });
        this.setState({ country: this.props.project_data.country });
        this.setState({
          country_place: this.props.project_data.country_details.name,
        });
        this.setState({ introduceBy: this.props.project_data.intro_by });
        this.setState({
          introduceBy_place: this.props.project_data.intro_by_details.username,
        });
        this.setState({ introducedDate: this.props.project_data.intro_date });
        this.setState({ value: this.props.project_data.value });
        this.setState({ completion: this.props.project_data.completion });
        this.setState({
          expectStartDate: this.props.project_data.exp_start_date,
        });
        this.setState({ expectEndDate: this.props.project_data.exp_end_date });
        this.setState({
          projectAddress: this.props.project_data.client_details.address1,
        });
        this.setState({ client: this.props.project_data.client });
        this.setState({
          client_place: this.props.project_data.client_details.name,
        });
        this.setState({
          mainContractor: this.props.project_data.main_contractor_details.id,
        });
        this.setState({
          mainContractor_place: this.props.project_data.main_contractor_details
            .name,
        });
        this.setState({
          mainSubContractor: this.props.project_data.main_sub_contractor_details
            .id,
        });
        this.setState({
          mainSubContractor_place: this.props.project_data
            .main_sub_contractor_details.name,
        });
        this.setState({
          designConsultant: this.props.project_data.design_consultant_details
            .id,
        });
        this.setState({
          designConsultant_place: this.props.project_data
            .design_consultant_details.name,
        });
        this.setState({
          supervisionConsultant: this.props.project_data
            .supervision_consultant_details.id,
        });
        this.setState({
          supervisionConsultant_place: this.props.project_data
            .supervision_consultant_details.name,
        });
        this.setState({
          lat: this.props.project_data.latitude,
        });
        this.setState({
          lng: this.props.project_data.longitude,
        });
      }
    }, 1000);
  }
  onChange(date) {
    this.setState({
      selectedDate: date,
    });
  }
  handleSelect = (address) => {
    this.setState({ address: address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(
        (latLng) => (
          console.log("Success", latLng),
          localStorage.setItem("latitude", latLng.lat),
          localStorage.setItem("longitude", latLng.lng),
          console.log("test", latLng.lat, latLng.lng),
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

  handleChangeProjectName(e) {
    this.setState({ projectName: e.target.value });
  }
  handleFocusName() {
    this.setState({ projectNameFocus: true });
  }
  handleBlurName() {
    this.setState({ projectNameFocus: false });
  }

  handleChangeStage(e) {
    this.setState({ stage: e.value });
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
    this.setState({ value: e.target.value });
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

  handleSubmit(e) {
    console.log(this.props.project_data.quoted_companies)
    let bodyData = {
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
      quoted_companies: this.props.project_data.quoted_companies
    };
    let pathArray = window.location.pathname.split("/");
    let projectId = pathArray[2];
    this.props.projectUpdation(bodyData, projectId);

  }
  handleSoupChange(company,e) {
       console.log(this.props.project_data.quoted_companies)
    this.setState({soupChange:true})
    if (e.target.checked){
      company.detail[0].in_scope = true 
      this.setState({ soupIsReady: true });
    }
    else{
      company.detail[0].in_scope = false 
      this.setState({ soupIsReady: false });
    } 
     console.log(this.props.project_data.quoted_companies)
  }

  render() {
    if (this.props.project_update) return <Redirect to="/projects"></Redirect>;
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
        {this.props.project_data ? (
          <div className="userModule mT25 editModule">
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
                <BreadcrumbItem active>{this.props.project_data.reference_no}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col md={6} className="justify-content-end d-flex pR0"></Col>
            <Card>
              <CardHeader>
                <Row className="row align-items-center">
                  <Col>{this.props.project_data.reference_no}</Col>
                  <Col className="d-flex justify-content-md-end"></Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col xl="6" lg="6" md="12">
                      <FormGroup
                      className={"hasFloatingLabel isFocused"
                      }
                      id={"hasValue"}
                    >
                      <Input
                        type="text"
                        id="projectName"
                        className={
                          this.state.projectName
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        value={this.state.projectName}
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
                        
                           "hasFloatingLabel selectInput isFocused"
                      }
                      id={"hasValue"}
                      style={{marginTop: ".4rem !important"}}
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
                        
                        // defaultValue={colourOptions[0]}
                        onChange={this.handleChangeStage.bind(this)}
                        onFocus={this.handleFocusStage.bind(this)}
                        onBlur={this.handleBlurStage.bind(this)}
                        options={stageOptions}
                        placeholder={this.state.stage_place}
                        

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
                      className={"hasFloatingLabel selectInput isFocused"
                      }
                      id={"hasValue"}
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
                        placeholder={this.state.status_place}
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
                          "hasFloatingLabel selectInput isFocused"
                      }
                      id={"hasValue"}
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
                        placeholder={this.state.segment_place}
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
                      className={"hasFloatingLabel selectInput isFocused"
                      }
                      id={"hasValue"}
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
                        placeholder={this.state.country_place}
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
                      className={"hasFloatingLabel selectInput isFocused"
                      }
                      id={"hasValue"}
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
                        placeholder={this.state.introduceBy_place}
                        id={this.state.introducebyFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                      />
                      <Label className="form-control-placeholder">introduced by*</Label>
                    </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12" style={{marginTop: "-12px"}}>
                      <FormGroup
                      className={"hasFloatingLabel selectInput isFocused"
                      }
                      id={"hasValue"}
                    >
                      <DatePickerInput
                        onChange={this.handleChangeIntroducedDate.bind(this)}
                        onFocus={this.handleFocusIntroducedDate.bind(this)}
                        onBlur={this.handleBlurIntroducedDate.bind(this)}
                        value={this.state.introducedDate}
                        placeholder=""
                        id={this.state.introducedDateFocus ? "focused" : "unfocused"}
                        showOnInputClick
                      />
                      <Label className="form-control-placeholder">Introduced date*</Label>
                    </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12" style={{marginTop: "-12px"}}>
                      <FormGroup
                      className={"hasFloatingLabel isFocused"
                      }
                      id={"hasValue"}
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
                          value={this.state.value}
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
                      className={"hasFloatingLabel isFocused"
                      }
                      id={"hasValue"}
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
                        placeholder={this.state.completion}
                        value={this.state.completion}
                      />
                      <Label className="form-control-placeholder">Completion (%)*</Label>
                    </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12" style={{marginTop: "-12px"}}>
                      <FormGroup
                      className={"hasFloatingLabel selectInput isFocused"
                      }
                      id={"hasValue"}
                    >
                      
                      <DatePickerInput
                        onChange={this.handleChangeExpectStartDate.bind(this)}
                        onFocus={this.handleFocusExpectStartDate.bind(this)}
                        onBlur={this.handleBlurExpectStartDate.bind(this)}
                        value={this.state.expectStartDate}
                        id={this.state.introducedDateFocus ? "focused" : "unfocused"}
                        showOnInputClick
                      />
                      <Label className="form-control-placeholder">Expected start date*</Label>
                    </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12" style={{marginTop: "-12px"}}>
                      <FormGroup
                      className={"hasFloatingLabel selectInput isFocused"
                      }
                      id={"hasValue"}
                    >
                      
                      <DatePickerInput
                        onChange={this.handleChangeExpectEndDate.bind(this)}
                        onFocus={this.handleFocusExpectEndDate.bind(this)}
                        onBlur={this.handleBlurExpectEndDate.bind(this)}
                        value={this.state.expectEndDate}
                        id={this.state.expectEndDateFocus ? "focused" : "unfocused"}
                        showOnInputClick
                      />
                      <Label className="form-control-placeholder">Expected end date*</Label>
                    </FormGroup>
                    </Col>
                    <Col xl="6" lg="6" md="12" style={{marginTop: "-12px"}}>
                      <FormGroup
                      className={"hasFloatingLabel isFocused"
                      }
                      id={"hasValue"}
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
                        value={this.state.projectAddress}
                      />
                      <Label className="form-control-placeholder">Project address*</Label>
                    </FormGroup>
                    </Col>
                    <Col xl="6" lg="6" md="12" style={{marginTop: "-12px"}}>
                      <FormGroup
                      className={"hasFloatingLabel selectInput isFocused"
                      }
                      id={"hasValue"}
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
                        placeholder={this.state.client_place}
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
                      className={"hasFloatingLabel selectInput isFocused"
                      }
                      id={"hasValue"}
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
                        placeholder={this.state.mainContractor_place}
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
                      className={"hasFloatingLabel selectInput isFocused"
                      }
                      id={"hasValue"}
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
                        placeholder={this.state.mainSubContractor_place}
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
                      className={"hasFloatingLabel selectInput isFocused"
                      }
                      id={"hasValue"}
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
                        placeholder={this.state.designConsultant_place}
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
                      className={"hasFloatingLabel selectInput isFocused"
                      }
                      id={"hasValue"}
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
                        placeholder={this.state.supervisionConsultant_place}
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
                                          {...getSuggestionItemProps(
                                            suggestion,
                                            {
                                              className,
                                              style,
                                            }
                                          )}
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
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
                <Row style={{ padding: "24px" }}>
                  <Col md="12" className="mB15">
                    <h2 className="smTitle">Linked companies</h2>
                  </Col>

                  <Col className="col-md-12 ">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Scope</th>
                          <th>Quoted value</th>
                          <th>Lost value</th>
                          <th>Order value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.props.project_data.quoted_companies.length > 0
                          ? this.props.project_data.quoted_companies
                              .slice(0)
                              .reverse()
                              .map((company, i) => {
                                return(
                                  <tr>
                          <td>{company.company}</td>
                          <td>
                            <form ref="breakfastForm" style={{ padding: 0 }}>
                            { company.detail[0].in_scope ? this.state.soupIsReady=true :this.state.soupIsReady=false}
                              <label>
                                <Toggle
                                  checked={this.state.soupIsReady}
                                  icons={{
                                    checked: "Active",
                                    unchecked: "Inactive",
                                  }}
                                  onChange={(e) => this.handleSoupChange(company,e)}
                                />
                              </label>
                            </form>
                          </td>
                          <td>{company.detail[0].net_amount}</td>
                          <td>{company.detail[0].lost_amount}</td>
                          <td>{company.detail[0].ordered_amount}</td>
                        </tr>
                                )
                        })
                        :null
                      }
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row style={{ padding: "24px" }} className="mT-13">
                  <Col md={6}></Col>
                  <Col md={6} className="justify-content-md-end d-flex">
                    <Button
                      className="blue-btn"
                      onClick={this.handleSubmit.bind(this)}
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        ) : null}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  project_data: state.projectReducer.projectData,
  segment_list: state.projectReducer.segmentList,
  country_list: state.customerReducer.countryList,
  sales_engg_user: state.userReducer.salesEnggUser,
  customer_list: state.customerReducer.customersList,
  project_update: state.projectReducer.updateProject,
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
      fetchProject,
      segmentDetails,
      countryList,
      salesEngineerFilter,
      fetchCustomerList,
      projectUpdation,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsEdit);
