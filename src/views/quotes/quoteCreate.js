// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import { quoteCreation } from "../../redux/sagas/quotes/fetchQuoteCreate";
import { companyDetails } from "../../redux/sagas/companyDetails/companyDetails";
import { productCategoryList } from "../../redux/sagas/products/fetchProductCategory";
import { fetchProductList } from "../../redux/sagas/products/fetchProductList";
import { fetchProductVariant } from "../../redux/sagas/products/fetchProductVariant";
import { fetchProductVariantList } from "../../redux/sagas/products/fetchProductVariantList";
import { fetchQuoteList } from "../../redux/sagas/quotes/fetchQuoteList";
import moment from "moment";
import NumberFormat from "react-number-format";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  Modal,
  ModalHeader,
  ModalBody,
  Collapse,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ModalFooter,
} from "reactstrap";

import { Link, Redirect } from "react-router-dom";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import Select from "react-select";
import { defaultTheme } from "react-select";
import { Home, Search, AtSign, User } from "react-feather";
import "rc-datepicker/lib/style.css";
import confirm from "../../assets/img/confirm.png";
import downloadWhite from "../../assets/img/downloadWhite.png";
import copy from "../../assets/img/copy.png";
import menuDotsGrey from "../../assets/img/menudotsGrey.png";
import addIcon from "../../assets/img/addIcon.png";
import { fetchLeadList } from "../../redux/sagas/leads/fetchLeadList";
import { fetchCustomerList } from "../../redux/sagas/customers/fetchCustomers";
import { fetchProjectList } from "../../redux/sagas/projects/fetchProjectList";
import { salesEngineerFilter } from "../../redux/sagas/users/fetchSalesEngineer";
import { termDetails } from "../../redux/sagas/quotes/fetchTermDetails";
import { fetchUnitsList } from "../../redux/sagas/units/fetchUnits";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
let leadReferenceOptions = [];
let customerOptions = [];
let projectOptions = [];
let quoteStageOptions = [
  { value: 1, label: "Stage One" },
  { value: 2, label: "Stage Two" },
  { value: 3, label: "Stage Three" },
  { value: 4, label: "Stage Four" },
  { value: 5, label: "Stage Five" },
  { value: 6, label: "Stage Six" },
];
let salesEngineerOptions = [];
let termsOptions = [];
let companyOptions = [];
let productCategoryOptions = [];
let productOptions = [];
let unitOptions = [];
let productCodeOptions = [];
let quoteOptions = [];

