// import external modules
import React, { Component, Fragment } from "react";
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
import { DatePicker, DatePickerInput } from "rc-datepicker";
import Select from "react-select";
import { Home, Search, AtSign, User } from "react-feather";
import "rc-datepicker/lib/style.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { companyDetails } from "../../redux/sagas/companyDetails/companyDetails";
import { fetchProjectList } from "../../redux/sagas/projects/fetchProjectList";
import { fetchProductList } from "../../redux/sagas/products/fetchProductList";
import { fetchProductListUnquoted } from "../../redux/sagas/products/fetchProductListUnquoted";
import { fetchProductVariant } from "../../redux/sagas/products/fetchProductVariant";
import { fetchProductVariantUnquoted } from "../../redux/sagas/products/fetchProductVariantUnquoted";
let companyOptions = [];
let projectOptions = [];
let productOptions = [];
let productOptionsUnquoted = [];
class ProjectRequirement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyOptions: [],
      projectOptions: [],
      productOptions: [],
      productOptionsUnquoted: [],
      projectFilterObj: {
        page: "",
        activePage: "",
        companyId: "",
      },
      productFilterObj: {
        page: "",
        activePage: "",
        projectId: "",
        q: "",
      },
      unQuoted: false,
    };
    this.props.companyDetails();
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      this.props.company_details.map((company, key) => {
        var obj = {};
        obj["value"] = company.id;
        obj["label"] = company.name;
        companyOptions.push(obj);

        obj = {};
      });
      if (this.props.project_list.results) {
        this.props.project_list.results.map((project, key) => {
          var obj = {};
          obj["value"] = project.id;
          obj["label"] = project.name;
          projectOptions.push(obj);

          obj = {};
        });
      }
      if (this.props.product_list.results) {
        this.props.product_list.results.map((product, key) => {
          var obj = {};
          obj["value"] = product.id;
          obj["label"] = product.name;
          productOptions.push(obj);

          obj = {};
        });

        console.log(
          "mmmmmmmmmmmmmmmmmmmmmmm",
          this.props.product_list_unquoted
        );
      }
      if (this.props.product_list_unquoted) {
        this.props.product_list_unquoted.results.map((product, key) => {
          var obj = {};
          obj["value"] = product.id;
          obj["label"] = product.name;
          productOptionsUnquoted.push(obj);

          obj = {};
        });

        console.log(
          "this.state.productOptionsUnquoted",
          this.state.productOptionsUnquoted
        );
      }
      this.setState({ productOptionsUnquoted: productOptionsUnquoted });
      this.setState({ productOptions: productOptions });
      this.setState({ projectOptions: projectOptions });
      this.setState({ companyOptions: companyOptions });
      companyOptions = [];
      projectOptions = [];
      productOptions = [];
      productOptionsUnquoted = [];
    }, 1000);
  }
  handleChangeCompany = (companyOption) => {
    // this.setState({ company: companyOption.value });
    console.log("company", companyOption.value);
    this.state.projectFilterObj.companyId = companyOption.value;
    this.props.fetchProjectList(this.state.projectFilterObj);
    //test
    console.log("this.props.project_list", this.props.project_list);
  };
  handleQuotedProduct = (productOption) => {
    // this.setState({ company: companyOption.value });
    console.log("company", productOption.value);
    this.state.productFilterObj.projectId = productOption.value;
    this.props.fetchProductList(this.state.productFilterObj);
    this.props.fetchProductListUnquoted(this.state.productFilterObj);
    //test
    // console.log("this.props.project_list", this.props.product_list);
  };
  handleChangeProductVariant = (productId) => {
    this.props.fetchProductVariant(productId.value);
  };
  handleChangeProductVariantUnQuoted = (productId) => {
    this.props.fetchProductVariantUnquoted(productId.value);
  };
  render() {
    return (
      <Fragment>
        <div className="userModule mT25">
          <Col md={6}>
            <Breadcrumb>
              <BreadcrumbItem>
                <a href="">
                  <Home size={15} />
                </a>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to="/projects">Projects</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Project requirement</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0"></Col>

          <Card className="col-md-12">
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Project requirement</Col>
                <Col className="d-flex justify-content-md-end"></Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col xl="4" lg="4" md="12" className="borderRight">
                    <FormGroup>
                      <Label for="basicinput">Company</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        value={this.companyOption}
                        onChange={this.handleChangeCompany.bind(this)}
                        options={this.state.companyOptions}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="basicinput">Project</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        value={this.projectOptions}
                        onChange={this.handleQuotedProduct.bind(this)}
                        options={this.state.projectOptions}
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    xl="4"
                    lg="4"
                    md="12"
                    className="borderRight pRequirmentProduct"
                  >
                    <FormGroup>
                      <Label for="basicinput">Products quoted</Label>
                      <div className="position-relative has-icon-left">
                        {/* <Input
                          type="text"
                          id="iconLeft"
                          name="iconLeft"
                          placeholder="Search products…"
                        /> */}
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          // defaultValue={colourOptions[0]}
                          value={this.productOptions}
                          onChange={this.handleChangeProductVariant.bind(this)}
                          options={this.state.productOptions}
                        />
                        <div className="form-control-position">
                          <Search size={16} />
                        </div>
                      </div>
                    </FormGroup>
                    {this.props.product_list.results ? (
                      <div className="quotedVariant">
                        <div className="d-flex flex-wrap">
                          <Col
                            md={6}
                            style={{
                              color: "#7177A4",
                              fontSize: "13px",
                              fontWeight: "500",
                            }}
                          >
                            Product name
                          </Col>
                          <Col
                            md={6}
                            className="text-right"
                            style={{
                              color: "#7177A4",
                              fontSize: "13px",
                              fontWeight: "normal",
                            }}
                          >
                            value
                          </Col>
                        </div>
                        {this.props.product_list.results.map((variant, i) => {
                          return (
                            <div className="d-flex flex-wrap">
                              <Col
                                md={6}
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "normal",
                                }}
                              >
                                {variant.name}
                              </Col>
                              <Col
                                md={6}
                                className="text-right"
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "normal",
                                }}
                              >
                                {/* {variant.min_sales_price} */}
                              </Col>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className=" text-center">
                        Select company & project to view quoted, unquoted
                        products.
                      </p>
                    )}
                  </Col>

                  <Col
                    xl="4"
                    lg="4"
                    md="12"
                    className="borderRight pRequirmentProduct"
                  >
                    <FormGroup>
                      <Label for="basicinput">Products not quoted</Label>
                      <div className="position-relative has-icon-left">
                        {/* <Input
                          type="text"
                          id="iconLeft"
                          name="iconLeft"
                          placeholder="Search products…"
                        /> */}
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          // defaultValue={colourOptions[0]}
                          value={this.productOptions}
                          onChange={this.handleChangeProductVariantUnQuoted.bind(
                            this
                          )}
                          options={this.state.productOptionsUnquoted}
                        />
                        <div className="form-control-position">
                          <Search size={16} />
                        </div>
                      </div>
                    </FormGroup>
                    {this.props.product_list_unquoted ? (
                      <div className="quotedVariant">
                        <div className="d-flex flex-wrap">
                          <Col
                            md={6}
                            style={{
                              color: "#7177A4",
                              fontSize: "13px",
                              fontWeight: "500",
                            }}
                          >
                            Product name
                          </Col>
                          <Col
                            md={6}
                            className="text-right"
                            style={{
                              color: "#7177A4",
                              fontSize: "13px",
                              fontWeight: "normal",
                            }}
                          >
                            value
                          </Col>
                        </div>
                        {this.props.product_list_unquoted.results.map(
                          (variant, i) => {
                            return (
                              <div className="d-flex flex-wrap">
                                <Col
                                  md={6}
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "normal",
                                  }}
                                >
                                  {variant.name}
                                </Col>
                                <Col
                                  md={6}
                                  className="text-right"
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "normal",
                                  }}
                                >
                                  {/* {variant.min_sales_price} */}
                                </Col>
                              </div>
                            );
                          }
                        )}
                      </div>
                    ) : (
                      <p className=" text-center">
                        Select company & project to view quoted, unquoted
                        products.
                      </p>
                    )}
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
  product_variants: state.productReducer.productVariant,
  product_variant_unquoted: state.productReducer.productVariantUnquoted,
  product_list: state.productReducer.productList,
  product_list_unquoted: state.productReducer.productListUnquoted,
  project_list: state.projectReducer.projectList,
  company_details: state.companyDetailsReducer.companyDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchProductVariant,
      fetchProductVariantUnquoted,
      fetchProductList,
      fetchProjectList,
      companyDetails,
      fetchProductListUnquoted,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRequirement);
