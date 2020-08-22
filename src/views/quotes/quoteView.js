// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import { fetchQuote } from "../../redux/sagas/quotes/fetchQuote";
import { fetchQuoteNotesList } from "../../redux/sagas/notes/fetchQuoteNotes";
import { fetchRevisionList } from "../../redux/sagas/quotes/fetchRevisionList";
import { quoteNotesCreation } from "../../redux/sagas/notes/fetchQuoteNotesCreate";
import { extensionCreation } from "../../redux/sagas/quotes/fetchExtensionCreate";
import { fetchExtensionList } from "../../redux/sagas/quotes/fetchExtensionList";
import { salesEngineerFilter } from "../../redux/sagas/users/fetchSalesEngineer";
import { fetchQuoteHistory } from "../../redux/sagas/quotes/fetchQuoteHistory";
import { quoteUpdation } from "../../redux/sagas/quotes/fetchUpdateQuote";
import { connect } from "react-redux";
import moment from "moment";
import { bindActionCreators } from "redux";
import megaphoneIcon from "../../assets/img/megaphoneIcon.png";
import spinnerIcon from "../../assets/img/spinnerIcon.png";
import NumberFormat from "react-number-format";
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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import "rc-datepicker/lib/style.css";
import filter from "../../assets/img/filter.png";
import spinnerofdots from "../../assets/img/spinner-of-dots.png";
import megaphone from "../../assets/img/megaphone.png";
import historyCreate from "../../assets/img/historyCreate.png";
import historyStatus from "../../assets/img/historyStatus.png";
import historyEdit from "../../assets/img/historyEdit.png";
import { ThIcon } from "react-line-awesome";
let salesEngOptions = [];
let productStatusOptions = [
  { value: "LR", label: "LOI Received" },
  { value: "QS", label: "Quotation Submitted" },
  { value: "SA", label: "Submittal Approved" },
  { value: "OA", label: "Order Awaited" },
  { value: "OR", label: "Order Received" },
  { value: "LT", label: "Lost" },
];
class QuoteView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteId: null,
      edit: false,
      noOverlayModal: false,
      dropdownOpen: false,
      dropdownOpenViewAll: false,
      modalRevision: false,
      modalExtension: false,
      modalExtensionList: false,
      extDate: "",
      newNote: false,
      notesDesc: "",
      notesName: "",
      lopBoxes: false,
      competitorName: "",
      awardedPrice: "",
      salesEngOptions: [],
      filterObj: {
        saleEng: "",
        id: null,
      },
      daysLeft: 1,
    };
    let pathArray = window.location.pathname.split("/");
    let leadId = pathArray[2];
    this.props.salesEngineerFilter();
    this.props.fetchRevisionList();
    this.props.fetchExtensionList();
    this.props.fetchQuote(leadId);
    this.props.fetchQuoteHistory(leadId);
    this.editToggle = this.editToggle.bind(this);
  }
  componentDidMount() {
    let pathArray = window.location.pathname.split("/");
    let projectId = pathArray[2];
    this.state.quoteId = pathArray[2];
    this.state.filterObj.id = projectId;
    this.props.fetchQuoteNotesList(this.state.filterObj);
  }
  handleChangeExtDate(date) {
    let dateFormat = moment(date).format("YYYY-MM-DD");
    this.setState({ extDate: dateFormat });
    console.log("this.state.extDate", this.state.extDate);
  }
  handleSubmitExtension() {
    let bodyData = {
      quote: this.state.quoteId,
      requested_by: localStorage.getItem("user_id"),
      status: "P",
      extended_date: this.state.extDate,
      extended_days: "",
    };
    this.props.extensionCreation(bodyData);
    this.state.modalExtension = false;
    let pathArray = window.location.pathname.split("/");
    let projectId = pathArray[2];
    setTimeout(() => {
      this.props.fetchQuote(projectId);
    }, 1000);
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      if (this.props.sales_engg_user) {
        this.props.sales_engg_user.map((sales_user, key) => {
          var obj = {};

          obj["value"] = sales_user.id;
          obj["label"] = sales_user.username;
          salesEngOptions.push(obj);
          obj = {};
        });
      }
      this.setState({ salesEngOptions: salesEngOptions });
      salesEngOptions = [];
      if (this.props.quote_data) {
        // let validityEndingDate= new Date().setDate(new Date(this.props.quote_data.quoted_date).getDate() + 30)
        let validityEndingDate = moment(
          new Date(this.props.quote_data.quoted_date)
        ).add(30, "days");
        console.log(
          "hhhhhhhhhhhhh",
          moment(validityEndingDate).format("DD/MM/YYYY"),
          this.props.quote_data
        );
        const startDate = moment(new Date());
        const timeEnd = moment(validityEndingDate);
        console.log("vvvvvvvvvvvvv", timeEnd, startDate);
        const diff = timeEnd.diff(startDate);
        const diffDuration = moment.duration(diff);
        this.setState({ daysLeft: diffDuration.days() });
        console.log("Days:", diffDuration.days());
      }
    }, 1000);
  }
  componentDidUpdate() {
    let pathArray = window.location.pathname.split("/");
    let quoteId = pathArray[2];
    if (this.props.quote_update) this.props.fetchQuote(quoteId);
  }
  handleSaleEng(saleEng) {
    console.log("saleEng", saleEng);
    this.state.filterObj.saleEng = saleEng.value;
    this.props.fetchQuoteNotesList(this.state.filterObj);
  }
  handleHistory(saleEng) {
    console.log("saleEng", saleEng);
    this.props.fetchQuoteHistory(saleEng.value);
  }
  toggleNewNote() {
    this.setState((prevState) => ({
      newNote: !prevState.newNote,
    }));
  }
  editToggle() {
    this.setState({ edit: !this.state.edit });
  }
  toggle(variant) {
    this.setState({
      modal: !this.state.modal,
    });
    this.setState({ lopBoxes: false });
    if (variant.product_details) {
      this.setState({
        categoryName: variant.product_details.manufacturer_details.name,
      });
      this.setState({ productId: variant.product });
      this.setState({ pvObject: variant });
    }
  }
  toggle1(variant) {
    console.log("jjjjjjj", variant);
    this.setState({
      modal1: !this.state.modal1,
    });
    if (variant.product_details) {
      this.setState({
        categoryName: variant.product_details.manufacturer_details.name,
      });
      this.setState({ productId: variant.product });
      this.setState({ productValue: variant.amount });
      this.setState({ pvObject: variant });
    }
  }
  toggle2 = () => {
    this.setState({
      modal2: !this.state.modal2,
    });
  };
  toggleRevision = () => {
    this.setState({
      modalRevision: !this.state.modalRevision,
    });
  };
  toggleExtension = () => {
    this.setState({
      modalExtension: !this.state.modalExtension,
    });
  };
  toggleExtensionList = () => {
    this.setState({
      modalExtensionList: !this.state.modalExtensionList,
    });
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
  handleChangeNotesType(e) {
    this.setState({ notesName: e.value });
  }
  handleChangenoteDesc(e) {
    this.setState({ notesDesc: e.target.value });
    console.log("averagecost on change", e.target.value, this.state.notesDesc);
  }
  handleSubmitNotes(e) {
    e.preventDefault();
    var today = new Date();
    let bodyData = {
      title: this.state.notesName,
      description: this.state.notesDesc,
      added_by: 1,
      date:
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate(),
      quote: this.state.filterObj.id,
      added_by: localStorage.getItem("user_id"),
    };

    this.props.quoteNotesCreation(bodyData);
    this.state.newNote = false;

    setTimeout(() => {
      this.props.fetchQuoteNotesList(this.state.filterObj);
    }, 1000);
  }
  handleChangeProductStatus(e) {
    this.setState({ productStatus: e.value });
  }
  handleChangeRemark(e) {
    this.setState({ remark: e.target.value });
  }
  handleproductStatusUpdation() {
    console.log("sdsdfsdfsdf", this.props.quote_data);
    this.props.quote_data.quoted_product_details.map((product, i) => {
      if (product.product == this.state.productId) {
        product.status = this.state.productStatus;
        product.product_details.remarks = this.state.remark;
      }
    });
    let pathArray = window.location.pathname.split("/");
    let quoteId = pathArray[2];
    // var today = new Date();
    // let revision_date = moment(today).format("YYYY-MM-DD HH:mm:ss");
    // let bodyData = {
    //   reference_no: this.props.quote_data.reference_no,
    //   erp_reference: this.props.quote_data.erp_reference,
    //   company: this.props.quote_data.company,
    //   lead: this.props.quote_data.lead,
    //   stage: this.props.quote_data.stage,
    //   currency: this.props.quote_data.currency,
    //   terms: this.props.quote_data.terms,
    //   awarded_comp_name: this.state.competitorName,
    //   awarded_price: this.state.awardedPrice,
    //   revisions: [],
    // revision_details: [
    //   {
    //     revision_by: 1,
    //     revision_date: revision_date,
    //     file: null,
    //   },
    // ],
    // quoted_product_details: [
    //   {
    //     product: this.state.productId,
    //     status: this.state.productStatus,
    //     product_details: {
    //       remarks: this.state.remark,
    //     },
    //     variants_quoted_details: this.state.pvObject.variants_quoted_details,
    //   },
    // ],
    // };
    this.props.quoteUpdation(this.props.quote_data, quoteId);
    this.setState({ modal: !this.state.modal });
    this.setState({ categoryName: "" });
    this.setState({ productId: "" });
    this.setState({ productStatus: "" });
    this.setState({ remark: "" });
    this.setState({ lopBoxes: false });
  }
  handleChangeExpectedValue(e) {
    this.setState({ expectedValue: e.target.value });
  }
  handleChangeEOBDate(date) {
    let dateFormat = moment(date).format("YYYY-MM-DD");
    this.setState({
      EObdate: dateFormat,
    });
  }
  handleChangeReminderDate(date) {
    let dateFormat = moment(date).format("YYYY-MM-DD");
    this.setState({
      reminderDate: dateFormat,
    });
  }
  handleOrderBooking() {
    this.props.quote_data.quoted_product_details.map((product, i) => {
      if (product.product == this.state.productId) {
        product.expected_value = this.state.expectedValue;
        product.eob_date = this.state.EObdate;
        product.reminder_date = this.state.reminderDate;
      }
    });
    let pathArray = window.location.pathname.split("/");
    let quoteId = pathArray[2];
    // var today = new Date();
    // let revision_date = moment(today).format("YYYY-MM-DD HH:mm:ss");
    // let bodyData = {
    //   reference_no: this.props.quote_data.reference_no,
    //   erp_reference: this.props.quote_data.erp_reference,
    //   company: this.props.quote_data.company,
    //   lead: this.props.quote_data.lead,
    //   stage: this.props.quote_data.stage,
    //   currency: this.props.quote_data.currency,
    //   terms: this.props.quote_data.terms,
    //   revisions: [],
    //   revision_details: [
    //     {
    //       revision_by: 1,
    //       revision_date: revision_date,
    //       file: null,
    //     },
    //   ],
    //   quoted_product_details: [
    //     {
    //       product: this.state.productId,
    //       expected_value: this.state.expectedValue,
    //       eob_date: this.state.EObdate,
    //       reminder_date: this.state.reminderDate,
    //       variants_quoted_details: this.state.pvObject.variants_quoted_details,
    //     },
    //   ],
    // };

    this.props.quoteUpdation(this.props.quote_data, quoteId);
    this.setState({ modal1: !this.state.modal1 });
    this.setState({ productId: "" });
    this.setState({ expectedValue: "" });
    this.setState({ EObdate: "" });
    this.setState({ reminderDate: "" });
    this.setState({ categoryName: "" });
  }
  handleChangeLostOnPrice(e) {
    this.setState({ remark: "Lost on Price" });
    this.setState({ lopBoxes: true });
  }
  handleChangeOther(e) {
    this.setState({ remark: "" });
    this.setState({ lopBoxes: false });
  }
  handleChangeCompetitorName(e) {
    this.setState({ competitorName: e.target.value });
  }
  handleChangeAwardedPrice(e) {
    this.setState({ awardedPrice: e.target.value });
  }
  render() {
    const progressUpdate = (
      <span>
        <img src={spinnerIcon} style={{ marginRight: 5 }} />
        Progress update
      </span>
    );
    const alert = (
      <span>
        <img src={megaphoneIcon} style={{ marginRight: 5 }} />
        Alert
      </span>
    );
    const noteType = [
      { value: "Progress update", label: progressUpdate },
      { value: "Alert", label: alert },
    ];

    let totalWords ="";

     const firstWord = totalWords => {
      return totalWords.replace(/ .*/,'');
     }   

    let substrLength = firstWord(totalWords).toString().trim().length;

    let balanceWords = "";

    const bWords = balanceWords => {
      return balanceWords.substr(balanceWords.indexOf(" ") + 1);
    } 

    const tot=()=>{
      if(this.props.quote_data){
        let a = this.props.quote_data.quoted_product_details.map(p=>p.amount);
        var sum = a.reduce(function(a, b){
        return a + b;
            }, 0);
        return <span>{sum}</span>      
      }
    }
    

    return (
      <Fragment>
        {this.props.quote_data ? (
          <div className="userModule mT25">
            <Col md={6} className="pL0">
              <Breadcrumb>
                <BreadcrumbItem>
                  <a href="">
                    <Home size={15} />
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <a href="/quotes">Quotes</a>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  {this.props.quote_data.reference_no}
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col md={6} className="justify-content-end d-flex pR0"></Col>
            <Card className="col-md-12">
              <CardHeader>
                <Row className="row align-items-center">
                  <Col>
                    <span className="valueTitle">Value: </span>
                    {this.props.quote_data.currency}{" "}
                    {tot()}
                  </Col>
                  {this.state.daysLeft < 6 && this.state.daysLeft > 0 ? (
                    <Col className="progressStatus">
                      <Progress
                        color="danger"
                        value={this.state.daysLeft}
                        className="red"
                      />
                      <span className="dayLeft red">
                        {this.state.daysLeft} days left
                      </span>
                    </Col>
                  ) : null}

                  <Col className="d-flex justify-content-md-end">
                    <span className="valueTitle" style={{paddingRight: 10}}>Status: </span>Submittal
                    approved
                    <span style={{ marginLeft: 10 }}>
                      <Link to={"/quote-edit/" + this.props.quote_data.id}>
                        <img src={edit} />
                      </Link>
                    </span>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Company</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.quote_data.company_details.name}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Quote reference</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.quote_data.reference_no}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">ERP reference</Label>
                        <p className="liteFontColor">
                          {this.props.quote_data.erp_reference}{" "}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Project name</Label>
                        <p className="liteFontColor">
                          {" "}
                          {
                            this.props.quote_data.lead_details.project_details
                              .name
                          }
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Customer name</Label>
                        <p className="liteFontColor">
                          {
                            this.props.quote_data.lead_details.customer_details
                              .name
                          }
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Quote stage</Label>
                        <p className="liteFontColor">
                          {" "}
                          {this.props.quote_data.stage == "1"
                            ? "Stage One"
                            : this.props.quote_data.stage == "2"
                            ? "Stage Two"
                            : this.props.quote_data.stage == "3"
                            ? "Stage Three"
                            : this.props.quote_data.stage == "4"
                            ? "Stage Four"
                            : this.props.quote_data.stage == "5"
                            ? "Stage Five"
                            : "Stage Six"}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Sales engineer</Label>
                        <p className="liteFontColor">
                          {" "}
                          {
                            this.props.quote_data.lead_details
                              .sales_engineer_details.username
                          }
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Currency</Label>
                        <p className="liteFontColor">
                          {this.props.quote_data.currency}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Quoted date</Label>
                        <p className="liteFontColor">
                          {" "}
                          {moment(this.props.quote_data.quoted_date).format(
                            "DD/MM/YYYY"
                          )}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Revisions</Label>
                        <p
                          className="userNameColor"
                          style={{ cursor: "pointer" }}
                          onClick={this.toggleRevision.bind(this)}
                        >
                          {" "}
                          {this.props.quote_data.no_of_revisions}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Number of extentions</Label>
                        <p
                          className="userNameColor"
                          style={{ cursor: "pointer" }}
                          onClick={this.toggleExtensionList.bind(this)}
                        >
                          {" "}
                          {this.props.quote_data.extensions.no_of_extensions}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Extended up to</Label>
                        <p className="liteFontColor">
                          {" "}
                          {moment(
                            this.props.quote_data.lead_details.project_details
                              .exp_end_date
                          ).format("DD/MM/YYYY")}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col xl="3" lg="3" md="12">
                      <Button
                        className="blue-btn"
                        onClick={this.toggleExtension.bind(this)}
                      >
                        Request for extension
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
            <Card className="col-md-12 productDetails">
              <CardHeader>
                <Row className="align-items-center">
                  <Col>Product details</Col>
                  <Col className="d-flex justify-content-md-end">
                    <span>
                      <Link
                        to={
                          "/quote-view-all-products/" + this.props.quote_data.id
                        }
                        style={{ lineHeight: "38px" }}
                      >
                        View all
                      </Link>
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
                    </span>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="d-flex flex-wrap">
                  {this.props.quote_data.quoted_product_details.map(
                    (variant, i) => {
                      return (
                        <Col key={i} md={6} className="d-flex flex-wrap">
                          <Col className="productItem d-flex flex-wrap">
                            <Col md={9} style={{ marginBottom: 20, fontWeight: 600 }}>
                              {variant.product_details
                                ? variant.product_details.name
                                : "No Name"}
                            </Col>
                            <Col md={3} className="d-flex justify-content-end">
                              <span>
                                {" "}
                                <UncontrolledDropdown>
                                  <DropdownToggle className="dotMenuButton">
                                    <img
                                      src={menuDotsGrey}
                                      className="img-fluid"
                                    />
                                  </DropdownToggle>
                                  <DropdownMenu right>
                                    <DropdownItem
                                      onClick={() => this.toggle(variant)}
                                    >
                                      Update product status
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() => this.toggle1(variant)}
                                    >
                                      Expected order booking
                                    </DropdownItem>
                                    {/* <DropdownItem onClick={this.toggle2}>
                                      Mark as order received
                                    </DropdownItem> */}
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </span>
                            </Col>
                            <Col md={3}>
                              {variant.product_details ? (
                                variant.product_details.image ? (
                                  <img
                                    src={variant.product_details.image}
                                    className="img-fluid"
                                  />
                                ) : null
                              ) : null}
                            </Col>
                            <Col md={9} className="d-flex align-items-center">
                              <div>
                                <span>
                                  {variant.product_details
                                    ? variant.product_details
                                        .manufacturer_details.name
                                    : null}
                                </span>
                                <br />
                                <span className="productDescTitle">
                                  Value:{" "}
                                </span>
                                <span className="productDescvalue blue">
                                  {this.props.quote_data.currency}{" "}
                                  {variant.amount
                                    ? parseInt(variant.amount).toFixed(2)
                                    : 0}
                                </span>
                                <br />
                                <span className="productDescTitle">
                                  Status:{" "}
                                </span>
                                <span className="productDescvalue">
                                  {variant.status == "LR"
                                    ? "LOI Received"
                                    : variant.status == "QS"
                                    ? "Quotation Submitted"
                                    : variant.status == "SA"
                                    ? "Submittal Approved"
                                    : variant.status == "OR"
                                    ? "Order Received"
                                    : variant.status == "OA"
                                    ? "Order Awaited"
                                    : "Lost"}
                                </span>
                                <br />
                                <span className="productDescTitle">
                                  Order received:{" "}
                                </span>
                                <span className="productDescvalue"></span>
                                <br />
                                <span className="productDescTitle">
                                  Balance:{" "}
                                </span>
                                <span className="productDescvalue"></span>
                                <br />
                              </div>
                            </Col>
                            <Col md={12} className="productdescFooter">
                              <Row className="align-items-center">
                                <Col>
                                  <span className="productDescTitle">
                                    EOB:{" "}
                                  </span>
                                  <span className="productDescvalue">
                                    {variant.eob_date}
                                  </span>
                                </Col>
                                <Col className="d-flex justify-content-md-end">
                                  <span>
                                    <span className="productDescTitle">
                                      Expected Value:{" "}
                                    </span>
                                    <span className="productDescvalue blue">
                                      {" "}
                                      {variant.expected_value
                                        ? parseInt(
                                            variant.expected_value
                                          ).toFixed(2)
                                        : 0.0}
                                    </span>
                                  </span>
                                </Col>
                              </Row>
                            </Col>
                          </Col>
                        </Col>
                      );
                    }
                  )}

                  {/* <Col md={6} className="d-flex flex-wrap">
                    <Col className="productItem d-flex flex-wrap">
                      <Col md={9} style={{ marginBottom: 20 }}>
                        HVAC INSULATION
                      </Col>
                      <Col md={3} className="d-flex justify-content-end">
                        <span>
                          {" "}
                          <img src={menuDotsGrey} className="img-fluid" />
                        </span>
                      </Col>
                      <Col md={3}>
                        <img src={product} className="img-fluid" />
                      </Col>
                      <Col md={9} className="d-flex align-items-center">
                        <div>
                          <span>Pipe insulation - ARMAFLEX</span>
                          <br />
                          <span className="productDescTitle">Value: </span>
                          <span className="productDescvalue blue">
                            QAR 72,000.00
                          </span>
                          <br />
                          <span className="productDescTitle">Status: </span>
                          <span className="productDescvalue">
                            Quotation submitted
                          </span>
                          <br />
                          <span className="productDescTitle">
                            Order received:{" "}
                          </span>
                          <span className="productDescvalue"></span>
                          <br />
                          <span className="productDescTitle">Balance: </span>
                          <span className="productDescvalue"></span>
                          <br />
                        </div>
                      </Col>
                      <Col md={12} className="productdescFooter">
                        <Row className="align-items-center">
                          <Col>
                            <span className="productDescTitle">Status: </span>
                            <span className="productDescvalue">
                              Quotation submitted
                            </span>
                          </Col>
                          <Col className="d-flex justify-content-md-end">
                            <span>
                              <span className="productDescTitle">Value: </span>
                              <span className="productDescvalue blue">
                                QAR 72,000.00
                              </span>
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Col>
                  </Col> */}
                </div>
              </CardBody>
            </Card>
          </div>
        ) : null}
        <Row className="extras">
          <Col xl="4" lg="4" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md={6}>
                    <h2 className="smTitle">Note</h2>
                  </Col>
                  <Col md={6} className="d-flex justify-content-md-end">
                    {!this.state.newNote ? (
                      <span
                        style={{
                          color: "#5E77FF",
                          fontSize: 15,
                          cursor: "pointer",
                        }}
                        onClick={this.toggleNewNote.bind(this)}
                      >
                        <span>
                          <img src={edit} />{" "}
                        </span>{" "}
                        <span style={{ position: "relative", top: 3 }}>
                          New Note
                        </span>
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "#5E77FF",
                          fontSize: 15,
                          cursor: "pointer",
                        }}
                        onClick={this.toggleNewNote.bind(this)}
                      >
                        <span style={{ position: "relative", top: 3 }}>
                          Cancel
                        </span>
                      </span>
                    )}
                  </Col>
                </Row>
              </CardHeader>
              {!this.state.newNote ? (
                <CardBody>
                  <div className="d-flex flex-wrap mT25">
                    <Col md={10}>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        options={this.state.salesEngOptions}
                        onChange={this.handleSaleEng.bind(this)}
                        placeholder="Filter by Engineer"
                      />
                      {console.log("noteType", noteType)}
                    </Col>
                    <Col md={2}>
                      <Row>
                        <img src={filter} className="" />
                      </Row>
                    </Col>
                  </div>

                  {this.props.notes_list
                    ? this.props.notes_list.map((notes, i) => {
                        return (
                          <div className="d-flex flex-wrap mT25">
                            <Col md={7}>
                              <p style={{ fontSize: 14, color: "#646C9A" }}>
                                {notes.added_by_details.first_name}
                              </p>
                            </Col>
                            <Col md={5}>
                              <p style={{ fontSize: 12, color: "#A0A7C3" }}>
                                {notes.date}
                              </p>
                            </Col>
                            <Col md={12}>
                              <p style={{ fontSize: 13, color: "#A0A7C3" }}>
                                {notes.description}
                              </p>
                            </Col>
                            <Col md={12}>
                              <p
                                style={
                                  notes.title == "Progress update"
                                    ? { color: "#447EFF", fontSize: 13 }
                                    : { color: "#FF4577", fontSize: 13 }
                                }
                              >
                                {/* <p style={{ color: "#447EFF", fontSize: 13 }}> */}
                                <span style={{ marginRight: 10 }}>
                                  <img
                                    src={
                                      notes.title == "Progress update"
                                        ? spinnerofdots
                                        : megaphone
                                    }
                                  />
                                </span>
                                {notes.title}
                              </p>
                            </Col>
                          </div>
                        );
                      })
                    : null}
                </CardBody>
              ) : (
                <CardBody>
                  <Form>
                    <Row>
                      <Col md={10}>
                        <FormGroup>
                          <Label>Type of note</Label>

                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            // defaultValue={colourOptions[0]}
                            name="color"
                            options={noteType}
                            onChange={this.handleChangeNotesType.bind(this)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="exampleText">Description</Label>
                          <Input
                            type="textarea"
                            name="text"
                            id="exampleText"
                            placeholder="Add your notes here.."
                            onChange={this.handleChangenoteDesc.bind(this)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={12} className="justify-content-md-end d-flex">
                        <Button
                          type="submit"
                          className="blue-btn"
                          onClick={this.handleSubmitNotes.bind(this)}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              )}
            </Card>
          </Col>
          <Col xl="4" lg="4" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md={6}>
                    <h2 className="smTitle">Activities</h2>
                  </Col>
                  <Col
                    className="d-flex justify-content-md-end"
                    style={{
                      position: "relative",
                      top: "-5px",
                    }}
                    md={6}
                  >
                    <Select
                      className="basic-single w-100 h0"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      name="color"
                      // options={colourOptions}
                      placeholder="Filter by Engineer"
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="d-none">
                  <div className="d-flex flex-wrap mT25">
                    <Col md={6}>
                      <p style={{ fontSize: 14, color: "#646C9A" }}>
                        Ronald Rayan Barboza
                      </p>
                    </Col>
                    <Col md={6}>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#A0A7C3",
                          border: "1px solid #EAEDF1",
                          borderRadius: 2,
                          padding: 5,
                        }}
                      >
                        11:00 AM - 1:00 PM{" "}
                      </p>
                    </Col>
                    <Col md={12}>
                      <p style={{ fontSize: 13, color: "#A0A7C3" }}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam.
                      </p>
                    </Col>
                    <Col md={8}>
                      <p
                        style={{ color: "#ffc02e", fontSize: 13 }}
                        className="inProgress"
                      >
                        {/* <span style={{ marginRight: 10 }}>
                        <img src={spinnerofdots} />
                      </span> */}
                        Enquiry
                      </p>
                    </Col>
                    <Col md={4}>
                      <p style={{ fontSize: 12, color: "#A0A7C3" }}>
                        01/10/2018
                      </p>
                    </Col>
                  </div>
                  <div className="d-flex flex-wrap mT25">
                    <Col md={6}>
                      <p style={{ fontSize: 14, color: "#646C9A" }}>
                        Ronald Rayan Barboza
                      </p>
                    </Col>
                    <Col md={6}>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#A0A7C3",
                          border: "1px solid #EAEDF1",
                          borderRadius: 2,
                          padding: 5,
                        }}
                      >
                        11:00 AM - 1:00 PM{" "}
                      </p>
                    </Col>
                    <Col md={12}>
                      <p style={{ fontSize: 13, color: "#A0A7C3" }}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam.
                      </p>
                    </Col>
                    <Col md={8}>
                      <p
                        style={{ color: "#15cda8", fontSize: 13 }}
                        className="onGoing"
                      >
                        {/* <span style={{ marginRight: 10 }}>
                        <img src={spinnerofdots} />
                      </span> */}
                        Project introduction
                      </p>
                    </Col>
                    <Col md={4}>
                      <p style={{ fontSize: 12, color: "#A0A7C3" }}>
                        01/10/2018
                      </p>
                    </Col>
                  </div>
                  <div className="d-flex flex-wrap mT25">
                    <Col md={6}>
                      <p style={{ fontSize: 14, color: "#646C9A" }}>
                        Ronald Rayan Barboza
                      </p>
                    </Col>
                    <Col md={6}>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#A0A7C3",
                          border: "1px solid #EAEDF1",
                          borderRadius: 2,
                          padding: 5,
                        }}
                      >
                        11:00 AM - 1:00 PM{" "}
                      </p>
                    </Col>
                    <Col md={12}>
                      <p style={{ fontSize: 13, color: "#A0A7C3" }}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam.
                      </p>
                    </Col>
                    <Col md={8}>
                      <p
                        style={{ color: "#ff4577", fontSize: 13 }}
                        className="closed"
                      >
                        {/* <span style={{ marginRight: 10 }}>
                        <img src={spinnerofdots} />
                      </span> */}
                        Submittals
                      </p>
                    </Col>
                    <Col md={4}>
                      <p style={{ fontSize: 12, color: "#A0A7C3" }}>
                        01/10/2018
                      </p>
                    </Col>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4" lg="4" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md={6}>
                    <h2 className="smTitle">Quote history</h2>
                  </Col>
                  <Col
                    className="d-flex justify-content-md-end"
                    style={{
                      position: "relative",
                      top: "-5px",
                    }}
                    md={6}
                  >
                    <Select
                      className="basic-single w-100 h0"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      name="color"
                      placeholder="Filter by Engineer"
                      options={this.state.salesEngOptions}
                      onChange={this.handleHistory.bind(this)}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {this.props.quote_history
                  ? this.props.quote_history.results.map(
                      (projectHistory, i) => {
                        return (
                          <div className="d-flex flex-wrap mT25">
                            <Col md={3}>
                              <img src={historyEdit} />
                              <span className="historyLine"></span>
                            </Col>
                            <Col md={9}>
                              <p
                                style={{
                                  fontSize: 13,
                                  color: "#A0A7C3",
                                }}
                              >
                                {moment(projectHistory.time).format("hh:ss")}{" "}
                              </p>
                              <p
                                style={{
                                  fontSize: 13,
                                  color: "#646B9A",
                                }}
                              >
                                <span className="NameColor">
                                {firstWord(projectHistory.description)}
                              </span>
                              <span>
                                {" "}{bWords(projectHistory.description)}
                                </span>
                              </p>
                              <p
                                style={{
                                  fontSize: 13,
                                  color: "#A0A7C3",
                                }}
                              >
                                {moment(projectHistory.time).format(
                                  "DD/MM/YYYY"
                                )}{" "}
                              </p>
                            </Col>
                          </div>
                        );
                      }
                    )
                  : null}

                {/* <div className="d-flex flex-wrap mT25">
                  <Col md={3}>
                    <img src={historyCreate} />
                    <span className="historyLine"></span>
                  </Col>
                  <Col md={9}>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#A0A7C3",
                      }}
                    >
                      11:00 AM - 1:00 PM{" "}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#646B9A",
                      }}
                    >
                      Customer is created by
                     
                      <span className="NameColor">Arun B. krishnan</span>
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#A0A7C3",
                      }}
                    >
                      02/15/2018{" "}
                    </p>
                  </Col>
                </div>
                <div className="d-flex flex-wrap mT25">
                  <Col md={3}>
                    <img src={historyStatus} />
                    <span className="historyLine"></span>
                  </Col>
                  <Col md={9}>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#A0A7C3",
                      }}
                    >
                      11:00 AM - 1:00 PM{" "}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#646B9A",
                      }}
                    >
                      Customer status has been changed as
                      <span className="NameColor">Inactive</span> by{" "}
                      <span className="NameColor">Arun B. krishnan</span>
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#A0A7C3",
                      }}
                    >
                      02/15/2018{" "}
                    </p>
                  </Col>
                </div> */}
              </CardBody>
            </Card>
          </Col>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle.bind(this)}
            className="confirmation"
            backdrop={false}
          >
            <ModalHeader toggle={this.toggle.bind(this)}></ModalHeader>
            <ModalBody className="d-flex justify-content-center align=items-center">
              <div>
                <h2>{this.state.categoryName}</h2>
                <Form>
                  <FormGroup style={{ width: "75%" }}>
                    <Label for="basicinput">Product status</Label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      onChange={this.handleChangeProductStatus.bind(this)}
                      // defaultValue={colourOptions[0]}
                      name="color"
                      options={productStatusOptions}
                    />
                  </FormGroup>
                  {this.state.productStatus != "LT" ? (
                    <FormGroup>
                      <Label for="basicinput">Remarks</Label>
                      <Input
                        type="textarea"
                        id="basicinput"
                        name="basicinput"
                        placeholder="Remarks here"
                        onChange={this.handleChangeRemark.bind(this)}
                        className="textarea"
                      />
                    </FormGroup>
                  ) : (
                    <FormGroup tag="fieldset">
                      {" "}
                      <Label for="basicinput">Reason for lost</Label>
                      <FormGroup check>
                        {" "}
                        <Label check>
                          {" "}
                          <Input
                            onChange={this.handleChangeOther.bind(this)}
                            type="radio"
                            name="radio1"
                          />{" "}
                          Due to payment terms{" "}
                        </Label>{" "}
                      </FormGroup>
                      <FormGroup check>
                        {" "}
                        <Label check>
                          {" "}
                          <Input
                            onChange={this.handleChangeOther.bind(this)}
                            type="radio"
                            name="radio1"
                          />{" "}
                          Due to delivery terms{" "}
                        </Label>{" "}
                      </FormGroup>
                      <FormGroup check>
                        {" "}
                        <Label check>
                          {" "}
                          <Input
                            onChange={this.handleChangeOther.bind(this)}
                            type="radio"
                            name="radio1"
                          />{" "}
                          Due to stock availability{" "}
                        </Label>{" "}
                      </FormGroup>
                      <FormGroup check>
                        {" "}
                        <Label check>
                          {" "}
                          <Input
                            onChange={this.handleChangeOther.bind(this)}
                            type="radio"
                            name="radio1"
                          />{" "}
                          Not in the preffered vendor list{" "}
                        </Label>{" "}
                      </FormGroup>
                      <FormGroup check>
                        {" "}
                        <Label check>
                          {" "}
                          <Input
                            onChange={this.handleChangeLostOnPrice.bind(this)}
                            type="radio"
                            name="radio1"
                          />{" "}
                          Lost on price{" "}
                        </Label>{" "}
                      </FormGroup>
                      <FormGroup check>
                        {" "}
                        <Label check>
                          {" "}
                          <Input
                            onChange={this.handleChangeOther.bind(this)}
                            type="radio"
                            name="radio1"
                          />{" "}
                          Customer having poor relationships with our company{" "}
                        </Label>{" "}
                      </FormGroup>
                      <FormGroup check>
                        {" "}
                        <Label check>
                          {" "}
                          <Input
                            onChange={this.handleChangeOther.bind(this)}
                            type="radio"
                            name="radio1"
                          />{" "}
                          Quote was not followed up by the assigned engineer{" "}
                        </Label>{" "}
                      </FormGroup>
                      <FormGroup check>
                        {" "}
                        <Label check>
                          {" "}
                          <Input
                            onChange={this.handleChangeOther.bind(this)}
                            type="radio"
                            name="radio1"
                          />{" "}
                          We regret the quote{" "}
                        </Label>{" "}
                      </FormGroup>
                      <FormGroup check>
                        {" "}
                        <Label check>
                          {" "}
                          <Input
                            onChange={this.handleChangeOther.bind(this)}
                            type="radio"
                            name="radio1"
                          />{" "}
                          Others{" "}
                        </Label>{" "}
                      </FormGroup>
                    </FormGroup>
                  )}
                  {this.state.lopBoxes ? (
                    <FormGroup>
                      <Label for="basicinput">Awarded competitor name</Label>
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        //  placeholder="Remarks here"
                        onChange={this.handleChangeCompetitorName.bind(this)}
                        //  className="textarea"
                      />
                      <Label for="basicinput">The awarded price</Label>
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        //  placeholder="Remarks here"
                        onChange={this.handleChangeAwardedPrice.bind(this)}
                        //  className="textarea"
                      />
                    </FormGroup>
                  ) : null}
                  <Row>
                    <Col></Col>
                    <Col>
                      <Button
                        onClick={this.handleproductStatusUpdation.bind(this)}
                        className="blue-btn"
                      >
                        save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </ModalBody>
          </Modal>
          <Modal
            isOpen={this.state.modal1}
            toggle={this.toggle1.bind(this)}
            className="formModal"
            backdrop={false}
          >
            <ModalHeader toggle={this.toggle1.bind(this)}>
              {" "}
              <Row>
                <Col>{this.state.categoryName}</Col>
                <Col className="d-flex justify-content-md-end">
                  {this.state.productValue ? (
                    <span>
                      <span className="productDescTitle">Value: </span>
                      <span className="productDescvalue blue">
                        {this.state.productValue}
                      </span>
                    </span>
                  ) : null}
                </Col>
              </Row>
            </ModalHeader>
            <ModalBody className="d-flex justify-content-center align=items-center">
              <div>
                <Form>
                  <Row>
                    <Col xl="4" lg="4" md="12">
                      <FormGroup>
                        <Label for="basicinput">Expected value</Label>
                        <div className="position-relative has-icon-right">
                          <Input
                            type="text"
                            id="iconRight"
                            name="iconRight"
                            className="round"
                            placeholder="72,000.00"
                            onChange={this.handleChangeExpectedValue.bind(this)}
                          />
                          <div className="form-control-position">$</div>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col xl="4" lg="4" md="12">
                      <FormGroup>
                        <Label for="basicinput">EOB Date</Label>
                        <DatePickerInput
                          // onChange={this.onChange}
                          // value={this.state.selectedDate}
                          onChange={this.handleChangeEOBDate.bind(this)}
                          className="my-custom-datepicker-component"
                        />
                      </FormGroup>
                    </Col>
                    <Col xl="4" lg="4" md="12">
                      <FormGroup>
                        <Label for="basicinput">Reminder date</Label>
                        <DatePickerInput
                          // onChange={this.onChange}
                          // value={this.state.selectedDate}
                          onChange={this.handleChangeReminderDate.bind(this)}
                          className="my-custom-datepicker-component"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col></Col>
                    <Col className="d-flex justify-content-end">
                      <Button
                        onClick={this.handleOrderBooking.bind(this)}
                        className="blue-btn"
                      >
                        save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </ModalBody>
          </Modal>
          <Modal
            isOpen={this.state.modal2}
            toggle={this.toggle2}
            className="confirmation"
            backdrop={false}
          >
            <ModalHeader toggle={this.toggle2}></ModalHeader>
            <ModalBody className="d-flex justify-content-center align=items-center">
              <div>
                <img src={confirm} className="d-block mx-auto" />
                <h1 className="text-center">All Set</h1>
                <p className="text-center">
                  Expected order booking details has been updated. You will be
                  notified on defined date
                </p>
                <div className="d-flex flex-wrap justify-content-center">
                  <Button className="blue-btn">
                    {/* <img src={downloadWhite} /> */}
                    Download
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>
          <Modal
            isOpen={this.state.modalRevision}
            toggle={this.toggleRevision}
            className="RevisionModal"
            backdrop={false}
            style={{ maxWidth: 635 }}
          >
            <ModalHeader toggle={this.toggleRevision}>
              {this.props.quote_data
                ? this.props.quote_data.reference_no
                : "No Data"}
            </ModalHeader>
            {this.props.quote_data
              ? this.props.quote_data.revision_details.map((revision, key) => (
                  <ModalBody>
                    <Row>
                      <Col md={1} className="d-flex justify-content-center">
                        <Row>
                          <Col md={12}>
                            <span className="revCount">{key + 1}</span>
                          </Col>
                          <Col md={12}></Col>
                        </Row>
                      </Col>
                      <Col md={7}>
                        <p
                          style={{
                            color: "#3B4367",
                            fontSize: 15,
                            fontWeight: 600,
                            marginBottom: 0,
                          }}
                        >
                          REV - {" " + key}
                        </p>
                        <p
                          style={{
                            color: "#646B9A",
                            fontSize: 13,
                            marginBottom: 0,
                          }}
                        >
                          Quote is created by{" "}
                          <span style={{ color: "#5E77FF" }}>
                            {revision.revision_by_details.first_name
                              ? revision.revision_by_details.first_name
                              : "No Data"}
                          </span>
                        </p>
                        <p
                          style={{
                            color: "#A0A7C3",
                            fontSize: 13,
                            marginBottom: 0,
                          }}
                        >
                          <span>
                            {revision.revision_date
                              ? moment(revision.revision_date).format(
                                  "DD/MM/YYYY"
                                )
                              : "No Data"}
                          </span>
                          {"  "}
                          <span
                            style={{
                              fontSize: 12,
                            }}
                          >
                            {revision.revision_date
                              ? moment(revision.revision_date).format("HH:mm")
                              : "No Data"}
                          </span>
                        </p>
                      </Col>
                      <Col md={4} className="d-flex justify-content-end">
                        <a
                          className="blue-btn"
                          href={revision.file}
                          target="_blank"
                        >
                          Download
                        </a>
                      </Col>
                    </Row>
                  </ModalBody>
                ))
              : null}
          </Modal>
          <Modal
            isOpen={this.state.modalExtension}
            toggle={this.toggleExtension}
            style={{ maxWidth: 430 }}
            backdrop={false}
          >
            <ModalHeader toggle={this.toggleExtension}>
              Request for extension
            </ModalHeader>
            <ModalBody className="d-flex justify-content-center align=items-center">
              <div>
                <Form>
                  <FormGroup style={{ width: "75%" }}>
                    <Label for="basicinput">Select number of days</Label>

                    <DatePickerInput
                      // displayFormat={moment(this.state.extDate).format(
                      //   "DD/MM/YYYY"
                      // )}
                      onChange={this.handleChangeExtDate.bind(this)}
                      value={this.state.ExtDate}
                      className="my-custom-datepicker-component"
                    />
                  </FormGroup>
                  <FormGroup>
                    <p
                      style={{
                        marginBottom: 0,
                        color: "#7177A4",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      NOTE:{" "}
                    </p>
                    <p
                      style={{
                        marginBottom: 0,
                        color: "#7177A4",
                        fontSize: 13,
                      }}
                    >
                      You can extend up to 30 days from the initial last date.
                    </p>
                  </FormGroup>
                  <Row>
                    <Col
                      style={{
                        textAlign: "right",
                        paddingTop: 6,
                      }}
                    >
                      <a
                        onClick={this.toggleExtension}
                        style={{ fontSize: 13 }}
                      >
                        Close
                      </a>
                    </Col>
                    <Col>
                      <Button
                        className="blue-btn"
                        onClick={this.handleSubmitExtension.bind(this)}
                      >
                        Request
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </ModalBody>
          </Modal>
          <Modal
            isOpen={this.state.modalExtensionList}
            toggle={this.toggleExtensionList}
            className="RevisionModal"
            backdrop={false}
            style={{ maxWidth: 635 }}
          >
            <ModalHeader toggle={this.toggleExtensionList}>
              {this.props.quote_data
                ? this.props.quote_data.reference_no
                : "No Data"}
            </ModalHeader>
            {this.props.quote_data
              ? this.props.quote_data.extensions.extensions.map(
                  (revision, key) => (
                    <ModalBody>
                      <Row>
                        <Col md={1} className="d-flex justify-content-center">
                          <Row>
                            <Col md={12}>
                              <span className="revCount">{key + 1}</span>
                            </Col>
                            <Col md={12}></Col>
                          </Row>
                        </Col>
                        <Col md={7}>
                          {/* <p
                          style={{
                            color: "#3B4367",
                            fontSize: 15,
                            fontWeight: 600,
                            marginBottom: 0,
                          }}
                        >
                          REV - {" " + key}
                        </p> */}
                          <p
                            style={{
                              color: "#646B9A",
                              fontSize: 13,
                              marginBottom: 0,
                            }}
                          >
                            {revision.extended_days
                              ? revision.extended_days +
                                " " +
                                "days extension was requested by"
                              : "extension was requested by"}
                            <span style={{ color: "#5E77FF" }}>
                              {revision.requested_by__first_name
                                ? revision.requested_by__first_name
                                : "No Data"}
                            </span>
                          </p>
                          <p
                            style={{
                              color: "#A0A7C3",
                              fontSize: 13,
                              marginBottom: 0,
                            }}
                          >
                            <span>
                              {revision.extended_date
                                ? moment(revision.extended_date).format(
                                    "DD/MM/YYYY"
                                  )
                                : "No Data"}
                            </span>
                            {"  "}
                            <span
                              style={{
                                fontSize: 12,
                              }}
                            >
                              {revision.extended_date
                                ? moment(revision.extended_date).format("HH:mm")
                                : "No Data"}
                            </span>
                          </p>
                        </Col>
                        <Col md={4} className="d-flex justify-content-end">
                          <a className="grey-btn" href="#" target="_blank">
                            {revision.status == "P" ? "Pending" : "Approved"}
                          </a>
                        </Col>
                      </Row>
                    </ModalBody>
                  )
                )
              : null}
          </Modal>
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  sales_engg_user: state.userReducer.salesEnggUser,
  quote_data: state.quoteReducer.quoteData,
  notes_list: state.notesReducer.quoteNotesList,
  revision_list: state.quoteReducer.revisionList,
  notes_create: state.notesReducer.createQuoteNotes,
  extension_create: state.quoteReducer.createExtension,
  extension_list: state.quoteReducer.extensionList,
  quote_history: state.quoteReducer.quoteHistory,
  quote_update: state.quoteReducer.updateQuote,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchQuote,
      fetchQuoteNotesList,
      quoteNotesCreation,
      salesEngineerFilter,
      fetchRevisionList,
      extensionCreation,
      fetchExtensionList,
      fetchQuoteHistory,
      quoteUpdation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(QuoteView);
