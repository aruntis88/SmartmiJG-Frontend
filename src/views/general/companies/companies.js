// import external modules
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCompaniesList } from "../../../redux/sagas/companies/fetchCompanies";
import { Card, Row, Col, CardBody, CardHeader } from "reactstrap";
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
import Dropzone from "react-dropzone";
import { companyUpdation } from "../../../redux/sagas/companies/fetchCompanyUpdate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/fontawesome-free-solid'
import product from "../../../assets/img/product@2x.png";
import edit from "../../../assets/img/edit.png";

class Companies extends Component {
  constructor(props) {
    super(props);
    this.props.fetchCompaniesList();
    this.state = { files: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop = (company, id, files) => {
    for (var File of files) {
      console.log(File)
    }
    this.setState({
      files
    });

    


    
    let bodyData = {
      name: company.name,
      logo: this.state.files[0],
      code: company.code,
      address1: company.address1,
      address2: company.address2,
      phone: company.phone,
      fax: company.fax,
      email: company.email,
      website: company.website,
      is_active: company.is_active,
      enable_reports: company.enable_reports,
      is_group: company.is_group,
      header_img: company.header_img,
      footer_img: company.footer_img,
      country: company.country,
    };
    

    let userId = id;
    this.props.companyUpdation(bodyData, userId);
    setTimeout(() => {
      this.props.fetchCompaniesList();
    }, 1000);
  };

  render() {
    return (
      <Fragment>
        <div className="tabModule">
          <Card className="col-md-12 productDetails">
            <CardHeader>
              <Row className="row align-items-center">
                <Col style={{fontWeight: "600"}}>Companies</Col>
                <Col className="d-flex justify-content-md-end align-items-center">
                  <Link to="/create-company" className="blue-btn">
                    Create New Company
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row className="mgb-fifteen">
                {this.props.companies_list.map((companies, i) => {
                  return (
                    <Col md={6} className="d-flex flex-wrap mg-bottom">
                      <Col className="productItem d-flex flex-wrap">
                        <Link to={"/update-company/" + companies.id}>
                          <img src={edit} className="edit" />
                        </Link>
                        <Row>
                          <Col md={3}>
                            <Link to={"/company/" + companies.id}>
                            <div className="img-border-radius">
                              <img src={companies.logo} className="img-logo-company" />
                                                      
                            </div>
                            </Link> 
                          </Col>
                          <Col md={9} className="d-flex">                         
                              <div className="img-list">
                                <Link to={"/company/" + companies.id}>
                                  <span className="userNameColor">
                                    {companies.name}
                                  </span>
                                </Link>
                                <br />                               
                                  <span className="productDescvalue">
                                    {companies.email}
                                  </span>
                                  <br />
                                  <span className=" productDescTitle">
                                    {companies.phone}
                                  </span>                            
                            </div>

                          </Col>
                           <Dropzone
                              onDrop={this.onDrop.bind(this, companies, companies.id)}
                              className="drophere"
                             style={{
                                minHeight: "auto",
                                padding: 5,
                              }}
                            >
                            <span className="logo-upload">
                              <i class="fa fa-camera" style={{bottom:"14px", right: "-7px"}}></i>
                            </span>
                          </Dropzone>  
                        </Row>
                        <Col md={12} className="productdescFooter">
                          <Row className="align-items-center">
                            <Col>
                              <span className="productDescTitle">
                                Employees:{" "}
                              </span>
                              <span className="productDescvalue">
                                {companies.employee_count}
                              </span>
                            </Col>
                            <Col className="d-flex justify-content-md-end">
                              <span>
                                <span className="productDescTitle">
                                  Quotes:{" "}
                                </span>
                                <span className="productDescvalue">
                                  {companies.quote_count}
                                </span>
                              </span>
                            </Col>
                          </Row>
                        </Col>
                      </Col>
                    </Col>
                  );
                })}
              </Row>
            </CardBody>
          </Card>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  companies_list: state.companiesReducer.companiesList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCompaniesList,
      companyUpdation
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
