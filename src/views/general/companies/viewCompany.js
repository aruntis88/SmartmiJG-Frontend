// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../../components/contentHead/contentHeader";
import ContentSubHeader from "../../../components/contentHead/contentSubHeader";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import commingSoon from "../../../assets/img/commingSoon.png";
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
  Label
} from "reactstrap";

import { Link } from "react-router-dom";
import Toggle from "react-toggle";
import {
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
  Info
} from "react-feather";
import Select from "react-select";
import classnames from "classnames";
import { fetchCompany } from "../../../redux/sagas/companies/fetchCompany";
import { companyUpdation } from "../../../redux/sagas/companies/fetchCompanyUpdate";

import companyLogo from "../../../assets/img/companyLogo.png";
import color from "../../../assets/img/color.png";
import back from "../../../assets/img/back.png";
import companyHeader from "../../../assets/img/companyHeader.png";
import edit from "../../../assets/img/edit.png";
import { defaultTheme } from "react-select";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faCloudUploadAlt
} from "@fortawesome/free-solid-svg-icons";

library.add(faCheckSquare, faCoffee, faCloudUploadAlt);
const { colors } = defaultTheme;
const selectStyles = {
  control: provided => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" })
};
class ViewCompany extends Component {
  constructor(props) {
    super(props);
    this.state = { dropdownOpen: false, files: [] };
    this.onDrop = this.onDrop.bind(this);
    let pathArray = window.location.pathname.split("/");
    let companyId = pathArray[2];
    this.props.fetchCompany(companyId);

  }
  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };
  onDrop = files => {
    this.setState({
      files
    });
     let bodyData = {
      name: this.props.company_data.name,
      logo: this.state.files[0],
      code: this.props.company_data.code,
      address1: this.props.company_data.address1,
      address2: this.props.company_data.address2,
      phone: this.props.company_data.phone,
      fax: this.props.company_data.fax,
      email: this.props.company_data.email,
      website: this.props.company_data.website,
      is_active: this.props.company_data.is_active,
      enable_reports: this.props.company_data.enable_reports,
      is_group: this.props.company_data.is_group,
      header_img: this.props.company_data.header_img,
      footer_img: this.props.company_data.footer_img,
      country: this.props.company_data.country,
    };
    let pathArray = window.location.pathname.split("/");
    let userId = pathArray[2];
    this.props.companyUpdation(bodyData, userId);
    
  };


  
  render() {
    if (this.props.company_data) {
      console.log(this.props.match)
    }
    return (
      <Fragment>
        <div className="userModule generalModule mT25">
          <Col md={6}>
            <Breadcrumb>
              <BreadcrumbItem>
              <Link to={{pathname: '/general', 
                    state: 'company'}}>
                <a href="">
                  <Home size={15} />
                </a>
              </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to={{ 
                    pathname: '/general', 
                    state: 'company' 
                  }}>
                <a href="/general">companies</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Qatar insulation company</BreadcrumbItem>
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
          {this.props.company_data ? (
            <Card className="col-md-12">
              <CardBody className="padding24-10">
                <div className="d-flex flex-wrap">
                <Link to={"/update-company/" + this.props.company_data.id}>
                          <img src={edit} className="edit" />
                        </Link>
                  <Col md={4} lg={4} xl="4" sm={12} className="borderRight">
                  
                    <Row>
                      <Col md={4} lg={4} xl="4" sm={12}>
                        <div className="userImage">
                          <img
                            src={this.props.company_data.logo}
                            className="img-fluid"
                            style={{maxWidth:130, height:130}}
                          />
                          <Dropzone
                              onDrop={this.onDrop.bind(this)}
                              className="drophere"
                              style={{
                                minHeight: "auto",
                                padding: 5,
                              }}
                            >
                            <span className="employeePhotoUpload">
                              <i class="fa fa-camera"></i>
                            </span>
                          </Dropzone>
                        </div>
                      </Col>
                      <Col className="pd-t-20px" md={8} lg={8} xl="8" sm={12}>
                        <div className="employeeName" style={{ fontSize: 16 }}>
                          {this.props.company_data.name}
                        </div>
                        <div className="employeeAt userNameColor">
                          {this.props.company_data.code}
                        </div>
                        <div className="employessPosition">
                          {this.props.company_data.email}
                        </div>
                        <div className="employeeCompany">
                          {this.props.company_data.country_details.name}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    md={8}
                    lg={8}
                    xl={8}
                    sm={12}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Row>
                      <Col md={4} lg={4} xl={4} sm={12}>
                        <Row>
                          <Col md={6} lg={6} xl={6} sm={12}>
                            <div className="companyCount  d-flex justify-content-center align-items-center position-relative">
                              {this.props.company_data.employee_count}
                              <span className="companyIcon">
                                <i class="menu-icon users-smartmi" />
                              </span>
                            </div>
                          </Col>
                          <Col
                            md={6}
                            lg={6}
                            xl={6}
                            sm={12}
                            className="companyTitle d-flex align-items-center"
                          >
                            Employees
                          </Col>
                        </Row>
                      </Col>
                      <Col md={4} lg={4} xl={4} sm={12}>
                        <Row>
                          <Col md={6} lg={6} xl={6} sm={12}>
                            <div className="companyCount  d-flex justify-content-center align-items-center position-relative">
                              {this.props.company_data.quote_count}
                              <span className="companyIcon">
                                <i class="menu-icon quotes-smartmi" />
                              </span>
                            </div>
                          </Col>
                          <Col
                            md={6}
                            lg={6}
                            xl={6}
                            sm={12}
                            className="companyTitle d-flex align-items-center"
                          >
                            Quotes
                          </Col>
                        </Row>
                      </Col>
                      <Col md={4} lg={4} xl={4} sm={12}>
                        <Row>
                          <Col md={6} lg={6} xl={6} sm={12}>
                            <div className="companyCount d-flex justify-content-center align-items-center position-relative">
                              {this.props.company_data.order_count}
                              <span className="companyIcon">
                                <i class="menu-icon orders-smartmi" />
                              </span>
                            </div>
                          </Col>
                          <Col
                            md={6}
                            lg={6}
                            xl={6}
                            sm={12}
                            className="companyTitle d-flex align-items-center"
                          >
                            Orders
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={12} lg={12} xl={12} sm={12} className="mT25">
                    <Row>
                      <Col md={3} lg={3} xl={3} sm={12} style={{fontWeight: "400"}}>
                        <FormGroup>
                          <Label>Phone</Label>
                          <p className="liteFontColor">
                            {this.props.company_data.phone}
                          </p>
                        </FormGroup>

                        <FormGroup>
                          <Label>Address line 2</Label>
                          <p className="liteFontColor">
                            {" "}
                            {this.props.company_data.address2}
                          </p>
                        </FormGroup>
                        <FormGroup>
                          <Label>Header</Label>
                          <div className="img-Header">
                            <img
                              src={this.props.company_data.header_img}
                              className="img-fluid"
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md={3} lg={3} xl={3} sm={12}>
                        <FormGroup>
                          <Label>Fax</Label>
                          <p className="liteFontColor">
                            {this.props.company_data.fax ?
                            this.props.company_data.fax
                            : "None" }
                          </p>
                        </FormGroup>

                        <FormGroup>
                          <Label>Status</Label>
                          <p
                            className={
                              this.props.company_data.is_active
                                ? "activeStatus"
                                : "inactiveStatus"
                            }
                          >
                            {this.props.company_data.is_active
                              ? "Active"
                              : "Inactive"}
                          </p>
                        </FormGroup>
                        <FormGroup>
                          <Label>Footer</Label>
                          <img
                            src={this.props.company_data.footer_img}
                            className="img-fluid"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3} lg={3} xl={3} sm={12}>
                        <FormGroup>
                          <Label>Website</Label>
                          <p className="liteFontColor">
                            {this.props.company_data.website ?
                            this.props.company_data.website
                            : "None" }
                          </p>
                        </FormGroup>

                        <FormGroup>
                          <Label>Reports</Label>
                          <p
                            className={
                              this.props.company_data.enable_report
                                ? "activeStatus"
                                : "inactiveStatus"
                            }
                          >
                            {this.props.company_data.enable_report
                              ? "Enabled"
                              : "Disabled"}
                          </p>
                        </FormGroup>
                      </Col>
                      <Col md={3} lg={3} xl={3} sm={12}>
                        <FormGroup>
                          <Label>Address line 1</Label>
                          <p className="liteFontColor">
                            {" "}
                            {this.props.company_data.address1}
                          </p>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </div>
              </CardBody>
            </Card>
          ) : null}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  company_update: state.companiesReducer.updateCompany,
  company_data: state.companiesReducer.companyData
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCompany,
      companyUpdation,
    },
    dispatch
  );
