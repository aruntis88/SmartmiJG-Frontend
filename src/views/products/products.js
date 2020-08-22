// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import { connect } from "react-redux";
import { companyDetails } from "../../redux/sagas/companyDetails/companyDetails";
import { bindActionCreators } from "redux";
import { fetchProductList } from "../../redux/sagas/products/fetchProductList";
import { salesEngineerFilter } from "../../redux/sagas/users/fetchSalesEngineer";
import { fetchManufacturersList } from "../../redux/sagas/manufacturers/fetchManufacturers";
import { productCategoryList } from "../../redux/sagas/products/fetchProductCategory";
import { productCreation } from "../../redux/sagas/products/fetchProductCreate";
import { productRemove } from "../../redux/sagas/products/fetchRemoveProduct";
import { productUpdation } from "../../redux/sagas/products/fetchUpdateProduct";
import Pagination from "react-js-pagination";
import OutsideClickHandler from "react-outside-click-handler";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
//import Button from "react-validation/build/button";
import validator from "validator";

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
  // Input,
  // Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Toggle from "react-toggle";
import { Link, Redirect } from "react-router-dom";
import {
  Home,
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
} from "react-feather";
import Select from "react-select";
import { defaultTheme } from "react-select";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCheckSquare, faCoffee, faCloudUploadAlt);
const { colors } = defaultTheme;
const selectStyles = {
  control: (provided) => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" }),
};
let companyOptions = [];
let salesEngineerOptions = [];
let productCategoryOptions = [];
let manufacturerOptions = [];
let salesEnggArray = [];
let salesEnggArrayfull = [];
let statusOptions = [
  { value: "True", label: "Active" },
  { value: "False", label: "Inactive" },
];
const productname = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return <span className="error">Product name cannot be blank.</span>;
  }
};
const required = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return "require";
  }
};
const lt = (value, props) => {
  // get the maxLength from component's props
  if (!value.toString().trim().length > props.maxLength) {
    // Return jsx
    return (
      <span className="error">
        The value exceeded {props.maxLength} symbols.
      </span>
    );
  }
};
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      editProduct: false,
      files: [],
      fileImage: "",
      soupIsReady: true,
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
      productName: "",
      company: "",
      productCategory: "",
      manufacturer: "",
      salesEnggArray: [],
      salesEnggArrayfull: [],
      companyOptions: [],
      salesEngineerOptions: [],
      productCategoryOptions: [],
      manufacturerOptions: [],
      pageCountOptions: [],
      redirectProductItem: false,
      newList: [],
      redirectId: 0,
      productId: 0,
      activePage: 1,
      // productAppend: false,
      fields: ["productName", "company", "productCategory", "manufacturer"],
      buttonEnabled: false,
      filterObj: {
        page: 1,
        activePage: 1,
        categoryFilter: "",
        companyFilter: "",
        mfrFilter: "",
        statusFilter: "",
        companyFocus: false,
      },
    };
    this.props.fetchProductList(this.state.filterObj);
    this.props.companyDetails();
    this.props.salesEngineerFilter();
    this.props.productCategoryList();
    this.props.fetchManufacturersList();
    this.onDrop = this.onDrop.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  handlePageChange(pageNumber) {
    console.log("pageNumber", pageNumber);
    this.setState({ activePage: pageNumber });
    this.state.filterObj.page = pageNumber;
    this.state.filterObj.activePage = pageNumber;

    this.props.fetchProductList(this.state.filterObj);
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      if (this.props.sales_engg_user) {
        this.props.sales_engg_user.map((sales_user, key) => {
          var obj = {};

          obj["value"] = sales_user.id;
          obj["label"] = sales_user.username;
          salesEngineerOptions.push(obj);
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

      if (this.props.product_category_list) {
        this.props.product_category_list.results.data.map((category, key) => {
          var obj = {};
          obj["value"] = category.id;
          obj["label"] = category.name;
          productCategoryOptions.push(obj);
          obj = {};
        });
      }
      this.props.manufacturers_list.map((manufacturer, key) => {
        console.log("sdsdsdsdsdsdsd", manufacturer);
        var obj = {};
        obj["value"] = manufacturer.id;
        obj["label"] = manufacturer.name;
        manufacturerOptions.push(obj);
        obj = {};
      });
      this.setState({ companyOptions: companyOptions });
      this.setState({ salesEngineerOptions: salesEngineerOptions });
      this.setState({ productCategoryOptions: productCategoryOptions });
      this.setState({ manufacturerOptions: manufacturerOptions });
      companyOptions = [];
      salesEngineerOptions = [];
      productCategoryOptions = [];
      manufacturerOptions = [];
      console.log("cccccccccccc", this.props.product_create);
      if (this.props.product_create) {
        this.props.fetchProductList(this.state.filterObj);
      }
      if (this.props.product_update) {
        this.props.fetchProductList(this.state.filterObj);
        this.setState({ editProduct: false });
        this.setState({ files: [] });
        this.setState({ productName: "" });
        this.setState({ fileImage: "" });
        this.setState({ productCategory: "" });
        this.setState({ company: "" });
        this.setState({ manufacturer: "" });
        this.setState({ productId: 0 });
        this.setState({ salesEnggArrayfull: [] });
        this.setState({ soupIsReady: true });
      }
    }, 1000);
  }
  onDrop = (files) => {
    this.setState({
      files,
    });
  };
  clearPreviewLogo() {
    this.state.files = [];
    this.state.fileImage = "";
    this.forceUpdate();
  }
  toggle = () => {
    this.setState({ buttonEnabled: false });
    this.setState({
      modal: !this.state.modal,
    });
    this.setState({ categoryVal: {} });
    this.setState({ files: [] });
    this.setState({ fileImage: "" });
    this.setState({ company_place: "" });
    this.setState({ productCategory_place: "" });
    this.setState({ manufacturer_place: "" });
    this.setState({ productName: "" });
    this.setState({ editProduct: false });
    this.setState({ salesEnggArrayfull: [] });
    this.setState({ soupIsReady: true });
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
  toggleOpenStatus = () => {
    this.setState((state) => ({ isOpenStatus: !state.isOpenStatus }));
  };
  toggleOpenStatusClose() {
    if (this.state.isOpenStatus == true) {
      this.toggleOpenStatus();
    }
  }
  onSelectChangeMC = (valueMC) => {
    this.toggleOpenMC();
    this.setState({ valueMC });
  };

  handleChangeProductName(e) {
    this.setState({ productName: e.target.value });
    if (e.target.value != "") {
      this.removeFromFields("productName");
    } else {
      this.addToFields("productName");
    }
  }

  handleFocusProductName() {
    this.setState({ productNameFocus: true });
  }
  handleBlurProductName() {
    this.setState({ productNameFocus: false });
    // if (emailErr == true) {
    //   emailErr = false;
    // }
  }
  handleChangeCompany(e) {
    this.setState({ categoryVal: {} });
    let sampleArray = [];
    let categoryArray = [];
    sampleArray = this.props.product_category_list.results.data.filter(
      (ele, ind) => {
        return e.value === ele.company;
      }
    );
    sampleArray.map((category) => {
      var obj = {};
      obj["value"] = category.id;
      obj["label"] = category.name;
      categoryArray.push(obj);
      obj = {};
    });
    this.setState({ productCategoryOptions: categoryArray });
    this.setState({ company: e.value });
    if (e.value != "") {
      this.removeFromFields("company");
    } else {
      this.addToFields("company");
    }
  }
  getClass() {
    console.log(this.state.companyFocus);
    if (this.state.companyFocus === true) return "focussed";
    else return "blurred";
  }
  handleFocusCompany() {
    this.setState({ companyFocus: true });
    this.state.companyFocusStyle = true;
  }
  handleBlurCompany() {
    this.setState({ companyFocus: false });
  }
  handleChangeProductCategory(e) {
    let obj = {};
    obj["value"] = e.value;
    obj["label"] = e.label;
    this.setState({ categoryVal: obj });
    this.setState({ productCategory: e.value });
    if (e.value != "") {
      this.removeFromFields("productCategory");
    } else {
      this.addToFields("productCategory");
    }
  }
  handleFocusProductCategory() {
    this.setState({ productCategoryFocus: true });
    this.state.productCategoryFocusStyle = true;
  }
  handleBlurProductCategory() {
    this.setState({ productCategoryFocus: false });
  }
  handleChangeManufacturer(e) {
    this.setState({ manufacturer_place: e.label });
    this.setState({ manufacturer: e.value });
    if (e.value != "") {
      this.removeFromFields("manufacturer");
    } else {
      this.addToFields("manufacturer");
    }
  }
  handleFocusManufacturer() {
    this.setState({ manufacturerFocus: true });
    this.state.manufacturerFocusStyle = true;
  }
  handleBlurManufacturer() {
    this.setState({ manufacturerFocus: false });
  }
  handleChangeSalesEngineer(e) {
    console.log("handleChangeSalesEngineer", e);
    if (e != "") {
      this.removeFromFields("salesEnggArray");
    }
    e.map((value, key) => {
      var value = value.value;

      salesEnggArray.push(value);
    });
    let salesArray = [];
    e.map((saleseng) => {
      var obj = {};
      obj["value"] = saleseng.value;
      obj["label"] = saleseng.label;
      salesArray.push(obj);
      obj = {};
    });
    this.setState({
      salesEnggArray: salesEnggArray,
      salesEnggArrayfull: salesArray,
    });
    salesEnggArray = [];
    salesEnggArrayfull = [];
    console.log("ergsdgdsfg", this.state.salesEnggArray);
    console.log("ergsdgdssdsdasddfg", this.state.salesEnggArrayfull);
  }
  handleProductCreate() {
    let image = "";
    this.state.files.length > 0
      ? (image = this.state.files[0])
      : (image = this.state.fileImage);
    let bodyData = {
      name: this.state.productName,
      image: this.state.files[0],
      category: this.state.productCategory,
      company: this.state.company,
      manufacturer: this.state.manufacturer,
      sales_engineers: this.state.salesEnggArray,
      is_active: this.state.soupIsReady,
      to_append: this.state.productAppend,
    };
    this.props.productCreation(bodyData);
    this.setState({ modal: false });
    this.state.productAppend = false;
  }
  handleProductEdit() {
    console.log("ccccccccccccc", this.state.files);
    let image = "";
    let bodyData = {};
    this.state.files.length > 0
      ? (image = this.state.files[0])
      : (image = this.state.fileImage);
    if (this.state.files.length > 0) {
      bodyData = {
        name: this.state.productName,
        image: this.state.files[0],
        category: this.state.productCategory,
        company: this.state.company,
        manufacturer: this.state.manufacturer,
        is_active: this.state.soupIsReady,
        sales_engineers: this.state.salesEnggArray,
        to_append: this.state.productAppend,
      };
    } else {
      console.log("bbbbbbbbbb", this.state.files);
      bodyData = {
        name: this.state.productName,
        category: this.state.productCategory,
        company: this.state.company,
        manufacturer: this.state.manufacturer,
        is_active: this.state.soupIsReady,
        sales_engineers: this.state.salesEnggArray,
        to_append: this.state.productAppend,
      };
    }

    this.props.productUpdation(bodyData, this.state.productId);
    this.setState({ modal: false });
    this.state.productAppend = false;
  }
  handleRemoveProduct(product) {
    this.props.productRemove(product.id);
  }
  checkFields() {
    let fields = this.state.fields;
    console.log(fields);
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
  handleEditProduct(product) {
    console.log("poductttttttt", product);
    this.setState({ buttonEnabled: true });
    this.setState({ modal: true });
    this.setState({ editProduct: true });
    this.setState({ files: [] });
    this.setState({ productName: product.name });
    this.setState({ fileImage: product.image });
    let obj = {};
    obj["value"] = product.category;
    obj["label"] = product.category_details.name;
    this.setState({ categoryVal: obj });
    this.setState({ productCategory: product.category });
    this.setState({ productCategory_place: product.category_details.name });
    this.setState({ company: product.company });
    this.setState({ company_place: product.company_details.name });
    this.setState({ manufacturer: product.manufacturer });
    this.setState({ manufacturer_place: product.manufacturer_details.name });
    this.setState({ productId: product.id });
    this.setState({ soupIsReady: product.is_active });
    // this.setState({ productAppend: product.to_append });
    this.state.productAppend = product.to_append;
    console.log("hhhhhproductAppend", this.state.productAppend);
    product.sales_engineer_details.map((saleseng, key) => {
      var value = saleseng.id;

      salesEnggArray.push(value);
    });
    let salesArray = [];
    product.sales_engineer_details.map((saleseng) => {
      var obj = {};
      obj["value"] = saleseng.id;
      obj["label"] = saleseng.username;
      salesArray.push(obj);
      obj = {};
    });
    this.setState({
      salesEnggArray: salesEnggArray,
      salesEnggArrayfull: salesArray,
    });
    salesEnggArray = [];
  }
  productItem(product) {
    this.state.redirectId = product.id;
    this.setState({ redirectProductItem: true });
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
  handleChangeCategory(e) {
    this.setState({ categoryValue: e.label });
    this.state.filterObj.categoryFilter = e.value;
    this.props.fetchProductList(this.state.filterObj);
  }
  clearCategory() {
    this.state.categoryValue = "";
    this.state.filterObj.categoryFilter = "";
    this.props.fetchProductList(this.state.filterObj);
  }
  handleChangeCompanyFilter(e) {
    this.setState({ companyValue: e.label });
    this.state.filterObj.companyFilter = e.value;
    this.props.fetchProductList(this.state.filterObj);
  }
  clearCompany() {
    this.state.companyValue = "";
    this.state.filterObj.companyFilter = "";
    this.props.fetchProductList(this.state.filterObj);
  }
  handleChangeManufacturerFilter(e) {
    this.setState({ mfrValue: e.label });
    this.state.filterObj.mfrFilter = e.value;
    this.props.fetchProductList(this.state.filterObj);
  }
  clearMfr() {
    this.state.mfrValue = "";
    this.state.filterObj.mfrFilter = "";
    this.props.fetchProductList(this.state.filterObj);
  }
  handleChangeStatus(e) {
    this.setState({ statusValue: e.label });
    this.state.filterObj.statusFilter = e.value;
    this.props.fetchProductList(this.state.filterObj);
  }
  clearStatus() {
    this.state.statusValue = "";
    this.state.filterObj.statusFilter = "";
    this.props.fetchProductList(this.state.filterObj);
  }
  handleSoupChange(e) {
    if (e.target.checked) this.setState({ soupIsReady: true });
    else this.setState({ soupIsReady: false });
  }
  handleAppendMfr(e) {
    console.log("ffssssssss", e.target.value);
    // this.setState({ productAppend: e.target.checked });
    if (e.target.checked) {
      this.state.productAppend = true;
      // this.setState({ productAppend: "true" });
    } else {
      this.state.productAppend = false;
      // this.setState({ productAppend: "false" });
    }

    console.log("productAppend", this.state.productAppend);
  }
  handleChangeSearch(e) {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      if (this.state.newList) {
        currentList = this.state.newList;  
        var result = currentList.filter(item => {
            let foundName =  item.name.toLowerCase().includes(e.target.value.toLowerCase());
            let foundUser =  item.category_details.name.toLowerCase().includes(e.target.value.toLowerCase());
            let foundCode =  item.company_details.name.toLowerCase().includes(e.target.value.toLowerCase());
            let foundReporting = item.manufacturer_details.name.toLowerCase().includes(e.target.value.toLowerCase());

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
      isOpenStatus,
    } = this.state;

    if (Array.isArray(this.state.searchList) && this.state.searchList.length)
      this.state.newList = this.state.searchList;
    else
      this.state.newList = this.props.product_list.results;

    if(this.props.product_list.results) {
      console.log(this.props.product_list.results)
    }
    
    if (this.state.newList) {
      this.state.firstNot = (this.state.activePage - 1) * 13;
      this.state.secondNot =
        (this.state.activePage - 1) * 13 + this.state.newList.length;
    }
    this.pageCount();
    if (this.state.redirectProductItem)
      return (
        <Redirect to={"/product-items/" + this.state.redirectId}></Redirect>
      );
    if (this.props.product_remove)
      this.props.fetchProductList(this.state.filterObj);
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
              <BreadcrumbItem active>Product</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0">
            <Button onClick={this.toggle} className="blue-btn">
              Add new Products
            </Button>
          </Col>
          <Card className="col-md-12">
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Products</Col>
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
                          style={{height:"40px", paddingLeft: 5}}
                          placeholder="Search"
                        />
                        
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
                            {this.state.categoryValue
                              ? ` ${this.state.categoryValue}`
                              : "All"}
                            {this.state.categoryValue ? (
                              <X
                                onClick={this.clearCategory.bind(this)}
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
                          onChange={this.handleChangeCategory.bind(this)}
                          options={this.state.productCategoryOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={valueMSC}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Category</span>
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
                            {this.state.companyValue
                              ? `${this.state.companyValue}`
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
                          onChange={this.handleChangeCompanyFilter.bind(this)}
                          // onFocus={this.handleFocusCompany}
                          options={this.state.companyOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={valueClient}
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
                            {this.state.mfrValue
                              ? `${this.state.mfrValue}`
                              : "All"}
                            {this.state.mfrValue ? (
                              <X onClick={this.clearMfr.bind(this)} size={15} />
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
                          onChange={this.handleChangeManufacturerFilter.bind(
                            this
                          )}
                          options={this.state.manufacturerOptions}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={valueMC}
                        />
                      </Dropdown>
                    </OutsideClickHandler>
                    <span>Manufacturer</span>
                  </label>
                </Col>

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
                              ? `${this.state.statusValue}`
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
                <Col></Col>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Product category</th>
                    <th>Company name</th>
                    <th>Manufacturer name</th>
                    <th>Status</th>
                    <th>Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.newList
                    ? this.state.newList.map((product, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row">
                              <span className="triangleGreen" />
                              <a
                                className="userNameColor"
                                onClick={() => this.productItem(product)}
                              >
                                {product.name}
                              </a>
                            </th>
                            <td>{product.category_details.name}</td>
                            <td>{product.company_details.name}</td>
                            <td>{product.manufacturer_details.name}</td>
                            {/* <td>{product.status}</td> */}
                            {product.is_active ? (
                              <td className="userActive">Active</td>
                            ) : (
                              <td className="userInActive">Inactive</td>
                            )}
                            <td className="action">
                              <span>
                                <Edit
                                  onClick={() =>
                                    this.handleEditProduct(product)
                                  }
                                  size={16}
                                  className="mr-4 pointer"
                                />
                              </span>
                              <span>
                                <Trash2
                                  onClick={() =>
                                    this.handleRemoveProduct(product)
                                  }
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
                  {this.props.product_list ? (
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={12}
                      totalItemsCount={this.props.product_list.count}
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
          className={this.props.className}
          parentSelector={() => document.querySelector("#mainWrapper")}
        >
          {this.state.editProduct ? (
            <ModalHeader toggle={this.toggle}>Edit product</ModalHeader>
          ) : (
            <ModalHeader toggle={this.toggle}>Create new product</ModalHeader>
          )}
          <ModalBody className={this.state.editProduct ? "editModule" : null}>
            <Form>
              <Row>
                <Col xl={4} lg={5} sm={12}>
                  <Row>
                    <Col md={12}>
                      {/* <FormGroup>
                        <Label for="basicinput">Product name</Label>
                        <Input
                          type="text"
                          id="basicinput"
                          name="basicinput"
                          placeholder="Product name"
                          value={this.state.productName}
                          onChange={this.handleChangeProductName.bind(this)}
                        />
                      </FormGroup> */}
                      <FormGroup
                        className={
                          this.state.nameFocus
                            ? "hasFloatingLabel isFocused"
                            : "hasFloatingLabel notFocused"
                        }
                        id={this.state.productName ? "hasValue" : "hasnoValue"}
                      >
                        <Input
                          type="text"
                          className={
                            this.state.productName
                              ? "form-control input floatingLabel"
                              : "form-control"
                          }
                          onChange={this.handleChangeProductName.bind(this)}
                          onFocus={this.handleFocusProductName.bind(this)}
                          onBlur={this.handleBlurProductName.bind(this)}
                          value={this.state.productName}
                          id="name"
                          validations={[productname]}
                        />
                        <label className="form-control-placeholder" for="name">
                          Product name*
                        </label>
                      </FormGroup>
                    </Col>
                    <Col sm={12}>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            id="checkbox2"
                            onChange={this.handleAppendMfr.bind(this)}
                            value={this.state.productAppend}
                            checked={
                              this.state.productAppend ? "checked" : null
                            }
                          />{" "}
                          Append manufacturer name to product
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col xl={6} lg={6} sm={12}>
                      {/* <FormGroup>
                        <Label for="basicinput">Company</Label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          // defaultValue={colourOptions[0]}
                          name="color"
                          placeholder={this.state.company_place}
                          onChange={this.handleChangeCompany.bind(this)}
                          options={this.state.companyOptions}
                        />
                      </FormGroup> */}
                      <FormGroup
                        className={
                          this.state.companyFocus
                            ? "hasFloatingLabel selectInput isFocused"
                            : "hasFloatingLabel selectInput notFocused"
                        }
                        id={this.state.company ? "hasValue" : "hasnoValue"}
                      >
                        <Select
                          //isSearchable={false}
                          className={
                            this.state.company
                              ? "basic-single floatingLabel"
                              : "basic-single" + this.state.companyFocusStyle
                              ? "focused"
                              : "unfocused"
                          }
                          classNamePrefix="select"
                          className={this.getClass()}
                          // defaultValue={colourOptions[0]}
                          value={this.state.companyOption}
                          onChange={this.handleChangeCompany.bind(this)}
                          options={this.state.companyOptions}
                          placeholder={this.state.company_place}
                          onFocus={this.handleFocusCompany.bind(this)}
                          onBlur={this.handleBlurCompany.bind(this)}
                          id={this.state.companyFocus ? "focused" : "unfocused"}
                          validations={[required, lt]}
                        />
                        <Label className="form-control-placeholder">
                          Company*
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col xl={6} lg={6} sm={12}>
                      {/* <FormGroup>
                        <Label for="basicinput">Product category*</Label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          value={this.state.categoryVal}
                          // defaultValue={colourOptions[0]}
                          name="color"
                          placeholder={this.state.productCategory_place}
                          onChange={this.handleChangeProductCategory.bind(this)}
                          options={this.state.productCategoryOptions}
                        />
                      </FormGroup>{" "} */}

                      <FormGroup
                        className={
                          this.state.productCategoryFocus
                            ? "hasFloatingLabel selectInput isFocused"
                            : "hasFloatingLabel selectInput notFocused"
                        }
                        id={
                          this.state.productCategory ? "hasValue" : "hasnoValue"
                        }
                      >
                        <Select
                          isSearchable={false}
                          className={
                            this.state.productCategory
                              ? "basic-single floatingLabel"
                              : "basic-single" +
                                this.state.productCategoryFocusStyle
                              ? "focused"
                              : "unfocused"
                          }
                          classNamePrefix="select"
                          // defaultValue={colourOptions[0]}
                          value={this.state.categoryVal}
                          onChange={this.handleChangeProductCategory.bind(this)}
                          options={this.state.productCategoryOptions}
                          placeholder={this.state.productCategory_place}
                          onFocus={this.handleFocusProductCategory.bind(this)}
                          onBlur={this.handleBlurProductCategory.bind(this)}
                          id={this.state.companyFocus ? "focused" : "unfocused"}
                          validations={[required, lt]}
                        />
                        <Label className="form-control-placeholder">
                          Product category*
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col xl={6} lg={6} sm={12}>
                      {/* <FormGroup>
                        <Label for="basicinput">Manufacturer</Label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          // defaultValue={colourOptions[0]}
                          name="color"
                          placeholder={this.state.manufacturer_place}
                          onChange={this.handleChangeManufacturer.bind(this)}
                          options={this.state.manufacturerOptions}
                        />
                      </FormGroup> */}
                      <FormGroup
                        className={
                          this.state.manufacturerFocus
                            ? "hasFloatingLabel selectInput isFocused"
                            : "hasFloatingLabel selectInput notFocused"
                        }
                        id={this.state.manufacturer ? "hasValue" : "hasnoValue"}
                      >
                        <Select
                          isSearchable={false}
                          className={
                            this.state.manufacturer
                              ? "basic-single floatingLabel"
                              : "basic-single" +
                                this.state.manufacturerFocusStyle
                              ? "focused"
                              : "unfocused"
                          }
                          classNamePrefix="select"
                          // defaultValue={colourOptions[0]}
                          value={this.state.manufacturerVal}
                          placeholder={this.state.manufacturer_place}
                          onChange={this.handleChangeManufacturer.bind(this)}
                          options={this.state.manufacturerOptions}
                          onFocus={this.handleFocusManufacturer.bind(this)}
                          onBlur={this.handleBlurManufacturer.bind(this)}
                          id={
                            this.state.manufacturerFocus
                              ? "focused"
                              : "unfocused"
                          }
                          validations={[required, lt]}
                        />
                        <Label className="form-control-placeholder">
                          Manufacturer*
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col xl={4} lg={2} sm={12} className="position-relative">
                  <div className="dropzone">
                    <FormGroup>
                      <Label for="basicinput">Product image</Label>

                      {this.state.files.length > 0 ? (
                        <div className="position-relative">
                          {this.state.files.map((file) => (
                            <img
                              src={file.preview}
                              className="img-fluid imgPreview"
                            />
                          ))}
                          <X
                            size={15}
                            className="imgPreviewClose"
                            onClick={this.clearPreviewLogo.bind(this)}
                          />
                        </div>
                      ) : this.state.fileImage ? (
                        <div className="position-relative">
                          <img
                            src={this.state.fileImage}
                            className="img-fluid imgPreview"
                          />

                          <X
                            size={15}
                            className="imgPreviewClose"
                            onClick={this.clearPreviewLogo.bind(this)}
                          />
                        </div>
                      ) : (
                        <Dropzone
                          onDrop={this.onDrop.bind(this)}
                          className="drophere"
                          style={{
                            minHeight: "auto",
                            padding: 5,
                          }}
                        >
                          <div>
                            <FontAwesomeIcon icon="cloud-upload-alt" />
                            <p>
                              Try dropping some files here, or click to select
                              files to upload.
                            </p>
                          </div>
                        </Dropzone>
                      )}
                    </FormGroup>
                  </div>
                </Col>
                <Col xl={4} lg={5} sm={12}>
                  <FormGroup className="pRequirmentProduct">
                    <Label for="basicinput">Assign Sales engineers</Label>
                    {/* <div className="position-relative has-icon-left">
                      <Input type="text" id="iconLeft" name="iconLeft" />
                      <div className="form-control-position">
                        <Search size={16} />
                      </div>
                    </div> */}
                    <div className="position-relative has-icon-left salesenglist">
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={this.state.salesEnggArrayfull}
                        name="color"
                        // value={this.state.salesEnggArray}
                        options={this.state.salesEngineerOptions}
                        onChange={this.handleChangeSalesEngineer.bind(this)}
                        isMulti
                      />
                      <div className="form-control-position">
                        <Search size={16} />
                      </div>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <dic className="mT-13 d-flex col-12">
              <Col md={6}>
                <Row>
                  <form ref="breakfastForm">
                    {/* Custom icons */}

                    <label>
                      <Toggle
                        checked={this.state.soupIsReady}
                        icons={{
                          checked: "Active",
                          unchecked: "Inactive",
                        }}
                        onChange={this.handleSoupChange.bind(this)}
                      />
                    </label>
                  </form>
                </Row>
              </Col>
              {this.state.editProduct ? (
                <Col md={6} className="justify-content-md-end d-flex">
                  <Button
                    className="blue-btn mR25"
                    onClick={this.handleProductEdit.bind(this)}
                    disabled={!this.state.buttonEnabled}
                  >
                    Update
                  </Button>
                </Col>
              ) : (
                <Col md={6} className="justify-content-md-end d-flex">
                  <Button
                    className="blue-btn mR25"
                    onClick={this.handleProductCreate.bind(this)}
                    disabled={!this.state.buttonEnabled}
                  >
                    Save
                  </Button>
                </Col>
              )}
            </dic>
          </ModalFooter>
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
  product_list: state.productReducer.productList,
  company_details: state.companyDetailsReducer.companyDetails,
  sales_engg_user: state.userReducer.salesEnggUser,
  product_category_list: state.productReducer.productCategoryList,
  manufacturers_list: state.manufacturersReducer.manufacturersList,
  product_create: state.productReducer.createProduct,
  product_remove: state.productReducer.removeProduct,
  product_update: state.productReducer.updateProduct,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchProductList,
      salesEngineerFilter,
      companyDetails,
      productCategoryList,
      fetchManufacturersList,
      productCreation,
      productRemove,
      productUpdation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Products);
