// import external modules
import React, { Component, Fragment } from "react";
import { fetchQuoteList } from "../../redux/sagas/quotes/fetchQuoteList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { quoteRemove } from "../../redux/sagas/quotes/fetchRemoveQuote";
import { fetchProjectList } from "../../redux/sagas/projects/fetchProjectList";
import { fetchCustomerList } from "../../redux/sagas/customers/fetchCustomers";
import { companyDetails } from "../../redux/sagas/companyDetails/companyDetails";
import { salesEngineerFilter } from "../../redux/sagas/users/fetchSalesEngineer";
import Pagination from "react-js-pagination";
import NumberFormat from "react-number-format";
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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import {
  Home,
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
} from "react-feather";
import { Link, Redirect } from "react-router-dom";
import Select from "react-select";
import { defaultTheme } from "react-select";
const { colors } = defaultTheme;
const selectStyles = {
  control: (provided) => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" }),
};
let projectOptions = [];
let customerOptions = [];
let companyOptions = [];
let salesEngineerOptions = [];
class Quotes extends Component {
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
      filterQuoteReference: true,
      filterProject: true,
      filterCustomer: true,
      filterCompany: true,
      filterStage: false,
      filterValue: false,
      filterStatus: true,
      redirectQuoteView: false,
      redirectId: 0,
      redirectId: 0,
      activePage: 1,
      newList: [],
      searchList: [],
      projectValue: "",
      customerValue: "",
      companyValue: "",
      engineerValue: "",
      pageCountOptions: [],
      projectOptions: [],
      customerOptions: [],
      companyOptions: [],
      salesEngineerOptions: [],
      filterObj: {
        page: 1,
        activePage: 1,
        projectFilter: "",
        customerFilter: "",
        companyFilter: "",
        engineerFilter: "",
        sortType: "",
        sortValue: "",
        searchFilter: ""
      },
    };
    this.props.fetchQuoteList(this.state.filterObj);
    this.props.fetchProjectList();
    this.props.fetchCustomerList();
    this.props.companyDetails();
    this.props.salesEngineerFilter();
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentWillReceiveProps() {
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
      if (this.props.customer_list && !this.props.customer_list.results) {
        this.props.customer_list.map((customer, key) => {
          var obj = {};

          obj["value"] = customer.id;
          obj["label"] = customer.name;
          customerOptions.push(obj);
          obj = {};
        });
      }
      this.props.company_details.map((company, key) => {
        var obj = {};
        obj["value"] = company.id;
        obj["label"] = company.name;
        companyOptions.push(obj);

        obj = {};
      });
      if (this.props.sales_engg_user) {
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
      this.setState({ companyOptions: companyOptions });
      this.setState({ salesEngineerOptions: salesEngineerOptions });
      projectOptions = [];
      customerOptions = [];
      companyOptions = [];
      salesEngineerOptions = [];
      if (localStorage.getItem("removeStatusQuote") == true) {
        console.log("hbkjhvhjkvhgcghcjkhvjlkblkjvjlk");
      }
    }, 1000);
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.state.filterObj.page = pageNumber;
    this.state.filterObj.activePage = pageNumber;

    this.props.fetchQuoteList();
  }
  quoteReferenceValue() {
    this.setState(({ filterQuoteReference }) => ({
      filterQuoteReference: !filterQuoteReference,
    }));
  }
  projectValue() {
    this.setState(({ filterProject }) => ({
      filterProject: !filterProject,
    }));
  }
  customerValue() {
    this.setState(({ filterCustomer }) => ({
      filterCustomer: !filterCustomer,
    }));
  }
  companyValue() {
    this.setState(({ filterCompany }) => ({
      filterCompany: !filterCompany,
    }));
  }
  stageValue() {
    this.setState(({ filterStage }) => ({
      filterStage: !filterStage,
    }));
  }
  valueValue() {
    this.setState(({ filterValue }) => ({
      filterValue: !filterValue,
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
  toggleOpenEng = () => {
    this.setState((state) => ({ isOpenEng: !state.isOpenEng }));
  };
  toggleOpenEngClose = () => {
    if (this.state.isOpenEng == true) {
      this.toggleOpenEng();
    }
  };
  onSelectChangeMC = (valueEng) => {
    this.toggleOpenEng();
    this.setState({ valueEng });
  };
  quoteView(quote) {
    this.state.redirectId = quote.id;
    this.setState({ redirectQuoteView: true });
  }
  handleRemoveQuote(quote) {
    this.props.quoteRemove(quote.id);
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
    this.props.fetchQuoteList(this.state.filterObj);
  }
  clearProject() {
    this.state.projectValue = "";
    this.state.filterObj.projectFilter = "";
    this.props.fetchQuoteList(this.state.filterObj);
  }
  handleChangeCustomer(e) {
    this.setState({ customerValue: e.label });
    this.state.filterObj.customerFilter = e.value;
    this.props.fetchQuoteList(this.state.filterObj);
  }
  clearCustomer() {
    this.state.customerValue = "";
    this.state.filterObj.customerFilter = "";
    this.props.fetchQuoteList(this.state.filterObj);
  }
  handleChangeCompany(e) {
    this.setState({ companyValue: e.label });
    this.state.filterObj.companyFilter = e.value;
    this.props.fetchQuoteList(this.state.filterObj);
  }
  clearCompany() {
    this.state.companyValue = "";
    this.state.filterObj.companyFilter = "";
    this.props.fetchQuoteList(this.state.filterObj);
  }
  handleChangeEngineer(e) {
    this.setState({ engineerValue: e.label });
    this.state.filterObj.engineerFilter = e.value;
    this.props.fetchQuoteList(this.state.filterObj);
  }
  clearEngineer() {
    this.state.engineerValue = "";
    this.state.filterObj.engineerFilter = "";
    this.props.fetchQuoteList(this.state.filterObj);
  }
  handleChangeValueSort() {
    if (
      this.state.filterObj.sortType == "" ||
      this.state.filterObj.sortType == "des"
    )
      this.state.filterObj.sortType = "asc";
    else this.state.filterObj.sortType = "des";
    this.state.filterObj.sortValue = "value";
    this.props.fetchQuoteList(this.state.filterObj);
  }
  handleChangeStatusSort() {
    if (
      this.state.filterObj.sortType == "" ||
      this.state.filterObj.sortType == "des"
    )
      this.state.filterObj.sortType = "asc";
    else this.state.filterObj.sortType = "des";
    this.state.filterObj.sortValue = "is_active";
    this.props.fetchQuoteList(this.state.filterObj);
  }
  handleChangeStageSort() {
    if (
      this.state.filterObj.sortType == "" ||
      this.state.filterObj.sortType == "des"
    )
      this.state.filterObj.sortType = "asc";
    else this.state.filterObj.sortType = "des";
    this.state.filterObj.sortValue = "stage";
    this.props.fetchQuoteList(this.state.filterObj);
  }
  
  handleChangeSearch(e) {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      if (this.state.newList) {
        currentList = this.state.newList;  
        var result = currentList.filter(item => {
            let foundName =  item.reference_no.toLowerCase().includes(e.target.value.toLowerCase());
            let foundUser =  item.project_details.name.toLowerCase().includes(e.target.value.toLowerCase());
            let foundCode =  item.lead_details.customer_details.name.toLowerCase().includes(e.target.value.toLowerCase());
            let foundReporting = item.company_details.code.toLowerCase().includes(e.target.value.toLowerCase());

            return  foundName || foundUser || foundCode || foundReporting ;
        });
        newList = result;
      }
    }
    this.setState({ searchList: newList });
    this.forceUpdate();
    console.log(this.state.searchList)
  }
  render() {
    if (this.props.quote_remove)
      this.props.fetchQuoteList(this.state.filterObj);
    const options = [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
    ];

    if (Array.isArray(this.state.searchList) && this.state.searchList.length)
      this.state.newList = this.state.searchList;
    else
      this.state.newList = this.props.quote_list.results;

    if (this.state.newList) {
      this.state.firstNot = (this.state.activePage - 1) * 13;
      this.state.secondNot =
        (this.state.activePage - 1) * 13 + this.state.newList.length;
    }
    this.pageCount();
    const {
      isOpenMSC,
      isOpenClient,
      isOpenMC,
      isOpenEng,
      valueMSC,
      valueClient,
      valueEng,
      valueMC,
    } = this.state;


    if (this.state.redirectQuoteView)
      return <Redirect to={"/quote-view/" + this.state.redirectId}></Redirect>;
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
              <BreadcrumbItem active>Quotes</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0">
            <Link to="/quote-create" className="blue-btn">
              {" "}
              Create Quote
            </Link>
          </Col>
          <Card className="col-md-12">
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Quotes</Col>
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
                              ? ` ${this.state.projectValue}`
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
                          backspaceRemovesValue={false}
                          components={{
                            DropdownIndicator,
                            IndicatorSeparator: null,
                          }}
                          controlShouldRenderValue={false}
                          hideSelectedOptions={false}
                          isClearable={false}
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
                              ? ` ${this.state.customerValue}`
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
                            IndicatorSeparator: null,
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
                          backspaceRemovesValue={false}
                          components={{
                            DropdownIndicator,
                            IndicatorSeparator: null,
                          }}
                          controlShouldRenderValue={false}
                          hideSelectedOptions={false}
                          isClearable={false}
                          menuIsOpen
                          onChange={this.handleChangeCompany.bind(this)}
                          options={this.state.companyOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={valueMC}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Company</span>
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
                            {this.state.engineerValue
                              ? ` ${this.state.engineerValue}`
                              : "All"}
                            {this.state.engineerValue ? (
                              <X
                                onClick={this.clearEngineer.bind(this)}
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
                          onChange={this.handleChangeEngineer.bind(this)}
                          options={this.state.salesEngineerOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={valueEng}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Engineer</span>
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
                              this.state.filterQuoteReference
                                ? "align-items-center form-check-wrapper checked"
                                : "align-items-center form-check-wrapper"
                            }
                          >
                            <FormGroup check>
                              <Input
                                type="checkbox"
                                onChange={this.quoteReferenceValue.bind(this)}
                                checked={this.state.filterQuoteReference}
                                value={this.state.filterQuoteReference}
                              />
                              <Label check>Quote reference</Label>
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
                              this.state.filterCompany
                                ? "align-items-center form-check-wrapper checked"
                                : "align-items-center form-check-wrapper"
                            }
                          >
                            <FormGroup check>
                              <Input
                                type="checkbox"
                                onChange={this.companyValue.bind(this)}
                                checked={this.state.filterCompany}
                                value={this.state.filterCompany}
                              />
                              <Label check>Company</Label>
                            </FormGroup>
                          </Col>
                          <Col
                            md={12}
                            className={
                              this.state.filterStage
                                ? "align-items-center form-check-wrapper checked"
                                : "align-items-center form-check-wrapper"
                            }
                          >
                            <FormGroup check>
                              <Input
                                type="checkbox"
                                onChange={this.stageValue.bind(this)}
                                checked={this.state.filterStage}
                                value={this.state.filterStage}
                              />
                              <Label check>Stage</Label>
                            </FormGroup>
                          </Col>
                          <Col
                            md={12}
                            className={
                              this.state.filterValue
                                ? "align-items-center form-check-wrapper checked"
                                : "align-items-center form-check-wrapper"
                            }
                          >
                            <FormGroup check>
                              <Input
                                type="checkbox"
                                onChange={this.valueValue.bind(this)}
                                checked={this.state.filterValue}
                                value={this.state.filterValue}
                              />
                              <Label check>Value </Label>
                            </FormGroup>
                          </Col>
                          <Col
                            md={12}
                            className={
                              this.state.filterStatus
                                ? "align-items-center form-check-wrapper checked"
                                : "align-items-center form-check-wrapper"
                            }
                          >
                            <FormGroup check>
                              <Input
                                type="checkbox"
                                onChange={this.statusValue.bind(this)}
                                checked={this.state.filterStatus}
                                value={this.state.filterStatus}
                              />
                              <Label check>Status</Label>
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
                    {this.state.filterQuoteReference ? (
                      <th>Quote reference</th>
                    ) : null}
                    {this.state.filterProject ? <th> Project </th> : null}
                    {this.state.filterCustomer ? <th> Customer </th> : null}
                    {this.state.filterCompany ? <th> Company </th> : null}
                    {this.state.filterStage ? (
                      <th>
                        Stage
                        <img
                          onClick={this.handleChangeStageSort.bind(this)}
                          src={sort}
                          style={{ marginLeft: 10 }}
                        />
                      </th>
                    ) : null}
                    {this.state.filterValue ? (
                      <th>
                        Value{" "}
                        <img
                          onClick={this.handleChangeValueSort.bind(this)}
                          src={sort}
                          style={{ marginLeft: 10 }}
                        />
                      </th>
                    ) : null}
                    {this.state.filterStatus ? (
                      <th>
                        <span>
                          {" "}
                          Status
                          <img
                            onClick={this.handleChangeStatusSort.bind(this)}
                            src={sort}
                            style={{ marginLeft: 10 }}
                          />
                        </span>
                      </th>
                    ) : null}
                    <th>Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.newList
                    ? this.state.newList.map((quote, i) => {
                        return (
                          <tr key={i}>
                            {this.state.filterQuoteReference ? (
                              <th scope="row">
                                <span className="triangleGreen" />
                                <span
                                  className="userNameColor pointer"
                                  onClick={() => this.quoteView(quote)}
                                >
                                  {quote.reference_no}
                                </span>
                              </th>
                            ) : null}
                            {this.state.filterProject ? (
                              <td>
                                {quote.project_details
                                  ? quote.project_details.name
                                  : ""}
                              </td>
                            ) : null}
                            {this.state.filterCustomer ? (
                              <td>
                                {quote.lead_details
                                  ? quote.lead_details.customer_details.name
                                  : ""}
                              </td>
                            ) : null}
                            {this.state.filterCompany ? (
                              <td>{quote.company_details.code}</td>
                            ) : null}
                            {this.state.filterStage ? (
                              <td>
                                {quote.stage == "1"
                                  ? "Stage One"
                                  : quote.stage == "2"
                                  ? "Stage Two"
                                  : quote.stage == "3"
                                  ? "Stage Three"
                                  : quote.stage == "4"
                                  ? "Stage Four"
                                  : quote.stage == "5"
                                  ? "Stage Five"
                                  : "Stage Six"}
                              </td>
                            ) : null}
                            {this.state.filterValue ? (
                              <td>
                                <NumberFormat
                                  value={parseInt(
                                    quote.project_details
                                      ? quote.project_details.value
                                      : 0
                                  ).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />
                              </td>
                            ) : null}
                            {this.state.filterStatus ? (
                              <td>
                                {" "}
                                {quote.lead_details.project_details.status ==
                                "TR"
                                  ? "Tender"
                                  : quote.lead_details.project_details.status ==
                                    "JC"
                                  ? "JJIH-Main Contractor"
                                  : quote.lead_details.project_details.status ==
                                    "J1"
                                  ? "JIH-Stage 1"
                                  : quote.lead_details.project_details.status ==
                                    "J2"
                                  ? "JIH-Stage 2"
                                  : quote.lead_details.project_details.status ==
                                    "J3"
                                  ? "JIH-Stage 3"
                                  : quote.lead_details.project_details.status ==
                                    "J4"
                                  ? "JIH-Stage 4"
                                  : quote.lead_details.project_details.status ==
                                    "CL"
                                  ? "Closed"
                                  : "Cancelled"}
                              </td>
                            ) : null}
                            <td className="action">
                              <span className="pointer">
                                <Link to={"/quote-edit/" + quote.id}>
                                  <Edit size={16} className="mr-4" />
                                </Link>
                              </span>
                              <span>
                                <Trash2
                                  onClick={() => this.handleRemoveQuote(quote)}
                                  size={16}
                                  className="mr-4 pointer"
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
                  {this.props.quote_list ? (
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={12}
                      totalItemsCount={this.props.quote_list.count}
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
  quote_list: state.quoteReducer.quoteList,
  quote_remove: state.quoteReducer.removeQuote,
  project_list: state.projectReducer.projectList,
  customer_list: state.customerReducer.customersList,
  company_details: state.companyDetailsReducer.companyDetails,
  sales_engg_user: state.userReducer.salesEnggUser,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchQuoteList,
      quoteRemove,
      fetchProjectList,
      fetchCustomerList,
      companyDetails,
      salesEngineerFilter,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);
