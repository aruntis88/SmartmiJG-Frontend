// import external modules
import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { fetchAveragecostList } from "../../redux/sagas/averageCost/fetchAverageCosts";
import { fetchAveragecostVariantList } from "../../redux/sagas/averageCost/fetchAverageCostsVariant";
import { companyDetails } from "../../redux/sagas/companyDetails/companyDetails";
import { fetchAveragecost } from "../../redux/sagas/averageCost/fetchAverageCost";
import { averageCostUpdation } from "../../redux/sagas/averageCost/fetchAverageCostUpdate";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Pagination from "react-js-pagination";
import NumberFormat from "react-number-format";
import moment from "moment";
import axios from "axios";
import {API_URL} from "../../redux/sagas/api";
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
  Input,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";

import Select from "react-select";
import { defaultTheme } from "react-select";

import {
  Home,
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "react-feather";

const { colors } = defaultTheme;
const selectStyles = {
  control: (provided) => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" }),
};
let companyOptions = [];
let variantOptions = [];
class AverajeCost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCountOptions: [],
      companyOptions: [],
      variantOptions: [],
      costError:'',
      company: null,
      variant: null,
      activePage: 1,
      newList: [],
      searchList: [],
      fields: ["company", "variant", "average_cost"],
      buttonEnabled: false,
      filterObj: {
        page: 1,
        activePage: 1,
      },
      modal: false,
    };
    this.props.companyDetails();
    this.props.fetchAveragecostVariantList();
    this.handlePageChange = this.handlePageChange.bind(this);
    this.props.fetchAveragecostList(this.state.filterObj);
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
      this.setState({ companyOptions: companyOptions });
      console.log("this.state.companyOptions", this.state.companyOptions);
      companyOptions = [];
    }, 1000);
  }
  handleChangeCompany(e) {
    this.setState({ company: e.value });
    if (e.value != "") {
      this.removeFromFields("company");
    } else {
      this.addToFields("company");
    }
    this.props.fetchAveragecostVariantList(e.value);
    setTimeout(() => {
      this.props.averageCostVariant_list.results.map((variant, key) => {
        console.log("variant", variant);
        var obj = {};
        obj["value"] = variant.id;
        obj["label"] = variant.product_code;
        variantOptions.push(obj);

        obj = {};
      });
      this.setState({ variantOptions: variantOptions });
      console.log("this.state.variantOptions", this.state.variantOptions);
      variantOptions = [];

      if (this.props.averageCostUpdation) {
      }
    }, 1000);
  }
  handleFocusCompany() {
    this.setState({ companyFocus: true });
    this.state.companyFocusStyle = true;
  }
  handleBlurCompany() {
    this.setState({ companyFocus: false });
  }
  handleChangeVariant(e) {
    this.setState({ variant: e.value });
    if (e.value != "") {
      this.removeFromFields("variant");
    } else {
      this.addToFields("variant");
    }
    this.props.fetchAveragecost(e.value);
    setTimeout(() => {
      // this.setState({ old_average_cost: e.value });
      if (this.props.averageCost_data) {
        console.log("this.props.averageCost_data", this.props.averageCost_data);
        if (this.props.averageCost_data.old_average_cost) {
          this.setState({
            old_average_cost: this.props.averageCost_data.old_average_cost,
          });
        } else {
          this.setState({
            old_average_cost: "0",
          });
        }
        console.log("this.state.old_average_cost", this.state.old_average_cost);
      }
      if (
        this.props.averageCost_data.avg_cost_revision_details.no_of_revisions
      ) {
        this.setState({
          no_of_revisions:
            this.props.averageCost_data.avg_cost_revision_details
              .no_of_revisions + 1,
        });
      }
    }, 1000);
  }
  handleFocusVariant() {
    this.setState({ partcodeFocus: true });
    this.state.variantFocusStyle = true;
  }
  handleBlurVariant() {
    this.setState({ partcodeFocus: false });
  }
  handleChangeAverageCost(e) {
    this.setState({ average_cost: e.target.value });
    if (e.target.value != "") {
      this.removeFromFields("average_cost");
    } else {
      this.addToFields("average_cost");
    }
    console.log("this.state.average_cost", this.state.average_cost);
  }
  handleFocusAverageCost() {
    this.setState({ avgCostFocus: true });
  }
  handleBlurAverageCost() {
    this.setState({ avgCostFocus: false });
  }
  checkFields() {
    let fields = this.state.fields;
    if (fields.length === 0) {
      this.setState({ buttonEnabled: true });
    } else {
      this.setState({ buttonEnabled: false });
    }

    //this.setState({fields});
  }
  removeFromFields(str) {
    var tempfields = this.state.fields;
    var index = tempfields.indexOf(str);
    if (index !== -1) tempfields.splice(index, 1);
    this.setState({ fields: tempfields });
    this.checkFields();
  }
  addToFields(str) {
    var tempfields = this.state.fields;
    if (tempfields.indexOf(str) == -1) {
      tempfields.push(str);
    }
    this.checkFields();
  }

  validate = () => {
    let costError="";
    let numbers = /^[0-9. ]+$/;

    if(!this.state.average_cost.match(numbers)) {
      costError = "Input Number Format only"
    }

    console.log(costError)

    if(costError) {
      this.setState({ costError })
      return false;
    } 

    return true
  }

  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if(isValid) {
      this.setState ({ costError:""})
      var today = new Date();
    if (this.props.averageCost_data) {
      console.log(
        "jjjjjj",
        this.props.averageCost_data,
        localStorage.getItem("user_id")
      );
      this.props.averageCost_data.old_average_cost = this.state.old_average_cost;
      this.props.averageCost_data.average_cost = this.state.average_cost;
      if (this.props.averageCost_data.avg_cost_revision_details.length > 0) {
        this.props.averageCost_data.avg_cost_revision_details[0].revision_by = localStorage.getItem(
          "user_id"
        );
        this.props.averageCost_data.avg_cost_revision_details[0].revision_date = today;
      }
    }
    // let bodyData = {
    //   old_average_cost: this.state.old_average_cost,
    //   average_cost: this.state.average_cost,
    //   avg_cost_revision_details: [
    //     {
    //       revision_by: localStorage.getItem("user_id"),
    //       revision_date: today,
    //     },
    //   ],
    //   no_of_revisions: this.state.no_of_revisions,
    // };
    this.props.averageCostUpdation(
      this.props.averageCost_data,
      this.state.variant
    );
    setTimeout(() => {
      this.toggle();

      this.props.fetchAveragecostList(this.state.filterObj);
    }, 1000);
    }
  }
  handlePageChange(pageNumber) {
    console.log("pageNumber", pageNumber);
    this.setState({ activePage: pageNumber });
    this.state.filterObj.page = pageNumber;
    this.state.filterObj.activePage = pageNumber;

    this.props.fetchAveragecostList(this.state.filterObj);
  }
  handlePageJumping(e) {
    this.handlePageChange(e.value);
  }
  pageCount() {
    if (this.state.newList) {
      if (this.state.newList.count % 12 == 0) {
        let pageNo = this.state.newList.count / 12;
        let pageCountOptions = [];
        for (let i = 1; i <= pageNo; i++) {
          let obj = {};
          obj["value"] = i;
          obj["label"] = i;
          pageCountOptions.push(obj);
          obj = {};
        }
        this.state.pageCountOptions = pageCountOptions;
      } else {
        let pageNo = this.state.newList.count / 12 + 1;
        let pageCountOptions = [];
        for (let i = 1; i <= pageNo; i++) {
          let obj = {};
          obj["value"] = i;
          obj["label"] = i;
          pageCountOptions.push(obj);
          obj = {};
        }
        this.state.pageCountOptions = pageCountOptions;
        console.log("this.state.pageCountOptions", this.state.pageCountOptions);
      }
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  bulkUpdate(e) {
    console.log("bodyyyy", e.target.files);
    var fd = new FormData();
    fd.append("file", e.target.files[0]);
    fd.append("type", "PA");
    const url =
      API_URL+"/api/products/files/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.post(url, fd).then((res) => {
      console.log("hhhhhhhh", res);
      this.props.fetchAveragecostList(this.state.filterObj);
    });
  }

  handleChangeSearch(e) {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      if (this.state.newList) {
        currentList = this.state.newList;  
        var result = currentList.filter(item => {
            let foundCode =  item.product_code.toLowerCase().includes(e.target.value.toLowerCase());
            let founddetails =  item.product_details.company_details.name.toLowerCase().includes(e.target.value.toLowerCase());
            let foundCountry =  item.country_details.name.toLowerCase().includes(e.target.value.toLowerCase());

            return  foundCode || founddetails || foundCountry ;
        });
        newList = result;
      }
    }
    this.setState({ searchList: newList });
    this.forceUpdate();
    console.log(this.state.searchList)
  }

  render() {
    const options = [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
    ];

    if (Array.isArray(this.state.searchList) && this.state.searchList.length)
      this.state.newList = this.state.searchList;
    else
      this.state.newList = this.props.averageCost_list.results;

    if (this.state.newList) {
      this.state.firstNot = (this.state.activePage - 1) * 13;
      this.state.secondNot =
        (this.state.activePage - 1) * 13 +
        this.state.newList.length;
    }
    this.pageCount();
    return (
      <Fragment>
        <div className="userModule mT25">
          <Col md={6} className="pL0">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">
                  <Home size={15} />
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                {" "}
                <Link to="/products">Products</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Average cost</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0">
            {/* <Button  className="white-btn mR15">
              {" "}
              <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={this.bulkUpdate.bind(this)}
                />
              Average cost bulk update
            </Button> */}
            <div class="upload-btn-wrapper">
              <button class="white-btn">Average cost bulk update</button>
              <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={this.bulkUpdate.bind(this)}
                className="white-btn"
                placeholder="Import"
                className="white-btn mR15"
              />
            </div>
            <span onClick={this.toggle} className="blue-btn">
              {" "}
              Update average cost
            </span>
          </Col>
          <Card className="col-md-12">
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Average cost</Col>
                <Col className="d-flex justify-content-md-end align-items-center">
                  <Form>
                    <FormGroup className="searchInput">
                      <div className="position-relative has-icon-left">
                        <Input type="text" id="iconLeft" onChange={this.handleChangeSearch.bind(this)} name="iconLeft" />
                        <div className="form-control-position">
                          <Search size={16} />
                        </div>
                      </div>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Partcode</th>
                    <th>Company</th>
                    <th>Updated by</th>
                    <th>Date</th>
                    <th>No. of revisions</th>
                    <th>Latest cost </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.newList
                    ? this.state.newList.map((variant, i) => {
                        return (
                          <tr key={i}>
                            <td>{variant.product_code}</td>
                            <td>
                              {variant.product_details
                                ? variant.product_details.company_details.name
                                : null}
                            </td>
                            <td>
                              {" "}
                              {variant.avg_cost_revision_details.length > 0
                                ? variant.avg_cost_revision_details[
                                    variant.avg_cost_revision_details.length - 1
                                  ].revision_by_details.first_name
                                : null}{" "}
                            </td>
                            <td>
                              {variant.avg_cost_revision_details.length > 0
                                ? moment(
                                    variant.avg_cost_revision_details[
                                      variant.avg_cost_revision_details.length -
                                        1
                                    ].revision_date
                                  ).format("YYYY-MM-DD")
                                : null}
                            </td>
                            <td> {variant.no_of_revisions}</td>
                            <td>
                              <NumberFormat
                                value={parseInt(variant.average_cost).toFixed(
                                  2
                                )}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </Table>
              <div className="d-flex">
                <Col md={8}>
                  {this.props.averageCost_list ? (
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={12}
                      totalItemsCount={this.props.averageCost_list.count}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                      itemClassPrev="paginationPrev"
                      itemClassNext="paginationNext"
                      hideFirstLastPages={true}
                      itemClass="paginationItem"
                    />
                  ) : null}
                </Col>
                <Col
                  md={4}
                  className="d-flex justify-content-md-end align-items-center"
                >
                  <div className="d-flex col pageCountWrapper">
                    <span className="pageCount col-md-8">
                      Showing {this.state.firstNot} - {this.state.secondNot}
                    </span>
                    <Select
                      className="basic-single col-md-4"
                      classNamePrefix="select"
                      defaultValue={options[0]}
                      name="color"
                      options={this.state.pageCountOptions}
                      onChange={this.handlePageJumping.bind(this)}
                    />
                  </div>
                </Col>
              </div>
            </CardBody>
          </Card>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="formModal"
          style={{ maxWidth: "380px" }}
        >
          <ModalHeader toggle={this.toggle}>Update Average Cost</ModalHeader>
          <ModalBody>
            <Form className="row">
              <FormGroup className={
                          this.state.companyFocus
                            ? "col-12 hasFloatingLabel selectInput isFocused"
                            : "col-12 hasFloatingLabel selectInput notFocused"
                        }
                        id={
                          this.state.company ? "hasValue" : "hasnoValue"
                        }>
                {/* <Label for="basicinput">Company</Label> */}

                <Select
                   className={
                    this.state.company
                      ? "basic-single floatingLabel"
                      : "basic-single" +
                        this.state.companyFocusStyle
                      ? "focused"
                      : "unfocused"
                  }
                  // classNamePrefix="select"
                  // defaultValue={colourOptions[0]}
                   placeholder=""
                  onChange={this.handleChangeCompany.bind(this)}
                  onFocus={this.handleFocusCompany.bind(this)}
                  onBlur={this.handleBlurCompany.bind(this)}
                  id={this.state.companyFocus ? "focused" : "unfocused"}
                  options={this.state.companyOptions}
                />
                <Label className="form-control-placeholder">
                Company
                </Label>
              </FormGroup>
              <FormGroup  className={
                          this.state.partcodeFocus
                            ? "col-12 hasFloatingLabel selectInput isFocused"
                            : "col-12 hasFloatingLabel selectInput notFocused"
                        }
                        id={
                          this.state.variant ? "hasValue" : "hasnoValue"
                        }>
                {/* <Label for="basicinput">Partcode</Label> */}

                <Select
                   className={
                    this.state.variant
                      ? "basic-single floatingLabel"
                      : "basic-single" +
                        this.state.variantFocusStyle
                      ? "focused"
                      : "unfocused"
                  }
                  // classNamePrefix="select"
                  // defaultValue={colourOptions[0]}
                  placeholder=""
                  onChange={this.handleChangeVariant.bind(this)}
                  onFocus={this.handleFocusVariant.bind(this)}
                  onBlur={this.handleBlurVariant.bind(this)}
                  id={this.state.partcodeFocus ? "focused" : "unfocused"}
                  options={this.state.variantOptions}
                />
                <Label className="form-control-placeholder">
                Partcode
                </Label>
              </FormGroup>
              <FormGroup  className={
                          this.state.avgCostFocus
                            ? "col-12 hasFloatingLabel isFocused"
                            : "col-12 hasFloatingLabel notFocused"
                        }
                        id={
                          this.state.average_cost ? "hasValue" : "hasnoValue"
                        }>
                {/* <Label for="basicinput">Average Cost</Label> */}

                <Input
                  type="text"
                  className={
                    this.state.average_cost
                      ? "form-control input floatingLabel"
                      : "form-control"
                  }
                  id="iconLeft"
                  name="iconLeft"
                  onChange={this.handleChangeAverageCost.bind(this)}
                  onFocus={this.handleFocusAverageCost.bind(this)}
                  onBlur={this.handleBlurAverageCost.bind(this)}
                />
                <label className="form-control-placeholder" for="name">
                Average Cost
                  </label>
                  {this.state.costError ? (
                                      <div className="cValidation"> 
                                        {this.state.costError}
                                      </div>
                                      ): null}
              </FormGroup>
            </Form>
            <div className="d-flex justify-content-end">
              <Button
                className="blue-btn"
                disabled={!this.state.buttonEnabled}
                onClick={this.handleSubmit.bind(this)}
              >
                Update
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
// styled components

const Menu = (props) => {
  const shadow = "hsla(218, 50%, 10%, 0.1)";
  return (
    <div
      css={{
        backgroundColor: "white",
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        marginTop: 8,
        position: "absolute",
        zIndex: 2,
      }}
      {...props}
    />
  );
};
const Blanket = (props) => (
  <div
    css={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: "fixed",
      zIndex: 1,
    }}
    {...props}
  />
);
const Dropdown = ({ children, isOpen, target, onClose }) => (
  <div css={{ position: "relative" }}>
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </div>
);
const Svg = (p) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    focusable="false"
    role="presentation"
    {...p}
  />
);
const DropdownIndicator = () => (
  <div css={{ color: colors.neutral20, height: 24, width: 32 }}>
    <Svg>
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  </div>
);
const ChevronDown = () => (
  <Svg style={{ marginRight: -6 }}>
    <path
      d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </Svg>
);
const mapStateToProps = (state) => ({
  averageCost_list: state.averageCostReducer.averageCostList,
  averageCostVariant_list: state.averageCostReducer.averageCostVariantList,
  company_details: state.companyDetailsReducer.companyDetails,
  averageCost_data: state.averageCostReducer.averageCostData,
  averageCost_update: state.averageCostReducer.updateAverageCost,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchAveragecostList,
      companyDetails,
      fetchAveragecostVariantList,
      fetchAveragecost,
      averageCostUpdation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AverajeCost);
