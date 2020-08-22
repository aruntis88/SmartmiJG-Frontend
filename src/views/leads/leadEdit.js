// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import { fetchCustomerList } from "../../redux/sagas/customers/fetchCustomers";
import { fetchProjectList } from "../../redux/sagas/projects/fetchProjectList";
import { salesEngineerFilter } from "../../redux/sagas/users/fetchSalesEngineer";
import { fetchUserList } from "../../redux/sagas/users/fetchUserList";
import { leadCreation } from "../../redux/sagas/leads/fetchLeadCreate";
import { leadUpdation } from "../../redux/sagas/leads/fetchUpdateLead";
import { fetchLead } from "../../redux/sagas/leads/fetchLead";
import { productCategoryList } from "../../redux/sagas/products/fetchProductCategory";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import moment from "moment";
import Select from "react-select";
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
  Input,
  Form,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Home, Search, AtSign, Phone } from "react-feather";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
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
const uuidv1 = require("uuid/v1");
class LeadEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: "",
      project: "",
      leadSource: "",
      customerId: "",
      projectId: "",
      leadSourceId: "",
      salesEngineer: "",
      assignedTo: "",
      salesEngineerId: "",
      assignedToId: "",
      dueDate: "",
      contactName: "",
      email: "",
      description: "",
      phone: "",
      contactNameError:"",
      emailError:"",
      phoneError:"",
      customerOptions: [],
      projectOptions: [],
      salesEngineerOptions: [],
      assignedToOptions: [],
      productCategoryOptions: [],
      productCategory: [],
      filterObj: {
        page: 1,
        activePage: 1,
      },
    };
    let pathArray = window.location.pathname.split("/");
    let leadId = pathArray[2];
    this.props.fetchLead(leadId);
    this.props.fetchUserList();
    this.props.fetchCustomerList();
    this.props.fetchProjectList();
    this.props.salesEngineerFilter();
    this.props.productCategoryList();
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      this.props.customer_list.map((customer, key) => {
        var obj = {};

        obj["value"] = customer.id;
        obj["label"] = customer.name;
        customerOptions.push(obj);
        obj = {};
      });
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
      if (this.props.lead_data) {
        console.log("bbbbbbbbbbbbbbbbbbbb", this.props.lead_data);
        this.setState({ customer: this.props.lead_data.customer_details.name });
        this.setState({ customerId: this.props.lead_data.customer_details.id });
        this.setState({ project: this.props.lead_data.project_details.name });
        this.setState({ projectId: this.props.lead_data.project_details.id });
        if (this.props.lead_data.lead_source == "P") {
          this.setState({ leadSource: "Phone" });
          this.setState({ leadSourceId: "P" });
        } else if (this.props.lead_data.lead_source == "F") {
          this.setState({ leadSource: "Fax" });
          this.setState({ leadSourceId: "F" });
        } else if (this.props.lead_data.lead_source == "W") {
          this.setState({ leadSource: "Website" });
          this.setState({ leadSourceId: "W" });
        } else if (this.props.lead_data.lead_source == "V") {
          this.setState({ leadSource: "Visit" });
          this.setState({ leadSourceId: "V" });
        } else if (this.props.lead_data.lead_source == "E") {
          this.setState({ leadSource: "Email" });
          this.setState({ leadSourceId: "E" });
        } else {
          this.setState({ leadSource: "Others" });
          this.setState({ leadSourceId: "O" });
        }
        // this.setState({ leadSource: this.props.lead_data.lead_source });
        console.log("leadddddd", this.state.leadSource);
        this.setState({
          salesEngineer: this.props.lead_data.sales_engineer_details.username,
          salesEngineerId: this.props.lead_data.sales_engineer_details.id,
        });
        this.setState({
          assignedTo: this.props.lead_data.assigned_to_details.username,
          assignedToId: this.props.lead_data.assigned_to_details.id,
        });
        this.setState({ dueDate: this.props.lead_data.due_date });
        this.setState({ contactName: this.props.lead_data.contact_name });
        this.setState({ email: this.props.lead_data.email });
        this.setState({
          description: this.props.lead_data.project_details.intro_date,
        });
        this.setState({ phone: this.props.lead_data.phone });
      }
    }, 1000);
  }
  handleChangeCustomer(e) {
    this.setState({ customerId: e.value });
  }
  handleChangeProject(e) {
    this.setState({ projectId: e.value });
  }
  handleChangeLeadSource(e) {
    this.setState({ leadSourceId: e.value });
  }
  handleChangeSalesEngineer(e) {
    this.setState({ salesEngineerId: e.value });
  }
  handleChangeAssignedTo(e) {
    this.setState({ assignedToId: e.value });
  }
  handleChangeDueDate(date) {
    let dateFormat = moment(date).format("YYYY-MM-DD");
    this.setState({
      dueDate: dateFormat,
    });
  }
  handleChangeContactName(e) {
    this.setState({ contactName: e.target.value });
  }
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  handleChangeDescription(e) {
    // this.setState({ description: e.target.value });
    e.map((value, key) => {
      var value = value.value;
      productCategory.push(value);
    });
    setTimeout(() => {
      this.setState({ productCategory: productCategory });
      productCategory = [];
    }, 100);
  }
  handleChangePhone(e) {
    this.setState({ phone: e.target.value });
  }

  validate = () => {

    let phoneError = "";
    let emailError = "";
    let contactNameError = "";

    let numbers = /^[0-9]+$/;
    let letters = /^[a-zA-Z ]*$/;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let phoneno = /^\d{10}$/;
    let alphanumeric = /^[0-9a-zA-Z,/ ]+$/;

    if (this.state.contactName.length < 1) {
      contactNameError ="Contact name shouldn't be blank"
    }

    if (!this.state.contactName.match(letters)) {
      contactNameError ="Input alphabet characters only"
    }

    if (!this.state.email.match(mailformat)) {
      emailError ="Enter a valid email address"
    }

    if (!this.state.phone.match(phoneno)) {
      phoneError ="Not a valid phone number"
    }

    if (contactNameError || emailError || phoneError) {
      this.setState({ contactNameError, phoneError, emailError});
      return false;
    }

    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState({ contactNameError:"",
        emailError:"",
        phoneError:"",
    });

      let bodyData = {
      customer: this.state.customerId,
      project: this.state.projectId,
      lead_source: this.state.leadSourceId,
      sales_engineer: this.state.salesEngineerId,
      assigned_to: this.state.assignedToId,
      due_date: this.state.dueDate,
      contact_name: this.state.contactName,
      email: this.state.email,
      phone: this.state.phone,
      description: this.state.productCategory,
    };
    let pathArray = window.location.pathname.split("/");
    let leadId = pathArray[2];
    this.props.leadUpdation(bodyData, leadId);
    }   
  }

  render() {
    if (this.props.lead_create) return <Redirect to="/leads"></Redirect>;
    if (this.props.lead_update) return <Redirect to="/leads"></Redirect>;
    return (
      <Fragment>
        <div className="userModule mT25 editModule">
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
              <BreadcrumbItem active>Edit lead</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0"></Col>
          <Card>
            <CardHeader>
              <Row className="row align-items-center">
                <Col style={{fontWeight: "600"}}>Edit lead</Col>
                <Col className="d-flex justify-content-md-end"></Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <Row>
                  <Col xl="6" lg="6" md="12">
                    <FormGroup>
                      <Label for="basicinput">Customer name</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        //value={this.state.customer}
                        options={this.state.customerOptions}
                        placeholder={this.state.customer}
                        onChange={this.handleChangeCustomer.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="12">
                    <FormGroup>
                      <Label for="basicinput">Project name</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        //value={this.state.project}
                        options={this.state.projectOptions}
                        placeholder={this.state.project}
                        onChange={this.handleChangeProject.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label for="basicinput">Source of lead</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        //value={this.state.leadSource}
                        options={leadSourceOptions}
                        placeholder={this.state.leadSource}
                        onChange={this.handleChangeLeadSource.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label for="basicinput">Sales engineer</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        //value={this.state.salesEngineer}
                        options={this.state.salesEngineerOptions}
                        placeholder={this.state.salesEngineer}
                        onChange={this.handleChangeSalesEngineer.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label for="basicinput">Assigned to</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        //value={this.state.assignedTo}
                        options={this.state.assignedToOptions}
                        placeholder={this.state.assignedTo}
                        onChange={this.handleChangeAssignedTo.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label for="basicinput">Due date</Label>
                      <DatePickerInput
                        onChange={this.handleChangeDueDate.bind(this)}
                        value={this.state.dueDate}
                        className="my-custom-datepicker-component" 
                        style={{top: '-.5px'}} 
                        showOnInputClick                   
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label for="basicinput">Contact name</Label>
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        placeholder="Value in numbers"
                        value={this.state.contactName}
                        onChange={this.handleChangeContactName.bind(this)}
                      />
                       {this.state.contactNameError ? (
                          <div className="cValidation"> 
                            {this.state.contactNameError}
                          </div>
                        ): null }
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label for="basicinput">Email</Label>
                      <div className="position-relative has-icon-right">
                        <Input
                          type="text"
                          id="iconRight"
                          name="iconRight"
                          className="round"
                          value={this.state.email}
                          onChange={this.handleChangeEmail.bind(this)}
                        />
                        <div className="form-control-position" style={{top: '.5px'}}>
                          <AtSign size={16} className="formIcon" />
                        </div>
                      </div>
                      {this.state.emailError ? (
                          <div className="cValidation"> 
                            {this.state.emailError}
                          </div>
                        ): null }
                    </FormGroup>
                  </Col>
                  {/* <Col xl="6" lg="6" md="12">
                    <FormGroup>
                      <Label for="basicinput">Description</Label>
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        placeholder="Value in numbers"
                        value={this.state.description}
                        onChange={this.handleChangeDescription.bind(this)}
                      />
                    </FormGroup>
                  </Col> */}
                  <Col xl="6" lg="6" md="12">
                    <FormGroup>
                      <Label className="form-control-placeholder">
                        Product Categories
                      </Label>
                      <Select
                        className="basic-single"
                        // className={
                        //   this.state.assignCompanies.length > 0
                        //     ? "basic-single floatingLabel"
                        //     : "basic-single"
                        // }
                        classNamePrefix="select"
                        isMulti
                        onChange={this.handleChangeDescription.bind(this)}
                        // onFocus={this.handleFocusAssignCompany.bind(this)}
                        // onBlur={this.handleBlurAssignCompany.bind(this)}
                        options={this.state.productCategoryOptions}
                        // id={this.state.assignCompaniesFocus ? "focused" : null}
                        placeholder=""
                      />
                    </FormGroup>
                  </Col>

                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label for="basicinput">Phone</Label>
                      <div className="position-relative has-icon-right">
                        <Input
                          type="text"
                          id="iconRight"
                          name="iconRight"
                          className="round"
                          value={this.state.phone}
                          onChange={this.handleChangePhone.bind(this)}
                        />
                        <div className="form-control-position" style={{top: '.5px'}}>
                          <Phone size={16} className="formIcon" />
                        </div>
                      </div>
                      {this.state.phoneError ? (
                          <div className="cValidation"> 
                            {this.state.phoneError}
                          </div>
                        ): null }
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mT-13">
                  <Col md={6}></Col>
                  <Col md={6} className="justify-content-md-end d-flex">
                    <Button className="blue-btn">Update</Button>
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
  lead_data: state.leadReducer.leadData,
  lead_update: state.leadReducer.updateLead,
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
      fetchLead,
      leadUpdation,
      productCategoryList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadEdit);
