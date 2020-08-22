// import external modules
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { productCategoryList } from "../../redux/sagas/products/fetchProductCategory";
import { fetchCompaniesList } from "../../redux/sagas/companies/fetchCompanies";
import { productCategoryRemove } from "../../redux/sagas/products/fetchRemoveProductCategory";
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
class ProductViewallCategories extends Component {
  constructor(props) {
    super(props);
    this.state = { companyOptions: [], activeTab: "1", categoryId: "" };
    this.props.fetchCompaniesList();
    this.props.productCategoryList();
  }
  toggle = (tab, e) => {
    setTimeout(() => {
      if (this.state.activeTab !== tab) {
        this.setState({
          categoryId: e,
          activeTab: tab,
        });
        console.log(this.state.categoryId, "this.setState.categoryId");
      }
    }, 200);
  };
  handleRemoveProductCategory(id) {
    console.log("categorycategory", id);
    this.props.productCategoryRemove(id);
    setTimeout(() => {
      this.props.productCategoryList();
    }, 1000);
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.companies_list.map((company, i) => {
        var obj = {};
        obj["value"] = 3;
        if (company.color) {
          obj["color"] = company.color;
        } else {
          obj["color"] = "#cccccc";
        }

        obj["legendLabel"] = company.name;
        obj["legendValue"] = 3;
        obj["tooltip"] = "interest is $300";
        obj["companyId"] = company.id;

        companyOptions.push(obj);
        obj = {};
      });

      this.setState({ companyOptions: companyOptions });
      console.log("this.state.companyOptions", this.state.companyOptions);
    }, 1000);
  }
  render() {
    const data = [
      {
        value: 3,
        color: "#FF4577",
        legendLabel: "interest",
        legendValue: 3,
        tooltip: "interest is $300",
      },
      {
        value: 6,
        color: "#006BA5",
        legendLabel: "tax",
        legendValue: 6,
        tooltip: "tax is $200",
      },
      {
        value: 12,
        color: "#B9E4EA",
        legendLabel: "insurance",
        legendValue: 12,
        tooltip: "insurance is $100",
      },
      {
        value: 15,
        color: "#FDA633",
        legendLabel: "insurance",
        legendValue: 15,
        tooltip: "insurance is $100",
      },
      {
        value: 19,
        color: "#85796C",
        legendLabel: "insurance",
        legendValue: 19,
        tooltip: "insurance is $100",
      },
      {
        value: 7,
        color: "#00BEDE",
        legendLabel: "insurance",
        legendValue: 7,
        tooltip: "insurance is $100",
      },
      {
        value: 22,
        color: "#00BC63",
        legendLabel: "insurance",
        legendValue: 22,
        tooltip: "insurance is $100",
      },
    ];
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
              <BreadcrumbItem>
                <a href="/product-categories">Product Categories</a>
              </BreadcrumbItem>
              <BreadcrumbItem active>View all categories</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0"></Col>
          <Card className="col-md-10 productCategoryModule">
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Product Categories</Col>
                <Col className="d-flex justify-content-md-end"></Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={12} className="smartMilightBlue">
                  <span className="bigNumber">
                    {" "}
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
                  <div className="tabs-vertical categoryList mT25">
                    <Nav tabs>
                      {this.props.product_category_list
                        ? this.props.product_category_list.results.data.map(
                            (item, i) => (
                              <NavItem key={i} style={{ marginBottom: "10px" }}>
                                <NavLink
                                  className={classnames({
                                    active: this.state.activeTab === i + 1,
                                  })}
                                  onClick={() => {
                                    this.toggle(i + 1, item.company);
                                  }}
                                >
                                  <div className="categoryItem d-flex flex-wrap">
                                    <Col md={12}>
                                      <h4>
                                        {item.name}
                                        <FontAwesomeIcon
                                          icon="trash-alt"
                                          onClick={() =>
                                            this.handleRemoveProductCategory(
                                              item.id
                                            )
                                          }
                                        />
                                      </h4>
                                    </Col>
                                  </div>
                                </NavLink>
                              </NavItem>
                            )
                          )
                        : null}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      {this.props.product_category_list
                        ? this.props.product_category_list.results.data.map(
                            (itemContent, i) => (
                              <TabPane tabId={i + 1}>
                                <Col md={12}>
                                  {console.log(
                                    "this.props.companies_list",
                                    this.props.companies_list
                                  )}
                                  {this.props.companies_list
                                    ? this.props.companies_list.map(
                                        (company, k) => (
                                          <span>
                                            {company.id ==
                                            this.state.categoryId ? (
                                              <span>
                                                <FontAwesomeIcon
                                                  icon="square"
                                                  style={{
                                                    color: company.color,
                                                  }}
                                                />
                                                {company.name}
                                              </span>
                                            ) : null}
                                          </span>
                                        )
                                      )
                                    : null}
                                </Col>
                              </TabPane>
                            )
                          )
                        : null}
                      {/* <TabPane tabId="2">
                      <Row>
                        <Col sm="6">
                          <Card body>
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>
                              With supporting text below as a natural lead-in
                              to additional content.
                            </CardText>
                            <Button className="btn btn-success">
                              Go somewhere
                            </Button>
                          </Card>
                        </Col>
                        <Col sm="6">
                          <Card body>
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>
                              With supporting text below as a natural lead-in
                              to additional content.
                            </CardText>
                            <Button className="btn btn-danger">
                              Go somewhere
                            </Button>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <h4>Tab 3 Contents</h4>
                          <p>
                            Lemon drops pastry chocolate. Jujubes sweet roll
                            tootsie roll. Oat cake donut bonbon chocolate
                            croissant candy candy brownie. Wafer jelly beans
                            jelly ice cream caramels. Cookie bonbon lemon
                            drops cheesecake brownie cake macaroon sweet.
                            Toffee pie icing candy ice cream croissant
                            caramels jelly. Muffin jelly gummies icing
                            cheesecake chocolate cake. Sweet chupa chups
                            croissant pudding sesame snaps soufflé. Marzipan
                            cotton candy jujubes halvah cheesecake. Cupcake
                            wafer gummies croissant candy brownie jelly. Sweet
                            wafer chocolate halvah.
                          </p>
                        </Col>
                      </Row>
                    </TabPane> */}
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
  product_category_remove: state.productReducer.removeProductCategory,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      productCategoryList,
      fetchCompaniesList,
      productCategoryRemove,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductViewallCategories);
