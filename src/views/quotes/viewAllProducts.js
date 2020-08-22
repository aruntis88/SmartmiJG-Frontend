// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
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
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Home, Search } from "react-feather";
import Select from "react-select";
import edit from "../../assets/img/edit.png";
import menuDots from "../../assets/img/menuDots.png";
import menuDotsGrey from "../../assets/img/menudotsGrey.png";
import product from "../../assets/img/product@2x.png";
import confirm from "../../assets/img/confirm.png";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "rc-datepicker/lib/style.css";
import { fetchQuote } from "../../redux/sagas/quotes/fetchQuote";
class QuoteView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      dropdownOpenViewAll: false,
      collapse: false,
      quoteID: "",
    };
    let pathArray = window.location.pathname.split("/");
    let leadId = pathArray[2];
    this.props.fetchQuote(leadId);
  }
  componentDidMount() {
    let pathArray = window.location.pathname.split("/");
    let quoteID = pathArray[2];
    this.state.quoteID = quoteID;
  }
  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };
  toggleMenu = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };
  toggleMenuViewAll = () => {
    this.setState((prevState) => ({
      dropdownOpenViewAll: !prevState.dropdownOpenViewAll,
    }));
  };

  render() {
    return (
      <Fragment>
        <div className="tableModule mT25">
          {" "}
          <Col md={6} className="pL0">
            <Breadcrumb>
              <BreadcrumbItem>
                <a href="">
                  <Home size={15} />
                </a>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <a href={"/quote-view/" + this.state.quoteID}>
                  {this.props.quote_data
                    ? this.props.quote_data.reference_no
                    : null}
                </a>
              </BreadcrumbItem>
              <BreadcrumbItem active>View all products</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0"></Col>
          <Card className="col-md-12">
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Product details</Col>
                <Col className="d-flex justify-content-md-end">
                  <Dropdown
                    isOpen={this.state.dropdownOpenViewAll}
                    toggle={this.toggleMenuViewAll}
                    style={{ float: "right" }}
                  >
                    <DropdownToggle className="dotMenuButton">
                      <img
                        src={menuDots}
                        className="img-fluid"
                        style={{ marginLeft: 10 }}
                      />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Export as Excel</DropdownItem>
                      <DropdownItem>Others</DropdownItem>
                      <DropdownItem>Others</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Product code</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit </th>
                    <th>RUnit price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
              </Table>
              {this.props.quote_data
                ? this.props.quote_data.quoted_product_details.map(
                    (product, i) => {
                      return (
                        <Table>
                          <tbody className="productTableTitle">
                            <tr>
                              <td scope="row" className="viewallCounter">
                                <span
                                  className="caretCollapse"
                                  onClick={this.toggle}
                                >
                                  <i class="fa fa-caret-down"></i>
                                </span>
                                {i + 1}
                              </td>
                              <td colspan="5">
                                {product.product_details.name}
                              </td>

                              <td className="action">{product.amount}</td>
                            </tr>
                          </tbody>
                          <Collapse isOpen={this.state.collapse}>
                            <tbody className="productTableBody">
                              {product.variants_quoted_details.map(
                                (variant, k) => {
                                  return (
                                    <tr>
                                      <td className="viewallCounterSub">
                                        {i + 1}.{k + 1}
                                      </td>
                                      <td>
                                        <span className="userNameColor">
                                          {variant.variant_details.product_code}
                                        </span>
                                      </td>
                                      <td>
                                        <span className="userNameColor">
                                          {variant.variant_details.description}
                                        </span>
                                      </td>
                                      <td>
                                        <span className="userNameColor">
                                          {variant.quantity}
                                        </span>
                                      </td>
                                      <td>
                                        <span className="userNameColor">
                                          {" "}
                                          {/* <Select
                                  className="basic-single"
                                  classNamePrefix="PCS"
                                  defaultValue="PCS"
                                  // options={colourOptions}
                                /> */}
                                          {
                                            variant.variant_details.unit_details
                                              .name
                                          }
                                        </span>
                                      </td>
                                      <td>
                                        <span className="userNameColor">
                                          {variant.variant_details.runit_price}
                                        </span>
                                      </td>
                                      <td>
                                        <span className="liteFontColor">
                                          {variant.variant_amount}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </Collapse>
                        </Table>
                      );
                    }
                  )
                : null}
            </CardBody>
          </Card>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  quote_data: state.quoteReducer.quoteData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchQuote,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(QuoteView);
