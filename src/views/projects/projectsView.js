// import external modules
import React, { Component, Fragment } from "react";
import { EditIcon } from "react-line-awesome";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { fetchProject } from "../../redux/sagas/projects/fetchProject";
import { fetchProjectHistory } from "../../redux/sagas/projects/fetchProjectHistory";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProjectNotesList } from "../../redux/sagas/notes/fetchProjectNotes";
import { projectNotesCreation } from "../../redux/sagas/notes/fetchProjectNotesCreate";
import { salesEngineerFilter } from "../../redux/sagas/users/fetchSalesEngineer";
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
import filter from "../../assets/img/filter.png";
import spinnerofdots from "../../assets/img/spinner-of-dots.png";
import megaphone from "../../assets/img/megaphone.png";
import megaphoneIcon from "../../assets/img/megaphoneIcon.png";
import spinnerIcon from "../../assets/img/spinnerIcon.png";
import edit from "../../assets/img/edit.png";
import historyCreate from "../../assets/img/historyCreate.png";
import historyStatus from "../../assets/img/historyStatus.png";
import historyEdit from "../../assets/img/historyEdit.png";
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
class ProjectsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soupIsReady: true,
      selectedDate: "2017-08-13",
      newNote: false,
      notesDesc: "",
      notesName: "",
      status_place: "",
      salesEngOptions: [],
      lat: "",
      lng: "",
      filterObj: {
        saleEng: "",
        id: null,
      },
    };
    let pathArray = window.location.pathname.split("/");
    let projectId = pathArray[2];
    this.props.salesEngineerFilter();
    this.props.fetchProject(projectId);
    this.props.fetchProjectHistory(projectId);

    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    let pathArray = window.location.pathname.split("/");
    let projectId = pathArray[2];
    this.state.filterObj.id = projectId;
    this.props.fetchProjectNotesList(this.state.filterObj);
  }
  handleSaleEng(saleEng) {
    console.log("saleEng", saleEng);
    this.state.filterObj.saleEng = saleEng.value;
    this.props.fetchProjectNotesList(this.state.filterObj);
  }
  componentWillReceiveProps() {
    setTimeout(
      () => {
        if (this.props.project_data) {
          console.log("dfgdff", this.props.project_data.status);
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
          console.log(this.props.project_data.quoted_companies)
          localStorage.setItem("projectLat", this.props.project_data.latitude);
          localStorage.setItem("projectLng", this.props.project_data.longitude);
        }
      },

      1000
    );
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
   handleHistory(saleEng) {
    console.log("saleEng", saleEng);
    this.props.fetchProjectHistory(saleEng.value);
  }
  handleSubmitNotes(e) {
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
      project: this.state.filterObj.id,
      added_by: localStorage.getItem("user_id"),
    };

    this.props.projectNotesCreation(bodyData);
    this.state.newNote = false;

    setTimeout(() => {
      this.props.fetchProjectNotesList(this.state.filterObj);
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

    return (
      <Fragment>
        {this.props.project_data ? (
          <div className="userModule mT25">
            <Col md={6} className="pL0">
              <Breadcrumb>
                <BreadcrumbItem>
                  <a href="">
                    <Home size={15} />
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <a href="/projects">Project</a>
                </BreadcrumbItem>
                <BreadcrumbItem active>{this.props.project_data.reference_no}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col md={6} className="justify-content-end d-flex pR0"></Col>
            <Card className="col-md-12">
              <CardHeader>
                <Row className="row align-items-center">
                  <Col>{this.props.project_data.reference_no}</Col>
                  <Col className="d-flex justify-content-md-end">
                    <Link to={"/projects-edit/" + this.props.project_data.id}>
                      <EditIcon />
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Project name</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.project_data.name}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Stage</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.project_data.stage == "T"
                            ? "Tender"
                            : "Job In Hand"}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Status</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.state.status_place}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Segment</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.project_data.segment_details.name}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Country</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.project_data.country_details.name}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Introduced by</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.project_data.intro_by_details.username}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Introduced date</Label>
                        <p className="liteFontColor">
                          {" "}
                          {moment(this.props.project_data.intro_date).format(
                            "DD/MM/YYYY"
                          )}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Value</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.project_data.value}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Completion (%)</Label>
                        <p className="liteFontColor">
                          {this.props.project_data.completion}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Expected start date</Label>
                        <p className="liteFontColor">
                          {moment(
                            this.props.project_data.exp_start_date
                          ).format("DD/MM/YYYY")}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Expected end date</Label>
                        <p className="liteFontColor">
                          {moment(this.props.project_data.exp_end_date).format(
                            "DD/MM/YYYY"
                          )}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Project address</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.project_data.client_details.address1}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Client</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.project_data.client_details.name}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Main contractor</Label>
                        <p className="liteFontColor">
                          {this.props.project_data.main_contractor_details.name}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Main subcontractor</Label>
                        <p className="liteFontColor">
                          {
                            this.props.project_data.main_sub_contractor_details
                              .name
                          }
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Design consultant</Label>
                        <p className="liteFontColor">
                          {
                            this.props.project_data.design_consultant_details
                              .name
                          }
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Supervision consultant</Label>
                        <p className="liteFontColor">
                          {
                            this.props.project_data
                              .supervision_consultant_details.name
                          }
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Project location</Label>
                        <Link
                          to={
                            "/projects-map-single/" + this.props.project_data.id
                          }
                        >
                          <p className="userNameColor"> View on map</p>
                        </Link>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
                <Row>
                  <Col md="12" className="mB15 pH40">
                    <h2 className="smTitle">Linked companies</h2>
                  </Col>

                  <Col className="col-md-12 mB15">
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
                        {this.props.project_data.quoted_companies.length > 0
                          ? this.props.project_data.quoted_companies
                              .slice(0)
                              .reverse()
                              .map((company, i) => {
                                return (
                                  <tr>
                                    <td>{company.company}</td>
                                    <td>
                                      <span
                                        className={
                                          company.detail[0].in_scope
                                            ? "activeStatus"
                                            : "inactiveStatus"
                                        }
                                      >
                                        {company.detail[0].in_scope ? "Yes" : "No"}
                                      </span>
                                    </td>
                                    <td>
                                      {company.detail[0].net_amount}
                                    </td>
                                    <td>{company.detail[0].lost_amount}</td>
                                    <td>{company.detail[0].ordered_amount}</td>
                                  </tr>
                                );
                              })
                          : null}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
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
                    <h2 className="smTitle">Project history</h2>
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
                      options={this.state.salesEngOptions}
                      placeholder="Filter by Engineer"
                      onChange={this.handleHistory.bind(this)}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {this.props.project_history.results
                  ? this.props.project_history.results.map(
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
  project_data: state.projectReducer.projectData,
  project_history: state.projectReducer.projectHistory,
  notes_list: state.notesReducer.projectNotesList,
  notes_create: state.notesReducer.createProjectsNotes,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchProject,
      fetchProjectHistory,
      fetchProjectNotesList,
      projectNotesCreation,
      salesEngineerFilter,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsView);