let descriptionOptions = [];
const { colors } = defaultTheme;
const selectStyles = {
  control: (provided) => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" }),
};
var short = require("short-uuid");
let count = 0;
class QuoteCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addBtn: false,
      clearValue: false,
      noOverlayModal: false,
      modal: false,
      collapse: false,
      dropdownOpen: false,
      dropdownOpen1: false,
      company: "",
      currency: "",
      quoteReference: "",
      ERPReference: "",
      leadReference: "",
      customer: "",
      project: "",
      quoteStage: "",
      salesEngineer: "",
      term: "",
      productCategory: "",
      product: "",
      productCode: "",
      descriptionVariant: "",
      quantity: "",
      unit: "",
      RunitPrice: "",
      totalAmount: 0,
      leadLabel: "",
      leadReferenceOptions: [],
      customerOptions: [],
      projectOptions: [],
      salesEngineerOptions: [],
      termsOptions: [],
      companyOptions: [],
      productCategoryOptions: [],
      productOptions: [],
      productVariants: [],
      unitOptions: [],
      productCodeOptions: [],
      descriptionOptions: [],
      quotedProducts: [],
      isOpenProductGroup: false,
      valueProductGroup: undefined,
      isOpenProductName: false,
      valueProductName: undefined,
      addProduct: false,
      addTC: false,
      dropOptions: false,
      optionalValues : [],
      optionId:"",
      prodcutSum: 0,
      pdfDiv: false,
      pdfAddress1: "",
      pdfAddress2: "",
      pdfFax: "",
      pdfLabel: "",
      pdfLogo: "",
      pdfPhone: "",
      pdfCustomer: "",
      custPhone: "",
      custAd1: "",
      custAd2: "",
      custEmail: "",
      pdfProject: "",
      pdfLeadContact: "",
      pdfQuoteReference: [],
      pdfProductVariants: [],
      pdfProductNames: [],
      projectFilterObj: {
        page: "",
        activePage: "",
        companyId: "",
      },
      filterObj: {
        page: 1,
        activePage: 1,
      },
    };
    this.props.fetchLeadList();
    this.props.fetchCustomerList();
    this.props.fetchProjectList();
    this.props.salesEngineerFilter();
    this.props.termDetails();
    this.props.companyDetails();
    this.props.productCategoryList();
    this.props.fetchProductList();
    this.props.fetchUnitsList();
    this.props.fetchProductVariantList();
    this.props.fetchQuoteList();
  }
  componentDidMount() {
    this.state.quotedProducts = [];
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      
      if (this.props.lead_list.length > 0) {
        this.props.lead_list.map((lead, key) => {
          var obj = {};

          obj["value"] = lead.id;
          obj["label"] = lead.reference_no;
          obj["contact"] = lead.contact_name;
          leadReferenceOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.customer_list) {
        this.props.customer_list.map((customer, key) => {
          var obj = {};

          obj["value"] = customer.id;
          obj["label"] = customer.name;
          obj["address1"] = customer.address1;
          obj["address2"] = customer.address2;
          obj["phone"] = customer.phone;
          obj["email"] = customer.email;
          customerOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.project_list) {
        this.props.project_list.map((project, key) => {
          var obj = {};

          obj["value"] = project.id;
          obj["label"] = project.name;
          projectOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.sales_engg_user) {
        this.props.sales_engg_user.map((sales_user, key) => {
          var obj = {};

          obj["value"] = sales_user.id;
          obj["label"] = sales_user.username;
          salesEngineerOptions.push(obj);
          obj = {};
        });
      }
      if (this.props.term_list) {
        this.props.term_list.results.map((term, key) => {
          var obj = {};
          obj["value"] = term.id;
          obj["label"] = term.name;
          termsOptions.push(obj);
          obj = {};
        });
      }

      this.props.company_details.map((company, key) => {
        var obj = {};
        obj["value"] = company.id;
        obj["label"] = company.name;
        obj["logo"] = company.logo;
        obj["phone"] = company.phone;
        obj["fax"] = company.fax;
        obj["address1"] = company.address1;
        obj["address2"] = company.address2;
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
      if (this.props.product_list.length > 0) {
        this.props.product_list.map((product, key) => {
          var obj = {};
          obj["value"] = product.id;
          obj["label"] = product.name;
          productOptions.push(obj);
          obj = {};
        });
      }
      this.props.unit_list.map((unit, key) => {
        var obj = {};

        obj["value"] = unit.id;
        obj["label"] = unit.name;
        unitOptions.push(obj);
        obj = {};
      });
      if (this.props.product_variant_list) {
        this.props.product_variant_list.map((variants, key) => {
          var obj = {};
          var obj1 = {};
          obj["value"] = variants.id;
          obj["label"] = variants.product_code;
          obj1["value"] = variants.id;
          obj1["label"] = variants.description;
          productCodeOptions.push(obj);
          descriptionOptions.push(obj1);
          obj = {};
          obj1 = {};
        });
      }

      if(this.props.quote_list.results) {
        this.props.quote_list.results.map((variants, key) => {
          var obj = {};
          obj["reference_no"] = variants.reference_no;
          quoteOptions.push(obj);
          obj = {};
        });
      }

      this.setState({ pdfQuoteReference: quoteOptions });
      this.setState({ leadReferenceOptions: leadReferenceOptions });
      this.setState({ customerOptions: customerOptions });
      this.setState({ projectOptions: projectOptions });
      this.setState({ salesEngineerOptions: salesEngineerOptions });
      this.setState({ termsOptions: termsOptions });
      this.setState({ companyOptions: companyOptions });
      this.setState({ productCategoryOptions: productCategoryOptions });
      this.setState({ productOptions: productOptions });
      this.setState({ unitOptions: unitOptions });
      this.setState({ productCodeOptions: productCodeOptions });
      this.setState({ descriptionOptions: descriptionOptions });
      leadReferenceOptions = [];
      customerOptions = [];
      projectOptions = [];
      salesEngineerOptions = [];
      termsOptions = [];
      companyOptions = [];
      productCategoryOptions = [];
      unitOptions = [];
      productOptions = [];
      productCodeOptions = [];
      descriptionOptions = [];
      if (this.props.lead_quote_data && JSON.stringify(this.props.lead_quote_data) != "{}") {
        this.setState({ leadReference: this.props.lead_quote_data.id });
        this.setState({
          leadReference_place: this.props.lead_quote_data.reference_no,
        });
        this.setState({
          customer: this.props.lead_quote_data.customer_details.id,
        });
        this.setState({
          customer_place: this.props.lead_quote_data.customer_details.name,
        });
        this.setState({
          project: this.props.lead_quote_data.project_details.id,
        });
        this.setState({
          project_place: this.props.lead_quote_data.project_details.name,
        });
        this.setState({
          salesEngineer: this.props.lead_quote_data.sales_engineer_details.id,
        });
        this.setState({
          salesEngineer_place: this.props.lead_quote_data.sales_engineer_details
            .username,
        });
      }
      if (this.props.product_variants) {
        this.props.product_variants.results.map((variant, key) => {
          if (
            !this.state.productVariants.some(
              (productVariant) => productVariant.id === variant.id
            )
          )
            this.state.productVariants.push(variant);
        });

        // this.setState({productVariants:this.props.product_variants})
        //     this.setState(prevState => ({
        //   addProduct: !prevState.addProduct
        // }));
        this.state.productNames = this.state.productVariants.filter(
          (ele, ind) =>
            ind ===
            this.state.productVariants.findIndex(
              (elem) => elem.product_details.id === ele.product_details.id
            )
        );

        this.setState({ addProduct: true });
      }
    }, 1000);
    if (this.props.quote_create) this.toggleConfirmation();
  }
  // dropOptionsToggle() {
  //   this.setState((prevState) => ({
  //     dropOptions: !prevState.dropOptions,
  //   }));
  // }
  optionsToggle() {
    if (this.state.dropOptions) {
      this.setState ({ dropOptions: false})
    }
  }
  optionsA(product) {
    if(this.state.optionalValues) {
      let a = this.state.optionalValues.findIndex(x => x.id === product.product);
      if(a != -1) {
        return this.state.optionalValues[a].option = 'Option A'
        this.forceUpdate() 
      } else return this.setState({
        optionalValues: [ ...this.state.optionalValues, {
          'id': product.product,
          'option': "Option A"
        }],
        dropOptions: false,
        dropdownOpen: false,
      });
    }
            // let jsonObject = this.state.optionalValues.map(JSON.stringify); 
      
            // console.log(jsonObject); 
      
            // let uniqueSet = new Set(jsonObject); 
            // let uniqueArray = Array.from(uniqueSet).map(JSON.parse); 
      
            // console.log(uniqueArray); 

  }

  optionsB(product) {
    // if(this.state.optionalValues) {
    //   let jsonObject = this.state.optionalValues.map(JSON.stringify);
    //   let uniqueSet = new Set(jsonObject);
    //   let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    //   // let ids = this.state.optionalValues.map(id=> id.id);
    //   console.log(uniqueArray);
    // }
    let a = this.state.optionalValues.findIndex(x => x.id === product.product);

     if(a !== -1){
      return this.state.optionalValues[a].option = 'Option B'
      this.forceUpdate() 
     } else return this.setState({
      optionalValues: [ ...this.state.optionalValues, {
        'id': product.product,
        'option': "Option B"
      }],
      dropOptions: false,
      dropdownOpen: false,
    });

    


    // this.setState({
    //   optionalValues: [ ...this.state.optionalValues, {
    //     'id': product.product,
    //     'option': "Option B"
    //   }],
    // });
    

  }
  optionsC(product) {
    let a = this.state.optionalValues.findIndex(x => x.id === product.product);

     if(a !== -1){
      return this.state.optionalValues[a].option = 'Option C'
      this.forceUpdate() 
     } else return this.setState({
      optionalValues: [ ...this.state.optionalValues, {
        'id': product.product,
        'option': "Option C"
      }],
      dropOptions: false,
      dropdownOpen: false,
    });
  }

  handlePdfDiv() {
    html2canvas(document.querySelector('#pdfDiv'), {useCORS: true})
      .then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      var width = (canvas.style.width.substr(0, 3))
      var height = (canvas.style.height.substr(0,3))
     const pdf = new jsPDF();
      // var height = pdf.internal.pageSize.getHeight();
      // var width = pdf.internal.pageSize.getWidth();     
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(`${new Date().toISOString()}.pdf`);
      this.state.pdfDiv = false;
    });
  }

  addTCToggle() {
    this.setState((prevState) => ({
      addTC: !prevState.addTC,
    }));
  }
  addToggle() {
    this.props.fetchProductVariant(this.state.product);
    this.setState((prevState) => ({
      clearValue: !prevState.clearValue,
    }));
    this.setState({ productCategory: "" });
    this.setState({ productName_place: "" });
    count = count + 1;
    this.state.addBtn = false;
  }
  toggleConfirmation = () => {
    this.setState({   
      modal: !this.state.modal,
    });
  };
  toggle = (product) => {
    this.setState({ productId: product.product });
    this.setState({ collapse: !this.state.collapse });
  };
  toggleMenu = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
      dropOptions: false,
    }));
  };
  toggleMenu1 = (quotedProduct) => {
    this.state.quoteProductId = quotedProduct.id;
    this.setState((prevState) => ({
      dropdownOpen1: !prevState.dropdownOpen1,
    }));
  };
  handleChangeCompany(e) {
    this.setState({ company: e.value,
    pdfAddress1: e.address1,
    pdfAddress2: e.address2,
    pdfFax: e.fax,
    pdfLabel: e.label,
    pdfLogo: e.logo,
    pdfPhone: e.phone
  });
    
  }
  handleChangeQuoteRef(e) {
    this.setState({ quoteReference: e.target.value });
  }
  handleChangeERPRef(e) {
    this.setState({ ERPReference: e.target.value });
  }
  handleChangeLeadReference(e) {
    this.setState({ leadReference: e.value, leadLabel: e.label, pdfLeadContact: e.contact });
    setTimeout(() => {
      if (this.props.lead_list.length > 0) {
        this.props.lead_list.map((lead, key) => {
          if (this.state.leadReference == lead.id) {
            this.setState({
              customer: lead.customer_details.id,
            });
            this.setState({
              customer_place: lead.customer_details.name,
            });
            this.setState({
              project: lead.project_details.id,
            });
            this.setState({
              project_place: lead.project_details.name,
            });
            this.setState({
              salesEngineer: lead.sales_engineer_details.id,
            });
            this.setState({
              salesEngineer_place: lead.sales_engineer_details.username,
            });
          }
        });
      }
    }, 1000);
  }
  handleChangeCustomer(e) {
    this.setState({ customer: e.value, 
      pdfCustomer: e.label,
      custAd2: e.address2,
      custAd1: e.address1,
      custEmail: e.email,
      custPhone: e.phone });
  }
  handleChangeProject(e) {
    this.setState({ project: e.value, pdfProject: e.label });
  }
  handleChangeQuoteStage(e) {
    this.setState({ quoteStage: e.value });
  }
  handleChangeSalesEngineer(e) {
    this.setState({ salesEngineer: e.value });
  }
  handleChangeCurrency(e) {
    this.setState({ currency: e.value });
  }
  handleChangeTerms(e) {
    this.setState({ term: e.value });
  }
  handleChangeProductCategory(e) {
    let sampleArray = [];
    let productArray = [];

    sampleArray = this.props.product_list.filter((ele, ind) => {
      return e.value === ele.category;
    });
    sampleArray.map((product) => {
      var obj = {};
      obj["value"] = product.id;
      obj["label"] = product.name;
      productArray.push(obj);
      obj = {};
    });
    this.setState({ productOptions: productArray });
    let categoryObj = {};
    categoryObj["value"] = e.value;
    categoryObj["label"] = e.label;
    this.setState({ productCategory: categoryObj });
  }
  handleChangeProduct(e) {
    let productObj = {};
    productObj["value"] = e.value;
    productObj["label"] = e.label;
    this.setState({ productName_place: productObj });
    this.setState({ product: e.value, addBtn: true });
  }
  handleChangeDescription(e) {
    this.setState({ description: e.target.value });
  }
  handleSubmitQuote() {
    var today = new Date();
    let revision_date = moment(today).format("YYYY-MM-DD HH:mm:ss");
    this.state.pdfDiv = true;
    this.state.modal = true;
    // if (this.props.product_variants) {
    //   this.state.quotedProducts.map((quotedProduct, key) => {
    //     var obj = {};
    //     obj["pdt_variant"] = quotedProduct.pdt_variant;
    //     obj["status"] = "LR";
    //     obj["amount"] = quotedProduct.amount;
    //     productVariantDetails.push(obj);
    //     obj = {};
    //   });
    // }
    let productDetails = [];
    if (this.state.productNames) {
      this.state.productNames.map((product) => {
        let obj = {};
        obj["product"] = product.product;
        obj["status"] = "LR";
        obj["amount"] = product.amount;
        obj["label"] = product.product_details.name;
        let productVariantDetails = [];
        this.state.quotedProducts.map((quotedProduct) => {
          if (product.product == quotedProduct.product) {
            let obj1 = {};
            obj1["pdt_variant"] = quotedProduct.pdt_variant;
            obj1["quantity"] = quotedProduct.quantity;
            obj1["variant_amount"] = quotedProduct.amount;
            obj1["description"] = quotedProduct.description;
            obj1["runit_price"] = quotedProduct.runit_price;
            obj1["unit_place"] = quotedProduct.unit_place;
            obj1["product"] = quotedProduct.product;
            productVariantDetails.push(obj1);
            obj1 = {};
          }
        });
        obj["variants_quoted_details"] = productVariantDetails;
        productDetails.push(obj);
        obj = {};
        this.setState({ pdfProductVariants: productVariantDetails, pdfProductNames: productDetails})
      });
    }
      
      
    let bodyData = {
      //reference_no: this.state.quoteReference,
      reference_no: "autoGenerated",
      erp_reference: this.state.ERPReference,
      company: this.state.company,
      lead: this.state.leadReference,
      project: this.state.project,
      stage: this.state.quoteStage,
      currency: this.state.currency,
      terms: this.state.term,
      revisions: [],
      net_amount: this.state.totalAmount,
      // revision_details: [
      //   {
      //     revision_by: 1,
      //     revision_date: revision_date,
      //     file: null,
      //   },
      // ],
      quoted_product_details: productDetails,
    };

    this.props.quoteCreation(bodyData);
    this.props.fetchQuoteList();
    let quoteOptions = [];
    setTimeout(() => {
      if(this.props.quote_list.results) {
        this.props.quote_list.results.map((variants, key) => {
          var obj = {};
          obj["reference_no"] = variants.reference_no;
          quoteOptions.push(obj);
          obj = {};
        });
      }
    })
    this.setState({pdfQuoteReference: quoteOptions})
    this.state.leadReference_place=""
    this.state.customer_place=""
    this.state.project_place=""
    this.state.salesEngineer_place=""
    this.state.productNames=[]
    this.state.productVariants=[]


  }
  toggleOpenProductGroup = () => {
    this.setState((state) => ({
      isOpenProductGroup: !state.isOpenProductGroup,
    }));
  };
  onSelectChangeProductGroup = (valueProductGroup) => {
    this.toggleOpenProductGroup();
    this.setState({ valueProductGroup });
  };
  toggleOpenProductName = () => {
    this.setState((state) => ({ isOpenProductName: !state.isOpenProductName }));
  };
  onSelectChangeProductName = (valueProductName) => {
    this.toggleOpenProductName();
    this.setState({ valueProductName });
  };
  handleChangeProductCode(product, e) {
    this.setState({ productCode: e.label });
    this.state.productVariants.map((variants) => {
      if (variants.id == e.value) {
        this.setState({ RunitPrice: variants.min_sales_price });
        this.setState({ descriptionVariant: variants.description });
        this.setState({ unit: variants.unit });
        this.setState({ unit_place: variants.unit_details.name });
      }
    });
  }
  handleChangeProductCodeEdit(product, e) {
    product.product_code = e.label;
    this.state.productVariants.map((variants) => {
      if (variants.id == e.value) {
        product.runit_price = variants.min_sales_price;
        product.description = variants.description;
        product.unit = variants.unit;
        this.setState({ unit_place: variants.unit_details.name });
        product.amount = variants.min_sales_price * parseInt(product.quantity);
      }
    });
    this.setState({ newVariant: e.value });
  }
  handleChangeDescriptionVariant(product, e) {
    this.setState({ descriptionVariant: e.label });
    this.state.productVariants.map((variants) => {
      if (variants.id == e.value) {
        this.setState({ RunitPrice: variants.min_sales_price });
        this.setState({ unit: variants.unit });
        this.setState({ unit_place: variants.unit_details.name });
        this.setState({ productCode: variants.product_code });
      }
    });
  }
  handleChangeDescriptionVariantEdit(product, e) {
    product.description = e.label;
    this.state.productVariants.map((variants) => {
      if (variants.id == e.value) {
        product.runit_price = variants.min_sales_price;
        product.product_code = variants.product_code;
        product.unit = variants.unit;
        product.amount = variants.min_sales_price * parseInt(product.quantity);
      }
    });
    this.setState({ newVariant: e.value });
  }
  handleChangeQuantity(e) {
    this.setState({ quantity: e.target.value });
  }
  handleChangeQuantityEdit(product, e) {
    product.quantity = e.target.value;
    this.state.productVariants.map((variants) => {
      if (variants.id == product.id) {
        product.runit_price = variants.min_sales_price;
        product.product_code = variants.product_code;
        product.unit = variants.unit;
        product.amount = variants.min_sales_price * parseInt(e.target.value);
      }
    });
    this.forceUpdate();
  }
  handleChangeUnit(e) {
    this.setState({ unit: e.value });
    this.setState({ unit_place: e.label });
  }
  handleChangeUnitEdit(product, e) {
    product.unit = e.value;
  }
  handleChangeRUnitPrice(e) {
    this.setState({ RunitPrice: e.target.value });
  }
  handleQuotedProductCreate(product) {
    let session_guid = short.generate();
    //  let sampleArray=[]
    var obj = {};
    obj["id"] = session_guid;
    obj["product"] = product.product;
    obj["pdt_variant"] = product.id;
    obj["product_code"] = this.state.productCode;
    obj["description"] = this.state.descriptionVariant;
    obj["quantity"] = this.state.quantity;
    obj["runit_price"] = this.state.RunitPrice;
    obj["unit"] = this.state.unit;
    obj["unit_place"] = this.state.unit_place;
    obj["status"] = "LR";
    obj["amount"] = this.state.quantity * this.state.RunitPrice;
    this.state.quotedProducts.push(obj);
    // this.setState({quotedProducts:sampleArray})
    this.state.totalAmount += obj["amount"];

    // sampleArray=[]
    this.forceUpdate();
    this.setState({ productCode: "" });
    this.setState({ descriptionVariant: "" });
    this.setState({ quantity: "" });
    this.setState({ RunitPrice: "" });
    this.setState({ unit: "" });
    this.setState({ unit_place: "" });
    // this.setState({ productName_place: "select product name" });
    this.setState({ productCate_place: "select product category" });
    obj = {};
  }
  handleDuplicateQuotedProduct(quotedProduct) {
    let session_guid = short.generate();
    var obj = {};
    obj["id"] = session_guid;
    obj["product"] = quotedProduct.product;
    obj["pdt_variant"] = quotedProduct.pdt_variant;
    obj["product_code"] = quotedProduct.product_code;
    obj["description"] = quotedProduct.description;
    obj["quantity"] = quotedProduct.quantity;
    obj["runit_price"] = quotedProduct.runit_price;
    obj["unit"] = quotedProduct.unit;
    obj["unit_place"] = quotedProduct.unit_place;
    obj["status"] = "LR";
    obj["amount"] = quotedProduct.amount;
    this.state.totalAmount += quotedProduct.amount;
    this.state.quotedProducts.push(obj);
    this.forceUpdate();
    obj = {};
  }
  handleDeleteQuotedProduct(quotedProduct) {
    const quotedProducts = this.state.quotedProducts.filter(
      (prod) => prod.id !== quotedProduct.id
    );
    this.state.totalAmount -= quotedProduct.amount;
    this.setState({ quotedProducts });
  }
  productSumF(product) {
    this.state.quotedProducts.map((quote) =>
      quote.product == product.product
        ? (this.state.prodcutSum += quote.amount)
        : 0
    );
    product.amount = this.state.prodcutSum;
  }
  
  render() {
    if(this.props.quote_list.results){
        console.log("fgjklofig", this.props.quote_list.results);
      }
    if(this.state.pdfProductNames && this.state.pdfProductVariants) {
      console.log(this.state.pdfProductNames, this.state.pdfProductVariants)
    }
    const optionsCurrency = [
      { value: "QAR", label: "QAR" },
      { value: "USD", label: "USD" },
      { value: "INR", label: "INR" },
    ];
    if (this.props.quote_create) return <Redirect to="/quotes"></Redirect>;
    // const options = [
    //   { value: "1", label: "1" },
    //   { value: "2", label: "2" },
    //   { value: "3", label: "3" }
    // ];
    const {
      isOpenProductGroup,
      valueProductGroup,
      isOpenProductName,
      valueProductName,
    } = this.state;

    return (
      <Fragment>
        <div className="userModule quoteCreate mT25">
          <Col md={6}>
            <Breadcrumb>
              <BreadcrumbItem>
                <a href="">
                  <Home size={15} />
                </a>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <a href="/quotes">Quotes</a>
              </BreadcrumbItem>
              <BreadcrumbItem active>Create quote</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0">
            
              <Button
              className="blue-btn"
              onClick={this.handleSubmitQuote.bind(this)}
              disabled={
                    !this.state.company
                  || !this.state.ERPReference
                  || !this.state.leadReference
                  || !this.state.customer
                  || !this.state.project
                  || !this.state.quoteStage
                  || !this.state.salesEngineer
                  || !this.state.term
                  || !this.state.product}
              >
                Save
              </Button>
            
          </Col>
          <Card className="col-md-12">
            <CardHeader>
              <Row className="row align-items-center">
                <Col style={{fontWeight: "600"}}>General details</Col>
                <Col className="d-flex justify-content-md-end"></Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label for="basicinput">Company</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        onChange={this.handleChangeCompany.bind(this)}
                        options={this.state.companyOptions}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label for="basicinput">Quote Reference</Label>
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        placeholder="Auto Generated"
                        onChange={this.handleChangeQuoteRef.bind(this)}
                        disabled="disabled"
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label for="basicinput">ERP Reference</Label>
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        placeholder="ERP Reference"
                        onChange={this.handleChangeERPRef.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label for="basicinput">Lead Reference</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        placeholder={this.state.leadReference_place}
                        name="color"
                        options={this.state.leadReferenceOptions}
                        onChange={this.handleChangeLeadReference.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="12">
                    <FormGroup>
                      <Label for="basicinput">Customer Name</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        placeholder={this.state.customer_place}
                        name="color"
                        options={this.state.customerOptions}
                        onChange={this.handleChangeCustomer.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="12">
                    <FormGroup>
                      <Label for="basicinput">Project Name</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        placeholder={this.state.project_place}
                        name="color"
                        options={this.state.projectOptions}
                        onChange={this.handleChangeProject.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label for="basicinput">Quote stage</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        options={quoteStageOptions}
                        onChange={this.handleChangeQuoteStage.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label for="basicinput">Sales engineer</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        placeholder={this.state.salesEngineer_place}
                        name="color"
                        options={this.state.salesEngineerOptions}
                        onChange={this.handleChangeSalesEngineer.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label for="basicinput">Currency</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        options={optionsCurrency}
                        onChange={this.handleChangeCurrency.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <Card className="col-md-12">
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Product details</Col>
                <Col className="d-flex justify-content-md-end"></Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <Row className="filterTable">
                  <Col xl="4" lg="4" md="12">
                    <FormGroup>
                      <Label for="basicinput">Product group</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix={this.state.productCate_place}
                        // defaultValue={colourOptions[0]}
                        name="color"
                        onChange={this.handleChangeProductCategory.bind(this)}
                        options={this.state.productCategoryOptions}
                        placeholder={this.state.productCate_place}
                        value={this.state.productCategory}
                      />
                      {/* <Dropdown
                        isOpen={isOpenProductGroup}
                        onClose={this.toggleOpenProductGrpou}
                        target={
                          <Button
                            iconAfter={<ChevronDown />}
                            onClick={this.toggleOpenProductGroup}
                            isSelected={isOpenProductGroup}
                            className="filterButton"
                          >
                            {valueProductGroup
                              ? `State: ${valueProductGroup.label}`
                              : "All"}
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
                          onChange={this.onSelectChangeProductGroup}
                          options={options}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={valueProductGroup}
                        />
                      </Dropdown> */}
                    </FormGroup>
                  </Col>
                  <Col xl="4" lg="4" md="12">
                    <FormGroup>
                      <Label for="basicinput">Product name</Label>
                      <Select
                        className="basic-single"
                        // classNamePrefix={this.state.productName_place}
                        // defaultValue={colourOptions[0]}
                        name="color"
                        onChange={this.handleChangeProduct.bind(this)}
                        options={this.state.productOptions}
                        // placeholder={this.state.productName_place}
                        clearValue={true}
                        value={this.state.productName_place}
                      />
                      {/* <Dropdown
                        isOpen={isOpenProductName}
                        onClose={this.toggleOpenProductName}
                        target={
                          <Button
                            iconAfter={<ChevronDown />}
                            onClick={this.toggleOpenProductName}
                            isSelected={isOpenProductName}
                            className="filterButton"
                          >
                            {valueProductName
                              ? `State: ${valueProductName.label}`
                              : "All"}
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
                          onChange={this.onSelectChangeProductName}
                          options={options}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={valueProductName}
                        />
                      </Dropdown> */}
                    </FormGroup>
                  </Col>

                  <Col md={4} className="assignBlock text-center">
                    <Button
                      className="add-btn"
                      style={{ position: "absolute", left: 10, top: 28 }}
                      onClick={this.addToggle.bind(this)}
                      disabled={this.state.addBtn ? "" : "disabled"}
                    >
                      <img src={addIcon} />
                    </Button>
                  </Col>
                </Row>
              </Form>
              {this.state.productVariants.length > 0 ? (
                <div
                  className="tableModule flex-wrap"
                  style={
                    this.state.addProduct
                      ? { display: "flex" }
                      : { display: "none" }
                  }
                >
                  <Col md={12}>
                    <div className="tableModuleHeaderHeader d-flex flex-wrap">
                      <Col md={1}>No.</Col>
                      <Col md={1}>Product code</Col>
                      <Col md={3}>Description</Col>
                      <Col md={1}>Qty</Col>
                      <Col md={1}>Unit </Col>
                      <Col md={2}>Unit price</Col>
                      <Col md={2}>Amount</Col>
                      <Col md={1}></Col>
                    </div>
                    <div>
                      {this.state.productNames.map((product, k) => {
                        this.state.prodcutSum = 0;
                        return (
                          <div className="tableModuleHeader d-flex flex-wrap">
                            <Col md={1} style={{ fontWeight: "600"}}>
                              <span
                                className="caretCollapse"
                                onClick={() => this.toggle(product)}
                              >
                                <i class="fa fa-caret-down"></i>
                              </span>
                              {k+1}
                            </Col>
                            <Col md={8} style={{
                              display:"flex", justifyContent:"space-between",fontWeight: "500" }}
                            >
                              {product.product_details.name}
                              {(() => { if (this.state.optionalValues) {
                                let arrayById = this.state.optionalValues.findIndex(x => x.id === product.product)
                                  if (arrayById !== -1){
                                    return (<span>{this.state.optionalValues[arrayById].option}</span>)
                                  }
                              } else return null
                              })()}
                                
                            </Col>
                            {/* <Col md={2}><div>{this.state.quotedProducts.map((quote) =>quote.product==product.product ? this.state.prodcutSum+=quote.amount:this.state.prodcutSum+=0)}</div>{this.state.prodcutSum}</Col> */}
                            <Col md={2}>

                              <div>{this.productSumF(product)}</div>
                              <NumberFormat
                                value={parseInt(this.state.prodcutSum).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                              
                            </Col>
                            <Col md={1} className="last-child">
                              {" "}
                              <Dropdown
                                isOpen={this.state.dropdownOpen }
                                toggle={this.toggleMenu}
                              >
                                <DropdownToggle className="dotMenuButton">
                                  <img
                                    src={menuDotsGrey}
                                    className="img-fluid"
                                  />
                                </DropdownToggle>
                                <DropdownMenu right>
                                  <DropdownItem onMouseOver={() => this.setState({ dropOptions: true })} 
                                    onMouseOut={() => this.setState({ dropOptions: true })}>
                                    {this.state.dropOptions ?(
                                      <div style={{transform: "translate(-66px, -28px)"}}>
                                      <DropdownMenu right>
                                      <DropdownItem onClick={this.optionsA.bind(this, product)}>Option A</DropdownItem>
                                      <DropdownItem onClick={this.optionsB.bind(this, product)}>Option B</DropdownItem>
                                      <DropdownItem onClick={this.optionsC.bind(this, product)}>Option C</DropdownItem>
                                      </DropdownMenu>
                                    </div>
                                      ): null}
                                      <i class="fa fa-caret-down"
                                      style={{marginLeft: "-8px", transform: "translateX(-8px) rotate(90deg)"}}>
                                      </i>
                                      Add Options
                                  </DropdownItem>
                                  <DropdownItem onMouseOver={this.optionsToggle.bind(this)}>Noted</DropdownItem>
                                  <DropdownItem onMouseOver={this.optionsToggle.bind(this)}>Delete</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </Col>

                            {this.state.quotedProducts.map(
                              (quotedProduct, i) => {
                                return (
                                  <Collapse
                                    isOpen={
                                      this.state.collapse &&
                                      this.state.productId ==
                                        quotedProduct.product
                                    }
                                    key={i}
                                  >
                                    {product.product_details.id ==
                                    quotedProduct.product ? (
                                      <div
                                        className="tableModuleBody d-flex flex-wrap w-100"
                                        key={i}
                                      >
                                        <Col md={1}>
                                          {k + 1}
                                          {"."}
                                          {i + 1}
                                        </Col>
                                        <Col md={1}>
                                          {/* <span className="userNameColor">
                                            {quotedProduct.product_code}
                                          </span> */}
                                           <span className="liteFontColor">
                                              <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                // defaultValue={colourOptions[0]}
                                                name="color"
                                                value={"selected" || ""}
                                                placeholder={
                                                  quotedProduct.product_code
                                                }
                                                onChange={(e) =>
                                                  this.handleChangeProductCodeEdit(
                                                    quotedProduct,
                                                    e
                                                  )
                                                }
                                                options={this.state.productCodeOptions.filter(
                                                  (productcode, i) =>
                                                    this.state.productVariants.some(
                                                      (productVariant) =>
                                                        productVariant.id ===
                                                          productcode.value &&
                                                        this.state.productId ===
                                                          productVariant.product
                                                    )
                                                )}
                                              />
                                            </span>
                                        </Col>
                                        <Col md={3}>
                                          {/* <span className="userNameColor">
                                            {quotedProduct.description}
                                          </span> */}
                                             <span className="liteFontColor">
                                              <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                value={"selected" || ""}
                                                // defaultValue={colourOptions[0]}
                                                name="color"
                                                placeholder={
                                                  quotedProduct.description
                                                }
                                                onChange={(e) =>
                                                  this.handleChangeDescriptionVariantEdit(
                                                    quotedProduct,
                                                    e
                                                  )
                                                }
                                                options={this.state.descriptionOptions.filter(
                                                  (description) =>
                                                    this.state.productVariants.some(
                                                      (productVariant) =>
                                                        productVariant.id ===
                                                          description.value &&
                                                        this.state.productId ===
                                                          productVariant.product
                                                    )
                                                )}
                                              />
                                            </span>
                                        </Col>
                                        <Col md={1}>
                                          {/* <span className="userNameColor">
                                            {quotedProduct.quantity}
                                          </span> */}
                                          <span className="liteFontColor">
                                              <Input
                                                type="text"
                                                id="basicinput"
                                                name="basicinput"
                                                placeholder="Quantity"
                                                value={quotedProduct.quantity}
                                                onChange={(e) =>
                                                  this.handleChangeQuantityEdit(
                                                    quotedProduct,
                                                    e
                                                  )
                                                }
                                              />
                                            </span>
                                        </Col>
                                        <Col md={1}>
                                          {/* <span className="userNameColor">
                                            {" "}
                                            {quotedProduct.unit_place}
                                          </span> */}
                                           <span className="liteFontColor">
                                              {" "}
                                              <span className="userNameColor">
                                                {" "}
                                                <Select
                                                  className="basic-single"
                                                  classNamePrefix="select"
                                                  // defaultValue={colourOptions[0]}
                                                  name="color"
                                                  value={quotedProduct.unit}
                                                  // placeholder={
                                                  //   quotedProduct.unit_details
                                                  //     .name
                                                  // }
                                                  placeholder={
                                                    quotedProduct.unit_place
                                                  }
                                                  onChange={(e) =>
                                                    this.handleChangeUnitEdit(
                                                      quotedProduct,
                                                      e
                                                    )
                                                  }
                                                  options={
                                                    this.state.unitOptions
                                                  }
                                                />
                                              </span>
                                            </span>
                                        </Col>
                                        <Col md={2}>
                                          <span className="userNameColor">
                                            {quotedProduct.runit_price}
                                          </span>
                                        </Col>
                                        <Col md={2}>
                                          <span className="liteFontColor">
                                          <NumberFormat
                                value={parseInt(quotedProduct.amount).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                                            
                                          </span>
                                        </Col>
                                        <Col md={1}>
                                          {" "}
                                          <Dropdown
                                            isOpen={
                                              this.state.dropdownOpen1 &&
                                              quotedProduct.id ==
                                                this.state.quoteProductId
                                            }
                                            toggle={() =>
                                              this.toggleMenu1(quotedProduct)
                                            }
                                          >
                                            <DropdownToggle className="dotMenuButton">
                                              <img
                                                src={menuDotsGrey}
                                                className="img-fluid"
                                              />
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                              <DropdownItem
                                                onClick={() =>
                                                  this.handleDuplicateQuotedProduct(
                                                    quotedProduct
                                                  )
                                                }
                                              >
                                                Duplicate
                                              </DropdownItem>
                                              <DropdownItem>Noted</DropdownItem>
                                              <DropdownItem
                                                onClick={() =>
                                                  this.handleDeleteQuotedProduct(
                                                    quotedProduct
                                                  )
                                                }
                                              >
                                                Delete
                                              </DropdownItem>
                                            </DropdownMenu>
                                          </Dropdown>
                                        </Col>
                                      </div>
                                    ) : null}
                                  </Collapse>
                                );
                              }
                            )}
                            
                            {this.state.productVariants
                              .slice(0, 1)
                              .map((variant, i) => {
                                return (
                                  <Collapse
                                    isOpen={
                                      this.state.collapse &&
                                      this.state.productId ==
                                        product.product_details.id
                                    }
                                  >
                                    {/* {product.product_details.id ==
                                variant.product ? ( */}

                                    <div className="tableModuleBody d-flex flex-wrap">
                                      <Col md={1}>{/* B */}</Col>
                                      <Col md={1}>
                                        <span className="liteFontColor">
                                          <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            // defaultValue={colourOptions[0]}
                                            name="color"
                                            value={"selected" || ""}
                                            placeholder={this.state.productCode}
                                            onChange={(e) =>
                                              this.handleChangeProductCode(
                                                product,
                                                e
                                              )
                                            }
                                            options={this.state.productCodeOptions.filter(
                                              (productcode, i) =>
                                                this.state.productVariants.some(
                                                  (productVariant) =>
                                                    productVariant.id ===
                                                      productcode.value &&
                                                    this.state.productId ===
                                                      productVariant.product
                                                )
                                            )}
                                          />
                                        </span>
                                      </Col>
                                      <Col md={3}>
                                        <span className="liteFontColor">
                                          <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            // defaultValue={colourOptions[0]}
                                            name="color"
                                            placeholder={
                                              this.state.descriptionVariant
                                            }
                                            value={"selected" || ""}
                                            onChange={(e) =>
                                              this.handleChangeDescriptionVariant(
                                                product,
                                                e
                                              )
                                            }
                                            options={this.state.descriptionOptions.filter(
                                              (description) =>
                                                this.state.productVariants.some(
                                                  (productVariant) =>
                                                    productVariant.id ===
                                                      description.value &&
                                                    this.state.productId ===
                                                      productVariant.product
                                                )
                                            )}
                                          />
                                        </span>
                                      </Col>
                                      <Col md={1}>
                                        <span className="liteFontColor">
                                          <Input
                                            type="text"
                                            id="basicinput"
                                            name="basicinput"
                                            placeholder="Qty"
                                            value={this.state.quantity}
                                            onChange={this.handleChangeQuantity.bind(
                                              this
                                            )}
                                          />
                                        </span>
                                      </Col>
                                      <Col md={1}>
                                        <span className="liteFontColor">
                                          {" "}
                                          <span className="userNameColor">
                                            {" "}
                                            <Select
                                              className="basic-single"
                                              classNamePrefix="select"
                                              // defaultValue={colourOptions[0]}
                                              name="color"
                                              value={"selected" || ""}
                                              placeholder={
                                                this.state.unit_place
                                              }
                                              onChange={this.handleChangeUnit.bind(
                                                this
                                              )}
                                              options={this.state.unitOptions}
                                            />
                                          </span>
                                        </span>
                                      </Col>
                                      <Col md={2}>
                                        <span className="liteFontColor">
                                          <Input
                                            type="text"
                                            id="basicinput"
                                            name="basicinput"
                                            placeholder="RUnit Price"
                                            value={this.state.RunitPrice}
                                            // onChange={this.handleChangeRUnitPrice.bind(this)}
                                          />
                                        </span>
                                      </Col>
                                      <Col md={2}>
                                        <span className="liteFontColor">
                                          {this.state.RunitPrice *
                                            this.state.quantity}
                                        </span>
                                      </Col>
                                      <Col md={1}>
                                        {" "}
                                        <Button
                                          className="add-btn"
                                          onClick={() =>
                                            this.handleQuotedProductCreate(
                                              product
                                            )
                                          }
                                          style={{ marginBottom: 0 }}
                                        >
                                          <img src={addIcon} />
                                        </Button>
                                      </Col>
                                    </div>

                                    {/* ) : null} */}
                                  </Collapse>
                                );
                              })}
                          </div>
                        );
                      })}
                      <div className="d-flex flex-wrap productTableBody totalPrice">
                        <Col md={1}></Col>
                        <Col md={2}></Col>
                        <Col md={2}></Col>
                        <Col md={1}></Col>
                        <Col md={1}> </Col>
                        <Col md={2}>
                          <div className="text-right">Total :</div>
                          <div className="text-right">Discount :</div>
                          <div className="text-right">Net amount (QAR) :</div>
                        </Col>
                        <Col md={2}>
                          <div className="bl0"> <NumberFormat
                                value={parseInt(this.state.totalAmount).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                              /></div>
                          <div className="bl0">
                            0.00 <hr style={{ margin: 0 }} />
                          </div>
                          <div className="bl0">    <NumberFormat
                                value={parseInt(this.state.totalAmount).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                              /></div>
                        </Col>
                        <Col md={1}></Col>
                      </div>
                    </div>
                  </Col>
                </div>
              ) : null}
            </CardBody>
          </Card>
          <Card className="col-md-12">
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Terms & conditions</Col>
                <Col className="d-flex justify-content-md-end"></Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col xl="3" lg="3" md="12">
                    <FormGroup>
                      <Label for="basicinput">Term</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        options={this.state.termsOptions}
                        onChange={this.handleChangeTerms.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="12">
                    <FormGroup>
                      <Label for="basicinput">Description</Label>
                      <Input
                        type="text"
                        id="basicinput"
                        name="basicinput"
                        placeholder="Quote Reference"
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="1" lg="1" md="12">
                    {" "}
                    <Button
                      className="add-btn"
                      style={{ position: "relative", top: 30 }}
                      onClick={this.addTCToggle.bind(this)}
                    >
                      <img src={addIcon} />
                    </Button>
                  </Col>
                </Row>
                {this.state.addTC ? (
                  <Row>
                    <Col xl="3" lg="3" md="12">
                      <FormGroup>
                        <Label for="basicinput">Term</Label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          // defaultValue={colourOptions[0]}
                          name="color"
                        />
                      </FormGroup>
                    </Col>
                    <Col xl="6" lg="6" md="12">
                      <FormGroup>
                        <Label for="basicinput">Description</Label>
                        <Input
                          type="text"
                          id="basicinput"
                          name="basicinput"
                          placeholder="Quote Reference"
                          onChange={this.handleChangeDescription.bind(this)}
                        />
                      </FormGroup>
                    </Col>
                    <Col xl="1" lg="1" md="12">
                      {" "}
                      <Button
                        className="add-btn"
                        style={{ position: "relative", top: 30 }}
                        onClick={this.addTCToggle.bind(this)}
                      >
                        <img src={addIcon} />
                      </Button>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
              </Form>
            </CardBody>
          </Card>
          <div className="mT-13 col-md-12 d-flex">
            <Col md={6}></Col>
            <Col md={6} className="justify-content-md-end d-flex">
              <Button
                className="blue-btn mR-30"
                onClick={this.handleSubmitQuote.bind(this)}
                disabled={
                    !this.state.company
                  || !this.state.ERPReference
                  || !this.state.leadReference
                  || !this.state.customer
                  || !this.state.project
                  || !this.state.quoteStage
                  || !this.state.salesEngineer
                  || !this.state.term
                  || !this.state.product}
              >
                Save
              </Button>
            </Col>
          </div>

          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleConfirmation}
            className="confirmation"
            backdrop={false}
          >
            <ModalHeader toggle={this.toggleConfirmation}></ModalHeader>
            <ModalBody className="d-flex justify-content-center align=items-center">
              <div>
                <img src={confirm} className="d-block mx-auto" />
                <h1 className="text-center">Quote has been created</h1>
                <p className="text-center">
                  You can download by clicking the download button below
                </p>
                <div className="d-flex flex-wrap">
                  <Col>
                    <Button className="blue-btn" onClick={this.handlePdfDiv.bind(this)} style={{position:"relative"}}>
                        <img src={downloadWhite} style={{position: "absolute", left: "19px"}}/>
                      Download
                    </Button>
                  </Col>
                  <Col>
                    <Button className="copy-btn" style={{position:"relative"}}>
                      <img src={copy} style={{position: "absolute", left: "1px"}}/>
                      Copy reference
                    </Button>
                  </Col>
                </div>
              </div>
            </ModalBody>
          </Modal>
          {this.state.pdfDiv ? (
            <div id="pdfDiv" style={{backgroundColor:"white", color: "Black"}}>
              <div className="super-container" id="super-container">


            <div className="container" id="container" style={{width:"633px"}}>

              <header className="header" style={{backgroundColor:"#8080801c"}}>
                <div className="img-container">
                  <img src={this.state.pdfLogo} alt="" className="compLogo" />
                </div>

                <div className="head-right-section">
                  <h4 className="headcompName">{this.state.pdfLabel}</h4>
                  <h5 style={{fontWeight: "600", fontSize: "10px"}}>{this.state.pdfAddress1}</h5>
                  <h5 style={{fontWeight: "600", fontSize: "10px", marginTop: "-4px"}}>{this.state.pdfAddress2}</h5>
                  <h5 style={{fontWeight: "600", fontSize: "10px", lineHeight: ".5"}}>PH:+974 {this.state.pdfPhone} FAX:+974 {this.state.pdfFax}</h5>
                </div>
              </header>
          

              <section className="quotation">
                <h4 className="Heading">QUOTATION</h4>
                <div className="tables">
                  <div className="table1">
                     <table cellpadding="20" cellspacing="5">
                    
                          <tbody>
                            <tr>
                              <td className="td1">To</td>
                              <td>:</td>
                              <td style={{padding:"5px", fontWeight: "500"}}>{this.state.pdfCustomer}</td>
                              </tr>

                              <tr>
                              <td className="td1">Address</td>
                              <td>:</td>
                              <td style={{padding:"5px", fontWeight: "500"}}>{this.state.custAd1}, {this.state.custAd2}</td>
                              </tr>

                              <tr>
                              <td className="td1">Phone No.</td>
                              <td>:</td>
                              <td style={{padding:"5px", fontWeight: "500"}}> {this.state.custPhone}</td>
                              </tr>

                              <tr>
                              <td className="td1">E-mail</td>
                              <td>:</td>
                              <td style={{padding:"5px", fontWeight: "500"}}> {this.state.custEmail}</td>
                              </tr>
                          </tbody>
                  
                    </table>
                  </div>

                  <div className="table2">
                   <table cellpadding="20" cellspacing="5">
                    
                          <tbody>
                            <tr className="padFontW">
                              <td className="td1">Quotation No. </td>
                              <td>:</td>
                              <td style={{padding:"5px", fontWeight: "500"}}>{this.state.pdfQuoteReference}</td>
                              </tr>

                              <tr>
                              <td className="td1">Date</td>
                              <td>:</td>
                              <td style={{padding:"5px", fontWeight: "500"}}>{moment().format("DD-MMM-YYYY")}</td>
                              </tr>

                              <tr>
                              <td className="td1">Lead/Ref No.</td>
                              <td>:</td>
                              <td style={{padding:"5px", fontWeight: "500"}}>{this.state.leadLabel}</td>
                              </tr>

                              
                          </tbody>
                  
                    </table>
                  </div>
                </div>

                <div className="project">
                  <span className="boldproj">Project</span> : {this.state.pdfProject}</div>

                <div className="line"></div>
                

              </section>

              <section className="third-section">
                <div className="attention"><span className="attbold">Attention</span> : {this.state.pdfLeadContact} </div>

                <p className="para">{this.state.description}</p>
              </section>

              <table className="tabPadd">

                <tr className="table-1-headers" >
                    <td className="border tdPadd sl">Sl No.</td>
                    <td className="border tdPadd">Description</td>
                    <td className="border tdPadd">Quantity</td>
                    <td className="border tdPadd unit">Unit</td>
                    <td className="border tdPadd unitPrice">Unit Price</td>
                    <td className="border tdPadd Amount">Amount</td>
                </tr>
                {
                  this.state.pdfProductNames.length > 0 ? 
                    this.state.pdfProductNames.map((product, k) => {
                      return (
                        <>
                        <tr className="dataRows">
                          <td className="border bottomNone">{k+1}</td>
                          <td className="border bottomNone desc" style={{textAlign:"left"}}>{product.label}</td>
                          <td className="border bottomNone"></td>
                          <td className="border bottomNone"></td>
                          <td className="border bottomNone"></td>
                          <td className="border bottomNone"></td>
                        </tr>
                        {this.state.pdfProductVariants.length > 0 ?
                          product.variants_quoted_details.map((quotedProduct , i)=>{
                              return (
                                  <tr className="dataRows"> 
                                    <td className="border bottomNone">{k+1}.{i+1}</td>
                                    <td className="border bottomNone desc" style={{textAlign:"right"}}>{quotedProduct.description.substr(0,30)}</td>
                                    <td className="border bottomNone">{quotedProduct.quantity}</td>
                                    <td className="border bottomNone">{quotedProduct.unit_place.substr(0,5)}</td>
                                    <td className="border bottomNone">{quotedProduct.runit_price}</td>
                                    <td className="border bottomNone">{quotedProduct.variant_amount}</td>
                                  </tr>
                              )                          
                          })
                        : null}
                        </>
                      );
                    })
                  : null
                }
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{fontWeight: "400", fontSize: "12px", textAlign:"center"}}>Total</td>
                    <td style={{fontWeight: "400", fontSize: "12px", textAlign:"center"}}>
                    {this.state.totalAmount ? 
                      this.state.totalAmount + ".00": null}
                    </td>
                  </tr>
                      
              </table>

              <footer className="footer">
                <div className="left-portion" style={{fontSize: "small", fontWeight: "500"}}>{moment().format("Do MMMM YYYY h:mm a")}</div>
                <div className="center-portion" style={{fontSize: "small", fontWeight: "500"}}>Page 1 of 2</div>
                <div className="right-portion" style={{fontSize: "small", fontWeight: "500"}}>By: {localStorage.getItem("user_name")}</div>
              </footer>
                
            </div>
        
              </div>
            </div>
            ): null}
          
        </div>
      </Fragment>
    );
  }
}
// styled components

// const Menu = props => {
//   const shadow = "hsla(218, 50%, 10%, 0.1)";
//   return (
//     <div
//       css={{
//         backgroundColor: "white",
//         borderRadius: 4,
//         boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
//         marginTop: 8,
//         position: "absolute",
//         zIndex: 2
//       }}
//       {...props}
//     />
//   );
// };
// const Blanket = props => (
//   <div
//     css={{
//       bottom: 0,
//       left: 0,
//       top: 0,
//       right: 0,
//       position: "fixed",
//       zIndex: 1
//     }}
//     {...props}
//   />
// );
// const Dropdown = ({ children, isOpen, target, onClose }) => (
//   <div css={{ position: "relative" }}>
//     {target}
//     {isOpen ? <Menu>{children}</Menu> : null}
//     {isOpen ? <Blanket onClick={onClose} /> : null}
//   </div>
// );
// const Svg = p => (
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     focusable="false"
//     role="presentation"
//     {...p}
//   />
// );
// const DropdownIndicator = () => (
//   <div css={{ color: colors.neutral20, height: 24, width: 32 }}>
//     <Svg>
//       <path
//         d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
//         fill="currentColor"
//         fillRule="evenodd"
//       />
//     </Svg>
//   </div>
// );
// const ChevronDown = () => (
//   <Svg style={{ marginRight: -6 }}>
//     <path
//       d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
//       fill="currentColor"
//       fillRule="evenodd"
//     />
//   </Svg>
// );
const mapStateToProps = (state) => ({
  lead_list: state.leadReducer.leadList,
  quote_list: state.quoteReducer.quoteList,
  customer_list: state.customerReducer.customersList,
  project_list: state.projectReducer.projectList,
  sales_engg_user: state.userReducer.salesEnggUser,
  term_list: state.quoteReducer.termList,
  quote_create: state.quoteReducer.createQuote,
  company_details: state.companyDetailsReducer.companyDetails,
  product_category_list: state.productReducer.productCategoryList,
  product_list: state.productReducer.productList,
  product_variants: state.productReducer.productVariant,
  product_variant_list: state.productReducer.productVariantList,
  unit_list: state.unitsReducer.unitsList,
  lead_quote_data: state.leadReducer.leadQuoteData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchLeadList,
      fetchQuoteList,
      fetchCustomerList,
      fetchProjectList,
      salesEngineerFilter,
      termDetails,
      quoteCreation,
      companyDetails,
      productCategoryList,
      fetchProductList,
      fetchProductVariant,
      fetchUnitsList,
      fetchProductVariantList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(QuoteCreate);
