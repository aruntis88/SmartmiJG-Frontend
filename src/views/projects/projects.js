// import external modules
import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { fetchProjectList } from "../../redux/sagas/projects/fetchProjectList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { projectRemove } from "../../redux/sagas/projects/fetchRemoveProject";
import { fetchCustomerList } from "../../redux/sagas/customers/fetchCustomers";
import { fetchCustomerCList } from "../../redux/sagas/customers/fetchCustomersC";
import { fetchCustomerMCList } from "../../redux/sagas/customers/fetchCustomersMC";
import { fetchCustomerMSCList } from "../../redux/sagas/customers/fetchCustomersMSC";
import sort from "../../assets/img/sort.png";
import Pagination from "react-js-pagination";
import NumberFormat from "react-number-format";
import moment from "moment";
import OutsideClickHandler from "react-outside-click-handler";

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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CustomInput,
  Label,
  FormText,
} from "reactstrap";

import Select from "react-select";
import { defaultTheme } from "react-select";
import mapall from "../../assets/img/mapall.png";
import {
  Home,
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
} from "react-feather";

const { colors } = defaultTheme;
const selectStyles = {
  control: (provided) => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" }),
};
let clientOptions = [];
let mainContractorOptions = [];
let mainSubContractorOptions = [];
class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMSC: false,
      isOpenClient: false,
      isOpenMC: false,
      valueMSC: undefined,
      valueClient: undefined,
      valueMC: undefined,
      filterMenu: false,
      filterName: false,
      filterType: false,
      filterWebsite: false,
      filterPhone: false,
      filterFax: false,
      filterEmail: false,
      filterCountry: false,
      filterStatus: false,
      redirectProjectView: false,
      redirectId: 0,
      activePage: 1,
      clientValue: "",
      mainSubContractorValue: "",
      mainContractorValue: "",
      newList: [],
      searchList: [],
      clientOptions: [],
      mainContractorOptions: [],
      mainSubContractorOptions: [],
      pageCountOptions: [],
      filterObj: {
        page: 1,
        activePage: 1,
        clientFilter: "",
        mainContractorFilter: "",
        mainSubContractorFilter: "",
        sortType: "",
        sortValue: "",
      },
    };
    this.filterToggle = this.filterToggle.bind(this);
    this.props.fetchProjectList(this.state.filterObj);
    this.props.fetchCustomerList();
    this.props.fetchCustomerCList();
    this.props.fetchCustomerMCList();
    this.props.fetchCustomerMSCList();
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      if (this.props.customer_list_C.results) {
        this.props.customer_list_C.results.map((customer, i) => {
          let obj = {};
          obj["value"] = customer.id;
          obj["label"] = customer.name;
          clientOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.customer_list_MC.results) {
        this.props.customer_list_MC.results.map((customer, key) => {
          let obj = {};
          obj["value"] = customer.id;
          obj["label"] = customer.name;
          mainContractorOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.customer_list_MSC.results) {
        this.props.customer_list_MSC.results.map((customer, key) => {
          let obj = {};
          obj["value"] = customer.id;
          obj["label"] = customer.name;
          mainSubContractorOptions.push(obj);
          obj = {};
        });
      }

      this.setState({ clientOptions: clientOptions });
      this.setState({ mainContractorOptions: mainContractorOptions });
      this.setState({ mainSubContractorOptions: mainSubContractorOptions });
      clientOptions = [];
      mainContractorOptions = [];
      mainSubContractorOptions = [];
    }, 1000);
  }
  handlePageChange(pageNumber) {
    console.log("pageNumber", pageNumber);
    this.setState({ activePage: pageNumber });
    this.state.filterObj.page = pageNumber;
    this.state.filterObj.activePage = pageNumber;

    this.props.fetchProjectList(this.state.filterObj);
  }
  nameValue() {
    this.setState(({ filterName }) => ({
      filterName: !filterName,
    }));
  }
  typeValue() {
    this.setState(({ filterType }) => ({
      filterType: !filterType,
    }));
  }
  websiteValue() {
    this.setState(({ filterWebsite }) => ({
      filterWebsite: !filterWebsite,
    }));
  }
  phoneValue() {
    this.setState(({ filterPhone }) => ({
      filterPhone: !filterPhone,
    }));
  }
  faxValue() {
    this.setState(({ filterFax }) => ({
      filterFax: !filterFax,
    }));
  }
  emailValue() {
    this.setState(({ filterEmail }) => ({
      filterEmail: !filterEmail,
    }));
  }
  countryValue() {
    this.setState(({ filterCountry }) => ({
      filterCountry: !filterCountry,
    }));
  }
  statusValue() {
    this.setState(({ filterStatus }) => ({
      filterStatus: !filterStatus,
    }));
  }
  filterToggle() {
    this.setState({
      filterMenu: !this.state.filterMenu,
    });
  }
  toggleOpenMSC = () => {
    this.setState((state) => ({ isOpenMSC: !state.isOpenMSC }));
  };
  toggleOpenMSCClose = () => {
    if (this.state.isOpenMSC == true) {
      this.toggleOpenMSC();
    }
  };
  onSelectChangeMSC = (valueMSC) => {
    this.toggleOpenMSC();
    this.setState({ valueMSC });
  };
  toggleOpenClient = () => {
    this.setState((state) => ({ isOpenClient: !state.isOpenClient }));
  };
  toggleOpenClientClose = () => {
    if (this.state.isOpenClient == true) {
      this.toggleOpenClient();
    }
  };
  onSelectChangeClient = (valueClient) => {
    this.toggleOpenClient();
    this.setState({ valueClient });
  };
  toggleOpenMC = () => {
    this.setState((state) => ({ isOpenMC: !state.isOpenMC }));
  };
  toggleOpenMCClose() {
    if (this.state.isOpenMC == true) {
      this.toggleOpenMC();
    }
  }
  onSelectChangeMC = (valueMC) => {
    this.toggleOpenMC();
    this.setState({ valueMC });
  };
  projectView(project) {
    this.state.redirectId = project.id;
    this.setState({ redirectProjectView: true });
  }
  handleRemoveProject(project) {
    this.props.projectRemove(project.id);
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
      }
    }
  }
  handleChangemainSubContractor(e) {
    this.setState({ mainSubContractorValue: e.label });
    this.state.filterObj.mainSubContractorFilter = e.value;
    this.props.fetchProjectList(this.state.filterObj);
  }
  clearMainSubContractor() {
    this.state.mainSubContractorValue = "";
    this.state.filterObj.mainSubContractorFilter = "";
    this.props.fetchProjectList(this.state.filterObj);
  }
  handleChangeClient(e) {
    this.setState({ clientValue: e.label });
    this.state.filterObj.clientFilter = e.value;
    this.props.fetchProjectList(this.state.filterObj);
  }
  clearClient() {
    this.state.clientValue = "";
    this.state.filterObj.clientFilter = "";
    this.props.fetchProjectList(this.state.filterObj);
  }
  handleChangemainContractor(e) {
    this.setState({ mainContractorValue: e.label });
    this.state.filterObj.mainContractorFilter = e.value;
    this.props.fetchProjectList(this.state.filterObj);
  }
  clearMainContractor() {
    this.state.mainContractorValue = "";
    this.state.filterObj.mainContractorFilter = "";
    this.props.fetchProjectList(this.state.filterObj);
  }
  handleChangeStatusSort() {
    if (
      this.state.filterObj.sortType == "" ||
      this.state.filterObj.sortType == "des"
    )
      this.state.filterObj.sortType = "asc";
    else this.state.filterObj.sortType = "des";
    this.state.filterObj.sortValue = "status";
    this.props.fetchProjectList(this.state.filterObj);
  }
  handleChangeStartDateSort() {
    if (
      this.state.filterObj.sortType == "" ||
      this.state.filterObj.sortType == "des"
    )
      this.state.filterObj.sortType = "asc";
    else this.state.filterObj.sortType = "des";
    this.state.filterObj.sortValue = "exp_start_date";
    this.props.fetchProjectList(this.state.filterObj);
  }
  handleChangeEndDateSort() {
    if (
      this.state.filterObj.sortType == "" ||
      this.state.filterObj.sortType == "des"
    )
      this.state.filterObj.sortType = "asc";
    else this.state.filterObj.sortType = "des";
    this.state.filterObj.sortValue = "exp_end_date";
    this.props.fetchProjectList(this.state.filterObj);
  }
  handleChangeValueSort() {
    if (
      this.state.filterObj.sortType == "" ||
      this.state.filterObj.sortType == "des"
    )
      this.state.filterObj.sortType = "asc";
    else this.state.filterObj.sortType = "des";
    this.state.filterObj.sortValue = "value";
    this.props.fetchProjectList(this.state.filterObj);
  }
  handleChangeSearch(e) {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      if (this.props.project_list.results) {
        currentList = this.props.project_list.results;  
        var result = currentList.filter(item => {
            let foundName =  item.name.toLowerCase().includes(e.target.value.toLowerCase());
            let foundUser =  item.main_contractor_details.name.toLowerCase().includes(e.target.value.toLowerCase());
            let foundLocation =  item.location.toLowerCase().includes(e.target.value.toLowerCase());
            let foundStatus = item.status.toLowerCase().includes(e.target.value.toLowerCase());
            let foundReference = item.reference_no.toLowerCase().includes(e.target.value.toLowerCase());

            return  foundName || foundUser || foundLocation || foundStatus || foundReference ;
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
    const {
      isOpenMSC,
      isOpenClient,
      isOpenMC,
      valueMSC,
      valueClient,
      valueMC,
    } = this.state;

    if (Array.isArray(this.state.searchList) && this.state.searchList.length)
      this.state.newList = this.state.searchList;
    else
      this.state.newList = this.props.project_list.results;


    if (this.state.newList) {
      this.state.firstNot = (this.state.activePage - 1) * 13;
      this.state.secondNot =
        (this.state.activePage - 1) * 13 +
        this.state.newList.length;
    }
    this.pageCount();
    if (this.props.project_remove) this.props.fetchProjectList();
    if (this.state.redirectProjectView)
      return (
        <Redirect to={"/projects-view/" + this.state.redirectId}></Redirect>
      );
    return (
      <Fragment>
        <div className="userModule mT25">
          <Col md={6} className="pL0">
            <Breadcrumb>
              <BreadcrumbItem>
                <a href="/">
                  <Home size={15} />
                </a>
              </BreadcrumbItem>
              <BreadcrumbItem active>Projects</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0">
            <Link to="/projects-create" className="blue-btn">
              {" "}
              Add new Projects
            </Link>
          </Col>
          <Card className="col-md-12">
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Projects</Col>
                <Col className="d-flex justify-content-md-end align-items-center">
                  <Form>
                    <FormGroup className="searchInput">
                      <div className="position-relative has-icon-left">
                        <Input type="text" onChange={this.handleChangeSearch.bind(this)} id="iconLeft" name="iconLeft" 
                        placeholder="Search"/>
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
              <div className="filterTable">
                <Col>
                  <label className="form-group has-float-label">
                    {/* <select className="form-control custom-select">
                      <option selected>All</option>
                      <option>-</option>
                    </select> */}
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        this.toggleOpenMSCClose();
                      }}
                    >
                      <Dropdown
                        isOpen={isOpenMSC}
                        onClose={this.toggleOpenMSC}
                        target={
                          <Button
                            iconAfter={<ChevronDown />}
                            onClick={this.toggleOpenMSC}
                            isSelected={isOpenMSC}
                            className="filterButton"
                          >
                            {this.state.mainSubContractorValue
                              ? `${this.state.mainSubContractorValue}`
                              : "All"}
                            {this.state.mainSubContractorValue ? (
                              <X
                                onClick={this.clearMainSubContractor.bind(this)}
                                size={15}
                              />
                            ) : null}
                          </Button>
                        }
                      >
                        <Select
                          autoFocus
                          backspaceRemovesValue={false}
                          components={{
                            DropdownIndicator,
                            IndicatorSeparator: null,
                          }}
                          controlShouldRenderValue={false}
                          hideSelectedOptions={false}
                          isClearable={false}
                          menuIsOpen
                          onChange={this.handleChangemainSubContractor.bind(
                            this
                          )}
                          options={this.state.mainSubContractorOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={valueMSC}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Main subcontractor</span>
                  </label>
                </Col>
                <Col>
                  <label className="form-group has-float-label">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        this.toggleOpenClientClose();
                      }}
                    >
                      {" "}
                      <Dropdown
                        isOpen={isOpenClient}
                        onClose={this.toggleOpenClient}
                        target={
                          <Button
                            iconAfter={<ChevronDown />}
                            onClick={this.toggleOpenClient}
                            isSelected={isOpenClient}
                            className="filterButton"
                          >
                            {this.state.clientValue
                              ? ` ${this.state.clientValue}`
                              : "All"}
                            {this.state.clientValue ? (
                              <X
                                onClick={this.clearClient.bind(this)}
                                size={15}
                              />
                            ) : null}
                          </Button>
                        }
                      >
                        <Select
                          autoFocus
                          backspaceRemovesValue={false}
                          components={{
                            DropdownIndicator,
                            IndicatorSeparator: null,
                          }}
                          controlShouldRenderValue={false}
                          hideSelectedOptions={false}
                          isClearable={false}
                          menuIsOpen
                          onChange={this.handleChangeClient.bind(this)}
                          options={this.state.clientOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={valueClient}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Client</span>
                  </label>
                </Col>
                <Col>
                  <label className="form-group has-float-label">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        this.toggleOpenMCClose();
                      }}
                    >
                      <Dropdown
                        isOpen={isOpenMC}
                        onClose={this.toggleOpenMC}
                        target={
                          <Button
                            iconAfter={<ChevronDown />}
                            onClick={this.toggleOpenMC}
                            isSelected={isOpenMC}
                            className="filterButton"
                          >
                            {this.state.mainContractorValue
                              ? ` ${this.state.mainContractorValue}`
                              : "All"}
                            {this.state.mainContractorValue ? (
                              <X
                                onClick={this.clearMainContractor.bind(this)}
                                size={15}
                              />
                            ) : null}
                          </Button>
                        }
                      >
                        <Select
                          autoFocus
                          backspaceRemovesValue={false}
                          components={{
                            DropdownIndicator,
                            IndicatorSeparator: null,
                          }}
                          controlShouldRenderValue={false}
                          hideSelectedOptions={false}
                          isClearable={false}
                          menuIsOpen
                          onChange={this.handleChangemainContractor.bind(this)}
                          options={this.state.mainContractorOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={valueMC}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Main contractor</span>
                  </label>
                </Col>
                <Col className="d-flex justify-content-md-end align-items-center"></Col>
                <Col>
                  <Row style={{justifyContent: "flex-end"}}>
                    <Col className="col-4">
                      <Link to="/projects-map">
                        <img src={mapall} />
                      </Link>
                    </Col>
                    
                  </Row>
                </Col>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Ref Number</th>
                    <th>project name</th>
                    <th>Main contractor</th>
                    <th>
                      Status{" "}
                      <img
                        onClick={this.handleChangeStatusSort.bind(this)}
                        src={sort}
                        style={{ marginLeft: 10 }}
                      />
                    </th>
                    <th>
                      Start date{" "}
                      <img
                        onClick={this.handleChangeStartDateSort.bind(this)}
                        src={sort}
                        style={{ marginLeft: 10 }}
                      />
                    </th>
                    <th>
                      End date{" "}
                      <img
                        onClick={this.handleChangeEndDateSort.bind(this)}
                        src={sort}
                        style={{ marginLeft: 10 }}
                      />
                    </th>
                    <th>
                      value{" "}
                      <img
                        onClick={this.handleChangeValueSort.bind(this)}
                        src={sort}
                        style={{ marginLeft: 10 }}
                      />
                    </th>
                    <th>Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.newList
                    ? this.state.newList.map((project, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row">
                              <span className="triangleGreen" />
                              <a
                                className="userNameColor"
                                onClick={() => this.projectView(project)}
                              >
                                {project.reference_no}
                              </a>
                            </th>
                            <td>{project.name}</td>
                            <td>{project.main_contractor_details.name}</td>
                            <td>
                              {project.status == "TR"
                                ? "Tender"
                                : project.status == "JC"
                                ? "JJIH-Main Contractor"
                                : project.status == "J1"
                                ? "JIH-Stage 1"
                                : project.status == "J2"
                                ? "JIH-Stage 2"
                                : project.status == "J3"
                                ? "JIH-Stage 3"
                                : project.status == "J4"
                                ? "JIH-Stage 4"
                                : project.status == "CL"
                                ? "Closed"
                                : "Cancelled"}
                            </td>
                            <td>
                              {moment(project.exp_start_date).format(
                                "DD/MM/YYYY"
                              )}
                            </td>
                            <td>
                              {moment(project.exp_end_date).format(
                                "DD/MM/YYYY"
                              )}
                            </td>
                            <td>
                              <NumberFormat
                                value={parseInt(project.value).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            </td>
                            <td className="action">
                              <span>
                                <Link to={"/projects-edit/" + project.id}>
                                  <Edit size={16} className="mr-4" />
                                </Link>
                              </span>
                              <span>
                                <Trash2
                                  onClick={() =>
                                    this.handleRemoveProject(project)
                                  }
                                  size={16}
                                  className="mr-4"
                                />
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </Table>
              <div className="d-flex">
                <Col md={8}>
                  {this.props.project_list ? (
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={12}
                      totalItemsCount={this.props.project_list.count}
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
  project_list: state.projectReducer.projectList,
  project_remove: state.projectReducer.removeProject,
  customer_list: state.customerReducer.customersList,
  customer_list_C: state.customerReducer.customersCList,
  customer_list_MC: state.customerReducer.customersMCList,
  customer_list_MSC: state.customerReducer.customersMSCList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchProjectList,
      projectRemove,
      fetchCustomerList,
      fetchCustomerCList,
      fetchCustomerMCList,
      fetchCustomerMSCList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
