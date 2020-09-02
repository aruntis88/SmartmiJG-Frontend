// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUserList } from "../../redux/sagas/users/fetchUserList";
import { companyDetails } from "../../redux/sagas/companyDetails/companyDetails";
import Pagination from "react-js-pagination";
import sort from "../../assets/img/sort.png";
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
  Label,
  Input,
  Form,
  Button,
  // Pagination,
  // PaginationItem,
  // PaginationLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Dropdo,
} from "reactstrap";
import { Link } from "react-router-dom";
import {
  // Moon,
  Home,
  Mail,
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
} from "react-feather";
import Select from "react-select";
import Redirect from "react-router-dom/Redirect";
import { defaultTheme } from "react-select";
const { colors } = defaultTheme;
const selectStyles = {
  control: (provided) => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" }),
};
let companyOptions = [];
let roleOptions = [
  { value: "A", label: "Admin" },
  { value: "S", label: "Sales" },
];
let departments = [
  { value: "A", label: "Administration" },
  { value: "S", label: "Sales" },
];
let designationOptions = [
  { value: "SE", label: "Sales Engineer" },
  { value: "SO", label: "Software Engineer" },
];
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMSC: false,
      filterName: false,
      filterType: false,
      filterWebsite: false,
      filterPhone: false,
      filterFax: false,
      filterEmail: false,
      filterCountry: false,
      filterStatus: false,
      redirectUserProfile: false,
      redirectId: 0,
      activePage: 1,
      companyValue: "",
      roleValue: "",
      departmentValue: "",
      designationValue: "",
      searchValue:"",
      newList: [],
      searchList: [],
      pageCountOptions: [],
      companyOptions: [],
      filterObj: {
        page: 1,
        activePage: 1,
        roleFilter: "",
        companyFilter: "",
        designationFilter: "",
        departmentFilter: "",
        sortType: "",
        sortValue: "",
        searchFilter:""
      },
    };
    this.props.fetchUserList(this.state.filterObj);
    this.props.companyDetails();
    this.handlePageChange = this.handlePageChange.bind(this);
    console.log(this.props.user_list)
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
      companyOptions = [];
    }, 1000);
  }
  toggleOpenCompany = () => {
    this.setState((state) => ({ isOpenCompany: !state.isOpenCompany }));
  };
  toggleOpenCompanyClose = () => {
    if (this.state.isOpenCompany == true) {
      this.toggleOpenCompany();
    }
  };
  toggleOpenRole = () => {
    this.setState((state) => ({ isOpenRole: !state.isOpenRole }));
  };
  toggleOpenRoleClose = () => {
    if (this.state.isOpenRole == true) {
      this.toggleOpenRole();
    }
  };
  toggleOpenDesignation = () => {
    this.setState((state) => ({ isOpenDesignation: !state.isOpenDesignation }));
  };
  toggleOpenDesignationClose = () => {
    if (this.state.isOpenDesignation == true) {
      this.toggleOpenDesignation();
    }
  };
  toggleOpenDepartment = () => {
    this.setState((state) => ({ isOpenDepartment: !state.isOpenDepartment }));
  };
  toggleOpenDepartmentClose = () => {
    if (this.state.isOpenDepartment == true) {
      this.toggleOpenDepartment();
    }
  };
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.state.filterObj.page = pageNumber;
    this.state.filterObj.activePage = pageNumber;

    this.props.fetchUserList(this.state.filterObj);
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
  onSelectChangeMSC = (valueMSC) => {
    this.toggleOpenMSC();
    this.setState({ valueMSC });
  };
  toggleOpenClient = () => {
    this.setState((state) => ({ isOpenClient: !state.isOpenClient }));
  };
  onSelectChangeClient = (valueClient) => {
    this.toggleOpenClient();
    this.setState({ valueClient });
  };
  toggleOpenMC = () => {
    this.setState((state) => ({ isOpenMC: !state.isOpenMC }));
  };
  onSelectChangeMC = (valueMC) => {
    this.toggleOpenMC();
    this.setState({ valueMC });
  };
  userProfile(user) {
    this.state.redirectId = user.id;
    this.setState({ redirectUserProfile: true });
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
  handleChangeCompany(e) {
    this.setState({ companyValue: e.label });
    this.state.filterObj.companyFilter = e.value;
    this.props.fetchUserList(this.state.filterObj);
  }
  clearCompany() {
    this.state.companyValue = "";
    this.state.filterObj.companyFilter = "";
    this.props.fetchUserList(this.state.filterObj);
  }
  handleChangeRole(e) {
    this.setState({ roleValue: e.label });
    this.state.filterObj.roleFilter = e.value;
    this.props.fetchUserList(this.state.filterObj);
  }
  clearRole() {
    this.state.roleValue = "";
    this.state.filterObj.roleFilter = "";
    this.props.fetchUserList(this.state.filterObj);
  }
  handleChangeDepartment(e) {
    this.setState({ departmentValue: e.label });
    this.state.filterObj.departmentFilter = e.value;
    this.props.fetchUserList(this.state.filterObj);
  }
  clearDepartment() {
    this.state.departmentValue = "";
    this.state.filterObj.departmentFilter = "";
    this.props.fetchUserList(this.state.filterObj);
  }
  handleChangeDesignation(e) {
    this.setState({ designationValue: e.label });
    this.state.filterObj.designationFilter = e.value;
    this.props.fetchUserList(this.state.filterObj);
  }
  clearDesignation() {
    this.state.designationValue = "";
    this.state.filterObj.designationFilter = "";
    this.props.fetchUserList(this.state.filterObj);
  }
  handleChangeRoleSort() {
    if (
      this.state.filterObj.sortType == "" ||
      this.state.filterObj.sortType == "des"
    )
      this.state.filterObj.sortType = "asc";
    else this.state.filterObj.sortType = "des";
    this.state.filterObj.sortValue = "role";
    this.props.fetchUserList(this.state.filterObj);
  }
  handleChangeStatusSort() {
    if (
      this.state.filterObj.sortType == "" ||
      this.state.filterObj.sortType == "des"
    )
      this.state.filterObj.sortType = "asc";
    else this.state.filterObj.sortType = "des";
    this.state.filterObj.sortValue = "is_active";
    this.props.fetchUserList(this.state.filterObj);
  }
  handleChangeNameSort() {
    if (
      this.state.filterObj.sortType == "" ||
      this.state.filterObj.sortType == "des"
    )
      this.state.filterObj.sortType = "asc";
    else this.state.filterObj.sortType = "des";
    this.state.filterObj.sortValue = "first_name";
    this.props.fetchUserList(this.state.filterObj);
  }
  // handleKeyPress(e) {
  //   if (e.charCode == 13) {
  //     e.preventDefault();
  //     this.state.filterObj.activePage = 1;
  //     this.state.filterObj.searchFilter = this.state.searchValue;
  //     this.props.fetchUserList(this.state.filterObj);
  //   }
  // }
  handleChangeSearch(e) {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      if (this.state.newList) {
        currentList = this.state.newList;  
        var result = currentList.filter(item => {
            let foundName =  item.first_name.toLowerCase().includes(e.target.value.toLowerCase());
            let foundUser =  item.username.toLowerCase().includes(e.target.value.toLowerCase());
            let foundCode =  item.company_details.name.toLowerCase().includes(e.target.value.toLowerCase());
            let foundPhone = item.phone.includes(e.target.value);
            let foundReporting = item.reporting_name.toLowerCase().includes(e.target.value.toLowerCase());

            return  foundName || foundUser || foundCode || foundPhone  || foundReporting ;
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
      isOpenCompany,
      isOpenRole,
      isOpenDesignation,
      isOpenDepartment,
      valueMSC,
      valueClient,
      valueEng,
      valueMC,
    } = this.state;

    if (Array.isArray(this.state.searchList) && this.state.searchList.length)
      this.state.newList = this.state.searchList;
    else
      this.state.newList = this.props.user_list.results;


    if (this.state.newList) {
      this.state.firstNot = (this.state.activePage - 1) * 13;
      this.state.secondNot =
        (this.state.activePage - 1) * 13 + this.state.newList.length;
    }
    this.pageCount();
    if (this.state.redirectUserProfile)
      return <Redirect to={"/user/" + this.state.redirectId}></Redirect>;
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
              <BreadcrumbItem active>Users</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0">
            <Link to="/users-create" className="blue-btn">
              {" "}
              Add new user
            </Link>
          </Col>
          <Card className="col-md-12">
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Users</Col>
                <Col className="d-flex justify-content-md-end align-items-center">
                  <Form>
                    <FormGroup className="searchInput">
                      <div className="position-relative has-icon-left">
                        <Input  onChange={this.handleChangeSearch.bind(this)} type="text" id="iconLeft" name="iconLeft" 
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
                {/* <Col>
                  <label className="form-group has-float-label">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      name="color"
                      onChange={this.handleChangeCompany.bind(this)}
                      options={this.state.companyOptions}
                    />
                    <span>Company</span>
                  </label>
                </Col> */}
                <Col>
                  <label className="form-group has-float-label">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        this.toggleOpenCompanyClose();
                      }}
                    >
                      <Dropdown
                        isOpen={isOpenCompany}
                        onClose={this.toggleOpenCompany}
                        target={
                          <Button
                            iconAfter={<ChevronDown />}
                            onClick={this.toggleOpenCompany}
                            isSelected={isOpenCompany}
                            className="filterButton"
                          >
                            {this.state.companyValue
                              ? ` ${this.state.companyValue}`
                              : "All"}
                            {this.state.companyValue ? (
                              <X
                                onClick={this.clearCompany.bind(this)}
                                size={15}
                              />
                            ) : null}
                          </Button>
                        }
                      >
                        <Select
                          autoFocus
                          backspaceRemovesValue={true}
                          components={{
                            DropdownIndicator,
                            IndicatorSeparator: null,
                          }}
                          controlShouldRenderValue={false}
                          hideSelectedOptions={false}
                          isClearable={true}
                          menuIsOpen
                          onChange={this.handleChangeCompany.bind(this)}
                          options={this.state.companyOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          // value={valueMSC}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Company</span>
                  </label>
                </Col>
                {/* <Col>
                  <label className="form-group has-float-label">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      name="color"
                      options={roleOptions}
                      onChange={this.handleChangeRole.bind(this)}
                    />
                    <span>Role</span>
                  </label>
                </Col> */}
                <Col>
                  <label className="form-group has-float-label">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        this.toggleOpenRoleClose();
                      }}
                    >
                      <Dropdown
                        isOpen={isOpenRole}
                        onClose={this.toggleOpenRole}
                        target={
                          <Button
                            iconAfter={<ChevronDown />}
                            onClick={this.toggleOpenRole}
                            isSelected={isOpenRole}
                            className="filterButton"
                          >
                            {this.state.roleValue
                              ? `${this.state.roleValue}`
                              : "All"}
                            {this.state.roleValue ? (
                              <X
                                onClick={this.clearRole.bind(this)}
                                size={15}
                              />
                            ) : null}
                          </Button>
                        }
                      >
                        <Select
                          autoFocus
                          backspaceRemovesValue={true}
                          components={{
                            DropdownIndicator,
                            IndicatorSeparator: null,
                          }}
                          controlShouldRenderValue={false}
                          hideSelectedOptions={false}
                          isClearable={true}
                          menuIsOpen
                          onChange={this.handleChangeRole.bind(this)}
                          options={roleOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          // value={valueMSC}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Role</span>
                  </label>
                </Col>
                {/* <Col>
                  <label className="form-group has-float-label">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      name="color"
                      options={designationOptions}
                      onChange={this.handleChangeDesignation.bind(this)}
                    />
                    <span>Designation</span>
                  </label>
                </Col> */}
                <Col>
                  <label className="form-group has-float-label">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        this.toggleOpenDesignationClose();
                      }}
                    >
                      {" "}
                      <Dropdown
                        isOpen={isOpenDesignation}
                        onClose={this.toggleOpenDesignation}
                        target={
                          <Button
                            iconAfter={<ChevronDown />}
                            onClick={this.toggleOpenDesignation}
                            isSelected={isOpenDesignation}
                            className="filterButton"
                          >
                            {this.state.designationValue
                              ? `${this.state.designationValue}`
                              : "All"}
                            {this.state.designationValue ? (
                              <X
                                onClick={this.clearDesignation.bind(this)}
                                size={15}
                              />
                            ) : null}
                          </Button>
                        }
                      >
                        <Select
                          autoFocus
                          backspaceRemovesValue={true}
                          components={{
                            DropdownIndicator,
                            IndicatorSeparator: null,
                          }}
                          controlShouldRenderValue={false}
                          hideSelectedOptions={false}
                          isClearable={true}
                          menuIsOpen
                          onChange={this.handleChangeDesignation.bind(this)}
                          options={designationOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          // value={valueMSC}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Designation</span>
                  </label>
                </Col>
                {/* <Col>
                  <label className="form-group has-float-label">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      name="color"
                      options={departments}
                      onChange={this.handleChangeDepartment.bind(this)}
                    />
                    <span>Department</span>
                  </label>
                </Col> */}
                <Col>
                  <label className="form-group has-float-label">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        this.toggleOpenDepartmentClose();
                      }}
                    >
                      {" "}
                      <Dropdown
                        isOpen={isOpenDepartment}
                        onClose={this.toggleOpenDepartment}
                        target={
                          <Button
                            iconAfter={<ChevronDown />}
                            onClick={this.toggleOpenDepartment}
                            isSelected={isOpenDepartment}
                            className="filterButton"
                          >
                            {this.state.departmentValue
                              ? `${this.state.departmentValue}`
                              : "All"}
                            {this.state.departmentValue ? (
                              <X
                                onClick={this.clearDepartment.bind(this)}
                                size={15}
                              />
                            ) : null}
                          </Button>
                        }
                      >
                        <Select
                          autoFocus
                          backspaceRemovesValue={true}
                          components={{
                            DropdownIndicator,
                            IndicatorSeparator: null,
                          }}
                          controlShouldRenderValue={false}
                          hideSelectedOptions={false}
                          isClearable={true}
                          menuIsOpen
                          onChange={this.handleChangeDepartment.bind(this)}
                          options={departments}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          // value={valueMSC}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Department</span>
                  </label>
                </Col>
                
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      Name{" "}
                      <span>
                        <img
                          onClick={this.handleChangeNameSort.bind(this)}
                          src={sort}
                          style={{ marginLeft: 10 }}
                        />
                      </span>
                    </th>
                    <th>Employee code</th>
                    <th>Designation</th>
                    <th>
                      Role
                      <span>
                        <img
                          onClick={this.handleChangeRoleSort.bind(this)}
                          src={sort}
                          style={{ marginLeft: 10 }}
                        />
                      </span>
                    </th>
                    <th>Company</th>
                    <th>Department</th>
                    <th>Reporting</th>
                    <th>
                      Status{" "}
                      <span>
                        <img
                          onClick={this.handleChangeStatusSort.bind(this)}
                          src={sort}
                          style={{ marginLeft: 10 }}
                        />
                      </span>{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.newList
                    ? this.state.newList.map((user, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row">
                              {/* <Link to="/user"> */}
                              <span className="triangleGreen" />
                              <span
                                className="userNameColor pointer"
                                onClick={() => this.userProfile(user)}
                              >
                                {user.first_name}
                              </span>
                              {/* </Link> */}
                            </th>
                            <td>{user.employee_code}</td>
                            <td>
                              {user.designation == "SE"
                                ? "Sales Engineer"
                                : "Software Engineer"}
                            </td>
                            <td>{user.role == "A" ? "Admin" : "Sales"}</td>
                            <td>
                              {user.company_details
                                ? user.company_details.name
                                : null}
                            </td>
                            <td>
                              {user.department == "A"
                                ? "Administration"
                                : "Sales"}
                            </td>
                            <td>{user.reporting_name}</td>
                            {user.is_active ? (
                              <td className="userActive">Active</td>
                            ) : (
                              <td className="userInActive">Inactive</td>
                            )}
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </Table>
              <div className="d-flex">
                <Col md={8}>
                  {this.props.user_list ? (
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={12}
                      totalItemsCount={this.props.user_list.count}
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
const Dropdown = ({ children, isOpen, target, onClose }) => (
  <div css={{ position: "relative" }}>
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </div>
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
const mapStateToProps = (state) => ({
  user_list: state.userReducer.usersList,
  company_details: state.companyDetailsReducer.companyDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUserList,
      companyDetails,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Users);
