// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import { fetchQuote } from "../../redux/sagas/quotes/fetchQuote";
import { companyDetails } from "../../redux/sagas/companyDetails/companyDetails";
import { fetchProjectList } from "../../redux/sagas/projects/fetchProjectList";
import { quoteUpdation } from "../../redux/sagas/quotes/fetchUpdateQuote";
import { salesEngineerFilter } from "../../redux/sagas/users/fetchSalesEngineer";
import { fetchCustomerList } from "../../redux/sagas/customers/fetchCustomers";
import { productCategoryList } from "../../redux/sagas/products/fetchProductCategory";
import { fetchProductList } from "../../redux/sagas/products/fetchProductList";
import { fetchProductVariant } from "../../redux/sagas/products/fetchProductVariant";
import { fetchProductVariantList } from "../../redux/sagas/products/fetchProductVariantList";
import { termDetails } from "../../redux/sagas/quotes/fetchTermDetails";
import { fetchUnitsList } from "../../redux/sagas/units/fetchUnits";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NumberFormat from "react-number-format";
import confirm from "../../assets/img/confirm.png";
import downloadWhite from "../../assets/img/downloadWhite.png";
import copy from "../../assets/img/copy.png";
import moment from "moment";
import {
  Card,
  CardTitle,
  CardText,
  CardHeader,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
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
  Collapse,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Select from "react-select";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import { Home, Search } from "react-feather";
import menuDots from "../../assets/img/menuDots.png";
import menuDotsGrey from "../../assets/img/menudotsGrey.png";
import addIcon from "../../assets/img/addIcon.png";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


let productStatusOptions = [
  { value: "LR", label: "LOI Received" },
  { value: "QS", label: "Quotation Submitted" },
  { value: "SA", label: "Submittal Approved" },
  { value: "OA", label: "Order Awaited" },
  { value: "OR", label: "Order Received" },
  { value: "LT", label: "Lost" },
];
let companyOptions = [];
let projectOptions = [];
let customerOptions = [];
let termsOptions = [];
let quoteStageOptions = [
  { value: 1, label: "Stage One" },
  { value: 2, label: "Stage Two" },
  { value: 3, label: "Stage Three" },
  { value: 4, label: "Stage Four" },
  { value: 5, label: "Stage Five" },
  { value: 6, label: "Stage Six" },
];
let salesEngineerOptions = [];
let productCategoryOptions = [];
let productOptions = [];
let productCodeOptions = [];
let descriptionOptions = [];
let unitOptions = [];
let uniqProduct = [];
let productArrayVariant = [];
var short = require("short-uuid");
class QuoteEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addBtn: false,
      collapse: false,
      dropdownOpen: false,
      dropdownOpen1: false,
      dropOptions: false,
      optionalValues : [],
      addProduct: true,
      productStatus: "",
      company: "",
      quoteReference: "",
      ERPReference: "",
      project: "",
      customer: "",
      quoteStage: "",
      salesEngineer: "",
      term: "",
      productCategory: "",
      product: "",
      quantity: 1,
      companyOptions: [],
      totalAmount: 0,
      projectOptions: [],
      customerOptions: [],
      salesEngineerOptions: [],
      termsOptions: [],
      productCategoryOptions: [],
      productOptions: [],
      productVariants: [],
      quotedProducts: [],
      productCodeOptions: [],
      descriptionOptions: [],
      unitOptions: [],
      pdfDiv: false,
      pdfAddress1: "",
      pdfAddress2: "",
      pdfFax: "",
      pdfLabel: "",
      pdfLogo: "",
      pdfPhone: "",
      pdfCustomer: "",
      pdfSales: "",
      custPhone: "",
      custAd1: "",
      custAd2: "",
      custEmail: "",
      pdfProject: "",
      pdfProductVariants: [],
      pdfProductNames: [],
      prodcutSum: 0,
      filterObj: {
        page: 1,
        activePage: 1,
      },
    };
    let pathArray = window.location.pathname.split("/");
    let quoteId = pathArray[2];
    this.props.fetchQuote(quoteId);
    this.props.companyDetails();
    this.props.fetchProjectList();
    this.props.fetchProductList();
    this.props.salesEngineerFilter();
    this.props.fetchCustomerList();
    this.props.productCategoryList();
    this.props.fetchProductVariantList();
    this.props.termDetails();
    this.props.fetchUnitsList();
  }
  componentWillReceiveProps() {
    setTimeout(() => {
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
      if (this.props.project_list) {
        this.props.project_list.map((project, key) => {
          var obj = {};

          obj["value"] = project.id;
          obj["label"] = project.name;
          projectOptions.push(obj);
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
          if (
            !this.state.productVariants.some(
              (productVariant) => productVariant.id === variants.id
            )
          )
            this.state.productVariants.push(variants);
        });
      }
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

    

      this.setState({ companyOptions: companyOptions });
      this.setState({ projectOptions: projectOptions });
      this.setState({ customerOptions: customerOptions });
      this.setState({ salesEngineerOptions: salesEngineerOptions });
      this.setState({ termsOptions: termsOptions });
      this.setState({ productCategoryOptions: productCategoryOptions });
      this.setState({ productOptions: productOptions });
      this.setState({ productCodeOptions: productCodeOptions });
      this.setState({ descriptionOptions: descriptionOptions });
      this.setState({ unitOptions: unitOptions });
      companyOptions = [];
      projectOptions = [];
      customerOptions = [];
      salesEngineerOptions = [];
      termsOptions = [];
      productCategoryOptions = [];
      productOptions = [];
      productCodeOptions = [];
      descriptionOptions = [];
      unitOptions = [];

      if (this.state.quotedProducts && uniqProduct.length < 1) {
        this.state.quotedProducts.map((qP) => {
          // this.props.fetchProductVariant(qP.product);
          if (uniqProduct.indexOf(qP.product) === -1)
            uniqProduct.push(qP.product);
        });
        if (uniqProduct) {
          uniqProduct.map((prod) => {
            this.props.fetchProductVariant(prod);
          });
        }
      }
      setTimeout(() => {
        if (this.props.product_variants && !this.props.quote_data) {
          console.log("mnmnmnmnmnmmmmmm");

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

          productArrayVariant = this.state.productVariants.filter(
            (ele, ind) =>
              ind ===
              this.state.productVariants.findIndex((elem) =>
                elem.product_details && ele.product_details
                  ? elem.product_details.id === ele.product_details.id
                  : null
              )
          );
          let obj = {};

          // if(productArray.length>0){
          //   productArray.map((product)=>{
          //     obj["id"] = product.id;
          //     if(product.product_details)
          //     obj["name"] = product.product_details.name
          //     obj["product"] = product.product;
          //     obj["status"] = product.status;
          //     obj["product_specification"] = product.product_specification;
          //     obj["expected_value"] = product.expected_value;
          //     // if (variant.quantity == "") obj["quantity"] = 1;
          //     // else obj["quantity"] = variant.quantity;
          //     obj["eob_date"] = product.eob_date;
          //     obj["reminder_date"] = product.reminder_date;
          //     obj["amount"] = product.amount;
          //     obj["quoted_avg_cost"] = product.quoted_avg_cost;

          //     // this.state.totalAmount += obj["amount"];
          //   })
          // }
          productArrayVariant.map((product) => {
            if (product.product === this.state.product)
              this.state.productNames.push(product);
          });
          // if (productArray.some((product) => product.product === this.state.product))

          obj = {};

          this.setState({ addProduct: true });
        }
      }, 3000);
      console.log(
        "bbbbbbbbbbbbbb",
        this.props.quote_data,
        this.state.productVariants.length
      );
      if (this.props.quote_data && productArrayVariant.length < 1) {
        this.state.totalAmount = 0;
        let sampleArray = [];
        let variantArray = [];
        this.props.quote_data.quoted_product_details.map((product, i) => {
          if (product.amount) {
            var obj = {};
            // obj["id"] = product.id;
            // obj["name"] = product.product_details.name
            // obj["product"] = product.product;
            // obj["status"] = product.status;
            // obj["product_specification"] = product.product_specification;
            // obj["expected_value"] = product.expected_value;
            // // if (variant.quantity == "") obj["quantity"] = 1;
            // // else obj["quantity"] = variant.quantity;
            // obj["eob_date"] = product.eob_date;
            // obj["reminder_date"] = product.reminder_date;
            obj["amount"] = product.amount;
            // obj["quoted_avg_cost"] = product.quoted_avg_cost;
            console.log(
              "cdcdcdcdcdcdcdcdc",
              this.state.totalAmount,
              product,
              product.amount
            );
            this.state.totalAmount += product.amount;
            sampleArray.push(product);
          }
          if (product.variants_quoted_details) {
            product.variants_quoted_details.map((variant) => {
              let obj1 = {};
              obj1["id"] = variant.pdt_variant;
              obj1["pdt_variant"] = variant.pdt_variant;
              obj1["product"] = variant.variant_details.product;
              obj1["product_code"] = variant.variant_details.product_code;
              obj1["description"] = variant.variant_details.description;
              obj1["quantity"] = variant.quantity;
              obj1["unit"] = variant.variant_details.unit_details.name;
              obj1["runit_price"] = variant.variant_details.runit_price;
              obj1["amount"] = variant.variant_amount;
              variantArray.push(obj1);
              obj1 = {};
            });
            this.setState({ quotedProducts: variantArray });
          }

          // sampleArray=[]
          // this.forceUpdate();
          // this.setState({ productCode: "" });
          // this.setState({ descriptionVariant: "" });
          // this.setState({ quantity: "" });
          // this.setState({ RunitPrice: "" });
          obj = {};
          // this.state.quotedProducts.push(variant)
        });
        this.setState({ productNames: sampleArray });
      }
      // if(this.props.product_variants){
      //   this.props.product_variants.results.map((variant, key) => {
      //     if(!this.state.productVariants.some((productVariant) => productVariant.id===variant.id))
      //     this.state.productVariants.push(variant)
      //   })
      // }
      // if(this.props.quote_data){
      //   this.props.quote_data.product_variant_details.map((quotedProduct) =>{

      //   })
      // }
      // this.state.productNames = this.state.productVariants.filter( (ele, ind) => ind === this.state.productVariants.findIndex( elem => elem.product_details.id === ele.product_details.id))
      if (this.props.quote_data) {
        this.setState({ company: this.props.quote_data.company });
        this.setState({
          company_place: this.props.quote_data.company_details.name,
        });
        this.setState({ quoteReference: this.props.quote_data.reference_no });
        this.setState({ ERPReference: this.props.quote_data.erp_reference });
        this.setState({ project: this.props.quote_data.lead_details.project });
        this.setState({
          project_place: this.props.quote_data.lead_details.project_details
            .name,
        });
        this.setState({
          customer: this.props.quote_data.lead_details.customer,
        });
        this.setState({
          customer_place: this.props.quote_data.lead_details.customer_details
            .name,
        });
        this.setState({ quoteStage: this.props.quote_data.stage });
        switch (this.props.quote_data.stage) {
          case 1:
            this.setState({ quoteStage_place: "Stage One" });
            break;
          case 2:
            this.setState({ quoteStage_place: "Stage Two" });
            break;
          case 3:
            this.setState({ quoteStage_place: "Stage Three" });
            break;
          case 4:
            this.setState({ quoteStage_place: "Stage Four" });
            break;
          case 5:
            this.setState({ quoteStage_place: "Stage Five" });
            break;
          case 6:
            this.setState({ quoteStage_place: "Stage Six" });
            break;
          default:
          // code block
        }

        this.setState({
          salesEngineer: this.props.quote_data.lead_details.sales_engineer,
        });
        this.setState({
          salesEngineer_place: this.props.quote_data.lead_details
            .sales_engineer_details.username,
        });
        this.setState({ term: this.props.quote_data.terms });
        this.setState({
          currency: this.props.quote_data.currency,
        });
      }
    }, 1000);
    if (this.props.quote_update) this.toggleConfirmation();
  }
  optionsToggle() {
    if (this.state.dropOptions) {
      this.setState ({ dropOptions: false})
    }
  }

  handlePdfDiv() {
    html2canvas(document.querySelector('#pdfDiv'), {useCORS: true})
      .then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      var width = (canvas.style.width.substr(0, 3))
      var height = (canvas.style.height.substr(0,3))
     const pdf = new jsPDF("p","pt", [595, 800]);
      // var height = pdf.internal.pageSize.getHeight();
      // var width = pdf.internal.pageSize.getWidth();     
      pdf.addImage(imgData, "JPEG", 0, 0, 595, 800);
      pdf.save(`${new Date().toISOString()}.pdf`);
      this.state.pdfDiv = false;
    });
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
  }
  toggleConfirmation = () => {
    this.setState({   
      modal: !this.state.modal,
    });
  };
  optionsB(product) {
    let a = this.state.optionalValues.findIndex(x => x.id === product.product);

     if(a !== -1){
      return this.state.optionalValues[a].option = 'Option B'
      this.forceUpdate() 
      console.log(this.state.optionalValues);
     } else return this.setState({
      optionalValues: [ ...this.state.optionalValues, {
        'id': product.product,
        'option': "Option B"
      }],
      dropOptions: false,
      dropdownOpen: false,
    });

  }
  optionsC(product) {
    let a = this.state.optionalValues.findIndex(x => x.id === product.product);

     if(a !== -1){
      return this.state.optionalValues[a].option = 'Option C'
      this.forceUpdate() 
      console.log(this.state.optionalValues);
     } else return this.setState({
      optionalValues: [ ...this.state.optionalValues, {
        'id': product.product,
        'option': "Option C"
      }],
      dropOptions: false,
      dropdownOpen: false,
    });
  }


  toggle = (product) => {
    this.setState({ productId: product.product });
    this.setState({ collapse: !this.state.collapse });
  };
  toggleMenu = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
      dropOptions: false
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
    pdfPhone: e.phone });
  }
  handleChangeQuoteRef(e) {
    this.setState({ quoteReference: e.target.value });
  }
  handleChangeERPRef(e) {
    this.setState({ ERPReference: e.target.value });
  }
  handleChangeProject(e) {
    this.setState({ project: e.value, pdfProject: e.label });
  }
  handleChangeCustomer(e) {
    this.setState({ customer: e.value, 
      pdfCustomer: e.label,
      custAd2: e.address2,
      custAd1: e.address1,
      custEmail: e.email,
      custPhone: e.phone });
  }
  handleChangeQuoteStage(e) {
    this.setState({ quoteStage: e.value });
  }
  handleChangeSalesEngineer(e) {
    this.setState({ salesEngineer: e.value , pdfSales: e.label});
  }
  handleChangeCurrency(e) {
    this.setState({ currency: e.value });
  }
  handleChangeTerms(e) {
    this.setState({ term: e.value });
  }
  addToggle() {
    this.props.fetchProductVariant(this.state.product);
    // this.setState(prevState => ({
    //   addProduct: !prevState.addProduct
    // }));
    this.state.addBtn = false;
  }
  handleChangeProductCategory(e) {
    let sampleArray = [];
    let productArray = [];
    sampleArray = this.props.product_list.results.filter((ele, ind) => {
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
    this.setState({ productCategory: e.value });
  }
  handleChangeProductCode(product, e) {
    this.setState({ productCode: e.label });
    this.setState({ newVariant: e.value });
    this.state.productVariants.map((variants) => {
      if (variants.id == e.value) {
        this.setState({ RunitPrice: variants.min_sales_price });
        this.setState({ descriptionVariant: variants.description });
        this.setState({ unit: variants.unit });
        this.setState({ unit_place: variants.unit_details.name });
      }
    });
  }
  handleChangeProductStatus(e) {
    this.setState({ productStatus: e.value });
  }
  handleChangeProductCodeEdit(product, e) {
    product.product_code = e.label;
    this.state.productVariants.map((variants) => {
      if (variants.id == e.value) {
        product.runit_price = variants.min_sales_price;
        product.description = variants.description;
        product.unit = variants.unit;
        product.amount = variants.min_sales_price * parseInt(product.quantity);
      }
    });
    this.setState({ newVariant: e.value });
  }
  handleChangeDescriptionVariant(product, e) {
    this.setState({ descriptionVariant: e.label });
    this.setState({ newVariant: e.value });
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
  handleChangeProduct(e) {
    this.state.product = e.value;
    this.setState({ addBtn: true });
  }
  handleQuotedProductCreate(product) {
    console.log("vrrrrrrrrrrrrrrrr", product);
    let session_guid = short.generate();
    //  let sampleArray=[]
    var obj = {};
    obj["id"] = session_guid;
    obj["product"] = product.product;
    obj["pdt_variant"] = this.state.newVariant;
    obj["product_code"] = this.state.productCode;
    obj["description"] = this.state.descriptionVariant;
    obj["quantity"] = this.state.quantity;
    obj["runit_price"] = this.state.RunitPrice;
    obj["unit"] = this.state.unit_place;
    // obj["status"] = "LR";
    obj["amount"] = this.state.quantity * this.state.RunitPrice;
    this.state.quotedProducts.push(obj);
    // this.setState({quotedProducts:sampleArray})
    this.state.totalAmount += obj["amount"];

    // sampleArray=[]
    this.forceUpdate();
    this.setState({ productCode: "" });
    this.setState({ descriptionVariant: "" });
    this.setState({ quantity: 1 });
    this.setState({ RunitPrice: "" });
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
    // obj["status"] = "LR";
    obj["amount"] = quotedProduct.amount;
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
  handleEditQuote() {
    let productDetails = [];
    if (this.state.productNames) {
      this.state.productNames.map((product) => {
        let obj = {};
        obj["product"] = product.product;
        // obj["status"]= "LR";
        obj["amount"] = product.amount;
        let productVariantDetails = [];
        this.state.quotedProducts.map((quotedProduct) => {
          if (product.product == quotedProduct.product) {
            let obj1 = {};
            obj1["pdt_variant"] = quotedProduct.pdt_variant;
            obj1["quantity"] = quotedProduct.quantity;
            obj1["variant_amount"] = quotedProduct.amount;
            productVariantDetails.push(obj1);
            obj1 = {};
          }
        });
        obj["variants_quoted_details"] = productVariantDetails;
        productDetails.push(obj);
        obj = {};
      });
    }
    // this.state.pdfDiv = true;
    // this.state.modal = true;
    let bodyData = {
      reference_no: this.state.quoteReference,
      erp_reference: this.state.ERPReference,
      company: this.state.company,
      stage: this.state.quoteStage,
      currency: this.state.currency,
      terms: this.state.term,
      //   revisions:[],
      //   revision_details: [{
      //     revision_by: 1,
      //     revision_date: revision_date,
      //     file: null
      // }],
      quoted_product_details: productDetails,
    };
    let pathArray = window.location.pathname.split("/");
    let quoteId = pathArray[2];
    this.props.quoteUpdation(bodyData, quoteId);
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
    const optionsCurrency = [
      { value: "QAR", label: "QAR" },
      { value: "USD", label: "USD" },
      { value: "INR", label: "INR" },
    ];
    let quoteDate = "";
    let leadReference = "";
    if (this.props.quote_data){
      quoteDate = this.props.quote_data.quoted_date;
      leadReference = this.props.quote_data.lead_details.reference_no;
    }
    if (this.props.quote_update) return <Redirect to="/quotes"></Redirect>;
    return (
      <Fragment>
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
            <BreadcrumbItem active>
              {this.props.quote_data
                ? this.props.quote_data.reference_no
                : null}
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col md={6} className="justify-content-end d-flex pR0"></Col>
        <Card className="quoteEdit editModule">
          <CardHeader>
            <Row className="row align-items-center">
              <Col style={{fontWeight: "600"}}> {this.props.quote_data
                ? this.props.quote_data.reference_no
                : null}</Col>
              <Col className="d-flex justify-content-md-end">
                {" "}
                <span>
                  <span
                    style={{
                      float: "left",
                      lineHeight: "36px",
                      marginRight: "10px",
                    }}
                  >
                    Status:{" "}
                  </span>
                  <Form style={{ minWidth: "150px", float: "left" }}>
                    <FormGroup style={{ margin: 0 }}>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        name="color"
                        onChange={this.handleChangeProductStatus.bind(this)}
                        options={productStatusOptions}
                      />
                    </FormGroup>
                  </Form>
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
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      name="color"
                      placeholder={this.state.company_place}
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
                      placeholder="Project name"
                      value={this.state.quoteReference}
                      onChange={this.handleChangeQuoteRef.bind(this)}
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
                      placeholder="Project name"
                      value={this.state.ERPReference}
                      onChange={this.handleChangeERPRef.bind(this)}
                    />
                  </FormGroup>
                </Col>
                <Col xl="3" lg="3" md="12">
                  <FormGroup>
                    <Label for="basicinput">Project name</Label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      name="color"
                      placeholder={this.state.project_place}
                      options={this.state.projectOptions}
                      onChange={this.handleChangeProject.bind(this)}
                    />
                  </FormGroup>
                </Col>
                <Col xl="3" lg="3" md="12">
                  <FormGroup>
                    <Label for="basicinput">Customer Name</Label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      name="color"
                      placeholder={this.state.customer_place}
                      options={this.state.customerOptions}
                      onChange={this.handleChangeCustomer.bind(this)}
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
                      placeholder={this.state.quoteStage_place}
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
                      name="color"
                      placeholder={this.state.salesEngineer_place}
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
                      onChange={this.handleChangeCurrency.bind(this)}
                      name="color"
                      placeholder={this.state.currency}
                      options={optionsCurrency}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
        <Card className="quoteEdit">
          <CardHeader>
            <Row className="row align-items-center">
              <Col>Product details</Col>
              <Col className="d-flex justify-content-md-end">
                <span>
                  {" "}
                  <span className="productDescTitle">Value: </span>
                  {this.props.quote_data ? (
                    <span className="productDescvalue">
                      QAR <NumberFormat
                                value={parseInt(this.state.totalAmount).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                    </span>
                  ) : null}
                </span>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col xl="4" lg="4" md="12">
                  <FormGroup>
                    <Label for="basicinput">Product group</Label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      name="color"
                      onChange={this.handleChangeProductCategory.bind(this)}
                      options={this.state.productCategoryOptions}
                    />
                  </FormGroup>
                </Col>
                <Col xl="4" lg="4" md="12">
                  <FormGroup>
                    <Label for="basicinput">Product name</Label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      name="color"
                      onChange={this.handleChangeProduct.bind(this)}
                      options={this.state.productOptions}
                    />
                  </FormGroup>
                </Col>

                <Col md={1} className="assignBlock text-center">
                  <FormGroup>
                    <Label for="basicinput"></Label>
                    <Button
                      className="add-btn"
                      style={{ position: "absolute", left: 10, top: 28 }}
                      onClick={this.addToggle.bind(this)}
                      disabled={this.state.addBtn ? "" : "disabled"}
                    >
                      <img src={addIcon} />
                    </Button>
                  </FormGroup>
                </Col>
                <Col md={3} className="assignBlock text-center"></Col>
              </Row>
            </Form>
            {this.state.productNames ? (
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
                            {k + 1}
                          </Col>
                          <Col md={8} style={{
                              display:"flex", justifyContent:"space-between", fontWeight: "500"}}
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
                          {/* <Col md={2}>{product.amount}</Col> */}
                          <Col md={2}>
                            <div>{this.productSumF(product)}</div>
                            <NumberFormat
                                value={parseInt(this.state.prodcutSum).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                          </Col>
                          {/* <Col md={2}><div>{this.productSumF(product)}</div>{this.state.prodcutSum}</Col> */}
                          <Col md={1} className="last-child">
                            {" "}
                            <Dropdown
                              isOpen={this.state.dropdownOpen}
                              toggle={this.toggleMenu}
                            >
                              <DropdownToggle className="dotMenuButton">
                                <img src={menuDotsGrey} className="img-fluid" />
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

                          {this.state.quotedProducts.length > 0
                            ? this.state.quotedProducts.map(
                                (quotedProduct, i) => {
                                  return (
                                    <Collapse
                                      isOpen={
                                        this.state.collapse &&
                                        this.state.productId ==
                                          quotedProduct.product
                                      }
                                    >
                                      {product.product ==
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
                                          {/* <Col md={2}>
                                      <span className="userNameColor">
                                        {quotedProduct.product_code}
                                      </span>
                                    </Col> */}
                                          <Col md={1}>
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
                                          {/* <Col md={3}>
                                      <span className="userNameColor">
                                        {quotedProduct.description}
                                      </span>
                                    </Col> */}
                                          <Col md={3}>
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
                                          {/* <Col md={1}>
                                      <span className="userNameColor">
                                        {quotedProduct.quantity}
                                      </span>
                                    </Col> */}
                                          <Col md={1}>
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
                                          {/* <Col md={1}>
                                      <span className="userNameColor">
                                        {" "}
                                        {quotedProduct.unit}
                                      </span>
                                    </Col> */}
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
                                              {quotedProduct.amount}
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
                                                <DropdownItem>
                                                  Noted
                                                </DropdownItem>
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
                              )
                            : null}
                          <Collapse
                            isOpen={
                              this.state.collapse &&
                              this.state.productId == product.product
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
                                      this.handleChangeProductCode(product, e)
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
                                    value={"selected" || ""}
                                    // defaultValue={colourOptions[0]}
                                    name="color"
                                    placeholder={this.state.descriptionVariant}
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
                                    placeholder="Quantity"
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
                                      placeholder={this.state.unit_place}
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
                                  {this.state.RunitPrice * this.state.quantity}
                                </span>
                              </Col>
                              <Col md={1}>
                                {" "}
                                <Button
                                  className="add-btn"
                                  onClick={() =>
                                    this.handleQuotedProductCreate(product)
                                  }
                                  style={{ marginBottom: 0 }}
                                >
                                  <img src={addIcon} />
                                </Button>
                              </Col>
                            </div>

                            {/* ) : null} */}
                          </Collapse>
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
                        <div className="bl0"><NumberFormat
                                value={parseInt(this.state.totalAmount).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                              /></div>
                        <div className="bl0">
                          0.00 <hr style={{ margin: 0 }} />
                        </div>
                        <div className="bl0"><NumberFormat
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
        <Card>
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
                      defaultValue={
                        this.state.termsOptions[0]
                          ? this.state.termsOptions[0]
                          : null
                      }
                      placeholder={"Term1"}
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
                      placeholder="Project name"
                    />
                  </FormGroup>
                </Col>

                <Col md={2} className="assignBlock text-center">
                  <FormGroup>
                    <Label for="basicinput"> {"   "}</Label>
                    <Button className="add-btn" style={{ top: "28px" }}>
                      <img src={addIcon} />
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
        <Row className="mT-13">
          <Col md={6}></Col>
          <Col md={6} className="justify-content-md-end d-flex">
            <Button
              onClick={this.handleEditQuote.bind(this)}
              className="blue-btn"
            >
              Update
            </Button>
          </Col>
        </Row>
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
                <h1 className="text-center">Quote has been updated</h1>
                <p className="text-center">
                  You can download by clicking the download button below
                </p>
                <div className="d-flex flex-wrap">
                  <Col>
                    <Button className="blue-btn" onClick={this.handlePdfDiv.bind(this)}>
                        <img src={downloadWhite} />
                      Download
                    </Button>
                  </Col>
                  <Col>
                    <Button className="copy-btn">
                      {/* <img src={copy} /> */}
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
                                  <td style={{padding:"5px", fontWeight: "500"}}>{this.state.quoteReference}</td>
                                  </tr>

                                  <tr>
                                  <td className="td1">Date</td>
                                  <td>:</td>
                                  <td style={{padding:"5px", fontWeight: "500"}}>{moment(quoteDate).format("DD-MMM-YYYY")}</td>
                                  </tr>

                                  <tr>
                                  <td className="td1">Lead/Ref No.</td>
                                  <td>:</td>
                                  <td style={{padding:"5px", fontWeight: "500"}}>{leadReference}</td>
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
                    <div className="attention"><span className="attbold">Attention</span> : {this.state.pdfSales} </div>

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
                      this.props.quote_data ? 
                        this.props.quote_data.quoted_product_details.map((product, k) => {
                          return (
                            <>
                            <tr className="dataRows">
                              <td className="border bottomNone">{k+1}</td>
                              <td className="border bottomNone desc" style={{textAlign:"left"}}>{product.product_details.name}</td>
                              <td className="border bottomNone"></td>
                              <td className="border bottomNone"></td>
                              <td className="border bottomNone"></td>
                              <td className="border bottomNone"></td>
                            </tr>
                            {product.variants_quoted_details.length > 0 ?
                              product.variants_quoted_details.map((quotedProduct , i)=>{
                                  return (
                                      <tr className="dataRows"> 
                                        <td className="border bottomNone">{k+1}.{i+1}</td>
                                        <td className="border bottomNone desc" style={{textAlign:"right"}}>{quotedProduct.variant_details.description.substr(0,30)}</td>
                                        <td className="border bottomNone">{quotedProduct.quantity}</td>
                                        <td className="border bottomNone">{quotedProduct.variant_details.unit_details.name.substr(0,5)}</td>
                                        <td className="border bottomNone">{quotedProduct.variant_details.min_sales_price}</td>
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
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  quote_data: state.quoteReducer.quoteData,
  company_details: state.companyDetailsReducer.companyDetails,
  project_list: state.projectReducer.projectList,
  customer_list: state.customerReducer.customersList,
  product_list: state.productReducer.productList,
  product_variants: state.productReducer.productVariant,
  product_category_list: state.productReducer.productCategoryList,
  quote_update: state.quoteReducer.updateQuote,
  sales_engg_user: state.userReducer.salesEnggUser,
  product_variant_list: state.productReducer.productVariantList,
  term_list: state.quoteReducer.termList,
  unit_list: state.unitsReducer.unitsList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchQuote,
      companyDetails,
      fetchProjectList,
      quoteUpdation,
      salesEngineerFilter,
      fetchCustomerList,
      productCategoryList,
      fetchProductList,
      fetchProductVariant,
      fetchProductVariantList,
      termDetails,
      fetchUnitsList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(QuoteEdit);