// styled components

// const Menu = props => {
//   const shadow = "hsla(218, 50%, 10%, 0.1)";
//   return (
//     <div
//       css={{
//         backgroundColor: "white",
//         borderRadius: 4,
//         boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
//         marginTop: 8,
//         position: "absolute",
//         zIndex: 2
//       }}
//       {...props}
//     />
//   );
// };
// const Blanket = props => (
//   <div
//     css={{
//       bottom: 0,
//       left: 0,
//       top: 0,
//       right: 0,
//       position: "fixed",
//       zIndex: 1
//     }}
//     {...props}
//   />
// );
// const Dropdown = ({ children, isOpen, target, onClose }) => (
//   <div css={{ position: "relative" }}>
//     {target}
//     {isOpen ? <Menu>{children}</Menu> : null}
//     {isOpen ? <Blanket onClick={onClose} /> : null}
//   </div>
// );
// const Svg = p => (
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     focusable="false"
//     role="presentation"
//     {...p}
//   />
// );
// const DropdownIndicator = () => (
//   <div css={{ color: colors.neutral20, height: 24, width: 32 }}>
//     <Svg>
//       <path
//         d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
//         fill="currentColor"
//         fillRule="evenodd"
//       />
//     </Svg>
//   </div>
// );
// const ChevronDown = () => (
//   <Svg style={{ marginRight: -6 }}>
//     <path
//       d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
//       fill="currentColor"
//       fillRule="evenodd"
//     />
//   </Svg>
// );
export default connect(mapStateToProps, mapDispatchToProps)(ViewCompany);
