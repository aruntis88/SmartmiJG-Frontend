// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import { fetchCustomerList } from "../../redux/sagas/customers/fetchCustomers";
import { fetchProjectList } from "../../redux/sagas/projects/fetchProjectList";
import { salesEngineerFilter } from "../../redux/sagas/users/fetchSalesEngineer";
import { fetchUserList } from "../../redux/sagas/users/fetchUserList";
import { leadCreation } from "../../redux/sagas/leads/fetchLeadCreate";
import { productCategoryList } from "../../redux/sagas/products/fetchProductCategory";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import moment from "moment";
import Select from "react-select";
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
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Home, Search, AtSign, Phone } from "react-feather";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import validator from "validator";

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

const mob = (str) => {
  if (!validator.isMobilePhone(str, ["en-IN"])) {
    return (
      <span className="error">Not a valid Phone Number.</span>
    );
  }
};

let customerOptions = [];
let projectOptions = [];
let salesEngineerOptions = [];
let assignedToOptions = [];
let leadSourceOptions = [
  { value: "P", label: "Phone" },
  { value: "F", label: "Fax" },
  { value: "W", label: "Website" },
  { value: "V", label: "Visit" },
  { value: "E", label: "Email" },
  { value: "O", label: "Others" },
];
let productCategoryOptions = [];
let productCategory = [];
var short = require("short-uuid");
class LeadCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: "",
      project: "",
      leadSource: "",
      salesEngineer: "",
      assignedTo: "",
      dueDate: "",
      contactName: "",
      email: "",
      description: "",
      phone: "",
      customerOptions: [],
      projectOptions: [],
      salesEngineerOptions: [],
      assignedToOptions: [],
      productCategoryOptions: [],
      productCategory: [],
      userActivePage: 1,
      userFilterObj: {
        page: 1,
        activePage: 1,
      },
      filterObj: {
        page: 1,
        activePage: 1,
      },
    };
    this.props.fetchUserList();
    this.props.fetchCustomerList();
    this.props.fetchProjectList();
    this.props.salesEngineerFilter();
    this.props.productCategoryList();
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      if (this.props.customer_list) {
        this.props.customer_list.map((customer, key) => {
          var obj = {};

          obj["value"] = customer.id;
          obj["label"] = customer.name;
          customerOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.project_list) {
        this.props.project_list.map((project, key) => {
          var obj = {};

          obj["value"] = project.id;
          obj["label"] = project.name;
          projectOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.sales_engg_user) {
        this.props.sales_engg_user.map((sales_user, key) => {
          var obj = {};

          obj["value"] = sales_user.id;
          obj["label"] = sales_user.username;
          salesEngineerOptions.push(obj);
          obj = {};
        });
      }

      if (this.props.user_list) {
        this.props.user_list.map((user, key) => {
          var obj = {};

          obj["value"] = user.id;
          obj["label"] = user.username;
          assignedToOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.product_category_list.results.data) {
        this.props.product_category_list.results.data.map((category, key) => {
          var obj = {};
          obj["value"] = category.id;
          obj["label"] = category.name;
          productCategoryOptions.push(obj);
          obj = {};
        });
      }
      this.setState({ customerOptions: customerOptions });
      this.setState({ projectOptions: projectOptions });
      this.setState({ salesEngineerOptions: salesEngineerOptions });
      this.setState({ assignedToOptions: assignedToOptions });
      this.setState({ productCategoryOptions: productCategoryOptions });
      customerOptions = [];
      projectOptions = [];
      salesEngineerOptions = [];
      assignedToOptions = [];
      productCategoryOptions = [];
    }, 1000);
  }
  handleChangeCustomer(e) {
    this.setState({ customer: e.value });
  }
  handleFocusCustomer() {
    this.setState({ customerFocus: true });
    this.state.customerFocusStyle = true;
  }
  handleBlurCustomer() {
    this.setState({ customerFocus: false });
  }

  handleChangeProject(e) {
    this.setState({ project: e.value });
  }
  handleFocusProject() {
    this.setState({ projectFocus: true });
    this.state.projectFocusStyle = true;
  }
  handleBlurProject() {
    this.setState({ projectFocus: false });
  }

  handleChangeLeadSource(e) {
    this.setState({ leadSource: e.value });
  }
  handleFocusLeadSource() {
    this.setState({ leadSourceFocus: true });
    this.state.leadSourceFocusStyle = true;
  }
  handleBlurLeadSource() {
    this.setState({ leadSourceFocus: false });
  }

  handleChangeSalesEngineer(e) {
    this.setState({ salesEngineer: e.value });
  }
  handleFocusSalesEngineer() {
    this.setState({ salesEngineerFocus: true });
    this.state.salesEngineerFocusStyle = true;
  }
  handleBlurSalesEngineer() {
    this.setState({ salesEngineerFocus: false });
  }

  handleChangeAssignedTo(e) {
    this.setState({ assignedTo: e.value });
  }
  handleFocusAssignedTo() {
    this.setState({ assignedToFocus: true });
    this.state.assignedToFocusStyle = true;
  }
  handleBlurAssignedTo() {
    this.setState({ assignedToFocus: false });
  }

  handleChangeDueDate(date) {
    let dateFormat = moment(date).format("YYYY-MM-DD");
    this.setState({
      dueDate: dateFormat,
    });
  }
  handleFocusDueDate() {
    this.setState({ dueDateFocus: true });
    this.state.dueDateFocusStyle = true;
  }
  handleBlurDueDate() {
    this.setState({ dueDateFocus: false });
  }

  handleChangeContactName(e) {
    this.setState({ contactName: e.target.value });
  }
  handleFocusContactName() {
    this.setState({ contactNameFocus: true });
  }
  handleBlurContactName() {
    this.setState({ contactNameFocus: false });
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

  handleChangeDescription(e) {
    e.map((value, key) => {
      var value = value.value;
      productCategory.push(value);
    });
    setTimeout(() => {
      this.setState({ productCategory: productCategory });
      productCategory = [];
    }, 100);
    // this.setState({ description: e.target.value });
  }
  handleFocusDescription() {
    this.setState({ productCategoryFocus: true });
    this.state.productCategoryFocusStyle = true;
  }
  handleBlurDescription() {
    this.setState({ productCategoryFocus: false });
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

  // validate = () => {

  //   let phoneError = "";
  //   let emailError = "";
  //   let contactNameError = "";

  //   let numbers = /^[0-9]+$/;
  //   let letters = /^[a-zA-Z ]*$/;
  //   let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   let phoneno = /^\d{10}$/;
  //   let alphanumeric = /^[0-9a-zA-Z,/ ]+$/;

  //   if (this.state.contactName.length < 1) {
  //     contactNameError ="Contact name shouldn't be blank"
  //   }

  //   if (!this.state.contactName.match(letters)) {
  //     contactNameError ="Input alphabet characters only"
  //   }

  //   if (!this.state.email.match(mailformat)) {
  //     emailError ="Enter a valid email address"
  //   }

  //   if (!this.state.phone.match(phoneno)) {
  //     phoneError ="Not a valid phone number"
  //   }

  //   if (contactNameError || emailError || phoneError) {
  //     this.setState({ contactNameError, phoneError, emailError});
  //     return false;
  //   }

  //   return true;
  // }


  handleSubmit(e) {
    let session_guid = short.generate();
    e.preventDefault();
    // const isValid = this.validate();
    // if (isValid) {
    //   this.setState({
    //     contactNameError:"",
    //     emailError:"",
    //     phoneError:"",
    //   });

      let bodyData = {
      reference_no: session_guid,
      customer: this.state.customer,
      project: this.state.project,
      lead_source: this.state.leadSource,
      sales_engineer: this.state.salesEngineer,
      assigned_to: this.state.assignedTo,
      due_date: this.state.dueDate,
      contact_name: this.state.contactName,
      email: this.state.email,
      phone: this.state.phone,
      description_details: this.state.productCategory,
    };
    this.props.leadCreation(bodyData);
    // }
    
  }

  customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,


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
    if (this.props.lead_create) return <Redirect to="/leads"></Redirect>;
    return (
      <Fragment>
        <div className="userModule mT25">
          <Col md={6} className="pL0">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="#">
                  <Home size={15} />
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to="/Leads">Leads</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Create new lead</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0"></Col>
          <Card>
            <CardHeader>
              <Row className="row align-items-center">
                <Col style={{fontWeight: "600"}}>Create new lead</Col>
                <Col className="d-flex justify-content-md-end"></Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <Row>
                  <Col xl="6" lg="6" md="12">
                    <FormGroup
                      className={
                        this.state.customerFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      style={{marginBottom: "3rem"}}
                      id={this.state.customer ? "hasValue" : "hasnoValue"}
                    >
                      <Select
                        isSearchable={false}
                        className={
                          this.state.customer
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.customerFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        classNamePrefix="select"
                        
                        // defaultValue={colourOptions[0]}
                        options={this.state.customerOptions}
                        onChange={this.handleChangeCustomer.bind(this)}
                        onFocus={this.handleFocusCustomer.bind(this)}
                        onBlur={this.handleBlurCustomer.bind(this)}
                        placeholder=""
                        id={this.state.customerFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                      />
                      <Label className="form-control-placeholder">
                        Customer Name*
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="12">
                    <FormGroup
                      className={
                        this.state.projectFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      style={{marginBottom: "3rem"}}
                      id={this.state.project ? "hasValue" : "hasnoValue"}
                    >
                      <Select
                        isSearchable={false}
                        className={
                          this.state.project
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.projectFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        classNamePrefix="select"
                        style={{marginBottom: "3rem"}}
                        // defaultValue={colourOptions[0]}
                        name="color"
                        options={this.state.projectOptions}
                        onChange={this.handleChangeProject.bind(this)}
                        onFocus={this.handleFocusProject.bind(this)}
                        onBlur={this.handleBlurProject.bind(this)}
                        placeholder=""
                        id={this.state.projectFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                      />
                      <Label className="form-control-placeholder">
                        Project name*
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup
                      className={
                        this.state.leadSourceFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      style={{marginBottom: "3rem"}}
                      id={this.state.leadSource ? "hasValue" : "hasnoValue"}
                    >
                      <Select
                        isSearchable={false}
                        className={
                          this.state.leadSource
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.leadSourceFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        classNamePrefix="select"
                        style={{marginBottom: "3rem"}}
                        // defaultValue={colourOptions[0]}
                        name="color"
                        options={leadSourceOptions}
                        onChange={this.handleChangeLeadSource.bind(this)}
                        onFocus={this.handleFocusLeadSource.bind(this)}
                        onBlur={this.handleBlurLeadSource.bind(this)}
                        placeholder=""
                        id={this.state.leadSourceFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                      />
                      <Label className="form-control-placeholder">
                        Source of lead*
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup
                      className={
                        this.state.salesEngineerFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      style={{marginBottom: "3rem"}}
                      id={this.state.salesEngineer ? "hasValue" : "hasnoValue"}
                    >
                      <Select
                        isSearchable={false}
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        className={
                          this.state.salesEngineer
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.salesEngineerFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        name="color"
                        options={this.state.salesEngineerOptions}
                        onChange={this.handleChangeSalesEngineer.bind(this)}
                        onFocus={this.handleFocusSalesEngineer.bind(this)}
                        onBlur={this.handleBlurSalesEngineer.bind(this)}
                        placeholder=""
                        id={this.state.salesEngineerFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                     />
                     <Label className="form-control-placeholder">
                        Sales engineer*
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup
                      className={
                        this.state.assignedToFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      style={{marginBottom: "3rem"}}
                      id={this.state.assignedTo ? "hasValue" : "hasnoValue"}
                    >
                      <Select
                        isSearchable={false}
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        className={
                          this.state.assignedTo
                            ? "basic-single floatingLabel"
                            : "basic-single" + this.state.assignedToFocusStyle
                            ? "focused"
                            : "unfocused"
                        }
                        name="color"
                        options={this.state.assignedToOptions}
                        onChange={this.handleChangeAssignedTo.bind(this)}
                        onFocus={this.handleFocusAssignedTo.bind(this)}
                        onBlur={this.handleBlurAssignedTo.bind(this)}
                        placeholder=""
                        id={this.state.assignedToFocus ? "focused" : "unfocused"}
                        validations={[required, lt]}
                      />
                      <Label className="form-control-placeholder">
                        Assigned to*
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup
                      className={
                        this.state.dueDateFocus
                          ? "hasFloatingLabel selectInput isFocused"
                          : "hasFloatingLabel selectInput notFocused"
                      }
                      id={this.state.dueDate ? "hasValue" : "hasnoValue"}
                    >
                      <DatePickerInput
                        displayFormat={moment(this.state.dueDate).format(
                          "DD/MM/YYYY"
                        )}
                        onChange={this.handleChangeDueDate.bind(this)}
                        onFocus={this.handleFocusDueDate.bind(this)}
                        onBlur={this.handleBlurDueDate.bind(this)}
                        value={this.state.dueDate}
                        placeholder=""
                        id={this.state.dueDateFocus ? "focused" : "unfocused"}
                        showOnInputClick
                        style={{top:'.5px', marginBottom: "3rem"}}
                      />
                      <Label className="form-control-placeholder">Due date*</Label>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup
                      className={
                        this.state.contactNameFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      style={{marginBottom: "3rem"}}
                      id={this.state.contactName ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        className={
                          this.state.contactName
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeContactName.bind(this)}
                        onFocus={this.handleFocusContactName.bind(this)}
                        onBlur={this.handleBlurContactName.bind(this)}
                        validations={[required]}
                      />
                      <label className="form-control-placeholder" for="projectName">
                        Contact Name*
                      </label>
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup
                      className={
                        this.state.emailFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      style={{marginBottom: "3rem"}}
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
                  <Col xl="6" lg="6" md="12">
                    <FormGroup
                            className={
                              this.state.productCategoryFocus
                                ? "hasFloatingLabel selectInput isFocused"
                                : "hasFloatingLabel selectInput notFocused"
                            }
                            id={this.state.productCategory ? "hasValue" : "hasnoValue"}
                          >
                      {/* <Label for="basicinput">Product Description</Label>
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        placeholder="Value in numbers"
                        onChange={this.handleChangeDescription.bind(this)}
                      /> */}
                      <Label className="form-control-placeholder">
                        Product Categories*
                      </Label>
                      <Select
                        isMulti
                        styles={this.customStyles}
                        placeholder="Product Categories*"
                        // value={this.companyOption}
                        onChange={this.handleChangeDescription.bind(this)}
                        options={this.state.productCategoryOptions}                       
                      />
                    </FormGroup>
                  </Col>

                  <Col xl="3" lg="3" md="12">
                    <FormGroup
                      className={
                        this.state.phoneFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      style={{marginBottom: "3rem"}}
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
                        />
                        <Label className="form-control-placeholder">Phone*</Label>
                        <div className="form-control-position" style={{top: ".5px"}}>
                          <Phone size={16} className="formIcon" />
                        </div>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mT-13">
                  <Col md={6}></Col>
                  <Col md={6} className="justify-content-md-end d-flex">
                    <Button className="blue-btn" disabled={ !this.state.customer
                          || !this.state.project
                          || !this.state.leadSource
                          || !this.state.salesEngineer
                          || !this.state.assignedTo
                          || !this.state.dueDate
                          || !this.state.contactName
                          || !this.state.email
                          || !this.state.description
                          || !this.state.phone}
                    >
                  Save</Button>
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
  customer_list: state.customerReducer.customersList,
  project_list: state.projectReducer.projectList,
  sales_engg_user: state.userReducer.salesEnggUser,
  user_list: state.userReducer.usersList,
  lead_create: state.leadReducer.createLead,
  product_category_list: state.productReducer.productCategoryList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchCustomerList,
      fetchProjectList,
      salesEngineerFilter,
      fetchUserList,
      leadCreation,
      productCategoryList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadCreate);
