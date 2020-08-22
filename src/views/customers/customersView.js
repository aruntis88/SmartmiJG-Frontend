// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { fetchCustomer } from "../../redux/sagas/customers/fetchCustomer";
import { fetchCustomerNotesList } from "../../redux/sagas/notes/fetchCustomerNotes";
import { customerNotesCreation } from "../../redux/sagas/notes/fetchCustomerNotesCreate";
import { fetchCustomerHistory } from "../../redux/sagas/customers/fetchCustomerHistory";
import edit from "../../assets/img/edit.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import filter from "../../assets/img/filter.png";
import spinnerofdots from "../../assets/img/spinner-of-dots.png";
import megaphone from "../../assets/img/megaphone.png";
import historyCreate from "../../assets/img/historyCreate.png";
import historyStatus from "../../assets/img/historyStatus.png";
import historyEdit from "../../assets/img/historyEdit.png";
import megaphoneIcon from "../../assets/img/megaphoneIcon.png";
import spinnerIcon from "../../assets/img/spinnerIcon.png";
import moment from "moment";
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
import { salesEngineerFilter } from "../../redux/sagas/users/fetchSalesEngineer";
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
let salesEngOptions = [];
class CustomersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soupIsReady: true,
      selectedDate: "2017-08-13",
      newNote: false,
      notesDesc: "",
      notesName: "",
      salesEngOptions: [],
      filterObj: {
        saleEng: "",
        id: null,
      },
    };

    let pathArray = window.location.pathname.split("/");
    let customerId = pathArray[2];
    this.props.salesEngineerFilter();

    this.props.fetchCustomer(customerId);
    this.props.fetchCustomerHistory(customerId);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    let pathArray = window.location.pathname.split("/");
    let projectId = pathArray[2];
    this.state.filterObj.id = projectId;
    this.props.fetchCustomerNotesList(this.state.filterObj);
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      if (this.props.sales_engg_user) {
        this.props.sales_engg_user.map((sales_user, key) => {
          var obj = {};

          obj["value"] = sales_user.id;
          obj["label"] = sales_user.username;
          salesEngOptions.push(obj);
          obj = {};
        });
      }
      this.setState({ salesEngOptions: salesEngOptions });
      salesEngOptions = [];
    }, 1000);
  }
  componentWillUpdate() {}
  handleSaleEng(saleEng) {
    console.log("saleEng", saleEng);
    this.state.filterObj.saleEng = saleEng.value;
    this.props.fetchCustomerNotesList(this.state.filterObj);
  }
  handleHistory(saleEng) {
    console.log("saleEng", saleEng);
    this.props.fetchCustomerHistory(saleEng.value);
  }
  onChange(date) {
    this.setState({
      selectedDate: date,
    });
  }
  toggleNewNote() {
    this.setState((prevState) => ({
      newNote: !prevState.newNote,
    }));
  }
  handleChangeNotesType(e) {
    this.setState({ notesName: e.value });
  }
  handleChangenoteDesc(e) {
    this.setState({ notesDesc: e.target.value });
    console.log("averagecost on change", e.target.value, this.state.notesDesc);
  }
  handleSubmitNotes(e) {
    console.log(
      "localStorage.getItemuser_name",
      localStorage.getItem("user_name")
    );
    console.log("localStorage.getItemuser_id", localStorage.getItem("user_id"));
    e.preventDefault();
    var today = new Date();
    let bodyData = {
      title: this.state.notesName,
      description: this.state.notesDesc,
      added_by: 1,
      date:
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate(),
      customer: this.state.filterObj.id,
      added_by: localStorage.getItem("user_id"),
    };

    this.props.customerNotesCreation(bodyData);
    this.state.newNote = false;

    setTimeout(() => {
      this.props.fetchCustomerNotesList(this.state.filterObj);
    }, 1000);
  }
  render() {
    const progressUpdate = (
      <span>
        <img src={spinnerIcon} style={{ marginRight: 5 }} />
        Progress update
      </span>
    );
    const alert = (
      <span>
        <img src={megaphoneIcon} style={{ marginRight: 5 }} />
        Alert
      </span>
    );
    const noteType = [
      { value: "Progress update", label: progressUpdate },
      { value: "Alert", label: alert },
    ];
   
   let totalWords ="";

   const firstWord = totalWords => {
    return totalWords.replace(/ .*/,'');
   }   

  let substrLength = firstWord(totalWords).toString().trim().length;

  let balanceWords = "";

  const bWords = balanceWords => {
    return balanceWords.substr(balanceWords.indexOf(" ") + 1);
  } 

  if (this.props.customer_history) {
    console.log(this.props.customer_history);
  }

    return (
      <Fragment>
        {this.props.customer_data ? (
          <div className="userModule mT25">
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
            <Card className="col-md-12">
              <CardHeader>
                <Row className="row align-items-center">
                  <Col>{this.props.customer_data.name}</Col>
                  <Col className="d-flex justify-content-md-end align-items-center">
                    <Link to={"/customers-edit/" + this.props.customer_data.id}>
                      <span>
                        <img src={edit} />
                      </span>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Customer name</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.customer_data.name}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Customer type</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.customer_data.customer_type_details.map(
                            (customer_type, i, arr) => {
                              return (
                                <span key={i}>
                                  {" "}
                                  {customer_type.type}
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
                        <Label for="basicinput">Email</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.customer_data.email}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Phone</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.customer_data.phone}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Fax</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.customer_data.fax}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Website</Label>
                        <p className="userNameColor">
                          {" "}
                          {this.props.customer_data.website}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Introduced by</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.customer_data.introby_details.username}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Introduced date</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.customer_data.introduced_date}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Country</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.customer_data.country_details.name}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Address line 1</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.customer_data.address1}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Address line 2</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.customer_data.address2}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Status</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.customer_data.is_active
                            ? "Active"
                            : "Inactive"}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
                <div className="d-flex col-12 flex-wrap">
                  <Col md="6" className="mB15">
                    <h2 className="smTitle">Point of contact</h2>{" "}
                  </Col>
                  <Col md="6" className="mB15"></Col>
                  <Col className="col-md-6 ">
                    <Row className="nextedCol">
                      <Col xl="6" lg="6" md="12">
                        <FormGroup>
                          <Label for="basicinput">Name</Label>

                          <p className="liteFontColor">
                            {" "}
                            {this.props.customer_data.contact_details[0].name}
                          </p>
                        </FormGroup>
                      </Col>
                      <Col xl="6" lg="6" md="12">
                        <FormGroup>
                          <Label for="basicinput">Phone</Label>
                          <p className="liteFontColor">
                            {" "}
                            {this.props.customer_data.contact_details[0].phone}
                          </p>
                        </FormGroup>
                      </Col>
                      <Col xl="6" lg="6" md="12">
                        <FormGroup>
                          <Label for="basicinput">Email</Label>
                          <p className="liteFontColor">
                            {" "}
                            {this.props.customer_data.contact_details[0].email}
                          </p>
                        </FormGroup>
                      </Col>
                      <Col xl="6" lg="6" md="12">
                        <FormGroup>
                          <Label for="basicinput">Designation</Label>
                          <p className="liteFontColor">
                            {" "}
                            {this.props.customer_data.contact_details[0]
                              .designation == "SE"
                              ? "Sales Engineer"
                              : "Software Engineer"}
                          </p>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="col-md-6 ">
                    <FormGroup className="row">
                      <h2 className="smTitle">Assign sales engineers</h2>
                      <Col xl="12" lg="12" md="12">
                        <p
                          className="liteFontColor"
                          style={{ marginTop: "5px" }}
                        >
                          {" "}
                          {this.props.customer_data.sales_engineers_details.map(
                            (sales_engg, i, arr) => {
                              return (
                                <span key={i} className="assignedSales">
                                  {" "}
                                  {sales_engg.username}
                                  {arr.length - 1 == i ? "" : ","}
                                </span>
                              );
                            }
                          )}
                        </p>
                      </Col>
                    </FormGroup>
                    <Row>
                      <Col xl="6" lg="3" md="12"></Col>
                    </Row>
                    <Col md={6} className="assignBlock text-center"></Col>
                    <Col className="col-md-6 "></Col>
                  </Col>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : null}
        <Row className="extras">
          <Col xl="4" lg="4" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md={6}>
                    <h2 className="smTitle">Note</h2>
                  </Col>
                  <Col md={6} className="d-flex justify-content-md-end">
                    {!this.state.newNote ? (
                      <span
                        style={{
                          color: "#5E77FF",
                          fontSize: 15,
                          cursor: "pointer",
                        }}
                        onClick={this.toggleNewNote.bind(this)}
                      >
                        <span>
                          <img src={edit} />{" "}
                        </span>{" "}
                        <span style={{ position: "relative", top: 3 }}>
                          New Note
                        </span>
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "#5E77FF",
                          fontSize: 15,
                          cursor: "pointer",
                        }}
                        onClick={this.toggleNewNote.bind(this)}
                      >
                        <span style={{ position: "relative", top: 3 }}>
                          Cancel
                        </span>
                      </span>
                    )}
                  </Col>
                </Row>
              </CardHeader>
              {!this.state.newNote ? (
                <CardBody>
                  <div className="d-flex flex-wrap mT25">
                    <Col md={10}>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        options={this.state.salesEngOptions}
                        onChange={this.handleSaleEng.bind(this)}
                        placeholder="Filter by Engineer"
                      />
                      {console.log("noteType", noteType)}
                    </Col>
                    <Col md={2}>
                      <Row>
                        <img src={filter} className="" />
                      </Row>
                    </Col>
                  </div>

                  {this.props.notes_list
                    ? this.props.notes_list.map((notes, i) => {
                        return (
                          <div className="d-flex flex-wrap mT25">
                            <Col md={7}>
                              <p style={{ fontSize: 14, color: "#646C9A" }}>
                                {notes.added_by_details.first_name}
                              </p>
                            </Col>
                            <Col md={5}>
                              <p style={{ fontSize: 12, color: "#A0A7C3" }}>
                                {notes.date}
                              </p>
                            </Col>
                            <Col md={12}>
                              <p style={{ fontSize: 13, color: "#A0A7C3" }}>
                                {notes.description}
                              </p>
                            </Col>
                            <Col md={12}>
                              <p
                                style={
                                  notes.title == "Progress update"
                                    ? { color: "#447EFF", fontSize: 13 }
                                    : { color: "#FF4577", fontSize: 13 }
                                }
                              >
                                {/* <p style={{ color: "#447EFF", fontSize: 13 }}> */}
                                <span style={{ marginRight: 10 }}>
                                  <img
                                    src={
                                      notes.title == "Progress update"
                                        ? spinnerofdots
                                        : megaphone
                                    }
                                  />
                                </span>
                                {notes.title}
                              </p>
                            </Col>
                          </div>
                        );
                      })
                    : null}
                </CardBody>
              ) : (
                <CardBody>
                  <Form>
                    <Row>
                      <Col md={10}>
                        <FormGroup>
                          <Label>Type of note</Label>

                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            // defaultValue={colourOptions[0]}
                            name="color"
                            options={noteType}
                            onChange={this.handleChangeNotesType.bind(this)}
                            isSearchable={false}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="exampleText">Description</Label>
                          <Input
                            type="textarea"
                            name="text"
                            id="exampleText"
                            placeholder="Add your notes here.."
                            onChange={this.handleChangenoteDesc.bind(this)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={12} className="justify-content-md-end d-flex">
                        <Button
                          type="submit"
                          className="blue-btn"
                          onClick={this.handleSubmitNotes.bind(this)}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              )}
            </Card>
          </Col>
          <Col xl="4" lg="4" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md={6}>
                    <h2 className="smTitle">Activities</h2>
                  </Col>
                  <Col
                    className="d-flex justify-content-md-end"
                    style={{
                      position: "relative",
                      top: "-5px",
                    }}
                    md={6}
                  >
                    <Select
                      className="basic-single w-100 h0"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      name="color"
                      // options={colourOptions}
                      placeholder="Filter by Engineer"
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div style={{ display: "none" }}>
                  <div className="d-flex flex-wrap mT25">
                    <Col md={6}>
                      <p style={{ fontSize: 14, color: "#646C9A" }}>
                        Ronald Rayan Barboza
                      </p>
                    </Col>
                    <Col md={6}>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#A0A7C3",
                          border: "1px solid #EAEDF1",
                          borderRadius: 2,
                          padding: 5,
                        }}
                      >
                        11:00 AM - 1:00 PM{" "}
                      </p>
                    </Col>
                    <Col md={12}>
                      <p style={{ fontSize: 13, color: "#A0A7C3" }}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam.
                      </p>
                    </Col>
                    <Col md={8}>
                      <p
                        style={{ color: "#ffc02e", fontSize: 13 }}
                        className="inProgress"
                      >
                        {/* <span style={{ marginRight: 10 }}>
                        <img src={spinnerofdots} />
                      </span> */}
                        Enquiry
                      </p>
                    </Col>
                    <Col md={4}>
                      <p style={{ fontSize: 12, color: "#A0A7C3" }}>
                        01/10/2018
                      </p>
                    </Col>
                  </div>
                  <div className="d-flex flex-wrap mT25">
                    <Col md={6}>
                      <p style={{ fontSize: 14, color: "#646C9A" }}>
                        Ronald Rayan Barboza
                      </p>
                    </Col>
                    <Col md={6}>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#A0A7C3",
                          border: "1px solid #EAEDF1",
                          borderRadius: 2,
                          padding: 5,
                        }}
                      >
                        11:00 AM - 1:00 PM{" "}
                      </p>
                    </Col>
                    <Col md={12}>
                      <p style={{ fontSize: 13, color: "#A0A7C3" }}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam.
                      </p>
                    </Col>
                    <Col md={8}>
                      <p
                        style={{ color: "#15cda8", fontSize: 13 }}
                        className="onGoing"
                      >
                        {/* <span style={{ marginRight: 10 }}>
                        <img src={spinnerofdots} />
                      </span> */}
                        Project introduction
                      </p>
                    </Col>
                    <Col md={4}>
                      <p style={{ fontSize: 12, color: "#A0A7C3" }}>
                        01/10/2018
                      </p>
                    </Col>
                  </div>
                  <div className="d-flex flex-wrap mT25">
                    <Col md={6}>
                      <p style={{ fontSize: 14, color: "#646C9A" }}>
                        Ronald Rayan Barboza
                      </p>
                    </Col>
                    <Col md={6}>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#A0A7C3",
                          border: "1px solid #EAEDF1",
                          borderRadius: 2,
                          padding: 5,
                        }}
                      >
                        11:00 AM - 1:00 PM{" "}
                      </p>
                    </Col>
                    <Col md={12}>
                      <p style={{ fontSize: 13, color: "#A0A7C3" }}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam.
                      </p>
                    </Col>
                    <Col md={8}>
                      <p
                        style={{ color: "#ff4577", fontSize: 13 }}
                        className="closed"
                      >
                        {/* <span style={{ marginRight: 10 }}>
                        <img src={spinnerofdots} />
                      </span> */}
                        Submittals
                      </p>
                    </Col>
                    <Col md={4}>
                      <p style={{ fontSize: 12, color: "#A0A7C3" }}>
                        01/10/2018
                      </p>
                    </Col>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4" lg="4" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md={6}>
                    <h2 className="smTitle">Customer history</h2>
                  </Col>
                  <Col
                    className="d-flex justify-content-md-end"
                    style={{
                      position: "relative",
                      top: "-5px",
                    }}
                    md={6}
                  >
                      <Select
                      className="basic-single w-100 h0"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      name="color"
                      placeholder="Filter by Engineer"
                      options={this.state.salesEngOptions}
                      onChange={this.handleHistory.bind(this)}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {this.props.customer_history
                  ? this.props.customer_history.results.map(
                      (projectHistory, i) => {
                        return (
                          <div className="d-flex flex-wrap mT25">
                            <Col md={3}>
                              <img src={historyEdit} />
                              <span className="historyLine"></span>
                            </Col>
                            <Col md={9}>
                              <p
                                style={{
                                  fontSize: 13,
                                  color: "#A0A7C3",
                                }}
                              >
                                {moment(projectHistory.time).format("hh:mm")}{" "}
                              </p>
                              <p
                                style={{
                                  fontSize: 13,
                                  color: "#646B9A",
                                }}
                              >
                              <span className="NameColor">
                                {firstWord(projectHistory.description)}
                              </span>
                              <span>
                                {" "}{bWords(projectHistory.description)}
                                </span>
                              </p>
                              <p
                                style={{
                                  fontSize: 13,
                                  color: "#A0A7C3",
                                }}
                              >
                                {moment(projectHistory.time).format(
                                  "DD/MM/YYYY"
                                )}{" "}
                              </p>
                            </Col>
                          </div>
                        );
                      }
                    )
                  : null}

                {/* <div className="d-flex flex-wrap mT25">
                  <Col md={3}>
                    <img src={historyCreate} />
                    <span className="historyLine"></span>
                  </Col>
                  <Col md={9}>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#A0A7C3",
                      }}
                    >
                      11:00 AM - 1:00 PM{" "}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#646B9A",
                      }}
                    >
                      Customer is created by
                     
                      <span className="NameColor">Arun B. krishnan</span>
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#A0A7C3",
                      }}
                    >
                      02/15/2018{" "}
                    </p>
                  </Col>
                </div>
                <div className="d-flex flex-wrap mT25">
                  <Col md={3}>
                    <img src={historyStatus} />
                    <span className="historyLine"></span>
                  </Col>
                  <Col md={9}>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#A0A7C3",
                      }}
                    >
                      11:00 AM - 1:00 PM{" "}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#646B9A",
                      }}
                    >
                      Customer status has been changed as
                      <span className="NameColor">Inactive</span> by{" "}
                      <span className="NameColor">Arun B. krishnan</span>
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#A0A7C3",
                      }}
                    >
                      02/15/2018{" "}
                    </p>
                  </Col>
                </div> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  sales_engg_user: state.userReducer.salesEnggUser,
  customer_data: state.customerReducer.customerData,
  notes_list: state.notesReducer.customerNotesList,
  notes_create: state.notesReducer.createCustomerNotes,
  customer_history: state.customerReducer.customerHistory,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      salesEngineerFilter,
      fetchCustomer,
      fetchCustomerNotesList,
      customerNotesCreation,
      fetchCustomerHistory,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomersView);
