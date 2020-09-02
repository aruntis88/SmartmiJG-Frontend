// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { salesEngineerFilter } from "../../redux/sagas/users/fetchSalesEngineer";
import { countryList } from "../../redux/sagas/customers/fetchCountryList";
import { companyDetails } from "../../redux/sagas/companyDetails/companyDetails";
import { customerUpdation } from "../../redux/sagas/customers/fetchUpdateCustomer";
import { fetchCustomer } from "../../redux/sagas/customers/fetchCustomer";
import { fetchSaleEngineerinCompany } from "../../redux/sagas/users/fetchSaleEngineerinCompany";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
  FormText
} from "reactstrap";
import { Link } from "react-router-dom";
import { Home, Search, AtSign, Info, User, Phone, Printer } from "react-feather";
import Toggle from "react-toggle";
import Select from "react-select";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import validator from "validator";
// import { colourOptions } from "./selectData";

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



const Heart = () => (
  <div
    style={{
      color: "#fff",
      fontSize: "1.2em",
      position: "absolute",
      top: "0.4em"
    }}
  >
    ❤
  </div>
);
let customerTypeOptions = [
  { value: 1, label: "Main Contractor" },
  { value: 2, label: "Main Sub Contractor" },
  { value: 3, label: "Client" },
  { value: 4, label: "Design Consultant" },
  { value: 5, label: "Supervision Consultant" },
  { value: 6, label: "Trader" },
  { value: 7, label: "Others" },
  { value: 8, label: "Subcontractor" }
];
let designationOptions = [
  { value: "SE", label: "Sales Engineer" },
  { value: "SO", label: "Software Engineer" }
];
let companyOptions = [];
let introduceOptions = [];
let countryOptions = [];
let salesEnggComanyOptions = [];
let salesUser = [];
let salesUser_place = [];
let customerType = [];
let customerType_place = [];
class CustomersEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soupIsReady: true,
      showSales: false,
      selectedDate: "2017-08-13",
      customerName: "",
      customerType: [],
      email: "",
      phone: "",
      fax: "",
      website: "",
      introduceBy: "",
      country: "",
      addressLine1: "",
      addressLine2: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      company: "",
      designation: "",
      introduceOptions: [],
      countryOptions: [],
      companyOptions: [],
      salesEnggComanyOptions: [],
      salesUser: [],
      salesUser_place: [],
      customerType_place: []
    };
    this.handleChangeIntroducedDate = this.handleChangeIntroducedDate.bind(this);
    this.props.salesEngineerFilter();
    this.props.countryList();
    this.props.companyDetails();
    let pathArray = window.location.pathname.split("/");
    let customerId = pathArray[2];

    this.props.fetchCustomer(customerId);
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      if (this.props.sales_engg_user) {
        this.props.sales_engg_user.map((sales_user, key) => {
          var obj = {};

          obj["value"] = sales_user.id;
          obj["label"] = sales_user.username;
          introduceOptions.push(obj);
          obj = {};
        });
      }

      if (this.props.country_list) {
        this.props.country_list.map((country, i) => {
          var obj = {};

          obj["value"] = country.id;
          obj["label"] = country.name;
          countryOptions.push(obj);
          obj = {};
        });
      }
      this.props.company_details.map((company, key) => {
        var obj = {};
        obj["value"] = company.id;
        obj["label"] = company.name;
        companyOptions.push(obj);

        obj = {};
      });
      console.log("kkkkkkkkk", this.props.sales_engg_user_company);
      if (this.props.sales_engg_user_company) {
        this.props.sales_engg_user_company.map(sales_company => {
          var obj = {};
          obj["value"] = sales_company.id;
          obj["label"] = sales_company.username;
          salesEnggComanyOptions.push(obj);

          obj = {};
        });
      }
      else{
        if (this.props.sales_engg_user) {
          this.props.sales_engg_user.map((sales_user, key) => {
            var obj = {};
  
            obj["value"] = sales_user.id;
            obj["label"] = sales_user.username;
            salesEnggComanyOptions.push(obj);
            obj = {};
          });
        }
      }
      this.setState({ countryOptions: countryOptions });
      this.setState({ introduceOptions: introduceOptions });
      this.setState({ companyOptions: companyOptions });
      this.setState({ salesEnggComanyOptions: salesEnggComanyOptions });
      countryOptions = [];
      introduceOptions = [];
      companyOptions = [];
      salesEnggComanyOptions = [];
      if (this.props.customer_data) {
        console.log("customer data",this.props.customer_data)
        let dateFormat = moment(
          this.props.customer_data.introduced_date
        ).format("YYYY-MM-DD");

        this.setState({ customerName: this.props.customer_data.name });
        // this.setState({ customerType: this.props.customer_data.type });
        if (this.props.customer_data.customer_type_details) {
          this.props.customer_data.customer_type_details.map(customer_type => {
            var obj = {};
            obj["value"] = customer_type.id;
            obj["label"] = customer_type.type;
            customerType.push(obj["value"]);
            customerType_place.push(obj);
            // var value = customer_type.id;
            // var type = customer_type.type;
            // customerType.push(value);
            // customerType_place.push(type);
          });

          this.setState({ customerType: customerType });
          this.setState({ customerType_place: customerType_place });
          customerType = [];
          customerType_place = [];
        }
        this.setState({ email: this.props.customer_data.email });
        this.setState({ phone: this.props.customer_data.phone });
        this.setState({ fax: this.props.customer_data.fax });
        this.setState({ website: this.props.customer_data.website });
        this.setState({ selectedDate: dateFormat });
        this.setState({ introduceBy: this.props.customer_data.introduced_by });
        this.setState({
          introduceBy_place: this.props.customer_data.introby_details.username
        });
        this.setState({ addressLine1: this.props.customer_data.address1 });
        this.setState({ addressLine2: this.props.customer_data.address2 });
        this.setState({
          contactName: this.props.customer_data.contact_details[0].name
        });
        this.setState({ country: this.props.customer_data.country });
        this.setState({
          country_place: this.props.customer_data.country_details.name
        });
        this.setState({
          contactPhone: this.props.customer_data.contact_details[0].phone
        });
        this.setState({
          contactEmail: this.props.customer_data.contact_details[0].email
        });
        this.setState({
          designation: this.props.customer_data.introby_details.designation
        });
        if (this.props.customer_data.introby_details.designation == "SE")
          this.setState({ designation_place: "Sales Engineer" });
        else this.setState({ designation_place: "Software Engineer" });
        if (this.props.customer_data.sales_engineers_details.length>0)
          this.state.showSales = true;
        if (this.props.customer_data.sales_engineers_details) {
          if(!this.state.company){
            this.props.customer_data.sales_engineers_details.map(sales_engg => {
              var obj = {};
              obj["value"] = sales_engg.id;
              obj["label"] = sales_engg.username;
              salesUser.push(obj["value"]);
              salesUser_place.push(obj);
              // var value = sales_engg.id;
              // var type = sales_engg.username;
              // salesUser.push(value);
              // salesUser_place.push(type);
            });
  
            this.setState({ salesUser: salesUser });
            this.setState({ salesUser_place: salesUser_place });
            salesUser = [];
            salesUser_place = [];
          }
         
        }
        this.setState({ soupIsReady: this.props.customer_data.is_active });
        // if(this.props.customer_data.introby_details.company_details){
        //   this.setState({ company: this.props.customer_data.introby_details.company_details.id });
        //   this.setState({ company_place: this.props.customer_data.introby_details.company_details.name });
        // }
      }
    }, 1000);
  }
  handleChangeIntroducedDate(date) {
    let dateFormat = moment(date).format("YYYY-MM-DD");
    this.setState({
      selectedDate: dateFormat
    });
  }
  handleFocusIntroducedDate() {
    this.setState({ introducedDateFocus: true });
    this.state.introducedDateFocusStyle = true;
  }
  handleBlurIntroducedDate() {
    this.setState({ introducedDateFocus: false });
  }


  handleChangeCustomerName(e) {
    this.setState({ customerName: e.target.value });
  }
  handleFocusCustomerName() {
    this.setState({ customerNameFocus: true });
  }
  handleBlurCustomerName() {
    this.setState({ customerNameFocus: false });
  }


  handleChangeCustomerType(e) {
    console.log("dddddddddddddddddddd",e)
    let customerTypeDisplay =[]
    e.map((value, key) => {
      var obj = {};
      obj["value"] = value.value;
      obj["label"] = value.label;
      customerTypeDisplay.push(obj);
    });
    e.map((value, key) => {
      var value = value.value;
      customerType.push(value);
    });
    setTimeout(() => {
      this.setState({ customerType: customerType });
       this.setState({ customerType_place: customerTypeDisplay });
      customerType = [];
    }, 1000); 
  }
 
    handleFocusCustomerType() {
    this.setState({ customerTypeFocus: true });
    this.state.customerTypeFocusStyle = true;
  }
  handleBlurCustomerType() {
    this.setState({ customerTypeFocus: false });
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

  handleChangePhone(e) {
    this.setState({ phone: e.target.value });
  }
  handleFocusPhone() {
    this.setState({ phoneFocus: true });
  }
  handleBlurPhone() {
    this.setState({ phoneFocus: false });
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

  handleChangeCountry(e) {
    this.setState({ country: e.value });
    console.log("this.state.country", this.state.country);
  }
  handleFocusCountry() {
    this.setState({ countryFocus: true });
    this.state.countryFocusStyle = true;
  }
  handleBlurCountry() {
    this.setState({ countryFocus: false });
  }

  handleChangeAddressLine1(e) {
    this.setState({ addressLine1: e.target.value });
  }
  handleFocusAddressLine1() {
    this.setState({ addressLine1Focus: true });
  }
  handleBlurAddressLine1() {
    this.setState({ addressLine1Focus: false });
  }

  handleChangeAddressLine2(e) {
    this.setState({ addressLine2: e.target.value });
  }
  handleFocusAddressLine2() {
    this.setState({ addressLine2Focus: true });
  }
  handleBlurAddressLine2() {
    this.setState({ addressLine2Focus: false });
  }

  handleChangeContactName(e) {
    this.setState({ contactName: e.target.value });
  }
  handleFocusContactName() {
    this.setState({ contactName: true });
  }
  handleBlurContactName() {
    this.setState({ contactName: false });
  }

  handleChangeContactPhone(e) {
    this.setState({ contactPhone: e.target.value });
  }
  handleFocusContactPhone() {
    this.setState({ contactPhone: true });
  }
  handleBlurContactPhone() {
    this.setState({ contactPhone: false });
  }

  handleChangeContactEmail(e) {
    this.setState({ contactEmail: e.target.value });
  }
  handleFocusContactEmail() {
    this.setState({ contactEmail: true });
  }
  handleBlurContactEmail() {
    this.setState({ contactEmail: false });
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


  handleChangeCompany(e) {
    this.setState({ company: e.value });
    this.setState({salesUser:[]})
    this.setState({saleUserDisplay:[]})
    this.props.fetchSaleEngineerinCompany(e.value);
    if (!this.state.showSales) this.state.showSales = true;
  }
  handleFocusCompany() {
    this.setState({ companyFocus: true });
  }
  handleBlurCompany() {
    this.setState({ companyFocus: false });
  }

  handleChangesales(salesUsers) {
    console.log("this.state.salesUser", salesUsers);
    // this.setState({ salesUser: e.value });
    let saleUserDisplay =[]
    salesUsers.map((value, key) => {
      var obj = {};
      obj["value"] = value.value;
      obj["label"] = value.label;
      saleUserDisplay.push(obj);
    });
    salesUsers.map((value, key) => {
      var value = value.value;
      salesUser.push(value);
    });
    setTimeout(() => {
      this.setState({ salesUser: salesUser });
      this.setState({ salesUser_place: saleUserDisplay });
      salesUser = [];
    }, 1000);
  }
  handleSoupChange(e) {
    if (e.target.checked) this.setState({ soupIsReady: true });
    else this.setState({ soupIsReady: false });
  }

 // validate = () => {
 //    let customerNameError="";
 //    let emailError="";
 //    let phoneError="";
 //    let webError = "";
 //    let addressError="";
 //    let contactNameError="";
 //    let contactPhoneError="";
 //    let contactEmailError = "";

 //    let numbers = /^[0-9]+$/;
 //    let letters = /^[a-zA-Z,. ]*$/;
 //    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 //    let phoneno = /^\d{10}$/;
 //    let alphanumeric = /^[0-9a-zA-Z,/ ]+$/;


 //    if (this.state.customerName.length < 1) {
 //      customerNameError = "Customer Name should not be blank";
 //    }
 //    if (!this.state.customerName.match(letters)) {
 //      customerNameError = 'Please input alphabet characters only'
 //    }
 //    if (this.state.contactName.length < 1) {
 //      contactNameError = "Contact Name should not be blank";
 //    }
 //    if (!this.state.contactName.match(letters)) {
 //      contactNameError = 'Please input alphabet characters only'
 //    }
 //    if (!this.state.phone.match(phoneno)) {
 //      phoneError = "Not a valid phone number"
 //    }
 //    if (!this.state.contactPhone.match(phoneno)) {
 //      contactPhoneError = "Not a valid phone number"
 //    }
 //    if (!this.state.email.match(mailformat)) {
 //      emailError = "Enter a valid email address"
 //    }
 //    if (!this.state.contactEmail.match(mailformat)) {
 //      contactEmailError = "Enter a valid email address"
 //    }

 //    if (!this.state.addressLine1.match(alphanumeric)) {
 //      addressError = "Not a valid address pattern"
 //    }

 //    if (!this.state.website.includes("www") && !this.state.website.includes(".")) {
 //      webError = "Enter a valid URL"
 //    }

 //    if (customerNameError || contactNameError || phoneError || emailError || contactPhoneError || contactEmailError || webError || addressError) {
 //      this.setState({ customerNameError, contactNameError, phoneError, emailError, contactPhoneError, contactEmailError,addressError, webError });
 //      return false;
 //    }

 //    return true;
 //  }

  handleSubmit(e) {
    // const isValid = this.validate();
    // if (isValid) {
    //   this .setState ({customerNameError: "",
    //   contactNameError: "",
    //   phoneError: "",
    //   emailError: "",
    //   contactPhoneError: "",
    //   contactEmailError: "",
    //   webError: "",
    //   addressError : "",
    // })
      let bodyData = {
      name: this.state.customerName,
      customer_type: this.state.customerType,
      email: this.state.email,
      fax: this.state.fax,
      phone: this.state.phone,
      address1: this.state.addressLine1,
      address2: this.state.addressLine2,
      website: this.state.website,
      is_active: this.state.soupIsReady,
      introduced_date: this.state.selectedDate,
      country: this.state.country,
      introduced_by: this.state.introduceBy,
      sales_engineers: this.state.salesUser,
      contact_details: [
        {
          name: this.state.contactName,
          phone: this.state.contactPhone,
          email: this.state.contactEmail,
          designation: this.state.designation
        }
      ]
    };
    let pathArray = window.location.pathname.split("/");
    let customerId = pathArray[2];
    this.props.customerUpdation(bodyData, customerId);
    // }
  }

  customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    paddingTop: "10px",

  }),

  control: (provided, { selectProps: { width }}) => ({
    ...provided,
    width: width,
    borderColor: '#646c9a',
  }),

  clearIndicator: (provided)=>({
    ...provided,
    opacity:0.2,
    ':hover': {
      backgroundColor: '#646c9a',
      color: "white",
      opacity: 0.5,
    },
  }),
   
   multiValueLabel: (provided) => ({
    ...provided,
    color: '#646c9a',
    fontSize: "16px",
    fontWeight: "bolder"
  }),
   multiValueRemove: (provided, state) => ({
    ...provided,
    color: '#646c9a',
    ':hover': {
      backgroundColor: '#646c9a',
      color: "white",
    },
  }),
}
    
  render() {
    if (this.props.customer_create)
      return <Redirect to="/customers"></Redirect>;
    if (this.props.customer_update)
      return <Redirect to="/customers"></Redirect>;
    return (
      <Fragment>
        {this.props.customer_data ? (
          <div className="userModule mT25 editModule">
            <Col md={6} className="pL0">
              <Breadcrumb>
                <BreadcrumbItem>
                  <a href="/">
                    <Home size={15} />
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <a href="/customers">Customers</a>
                </BreadcrumbItem>
                <BreadcrumbItem active>{this.props.customer_data.name}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col md={6} className="justify-content-end d-flex pR0"></Col>
            <Card>
              <CardHeader>
                <Row className="row align-items-center">
                  <Col style={{fontWeight: "600"}}>{this.props.customer_data.name}</Col>
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
                        id="customerName"
                        className={
                          this.state.customerName
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeCustomerName.bind(this)}
                        onFocus={this.handleFocusCustomerName.bind(this)}
                        onBlur={this.handleBlurCustomerName.bind(this)}
                        validations={[required]}
                        style={{marginBottom: "3rem"}}
                        value={this.state.customerName}
                      />
                      <Label className="form-control-placeholder">Customer name*</Label>
                    </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                     <FormGroup 
                       className={
                         "hasFloatingLabel selectInput isFocused"
                        }
                        id={"hasValue"}
                      >
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          name="color"
                          value={this.state.customerType_place}
                          options={customerTypeOptions}
                          onChange={this.handleChangeCustomerType.bind(this)}
                          onFocus={this.handleFocusCustomerType.bind(this)}
                          onBlur={this.handleBlurCustomerType.bind(this)}
                          isMulti
                           validations={[required, lt]}
                          style={{marginBottom: "3rem"}}
                        />
                        <Label className="form-control-placeholder" for="customerType" style={{top:"19.5px"}}>
                          Customer Type*
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup
                      className={"hasFloatingLabel isFocused"}
                      id={"hasValue"}
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
                          value={this.state.email}
                          style={{marginBottom: "3rem"}}
                        />
                        <label className="form-control-placeholder" for="email">
                          Email*
                        </label>
                        <div className="form-control-position" style={{top:".5px"}}>
                          <AtSign size={16} className="formIcon" />
                        </div>
                      </div>
                    </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12" style={{marginTop: "-15px"}}>
                      <FormGroup
                      className={"hasFloatingLabel isFocused"}
                      id={"hasValue"}
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
                          value={this.state.phone}
                          style={{marginBottom: "3rem"}}
                        />
                        <label className="form-control-placeholder" for="mobile">
                          Phone*
                        </label>
                        <div className="form-control-position" style={{top:".5px"}}>
                          <Phone size={16} className="formIcon" />
                        </div>
                      </div>
                    </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12" style={{marginTop: "-15px"}}>
                      <FormGroup
                      className={ "hasFloatingLabel isFocused" }
                      id={"hasValue"}
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
                          value={this.state.fax}
                        />
                        <label className="form-control-placeholder">
                          Fax*
                        </label>
                        <div className="form-control-position" style={{top:".5px"}}>
                          <Printer size={16} className="formIcon" />
                        </div>
                      </div>
                    </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12" style={{marginTop: "-15px"}}>
                      <FormGroup
                      className={ "hasFloatingLabel isFocused"
                        
                      }
                      id={"hasValue" }
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
                        value={this.state.website}
                        style={{marginBottom: "3rem"}}
                      />
                      <label className="form-control-placeholder">
                          Website*
                        </label>
                    </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12" style={{marginTop: "-15px"}}>
                      <FormGroup
                      className={ "hasFloatingLabel selectInput isFocused"
                         
                      }
                      id={ "hasValue"}
                    >
                      
                      <Select
                        isSearchable={false}
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
                    <Col xl="3" lg="3" md="12" style={{marginTop: "-15px"}}>
                      <FormGroup
                      className={ "hasFloatingLabel selectInput isFocused"
                          
                      }
                      id={"hasValue"}
                    >
                      <DatePickerInput
                        onChange={this.handleChangeIntroducedDate.bind(this)}
                        onFocus={this.handleFocusIntroducedDate.bind(this)}
                        onBlur={this.handleBlurIntroducedDate.bind(this)}
                        value={this.state.selectedDate}
                        placeholder=""
                        id={this.state.selectedDateFocus ? "focused" : "unfocused"}
                        showOnInputClick
                        style={{top:'.5px', marginBottom: "3rem"}}
                      />
                      <Label className="form-control-placeholder">Introduced date*</Label>
                    </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12" style={{marginTop: "-15px"}}>
                      <FormGroup
                      className={ "hasFloatingLabel selectInput isFocused"
                          
                      }
                      id={ "hasValue" }
                    >
                      <Select
                        isSearchable={false}
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
                    <Col xl="3" lg="3" md="12" style={{marginTop: "-15px"}}>
                      <FormGroup
                      className={ "hasFloatingLabel isFocused"
                        
                      }
                      id={ "hasValue"}
                    >
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        className={
                          this.state.addressLine1
                            ? "form-control input floatingLabel"
                            : "form-control"
                          }
                        onChange={this.handleChangeAddressLine1.bind(this)}
                        onFocus={this.handleFocusAddressLine1.bind(this)}
                        onBlur={this.handleBlurAddressLine1.bind(this)}
                        validations={[required]}
                        value={this.state.addressLine1}
                        placeholder= {this.state.addressLine1}
                        style={{marginBottom: "3rem"}}
                      />
                      <label className="form-control-placeholder">
                          Address line 1*
                        </label>
                    </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12" style={{marginTop: "-15px"}}>
                      <FormGroup
                      className={"hasFloatingLabel isFocused"
                         
                      }
                      id={ "hasValue" }
                    >
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        className={
                          this.state.addressLine2
                            ? "form-control input floatingLabel"
                            : "form-control"
                          }
                        onChange={this.handleChangeAddressLine2.bind(this)}
                        onFocus={this.handleFocusAddressLine2.bind(this)}
                        onBlur={this.handleBlurAddressLine2.bind(this)}
                        validations={[required]}
                        value={this.state.addressLine2}
                        placeholder={this.state.addressLine2}
                        style={{marginBottom: "3rem"}}
                      />
                      <label className="form-control-placeholder">
                          Address line 2*
                        </label>
                    </FormGroup>
                    </Col>
                  </Row>
                </Form>
                <Row style={{marginTop: "-70px", marginBottom:"-11px"}}>
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
                  <Col md={6} className="justify-content-md-end d-flex"></Col>
                </Row>
                <div className="d-flex flex-wrap pH10 mB15 editModule">
                  <Col md="6" className="mB15">
                    <h2 className="smTitle" style={{fontWeight:"500"}}>Point of contact</h2>{" "}
                    <span className="addItem" style={{fontSize:"30px"}}>+</span>
                  </Col>
                  <Col md="6" className="mB15">
                    <h2 className="smTitle" style={{fontWeight:"500"}}>Assign sales engineers</h2>
                  </Col>
                  <Col className="col-md-6 ">
                  <Form style={{ margin: "0 -25px" }}>
                    <Row className="nextedCol" style={{marginTop: "-10px"}}>
                      <Col xl="6" lg="6" md="12">
                        <FormGroup
                        className={
                          "hasFloatingLabel isFocused"
                           
                        }
                        id={"hasValue"}
                      >
                        <Input
                          type="text"
                          id="contactName"
                          className={
                            this.state.contactName
                              ? "form-control input floatingLabel"
                              : "form-control"
                          }
                          onChange={this.handleChangeContactName.bind(this)}
                          onFocus={this.handleFocusContactName.bind(this)}
                          onBlur={this.handleBlurContactName.bind(this)}
                          validations={[required]}
                          value={this.state.contactName}
                          placeholder={this.state.contactName}
                          style={{marginBottom: "3rem"}}
                        />
                        <label className="form-control-placeholder" for="contactName">
                          Contact Name*
                        </label>
                      </FormGroup>
                      </Col>
                      <Col xl="6" lg="6" md="12">
                        <FormGroup
                      className={ "hasFloatingLabel isFocused"
                         
                      }
                      id={ "hasValue" }
                    >
                      <div className="position-relative has-icon-right">
                        <Input
                          type="text"
                          id="iconRight"
                          name="iconRight"
                          className={
                          this.state.mobile
                            ? "form-control input floatingLabel round"
                            : "form-control round"
                          }
                          onChange={this.handleChangeContactPhone.bind(this)}
                          onFocus={this.handleFocusContactPhone.bind(this)}
                          onBlur={this.handleBlurContactPhone.bind(this)}
                          validations={[required, mob]}
                          value={this.state.contactPhone}
                          placeholder={this.state.contactPhone}
                          style={{marginBottom: "3rem"}}
                        />
                        <label className="form-control-placeholder" for="mobile">
                          Phone*
                        </label>
                        <div className="form-control-position" style={{top:"1.5px", height:"42px", right: "1px"}}>
                          <Phone size={16} className="formIcon" />
                        </div>
                      </div>
                    </FormGroup>
                      </Col>
                      <Col xl="6" lg="6" md="12">
                        <FormGroup
                      className={
                        "hasFloatingLabel isFocused"
                         
                      }
                      id={ "hasValue" }
                    >
                      <div className="position-relative has-icon-right">
                        <Input
                          className={
                            this.state.contactEmail
                              ? "form-control input floatingLabel round"
                              : "form-control round"
                          }
                          onChange={this.handleChangeContactEmail.bind(this)}
                          onFocus={this.handleFocusContactEmail.bind(this)}
                          onBlur={this.handleBlurContactEmail.bind(this)}
                          id="email"
                          value={this.state.contactEmail}
                          
                          style={{marginBottom: "3rem"}}
                        />
                        <label className="form-control-placeholder">
                          Email*
                        </label>
                        <div className="form-control-position" style={{top:"1.5px", height:"42px", right: "1px"}}>
                          <AtSign size={16} className="formIcon" />
                        </div>
                      </div>
                    </FormGroup>
                      </Col>
                      <Col xl="6" lg="6" md="12">
                        <FormGroup
                      className={
                         "hasFloatingLabel selectInput isFocused"
                          
                      }
                      id={ "hasValue"}
                    >
                      <Select
                        isSearchable={false}
                        className={
                          this.state.designation
                            ? "basic-single floatingLabel"
                            : "basic-single"
                        }
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        onChange={this.handleChangeDesignation.bind(this)}
                        options={designationOptions}
                        placeholder={this.state.designation_place}
                        
                        onFocus={this.handleFocusDesination.bind(this)}
                        onBlur={this.handleBlurDesination.bind(this)}
                        id={this.state.designationFocus ? "focused" : null}
                      />
                      <Label className="form-control-placeholder">
                        Designation*
                      </Label>
                    </FormGroup>
                      </Col>
                    </Row>
                    </Form>
                  </Col>
                  <Col className="col-md-6 " style={{marginTop:"15px"}}>
                    <Row>
                      <Col xl="6" lg="3" md="12">
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
                            : "basic-single"
                        }
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        onChange={this.handleChangeCompany.bind(this)}
                        options={this.state.companyOptions}
                        placeholder=""
                        onFocus={this.handleFocusCompany.bind(this)}
                        onBlur={this.handleBlurCompany.bind(this)}
                        id={this.state.companyFocus ? "focused" : null}
                      />
                      <Label className="form-control-placeholder">
                        Company*
                      </Label>
                    </FormGroup>
                      </Col>
                      {this.state.showSales ? (
                        <Col xl="6" lg="3" md="12">
                          <FormGroup
                            className={
                              this.state.salesEnggFocus
                                ? "hasFloatingLabel selectInput isFocused"
                                : "hasFloatingLabel selectInput notFocused"
                            }
                            id={this.state.salesUserDisplay ? "hasValue" : "hasnoValue"}
                          >
                            <Label className="form-control-placeholder">Sales engineers*</Label>
                            <Select                             
                              // defaultValue={colourOptions[0]}
                              onChange={this.handleChangesales.bind(this)}
                              options={this.state.salesEnggComanyOptions}
                              placeholder="Sales Engineers*"
                              isMulti
                              value={this.state.salesUser_place}
                              styles={this.customStyles}
                            />

                          </FormGroup>
                        </Col>
                      ) : null}
                    </Row>

                    {/* <Col md={6} className="assignBlock text-center">
                      <User size={30} className="formIcon" />
                      <p className=" text-center">
                        Select a company to assign sales engineers
                      </p>
                    </Col>
                    <Col className="col-md-6 "></Col> */}
                  </Col>
                </div>
                <div className="mT-13 d-flex flex-wrap pH10 mB15">
                  <Col md={6}></Col>
                  <Col md={6} className="justify-content-md-end d-flex" style={{top:"-60px"}}>
                    <Button
                      className="blue-btn"
                      onClick={this.handleSubmit.bind(this)}
                    >
                      Save
                    </Button>
                  </Col>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : null}
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  sales_engg_user: state.userReducer.salesEnggUser,
  country_list: state.customerReducer.countryList,
  company_details: state.companyDetailsReducer.companyDetails,
  customer_create: state.customerReducer.createCustomer,
  customer_data: state.customerReducer.customerData,
  customer_update: state.customerReducer.updateCustomer,
  sales_engg_user_company: state.userReducer.salesEnggUserinCompany
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      salesEngineerFilter,
      countryList,
      companyDetails,
      customerUpdation,
      fetchCustomer,
      fetchSaleEngineerinCompany
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomersEdit);
