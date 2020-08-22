// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import { EditIcon } from "react-line-awesome";
import { fetchLead } from "../../redux/sagas/leads/fetchLead";
import { quoteprepareOnLead } from "../../redux/actions/leads/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
  Button,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { Home, Search } from "react-feather";

class LeadView extends Component {
  constructor(props) {
    super(props);
    this.state = { leadSource: "", redirectToQuoteCreate: false };
    let pathArray = window.location.pathname.split("/");
    let leadId = pathArray[2];
    this.props.fetchLead(leadId);
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      if (this.props.lead_data) {
        if (this.props.lead_data.lead_source == "P")
          this.setState({ leadSource: "Phone" });
        else if (this.props.lead_data.lead_source == "F")
          this.setState({ leadSource: "Fax" });
        else if (this.props.lead_data.lead_source == "W")
          this.setState({ leadSource: "Website" });
        else if (this.props.lead_data.lead_source == "V")
          this.setState({ leadSource: "Visit" });
        else if (this.props.lead_data.lead_source == "E")
          this.setState({ leadSource: "Email" });
        else this.setState({ leadSource: "Others" });
      }
    }, 1000);
  }
  handlePrepareQuotation(leadData) {
    this.props.quoteprepareOnLead(leadData);
    this.setState({ redirectToQuoteCreate: true });
  }
  render() {
    if (this.state.redirectToQuoteCreate)
      return <Redirect to="/quote-create"></Redirect>;
    return (
      <Fragment>
        {this.props.lead_data ? (
          <div className="userModule mT25">
            <Col md={6} className="pL0">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="#">
                    <Home size={15} />
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link to="/leads">Leads</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  {this.props.lead_data.reference_no}
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col md={6} className="justify-content-end d-flex pR0" style={{fontWeight: "600"}}>
              <Button
                onClick={() =>
                  this.handlePrepareQuotation(this.props.lead_data)
                }
                className="blue-btn"
              >
                Prepare quotation
              </Button>
            </Col>
            <Card className="col-md-12">
              <CardHeader>
                <Row className="row align-items-center">
                  <Col style={{ color: "#5E77FF" }}>
                    {this.props.lead_data.reference_no}
                  </Col>
                  <Col className="d-flex justify-content-md-end">
                    <Link to={"/lead-edit/" + this.props.lead_data.id}>
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
                        <Label for="basicinput">Customer name</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.lead_data.customer_details.name}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Project name</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.lead_data.project_details.name}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Source of lead</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.state.leadSource}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Sales engineer</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.lead_data.sales_engineer_details.username}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Assigned to</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.lead_data.assigned_to_details.username}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Due date</Label>
                        <p className="liteFontColor">
                          {" "}
                          {moment(this.props.lead_data.due_date).format(
                            "DD/MM/YYYY"
                          )}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Contact name</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.lead_data.contact_name}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Email</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.lead_data.email}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Country</Label>
                        <p className="liteFontColor"> Quatar</p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Created date</Label>
                        <p className="liteFontColor">
                          {" "}
                          {moment(
                            this.props.lead_data.project_details.intro_date
                          ).format("DD/MM/YYYY")}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="5" lg="5" md="12">
                      <FormGroup>
                        <Label for="basicinput">Product Categories</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.lead_data.description_details
                            ? this.props.lead_data.description_details.map(
                                (lead, i) => {
                                  return (
                                    <span style={{ marginRight: 10 }}>
                                      {lead.name}
                                    </span>
                                  );
                                }
                              )
                            : null}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </div>
        ) : null}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  lead_data: state.leadReducer.leadData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchLead,
      quoteprepareOnLead,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadView);
