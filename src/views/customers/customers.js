// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import { fetchCustomerList } from "../../redux/sagas/customers/fetchCustomers";
import { countryList } from "../../redux/sagas/customers/fetchCountryList";
import { connect } from "react-redux";
import sort from "../../assets/img/sort.png";
import { bindActionCreators } from "redux";
import Pagination from "react-js-pagination";
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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  DropdownItem,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import {
  Home,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "react-feather";
import Select from "react-select";
import { defaultTheme } from "react-select";
const { colors } = defaultTheme;
const selectStyles = {
  control: (provided) => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" }),
};
let customerTypeOptions = [
  { value: 1, label: "Main Contractor" },
  { value: 2, label: "Main Sub Contractor" },
  { value: 3, label: "Client" },
  { value: 4, label: "Design Consultant" },
  { value: 5, label: "Supervision Consultant" },
  { value: 6, label: "Trader" },
  { value: 7, label: "Others" },
  { value: 8, label: "Subcontractor" },
];
let statusOptions = [
  { value: "True", label: "Active" },
  { value: "False", label: "Inactive" },
];
let countryOptions = [];
class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: false,
      filterType: false,
      filterWebsite: false,
      filterPhone: false,
      filterFax: false,
      filterEmail: false,
      filterCountry: false,
      filterStatus: false,
      redirectCustomerView: false,
      redirectId: 0,
      activePage: 1,
      pageCountOptions: [],
      countryOptions: [],
      newList: [],
      searchList: [],
      filterObj: {
        page: 1,
        activePage: 1,
        typeFilter: "",
        countryFilter: "",
        statusFilter: "",
        sortType: "",
        sortValue: "",
      },
    };
    this.props.fetchCustomerList(this.state.filterObj);
    this.props.countryList();
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      if (this.props.country_list) {
        this.props.country_list.map((country, i) => {
          var obj = {};

          obj["value"] = country.id;
          obj["label"] = country.name;
          countryOptions.push(obj);
          obj = {};
        });
      }
      
      this.setState({ countryOptions: countryOptions });
      countryOptions = [];
    }, 1000);

  }

  handleChangeSearch(e) {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      if (this.state.newList) {
        currentList = this.props.customer_list.results;  
        var result = currentList.filter(item => {
            let foundName =  item.name.toLowerCase().includes(e.target.value.toLowerCase());
            let foundtype =  item.type.toLowerCase().includes(e.target.value.toLowerCase());
            let foundCountry =  item.country_details.name.toLowerCase().includes(e.target.value.toLowerCase());

            return  foundName || foundtype || foundCountry ;
        });
        newList = result;
      }
    }
    this.setState({ searchList: newList });
    this.forceUpdate();
    console.log(this.state.searchList)
  }
    

  handlePageChange(pageNumber) {
    console.log("pageNumber", pageNumber);
    this.setState({ activePage: pageNumber });
    this.state.filterObj.page = pageNumber;
    this.state.filterObj.activePage = pageNumber;

    this.props.fetchCustomerList(this.state.filterObj);
  }
  toggleOpenType = () => {
    this.setState((state) => ({ isOpenType: !state.isOpenType }));
  };
  toggleOpenTypeClose = () => {
    if (this.state.isOpenType == true) {
      this.toggleOpenType();
    }
  };
  toggleOpenCountry = () => {
    this.setState((state) => ({ isOpenCountry: !state.isOpenCountry }));
  };
  toggleOpenCountryClose = () => {
    if (this.state.isOpenCountry == true) {
      this.toggleOpenCountry();
    }
  };
  toggleOpenStatus = () => {
    this.setState((state) => ({ isOpenStatus: !state.isOpenStatus }));
  };
  toggleOpenStatusClose = () => {
    if (this.state.isOpenStatus == true) {
      this.toggleOpenStatus();
    }
  };
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
  customerView(customer) {
    this.state.redirectId = customer.id;
    this.setState({ redirectCustomerView: true });
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

  handleChangeCountry(e) {
    this.setState({ countryValue: e.label });
    this.state.filterObj.countryFilter = e.value;
    this.props.fetchCustomerList(this.state.filterObj);
  }
  clearCountry() {
    this.state.countryValue = "";
    this.state.filterObj.countryFilter = "";
    this.props.fetchCustomerList(this.state.filterObj);
  }
  handleChangeType(e) {
    this.setState({ typeValue: e.label });
    this.state.filterObj.typeFilter = e.value;
    this.props.fetchCustomerList(this.state.filterObj);
  }
  clearType() {
    this.state.typeValue = "";
    this.state.filterObj.typeFilter = "";
    this.props.fetchCustomerList(this.state.filterObj);
  }
  handleChangeStatus(e) {
    this.setState({ statusValue: e.label });
    this.state.filterObj.statusFilter = e.value;
    this.props.fetchCustomerList(this.state.filterObj);
  }
  clearStatus() {
    this.state.statusValue = "";
    this.state.filterObj.statusFilter = "";
    this.props.fetchCustomerList(this.state.filterObj);
  }
  handleChangeStatusSort() {
    if (
      this.state.filterObj.sortType == "" ||
      this.state.filterObj.sortType == "des"
    )
      this.state.filterObj.sortType = "asc";
    else this.state.filterObj.sortType = "des";
    this.state.filterObj.sortValue = "is_active";
    this.props.fetchCustomerList(this.state.filterObj);
  }
  handleChangeNameSort() {
    if (
      this.state.filterObj.sortType == "" ||
      this.state.filterObj.sortType == "des"
    )
      this.state.filterObj.sortType = "asc";
    else this.state.filterObj.sortType = "des";
    this.state.filterObj.sortValue = "name";
    this.props.fetchCustomerList(this.state.filterObj);
  }
  handleChangeTypeSort() {
    if (
      this.state.filterObj.sortType == "" ||
      this.state.filterObj.sortType == "des"
    )
      this.state.filterObj.sortType = "asc";
    else this.state.filterObj.sortType = "des";
    this.state.filterObj.sortValue = "type";
    this.props.fetchCustomerList(this.state.filterObj);  
  }
 
  render() {
    
    const options = [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
    ];
    const {
      isOpenType,
      isOpenCountry,
      isOpenStatus,
      // isOpenDepartment,
      // valueMSC,
      // valueClient,
      // valueEng,
      // valueMC
    } = this.state;
   
    if (Array.isArray(this.state.searchList) && this.state.searchList.length)
      this.state.newList = this.state.searchList;
    else
      this.state.newList = this.props.customer_list.results;

    
    if (this.state.newList) {
      this.state.firstNot = (this.state.activePage - 1) * 13;
      this.state.secondNot =
        (this.state.activePage - 1) * 13 +
        this.state.newList.length;
    }
    this.pageCount();
    if (this.state.redirectCustomerView)
      return (
        <Redirect to={"/customers-view/" + this.state.redirectId}></Redirect>
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
              <BreadcrumbItem active>Customers</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0">
            <Link to="/customers-create" className="blue-btn">
              {" "}
              Add new customers
            </Link>
          </Col>
          <Card className="col-md-12">
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Customers</Col>
                <Col className="d-flex justify-content-md-end align-items-center">
                  <Form>
                    <FormGroup className="searchInput">
                      <div className="position-relative has-icon-left">
                        <Input onChange={this.handleChangeSearch.bind(this)} type="text"  id="iconLeft" name="iconLeft" 
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
                    <select className="form-control custom-select">
                      <option selected>All</option>
                      <option>-</option>
                    </select>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={options[0]}
                      name="color"
                      options={customerTypeOptions}
                      onChange={this.handleChangeType.bind(this)}
                      
                    />
                    <span>Type</span>
                  </label>
                </Col> */}
                <Col>
                  <label className="form-group has-float-label">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        this.toggleOpenTypeClose();
                      }}
                    >
                      <Dropdown
                        isOpen={isOpenType}
                        onClose={this.toggleOpenType}
                        target={
                          <Button
                            iconAfter={<ChevronDown />}
                            onClick={this.toggleOpenType}
                            isSelected={isOpenType}
                            className="filterButton"
                          >
                            {this.state.typeValue
                              ?  this.state.typeValue
                              : "All"}
                            {this.state.typeValue ? (
                              <X
                                onClick={this.clearType.bind(this)}
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
                          onChange={this.handleChangeType.bind(this)}
                          options={customerTypeOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          // value={valueMSC}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Type</span>
                  </label>
                </Col>
                {/* <Col>
                  <label className="form-group has-float-label">
                    <select className="form-control custom-select">
                      <option selected>All</option>
                      <option>-</option>
                    </select>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={colourOptions[0]}
                      name="color"
                      options={this.state.countryOptions}
                      onChange={this.handleChangeCountry.bind(this)}
                    />
                    <span>Country</span>
                  </label>
                </Col> */}
                <Col>
                  <label className="form-group has-float-label">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        this.toggleOpenCountryClose();
                      }}
                    >
                      {" "}
                      <Dropdown
                        isOpen={isOpenCountry}
                        onClose={this.toggleOpenCountry}
                        target={
                          <Button
                            iconAfter={<ChevronDown />}
                            onClick={this.toggleOpenCountry}
                            isSelected={isOpenCountry}
                            className="filterButton"
                          >
                            {this.state.countryValue
                              ? this.state.countryValue
                              : "All"}
                            {this.state.countryValue ? (
                              <X
                                onClick={this.clearCountry.bind(this)}
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
                          onChange={this.handleChangeCountry.bind(this)}
                          options={this.state.countryOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          // value={valueMSC}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Country</span>
                  </label>
                </Col>
                {/* <Col>
                  <label className="form-group has-float-label">
                    <select className="form-control custom-select">
                      <option selected>All</option>
                      <option>-</option>
                    </select>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={colourOptions[0]}
                      name="color"
                      options={statusOptions}
                      onChange={this.handleChangeStatus.bind(this)}
                    />
                    <span>Status</span>
                  </label>
                </Col> */}
                <Col>
                  <label className="form-group has-float-label">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        this.toggleOpenStatusClose();
                      }}
                    >
                      {" "}
                      <Dropdown
                        isOpen={isOpenStatus}
                        onClose={this.toggleOpenStatus}
                        target={
                          <Button
                            iconAfter={<ChevronDown />}
                            onClick={this.toggleOpenStatus}
                            isSelected={isOpenStatus}
                            className="filterButton"
                          >
                            {this.state.statusValue
                              ? this.state.statusValue
                              : "All"}
                            {this.state.statusValue ? (
                              <X
                                onClick={this.clearStatus.bind(this)}
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
                          onChange={this.handleChangeStatus.bind(this)}
                          options={statusOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          // value={valueMSC}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Status</span>
                  </label>
                </Col>
                {/* <Col>
                  <label className="form-group has-float-label">
                    <UncontrolledDropdown
                      nav
                      inNavbar
                      className="statusDropdown"
                    >
                      <DropdownToggle nav className="">
                        <div className="titleStatus"> Filter </div>
                        <div className="arrowStatus">
                          <ChevronDown />
                        </div>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <span className="activeStatus">Active</span>
                        </DropdownItem>
                        <DropdownItem>
                          <span className="inactiveStatus">Inactive</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <span>Status</span>
                  </label>
                </Col> */}
                <Col></Col>
              
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name
                      <span>
                        <img
                          onClick={this.handleChangeNameSort.bind(this)}
                          src={sort}
                          style={{ marginLeft: 10 }}
                        />
                      </span>{" "}
                    </th>
                    <th>Type
                      <span>
                        <img
                          onClick={this.handleChangeTypeSort.bind(this)}
                          src={sort}
                          style={{ marginLeft: 10 }}
                        />
                      </span>{" "}</th>
                    <th>Website</th>
                    <th>Phone</th>
                    <th>Country</th>
                    <th>
                      Status
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
                    ? this.state.newList.map((customer, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row">
                              <span className="triangleGreen" />
                              <a
                                className="userNameColor"
                                onClick={() => this.customerView(customer)}
                              >
                                {customer.name}
                              </a>
                            </th>
                            <td>
                              {customer.customer_type_details.map(
                                (customer_type, i, arr) => {
                                  return <div>{customer_type.type}</div>;
                                }
                              )}
                            </td>
                            <td>{customer.website}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.country_details.name}</td>
                            {customer.is_active ? (
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
                  {this.props.customer_list ? (
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={12}
                      totalItemsCount={this.props.customer_list.count}
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
  customer_list: state.customerReducer.customersList,
  country_list: state.customerReducer.countryList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchCustomerList,
      countryList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
