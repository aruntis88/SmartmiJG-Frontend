// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import { productCategoryList } from "../../redux/sagas/products/fetchProductCategory";
import { fetchCompaniesList } from "../../redux/sagas/companies/fetchCompanies";
import { productCreationCreation } from "../../redux/sagas/products/fetchProductCategoryCreate";
import { productCategoryRemove } from "../../redux/sagas/products/fetchRemoveProductCategory";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Home, Search, Edit, Trash2 } from "react-feather";
import ColorBar from "react-color-bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faTrashAlt,
  faSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCheckSquare, faCoffee, faTrashAlt, faSquare, faPlus);
let companyOptions = [];
class ProductCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      companyOptions: [],
      newCategory: false,
      newCategoryInput: "",
      saveBtn: false,
      company: "",
      categoryError:"",
    };
    this.props.fetchCompaniesList();
    this.props.productCategoryList();
  }
  handleRemoveProductCategory(id) {
    console.log("categorycategory", id);
    this.props.productCategoryRemove(id);
    setTimeout(() => {
      this.props.productCategoryList();
    }, 1000);
  }

  validate =()=> {
    let categoryError="";
    let letters = /^[0-9a-zA-Z,/ ]+$/;
    if (this.state.newCategoryInput.length < 1) {
      categoryError = "New category name should not be blank"
    }
    if (!this.state.newCategoryInput.match(letters)) {
      categoryError = "Input alphanumeric characters only"
    }

    if (categoryError) {
      this.setState({categoryError});
      return false;
    }
    return true;
  }

  handlenewCategory(e) {
    this.setState({
      newCategoryInput: e.target.value,
      saveBtn: true,
    });
  }
  categorySubmit(e) {
    const isValid = this.validate();
    if (isValid) {
      this.setState({ categoryError: ""})
      let categoryBody = {
      name: this.state.newCategoryInput,
      company: this.state.company,
    };
    this.props.productCreationCreation(categoryBody);
    this.setState({
      newCategory: false,
      saveBtn: false,
    });
    setTimeout(() => {
      this.props.productCategoryList();
      this.props.fetchCompaniesList();
      this.forceUpdate();
    }, 1000);
    
   }   
  }
  newCategory() {
    this.setState({
      newCategory: true,
    });
  }
  toggle = (tab, e) => {
    console.log("eeeee", e);
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        newCategory: false,
        company: e,
      });
    }
  };
  componentDidMount() {
    setTimeout(() => {
      this.props.companies_list.map((company, i) => {
        var obj = {};
        obj["value"] = company.categories.no_of_categories;
        if (company.color) {
          obj["color"] = company.color;
        } else {
          obj["color"] = "#cccccc";
        }

        obj["legendLabel"] = company.name;
        obj["legendValue"] = company.categories.no_of_categories;
        obj["tooltip"] = "interest is $300";
        obj["companyId"] = company.id;

        companyOptions.push(obj);
        obj = {};
      });

      this.setState({ companyOptions: companyOptions });
      console.log("this.state.companyOptionseeee", this.state.companyOptions);
    }, 1000);
  }
  render() {
    // const data = [
    //   {
    //     value: 3,
    //     color: "#FF4577",
    //     legendLabel: "interest",
    //     legendValue: 3,
    //     tooltip: "interest is $300",
    //   },
    //   {
    //     value: 6,
    //     color: "#006BA5",
    //     legendLabel: "tax",
    //     legendValue: 6,
    //     tooltip: "tax is $200",
    //   },
    //   {
    //     value: 12,
    //     color: "#B9E4EA",
    //     legendLabel: "insurance",
    //     legendValue: 12,
    //     tooltip: "insurance is $100",
    //   },
    //   {
    //     value: 15,
    //     color: "#FDA633",
    //     legendLabel: "insurance",
    //     legendValue: 15,
    //     tooltip: "insurance is $100",
    //   },
    //   {
    //     value: 19,
    //     color: "#85796C",
    //     legendLabel: "insurance",
    //     legendValue: 19,
    //     tooltip: "insurance is $100",
    //   },
    //   {
    //     value: 7,
    //     color: "#00BEDE",
    //     legendLabel: "insurance",
    //     legendValue: 7,
    //     tooltip: "insurance is $100",
    //   },
    //   {
    //     value: 22,
    //     color: "#00BC63",
    //     legendLabel: "insurance",
    //     legendValue: 22,
    //     tooltip: "insurance is $100",
    //   },
    // ];
    return (
      <Fragment>
        <div className="userModule mT25 productCategory">
          <Col md={6} className="pL0">
            <Breadcrumb>
              <BreadcrumbItem>
                <a href="/">
                  <Home size={15} />
                </a>
              </BreadcrumbItem>
              <BreadcrumbItem active>Products Category</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0"></Col>
          <Card className="col-md-8 productCategoryModule">
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Products Category</Col>
                <Col className="d-flex justify-content-md-end">
                  <Link
                    to="product-view-all-categories"
                    className="userNameColor"
                  >
                    View all groups
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={12} className="smartMilightBlue">
                  <span className="bigNumber">
                    {this.props.product_category_list
                      ? this.props.product_category_list.count
                      : null}
                  </span>
                  Product categories found
                </Col>
                <Col md={6}>
                  {this.state.companyOptions.length > 0 ? (
                    <ColorBar
                      data={this.state.companyOptions}
                      legendRowContainerStyle={{ display: "none" }}
                      className="colorBar"
                    />
                  ) : null}
                </Col>
                <Col md={6}></Col>
                <Col md={12}>
                  <div className="tabs-vertical mT25 row">
                    <Nav tabs className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                      {this.state.companyOptions.map((item, i) => (
                        <NavItem key={i} className="col-12">
                          <NavLink
                            className={
                              classnames({
                                active: this.state.activeTab === i + 1,
                              }) +
                              " " +
                              "row"
                            }
                            onClick={() => {
                              this.toggle(i + 1, item.companyId);
                            }}
                          >
                            <Col>
                              <FontAwesomeIcon
                                icon="square"
                                style={{ color: item.color }}
                              />
                              <span style={{ position: "relative" }}>
                                <span
                                  style={{
                                    position: "absolute",
                                    top: "5px",
                                    color: "#3D4464",
                                    display: "inline-block",
                                    width: 120,
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {item.legendLabel}
                                </span>

                                <span
                                  style={{
                                    position: "absolute",
                                    top: "25px",
                                    color: "#A0A7C3",
                                  }}
                                >
                                  {item.legendValue}
                                </span>
                              </span>
                            </Col>
                            <Col></Col>
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>
                    <TabContent
                      activeTab={this.state.activeTab}
                      className="col-md-6 col-lg-6 col-sm-12 col-xs-12"
                    >
                      {this.state.companyOptions.map((itemContent, i) => (
                        <TabPane tabId={i + 1}>
                          <Col md={12}>
                            {this.props.product_category_list.results.data
                              .length > 0
                              ? this.props.product_category_list.results.data.map(
                                  (category, k) => (
                                    <div>
                                      {this.state.company ==
                                      category.company ? (
                                        <Row className="categoryItem">
                                          <Col md={12}>
                                            <h4>
                                              {category.name}
                                              <FontAwesomeIcon
                                                onClick={() =>
                                                  this.handleRemoveProductCategory(
                                                    category.id
                                                  )
                                                }
                                                icon="trash-alt"
                                              />
                                            </h4>
                                          </Col>
                                        </Row>
                                      ) : null}
                                    </div>
                                  )
                                )
                              : null}
                              {this.state.categoryError ? (
                                      <div style={{color:"red"}}> 
                                        {this.state.categoryError}
                                      </div>
                                      ): null}
                            <Row className="addCategoryItem">
                              <Col md={12}>
                                {this.state.newCategory ? (
                                  <Form className="row">
                                    <Input
                                      type="text"
                                      placeholder="E.g 1352"
                                      onChange={this.handlenewCategory.bind(
                                        this
                                      )}
                                      className="col-10"
                                    />
                                    <Col className="col-2 d-flex align-items-center">
                                      <FontAwesomeIcon icon="plus" />
                                    </Col>
                                  </Form>
                                ) : (
                                  <h4 onClick={() => this.newCategory()}>
                                    Add new category
                                    <FontAwesomeIcon icon="plus" />
                                  </h4>
                                )}
                              </Col>
                            </Row>
                          </Col>
                          <Row>
                            {this.state.saveBtn ? (
                              <Col
                                md={12}
                                className="d-flex justify-content-end"
                              >
                                <Button
                                  className="blue-btn"
                                  onClick={() => this.categorySubmit()}
                                >
                                  Save
                                </Button>
                              </Col>
                            ) : null}
                          </Row>
                        </TabPane>
                      ))}
                    </TabContent>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  product_category_list: state.productReducer.productCategoryList,
  companies_list: state.companiesReducer.companiesList,
  product_category_create: state.productReducer.createProductCategory,
  product_category_remove: state.productReducer.removeProductCategory,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      productCategoryList,
      fetchCompaniesList,
      productCreationCreation,
      productCategoryRemove,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories);
