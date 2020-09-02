// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import { connect } from "react-redux";
import { fetchUserList } from "../../redux/sagas/users/fetchUserList";
import { companyDetails } from "../../redux/sagas/companyDetails/companyDetails";
import { bindActionCreators } from "redux";
import commingSoon from "../../assets/img/commingSoon.png";
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
  CardBody
} from "reactstrap";
import { Link } from "react-router-dom";
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
  ChevronDown
} from "react-feather";
import Select from "react-select";
import classnames from "classnames";
import Companies from "./companies/companies";
import Products from "./products/products";
class General extends Component {
  constructor(props) {
    super(props);

    if (this.props.location.state=='company') {
      console.log(this.props.location.state)
        this.state = { activeTab: "2" };
    } else 
    {
         this.state = { activeTab: "8" };
    } 
    
    }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };
  render() {
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
                <a href="/general">General</a>
              </BreadcrumbItem>
              <BreadcrumbItem active>General Settings</BreadcrumbItem>
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
            <CardBody>
              <div className="tabs-vertical">
                <Nav tabs className="col-md-4">
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1"
                      })}
                      onClick={() => {
                        this.toggle("1");
                      }}
                    >
                      <Col md={2} style={{ paddingTop: 10 }}>
                        <i class="menu-icon general-smartmi" />
                      </Col>
                      <Col md={9} style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Row>
                          <span>
                            <p>General preferences</p> <br />
                            <p className="textsmall">
                              Change your date, time and more…
                            </p>
                          </span>
                        </Row>
                      </Col>

                      <i class="fa fa-angle-right"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "2"
                      })}
                      onClick={() => {
                        this.toggle("2");
                      }}
                    >
                      <Col md={2} style={{ paddingTop: 10 }}>
                        <i class="menu-icon projects-smartmi" />
                      </Col>

                      
                      <Col md={9} style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Row>
                          <span>
                            <p>Companies</p> <br />
                            <p className="textsmall">
                              Create companies, edit and more…
                            </p>
                          </span>
                        </Row>
                      </Col>
                     

                      <i class="fa fa-angle-right"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "3"
                      })}
                      onClick={() => {
                        this.toggle("3");
                      }}
                    >
                      <Col md={2} style={{ paddingTop: 10 }}>
                        <i class="menu-icon dashboard-smartmi" />
                      </Col>
                      <Col md={9} style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Row>
                          <span>
                            <p>Dashboard</p> <br />
                            <p className="textsmall">
                              Manage dashboard and more…
                            </p>{" "}
                          </span>
                        </Row>
                      </Col>

                      <i class="fa fa-angle-right"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "4"
                      })}
                      onClick={() => {
                        this.toggle("4");
                      }}
                    >
                      <Col md={2} style={{ paddingTop: 10 }}>
                        <i class="menu-icon leads-smartmi" />
                      </Col>
                      <Col md={9} style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Row>
                          <span>
                            <p>Leads</p> <br />
                            <p className="textsmall">
                              Edit, manage your leads and more…
                            </p>{" "}
                          </span>
                        </Row>
                      </Col>

                      <i class="fa fa-angle-right"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "5"
                      })}
                      onClick={() => {
                        this.toggle("5");
                      }}
                    >
                      <Col md={2} style={{ paddingTop: 10 }}>
                        <i class="menu-icon orders-smartmi" />
                      </Col>
                      <Col md={9} style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Row>
                          <span>
                            <p>Orders</p> <br />
                            <p className="textsmall">
                              Edit, manage your orders and more…
                            </p>{" "}
                          </span>
                        </Row>
                      </Col>

                      <i class="fa fa-angle-right"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "6"
                      })}
                      onClick={() => {
                        this.toggle("6");
                      }}
                    >
                      <Col md={2} style={{ paddingTop: 10 }}>
                        <i class="menu-icon quotes-smartmi" />
                      </Col>
                      <Col md={9} style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Row>
                          <span>
                            <p>Quotes</p> <br />
                            <p className="textsmall">
                              Edit, manage your quotes and more…
                            </p>{" "}
                          </span>
                        </Row>
                      </Col>

                      <i class="fa fa-angle-right"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "7"
                      })}
                      onClick={() => {
                        this.toggle("7");
                      }}
                    >
                      <Col md={2} style={{ paddingTop: 10 }}>
                        <i class="menu-icon reports-smartmi" />
                      </Col>
                      <Col md={9} style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Row>
                          <span>
                            <p>Reports</p> <br />
                            <p className="textsmall">
                              Edit, manage your reports and more…
                            </p>{" "}
                          </span>
                        </Row>
                      </Col>

                      <i class="fa fa-angle-right"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "8"
                      })}
                      onClick={() => {
                        this.toggle("8");
                      }}
                    >
                      <Col md={2} style={{ paddingTop: 10 }}>
                        <i class="menu-icon producs-smartmi" />
                      </Col>
                      <Col md={9} style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Row>
                          <span>
                            <p>Products</p> <br />
                            <p className="textsmall">
                              Edit, manage your product and more…
                            </p>{" "}
                          </span>
                        </Row>
                      </Col>

                      <i class="fa fa-angle-right"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "9"
                      })}
                      onClick={() => {
                        this.toggle("9");
                      }}
                    >
                      <Col md={2} style={{ paddingTop: 10 }}>
                        <i class="menu-icon projects-smartmi" />
                      </Col>
                      <Col md={9} style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Row>
                          <span>
                            <p>Projects</p> <br />
                            <p className="textsmall">
                              Edit, manage your projects and more…
                            </p>{" "}
                          </span>
                        </Row>
                      </Col>

                      <i class="fa fa-angle-right"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "10"
                      })}
                      onClick={() => {
                        this.toggle("10");
                      }}
                    >
                      <Col md={2} style={{ paddingTop: 10 }}>
                        <i class="menu-icon customers-smartmi" />
                      </Col>
                      <Col md={9} style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Row>
                          <span>
                            <p>Customers</p> <br />
                            <p className="textsmall">
                              Manage your customers and more…
                            </p>{" "}
                          </span>
                        </Row>
                      </Col>

                      <i class="fa fa-angle-right"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "11"
                      })}
                      onClick={() => {
                        this.toggle("11");
                      }}
                    >
                      <Col md={2} style={{ paddingTop: 10 }}>
                        <i class="menu-icon users-smartmi" />
                      </Col>
                      <Col md={9} style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Row>
                          <span>
                            <p>Users</p> <br />
                            <p className="textsmall">
                              Manage users profiles and more…
                            </p>{" "}
                          </span>
                        </Row>
                      </Col>

                      <i class="fa fa-angle-right"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "12"
                      })}
                      onClick={() => {
                        this.toggle("12");
                      }}
                    >
                      <Col md={2} style={{ paddingTop: 10 }}>
                        <i class="menu-icon kpi-smartmi" />
                      </Col>
                      <Col md={9} style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Row>
                          <span>
                            <p>KPI</p> <br />
                            <p className="textsmall">
                              Edit, manage your KPI and more…
                            </p>{" "}
                          </span>
                        </Row>
                      </Col>

                      <i class="fa fa-angle-right"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "13"
                      })}
                      onClick={() => {
                        this.toggle("13");
                      }}
                    >
                      <Col md={2} style={{ paddingTop: 10 }}>
                        <i class="menu-icon calender-smartmi" />
                      </Col>
                      <Col md={9} style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Row>
                          <span>
                            <p>Schedules & Tasks</p> <br />
                            <p className="textsmall">
                              Edit, manage your KPI and more…
                            </p>
                          </span>
                        </Row>
                      </Col>

                      <i class="fa fa-angle-right"></i>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent
                  activeTab={this.state.activeTab}
                  className="col-md-8"
                >
                  <TabPane tabId="1">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <img src={commingSoon} className="img-fluid" />
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                  
                    <Companies />
                 
                  </TabPane>
                  <TabPane tabId="3">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <img src={commingSoon} className="img-fluid" />
                    </div>
                  </TabPane>
                  <TabPane tabId="4">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <img src={commingSoon} className="img-fluid" />
                    </div>
                  </TabPane>
                  <TabPane tabId="5">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <img src={commingSoon} className="img-fluid" />
                    </div>
                  </TabPane>
                  <TabPane tabId="6">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <img src={commingSoon} className="img-fluid" />
                    </div>
                  </TabPane>
                  <TabPane tabId="7">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <img src={commingSoon} className="img-fluid" />
                    </div>
                  </TabPane>
                  <TabPane tabId="8">
                    <Products />
                  </TabPane>
                  <TabPane tabId="9">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <img src={commingSoon} className="img-fluid" />
                    </div>
                  </TabPane>
                  <TabPane tabId="10">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <img src={commingSoon} className="img-fluid" />
                    </div>
                  </TabPane>
                  <TabPane tabId="11">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <img src={commingSoon} className="img-fluid" />
                    </div>
                  </TabPane>
                  <TabPane tabId="12">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <img src={commingSoon} className="img-fluid" />
                    </div>
                  </TabPane>
                  <TabPane tabId="13">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <img src={commingSoon} className="img-fluid" />
                    </div>
                  </TabPane>
                </TabContent>
              </div>
            </CardBody>
          </Card>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user_list: state.userReducer.usersList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserList,
      companyDetails
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(General);
