// import external modules
import React, { Component, Fragment } from "react";
import { fetchLeadList } from "../../redux/sagas/leads/fetchLeadList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { leadRemove } from "../../redux/sagas/leads/fetchRemoveLead";
import { fetchProjectList } from "../../redux/sagas/projects/fetchProjectList";
import { fetchUserList } from "../../redux/sagas/users/fetchUserList";
import { fetchCustomerList } from "../../redux/sagas/customers/fetchCustomers";
import { salesEngineerFilter } from "../../redux/sagas/users/fetchSalesEngineer";
import Pagination from "react-js-pagination";
import OutsideClickHandler from "react-outside-click-handler";
import moment from "moment";
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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import {
  Home,
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X
} from "react-feather";
import Select from "react-select";
import { defaultTheme } from "react-select";
const { colors } = defaultTheme;
const selectStyles = {
  control: provided => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" })
};
let projectOptions = [];
let customerOptions = [];
let assignedToOptions = [];
let salesEngineerOptions = [];
class Leads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMSC: false,
      isOpenClient: false,
      isOpenMC: false,
      isOpenEng: false,
      valueMSC: undefined,
      valueClient: undefined,
      valueMC: undefined,
      valueEng: undefined,
      filterMenu: false,
      filterLeadReference: true,
      filterProject: true,
      filterCustomer: true,
      filterSourceLead: true,
      filterDueDate: false,
      filterReceivedBy: false,
      filterAssignedTo: true,
      redirectLeadView: false,
      projectValue: "",
      customerValue: "",
      assignedValue: "",
      receivedValue: "",
      searchValue: "",
      projectOptions: [],
      pageCountOptions: [],
      customerOptions: [],
      assignedToOptions: [],
      salesEngineerOptions: [],
      redirectId: 0,
      activePage: 1,
      newList: [],
      searchList: [],
      filterObj: {
        page: 1,
        activePage: 1,
        projectFilter: "",
        customerFilter: "",
        salesFilter: "",
        assignedFilter: "",
        searchFilter: ""
      }
    };
    this.props.fetchLeadList(this.state.filterObj);
    this.state.filterObj.activePage = "";
    this.props.fetchProjectList();
    this.props.fetchCustomerList();
    this.props.fetchUserList();
    this.props.salesEngineerFilter();
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.state.filterObj.page = pageNumber;
    this.state.filterObj.activePage = pageNumber;
    this.props.fetchLeadList(this.state.filterObj);
  }
  componentWillReceiveProps() {
    if (this.props.lead_remove) this.props.fetchLeadList(this.state.filterObj);
    setTimeout(() => {
      if (this.props.project_list.length > 0) {
        this.props.project_list.map((project, key) => {
          var obj = {};

          obj["value"] = project.id;
          obj["label"] = project.name;
          projectOptions.push(obj);
          obj = {};
        });
      }
      console.log("fhdghdghdghdghdgh", this.props.customer_list);
      if (this.props.customer_list && !this.props.customer_list.results) {
        this.props.customer_list.map((customer, key) => {
          var obj = {};

          obj["value"] = customer.id;
          obj["label"] = customer.name;
          customerOptions.push(obj);
          obj = {};
        });
      }

      if (this.props.user_list.length > 0) {
        this.props.user_list.map((user, key) => {
          var obj = {};

          obj["value"] = user.id;
          obj["label"] = user.username;
          assignedToOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.sales_engg_user) {
        console.log(
          "llllllllllllllllllllllllllllllllll",
          this.props.sales_engg_user
        );
        this.props.sales_engg_user.map((sales_user, key) => {
          var obj = {};

          obj["value"] = sales_user.id;
          obj["label"] = sales_user.username;
          salesEngineerOptions.push(obj);
          obj = {};
        });
      }
      this.setState({ projectOptions: projectOptions });
      this.setState({ customerOptions: customerOptions });
      this.setState({ assignedToOptions: assignedToOptions });
      this.setState({ salesEngineerOptions: salesEngineerOptions });

      projectOptions = [];
      customerOptions = [];
      assignedToOptions = [];
      salesEngineerOptions = [];
    }, 1000);
  }
  leadReferenceValue() {
    this.setState(({ filterLeadReference }) => ({
      filterLeadReference: !filterLeadReference
    }));
  }
  projectValue() {
    this.setState(({ filterProject }) => ({
      filterProject: !filterProject
    }));
  }
  customerValue() {
    this.setState(({ filterCustomer }) => ({
      filterCustomer: !filterCustomer
    }));
  }
  sourceLeadValue() {
    this.setState(({ filterSourceLead }) => ({
      filterSourceLead: !filterSourceLead
    }));
  }
  dueDateValue() {
    this.setState(({ filterDueDate }) => ({
      filterDueDate: !filterDueDate
    }));
  }
  receivedByValue() {
    this.setState(({ filterReceivedBy }) => ({
      filterReceivedBy: !filterReceivedBy
    }));
  }
  assignedToValue() {
    this.setState(({ filterAssignedTo }) => ({
      filterAssignedTo: !filterAssignedTo
    }));
  }

  filterToggle() {
    this.setState({
      filterMenu: !this.state.filterMenu
    });
  }
  toggleOpenMSC = () => {
    this.setState(state => ({ isOpenMSC: !state.isOpenMSC }));
  };
  toggleOpenMSCClose = () => {
    if (this.state.isOpenMSC == true) {
      this.toggleOpenMSC();
    }
  };
  onSelectChangeMSC = valueMSC => {
    this.toggleOpenMSC();
    this.setState({ valueMSC });
  };
  toggleOpenClient = () => {
    this.setState(state => ({ isOpenClient: !state.isOpenClient }));
  };
  toggleOpenClientClose = () => {
    if (this.state.isOpenClient == true) {
      this.toggleOpenClient();
    }
  };
  onSelectChangeClient = valueClient => {
    this.toggleOpenClient();
    this.setState({ valueClient });
  };
  toggleOpenMC = () => {
    this.setState(state => ({ isOpenMC: !state.isOpenMC }));
  };
  toggleOpenMCClose() {
    if (this.state.isOpenMC == true) {
      this.toggleOpenMC();
    }
  }

  onSelectChangeMC = valueMC => {
    this.toggleOpenMC();
    this.setState({ valueMC });
  };
  toggleOpenEng = () => {
    this.setState(state => ({ isOpenEng: !state.isOpenEng }));
  };
  toggleOpenEngClose = () => {
    if (this.state.isOpenEng == true) {
      this.toggleOpenEng();
    }
  };
  onSelectChangeMC = valueEng => {
    this.toggleOpenEng();
    this.setState({ valueEng });
  };
  leadView(lead) {
    this.state.redirectId = lead.id;
    this.setState({ redirectLeadView: true });
  }
  handleRemoveLead(lead) {
    this.props.leadRemove(lead.id);
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
  handlePageJumping(e) {
    this.handlePageChange(e.value);
  }
  handleChangeProject(e) {
    this.setState({ projectValue: e.label });
    this.state.filterObj.projectFilter = e.value;
    console.log(this.state.filterObj);
    this.props.fetchLeadList(this.state.filterObj);
  }
  clearProject() {
    this.state.projectValue = "";
    this.state.filterObj.projectFilter = "";
    this.props.fetchLeadList(this.state.filterObj);
  }
  handleChangeCustomer(e) {
    this.setState({ customerValue: e.label });
    this.state.filterObj.customerFilter = e.value;
    this.props.fetchLeadList(this.state.filterObj);
  }
  clearCustomer() {
    this.state.customerValue = "";
    this.state.filterObj.customerFilter = "";
    this.props.fetchLeadList(this.state.filterObj);
  }
  handleChangeAssignedTo(e) {
    this.setState({ assignedValue: e.label });
    this.state.filterObj.assignedFilter = e.value;
    this.props.fetchLeadList(this.state.filterObj);
  }
  clearAssigned() {
    this.state.assignedValue = "";
    this.state.filterObj.assignedFilter = "";
    this.props.fetchLeadList(this.state.filterObj);
  }
  handleChangeReceivedBy(e) {
    this.setState({ receivedValue: e.label });
    this.state.filterObj.salesFilter = e.value;
    this.props.fetchLeadList(this.state.filterObj);
  }
  clearReceived() {
    this.state.receivedValue = "";
    this.state.filterObj.salesFilter = "";
    this.props.fetchLeadList(this.state.filterObj);
  }
 
  handleChangeSearch(e) {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      if (this.state.newList) {
        currentList = this.state.newList;  
        var result = currentList.filter(item => {
            let foundName =  item.assigned_to_details.username.toLowerCase().includes(e.target.value.toLowerCase());
            let foundUser =  item.assigned_to_details.first_name.toLowerCase().includes(e.target.value.toLowerCase());
            let foundCode =  item.customer_details.name.toLowerCase().includes(e.target.value.toLowerCase());
            let foundPhone = item.phone.includes(e.target.value);
            let foundReporting = item.project_details.name.toLowerCase().includes(e.target.value.toLowerCase());

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

    if (Array.isArray(this.state.searchList) && this.state.searchList.length)
      this.state.newList = this.state.searchList;
    else
      this.state.newList = this.props.lead_list.results;

    if(this.props.lead_list.results) {
      console.log(this.props.lead_list.results)
    }

    if (this.state.newList) {
      this.state.firstNot = (this.state.activePage - 1) * 13;
      this.state.secondNot =
        (this.state.activePage - 1) * 13 + this.state.newList.length;
    }

    if (this.props.lead_remove) this.props.fetchLeadList(this.state.filterObj);
    const options = [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" }
    ];
    const {
      isOpenMSC,
      isOpenClient,
      isOpenMC,
      isOpenEng,
      valueMSC,
      valueClient,
      valueEng,
      valueMC
    } = this.state;
    this.pageCount();
    if (this.state.redirectLeadView)
      return <Redirect to={"/lead-view/" + this.state.redirectId}></Redirect>;
    return (
      <Fragment>
        <div className="userModule mT25">
          <Col md={6} className="pL0">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="#">
                  <Home size={15} />
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Leads</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0">
            <Link to="/lead-create" className="blue-btn">
              {" "}
              Create New Lead
            </Link>
          </Col>
          <Card className="col-md-12">
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Leads</Col>
                <Col className="d-flex justify-content-md-end align-items-center">
                  <Form>
                    <FormGroup
                      className="searchInput"
                    >
                      <div className="position-relative has-icon-left">
                        <Input
                          onChange={this.handleChangeSearch.bind(this)}
                          type="text"
                          id="iconLeft"
                          name="iconLeft"
                          placeholder="Search"
                        />
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
                            {this.state.projectValue
                              ? `${this.state.projectValue}`
                              : "All"}
                            {this.state.projectValue ? (
                              <X
                                onClick={this.clearProject.bind(this)}
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
                            IndicatorSeparator: null
                          }}
                          controlShouldRenderValue={false}
                          hideSelectedOptions={false}
                          isClearable={true}
                          menuIsOpen
                          onChange={this.handleChangeProject.bind(this)}
                          options={this.state.projectOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={valueMSC}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Project</span>
                  </label>
                </Col>
                <Col>
                  <label className="form-group has-float-label">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        this.toggleOpenClientClose();
                      }}
                    >
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
                            {this.state.customerValue
                              ? `${this.state.customerValue}`
                              : "All"}
                            {this.state.customerValue ? (
                              <X
                                onClick={this.clearCustomer.bind(this)}
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
                            IndicatorSeparator: null
                          }}
                          controlShouldRenderValue={false}
                          hideSelectedOptions={false}
                          isClearable={false}
                          menuIsOpen
                          onChange={this.handleChangeCustomer.bind(this)}
                          options={this.state.customerOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={valueClient}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Customer</span>
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
                            {this.state.assignedValue
                              ? `${this.state.assignedValue}`
                              : "All"}
                            {this.state.assignedValue ? (
                              <X
                                onClick={this.clearAssigned.bind(this)}
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
                            IndicatorSeparator: null
                          }}
                          controlShouldRenderValue={false}
                          hideSelectedOptions={false}
                          isClearable={false}
                          menuIsOpen
                          onChange={this.handleChangeAssignedTo.bind(this)}
                          options={this.state.assignedToOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={valueMC}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Assigned to</span>
                  </label>
                </Col>
                <Col>
                  <label className="form-group has-float-label">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        this.toggleOpenEngClose();
                      }}
                    >
                      <Dropdown
                        isOpen={isOpenEng}
                        onClose={this.toggleOpenEng}
                        target={
                          <Button
                            iconAfter={<ChevronDown />}
                            onClick={this.toggleOpenEng}
                            isSelected={isOpenEng}
                            className="filterButton"
                          >
                            {this.state.receivedValue
                              ? `${this.state.receivedValue}`
                              : "All"}

                            {this.state.receivedValue ? (
                              <X
                                onClick={this.clearReceived.bind(this)}
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
                            IndicatorSeparator: null
                          }}
                          controlShouldRenderValue={false}
                          hideSelectedOptions={false}
                          isClearable={true}
                          menuIsOpen
                          onChange={this.handleChangeReceivedBy.bind(this)}
                          options={this.state.salesEngineerOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={valueEng}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Received by</span>
                  </label>
                </Col>
                <Col>
                  <label className="form-group has-float-label">
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav>
                        Filter <ChevronDown />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <Form className="row">
                          <Col
                            md={12}
                            className={
                              this.state.filterLeadReference
                                ? "align-items-center form-check-wrapper checked"
                                : "align-items-center form-check-wrapper"
                            }
                          >
                            <FormGroup check>
                              <Input
                                type="checkbox"
                                onChange={this.leadReferenceValue.bind(this)}
                                checked={this.state.filterLeadReference}
                                value={this.state.filterLeadReference}
                              />
                              <Label check>Lead Reference</Label>
                            </FormGroup>
                          </Col>
                          <Col
                            md={12}
                            className={
                              this.state.filterProject
                                ? "align-items-center form-check-wrapper checked"
                                : "align-items-center form-check-wrapper"
                            }
                          >
                            <FormGroup check>
                              <Input
                                type="checkbox"
                                onChange={this.projectValue.bind(this)}
                                checked={this.state.filterProject}
                                value={this.state.filterProject}
                              />
                              <Label check>Project</Label>
                            </FormGroup>
                          </Col>
                          <Col
                            md={12}
                            className={
                              this.state.filterCustomer
                                ? "align-items-center form-check-wrapper checked"
                                : "align-items-center form-check-wrapper"
                            }
                          >
                            <FormGroup check>
                              <Input
                                type="checkbox"
                                onChange={this.customerValue.bind(this)}
                                checked={this.state.filterCustomer}
                                value={this.state.filterCustomer}
                              />
                              <Label check>Customer</Label>
                            </FormGroup>
                          </Col>
                          <Col
                            md={12}
                            className={
                              this.state.filterSourceLead
                                ? "align-items-center form-check-wrapper checked"
                                : "align-items-center form-check-wrapper"
                            }
                          >
                            <FormGroup check>
                              <Input
                                type="checkbox"
                                onChange={this.sourceLeadValue.bind(this)}
                                checked={this.state.filterSourceLead}
                                value={this.state.filterSourceLead}
                              />
                              <Label check>Source of Lead</Label>
                            </FormGroup>
                          </Col>
                          <Col
                            md={12}
                            className={
                              this.state.filterDueDate
                                ? "align-items-center form-check-wrapper checked"
                                : "align-items-center form-check-wrapper"
                            }
                          >
                            <FormGroup check>
                              <Input
                                type="checkbox"
                                onChange={this.dueDateValue.bind(this)}
                                checked={this.state.filterDueDate}
                                value={this.state.filterDueDate}
                              />
                              <Label check>Due Date</Label>
                            </FormGroup>
                          </Col>
                          <Col
                            md={12}
                            className={
                              this.state.filterReceivedBy
                                ? "align-items-center form-check-wrapper checked"
                                : "align-items-center form-check-wrapper"
                            }
                          >
                            <FormGroup check>
                              <Input
                                type="checkbox"
                                onChange={this.receivedByValue.bind(this)}
                                checked={this.state.filterReceivedBy}
                                value={this.state.filterReceivedBy}
                              />
                              <Label check>Received By</Label>
                            </FormGroup>
                          </Col>
                          <Col
                            md={12}
                            className={
                              this.state.filterAssignedTo
                                ? "align-items-center form-check-wrapper checked"
                                : "align-items-center form-check-wrapper"
                            }
                          >
                            <FormGroup check>
                              <Input
                                type="checkbox"
                                onChange={this.assignedToValue.bind(this)}
                                checked={this.state.filterAssignedTo}
                                value={this.state.filterAssignedTo}
                              />
                              <Label check>Assigned To</Label>
                            </FormGroup>
                          </Col>
                        </Form>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </label>
                </Col>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    {this.state.filterLeadReference ? (
                      <th>Lead reference</th>
                    ) : null}
                    {this.state.filterProject ? <th>Project</th> : null}
                    {this.state.filterCustomer ? <th>Customer</th> : null}
                    {this.state.filterSourceLead ? (
                      <th>Source of lead</th>
                    ) : null}
                    {this.state.filterDueDate ? <th>Due Date</th> : null}
                    {this.state.filterReceivedBy ? <th>Received by</th> : null}
                    {this.state.filterAssignedTo ? <th>Assigned to</th> : null}
                    <th>Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.newList
                    ? this.state.newList.map((lead, i) => {
                        return (
                          <tr key={i}>
                            {this.state.filterLeadReference ? (
                              <th scope="row">
                                <span className="triangleGreen" />
                                <span
                                  className="userNameColor pointer"
                                  onClick={() => this.leadView(lead)}
                                >
                                  {lead.reference_no}
                                </span>
                              </th>
                            ) : null}
                            {this.state.filterProject ? (
                              <td>{lead.project_details.name}</td>
                            ) : null}
                            {this.state.filterCustomer ? (
                              <td>{lead.customer_details.name}</td>
                            ) : null}
                            {this.state.filterSourceLead ? (
                              <td>
                              {lead.lead_source == "P"
                                ? "Phone"
                                : lead.lead_source == "F"
                                ? "Fax"
                                : lead.lead_source == "W"
                                ? "Website"
                                : lead.lead_source == "V"
                                ? "Visit"
                                : lead.lead_source == "E"
                                ? "Email"
                                : "Others"}
                              </td>
                            ) : null}
                            {this.state.filterDueDate ? (
                              <td>
                                {moment(lead.due_date).format("DD/MM/YYYY")}
                              </td>
                            ) : null}
                            {this.state.filterReceivedBy ? (
                              <td>{lead.sales_engineer_details.username}</td>
                            ) : null}
                            {this.state.filterAssignedTo ? (
                              <td>{lead.assigned_to_details.username}</td>
                            ) : null}

                            <td className="action">
                              <span className="pointer">
                                <Link to={"/lead-edit/" + lead.id}>
                                  <Edit size={16} className="mr-4" />
                                </Link>
                              </span>
                              <span>
                                <Trash2
                                  onClick={() => this.handleRemoveLead(lead)}
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
                  {this.props.lead_list ? (
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={12}
                      totalItemsCount={this.props.lead_list.count}
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

const Menu = props => {
  const shadow = "hsla(218, 50%, 10%, 0.1)";
  return (
    <div
      css={{
        backgroundColor: "white",
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        marginTop: 8,
        position: "absolute",
        zIndex: 2
      }}
      {...props}
    />
  );
};
const Blanket = props => (
  <div
    css={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: "fixed",
      zIndex: 1
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
const Svg = p => (
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
const mapStateToProps = state => ({
  user_list: state.userReducer.usersList,
  lead_list: state.leadReducer.leadList,
  lead_remove: state.leadReducer.removeLead,
  project_list: state.projectReducer.projectList,
  customer_list: state.customerReducer.customersList,
  sales_engg_user: state.userReducer.salesEnggUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchLeadList,
      leadRemove,
      fetchProjectList,
      fetchCustomerList,
      fetchUserList,
      salesEngineerFilter
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Leads);
