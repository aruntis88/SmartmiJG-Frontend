// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import { fetchProductVariant } from "../../redux/sagas/products/fetchProductVariant";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUnitsList } from "../../redux/sagas/units/fetchUnits";
import { countryList } from "../../redux/sagas/customers/fetchCountryList";
import { productVariantCreate } from "../../redux/sagas/products/fetchProductVariantCreate";
import { productVariantUpdation } from "../../redux/sagas/products/fetchProductVariantUpdate";
import { productVariantRemove } from "../../redux/sagas/products/fetchRemoveProductVariant";
import NumberFormat from "react-number-format";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { FileUploader, FileManager } from "reactjs-file-uploader";
import axios from "axios";
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
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Home, Search, Edit, Trash2, AtSign } from "react-feather";

import Select from "react-select";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCheckSquare, faCoffee, faCloudUploadAlt);
let unitOptions = [];
let countryOptions = [];
let localProductVariant = [];
const required = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return <span className="error">Required Fields cannot be blank</span>;
  }
};
const productcode = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return <span className="error">Product code cannot be blank.</span>;
  }
};
const selectStyles = {
  control: (provided) => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" }),
};
class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      editProductVariant: false,
      files: [],
      productCode: "",
      manufacturerPartcode: "",
      averageCost: "",
      salesPrice: "",
      unit: "",
      country: "",
      description: "",
      unitOptions: [],
      countryOptions: [],
      localProductVariant: [],
      localTitle: false,
      codeError:"",
      fields: [
        "productCode",
        "manufacturerPartcode",
        "averageCost",
        "salesPrice",
        "unit",
        "country",
        "description",
      ],
      errors: {},
      buttonEnabled: false,
      files: [],
    };
    let pathArray = window.location.pathname.split("/");
    let productId = pathArray[2];
    this.props.fetchProductVariant(productId);
    this.props.fetchUnitsList();
    this.props.countryList();
    this.onDrop = this.onDrop.bind(this);

  }
  componentWillReceiveProps() {
    setTimeout(() => {
      this.props.unit_list.map((unit, key) => {
        var obj = {};

        obj["value"] = unit.id;
        obj["label"] = unit.name;
        unitOptions.push(obj);
        obj = {};
      });
      this.props.country_list.map((country, key) => {
        var obj = {};

        obj["value"] = country.id;
        obj["label"] = country.name;
        countryOptions.push(obj);
        obj = {};
      });

      if(this.props.product_variants){
        console.log(this.props.product_variants);
      }
      this.setState({ unitOptions: unitOptions });
      this.setState({ countryOptions: countryOptions });
      unitOptions = [];
      countryOptions = [];
      // if (this.props.create_product_variant) {
      //   let pathArray = window.location.pathname.split("/");
      //   let productId = pathArray[2];
      //   this.props.fetchProductVariant(productId);
      //   //this.toggle();
      //   this.modalClose();
      //   this.state.modal = false;
      // }
      console.log(
        "vsssssssssssssssssssssssss",
        this.props.product_variant_update
      );
      if (this.props.product_variant_update) {
        this.setState({ modal: false });
        this.setState({ editProductVariant: false });
        let pathArray = window.location.pathname.split("/");
        let productId = pathArray[2];
        this.props.fetchProductVariant(productId);
        this.setState({ productCode: "" });
        this.setState({ manufacturerPartcode: "" });
        this.setState({ averageCost: 0 });
        this.setState({ salesPrice: 0 });
        this.setState({ unit: "" });
        this.setState({ country: "" });
        this.setState({ description: "" });
      }
      if (this.props.product_variant_remove) {
        let pathArray = window.location.pathname.split("/");
        let productId = pathArray[2];
        this.props.fetchProductVariant(productId);

      }
    }, 2000);
  }
  onDrop = (files) => {
    this.setState({
      files,
    });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
    this.setState({ productCode: "" });
    this.setState({ manufacturerPartcode: "" });
    this.setState({ averageCost: "" });
    this.setState({ salesPrice: "" });
    this.setState({ unit: "" });
    this.setState({ country: "" });
    this.setState({ description: "" });
    this.setState({ unit_place: "" });
    this.setState({ country_place: "" });
    this.setState({ editProductVariant: false });
    this.setState({ localProductVariant: [] });
    this.setState({ localTitle: false });
  };
  modalClose() {
    this.setState({
      modal: false,
    });
  }
  handleChangeProductCode(e) {
    let codeError="";
    let uniq=[];   
    if (this.props.product_variants.results) {
       uniq = this.props.product_variants.results.map(variant=>{
        return variant.product_code;
      })

      if(uniq.includes(e.target.value)) {
        codeError="Product Code must be unique"
      }
    }
    if(codeError) {
      this.setState({codeError});
    } else {
      this.setState({ codeError: "" })
    }
    this.setState({ productCode: e.target.value });
    if (e.target.value != "") {
      this.removeFromFields("productCode");
    } else {
      this.addToFields("productCode");
    }
  }
  handleFocusProductCode() {
    this.setState({ productCodeFocus: true });
  }
  handleBlurProductCode() {
    this.setState({ productCodeFocus: false });
  }
  handleChangeManufacturerPartcode(e) {
    this.setState({ manufacturerPartcode: e.target.value });
    this.setState({ manufacturerPartcodeId: e.target.value });
    if (e.target.value != "") {
      this.removeFromFields("manufacturerPartcode");
    } else {
      this.addToFields("manufacturerPartcode");
    }
  }
  handleFocusManufacturerPartcode() {
    this.setState({ manufacturerPartCodeFocus: true });
  }
  handleBlurManufacturerPartcode() {
    this.setState({ manufacturerPartCodeFocus: false });
  }
  handleChangeAverageCost(e) {
    this.setState({ averageCost: e.target.value });
    if (e.target.value != "") {
      this.removeFromFields("averageCost");
    } else {
      this.addToFields("averageCost");
    }
  }
  handleFocusAverageCost() {
    this.setState({ averageCostFocus: true });
  }
  handleBlurAverageCost() {
    this.setState({ averageCostFocus: false });
  }
  handleChangeSalesPrice(e) {
    this.setState({ salesPrice: e.target.value });
    if (e.target.value != "") {
      this.removeFromFields("salesPrice");
    } else {
      this.addToFields("salesPrice");
    }
  }
  handleFocusSalesPrice() {
    this.setState({ minPriceFocus: true });
  }
  handleBlurSalesPrice() {
    this.setState({ minPriceFocus: false });
  }
  handleChangeUnit(e) {
    this.setState({ unit: e.value });
    this.setState({ unit_place: e.label });
    if (e.value != "") {
      this.removeFromFields("unit");
    } else {
      this.addToFields("unit");
    }
  }
  handleFocusUnit() {
    this.setState({ unitFocus: true });
    this.state.unitFocusStyle = true;
  }
  handleBlurUnit() {
    this.setState({ unitFocus: false });
  }
  getClass() {
    console.log(this.state.unitFocus);
    if (this.state.unitFocus === true) return "focussed";
    else return "blurred";
  }
  handleChangeCountry(e) {
    this.setState({ country: e.value });
    this.setState({ country_place: e.label });
    if (e.value != "") {
      this.removeFromFields("country");
    } else {
      this.addToFields("country");
    }
  }
  handleFocusCountry() {
    this.setState({ countryFocus: true });
    this.state.countryFocusStyle = true;
  }
  handleBlurCountry() {
    this.setState({ countryFocus: false });
  }
  handleChangeDescription(e) {
    this.setState({ description: e.target.value });
    if (e.target.value != "") {
      this.removeFromFields("description");
    } else {
      this.addToFields("description");
    }
  }
  handleFocusDescription() {
    this.setState({ descriptionFocus: true });
  }
  handleBlurDescription() {
    this.setState({ descriptionFocus: false });
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

  handleSubmit(e) {
    e.preventDefault();
    console.log(
      "xxxxxxxxxxxxxxxxxxxx",
      parseFloat(this.state.averageCost),
      this.state.salesPrice
    );
    let avgCost = this.state.averageCost.replace(/,/g, "");
    let minSalePrice = this.state.salesPrice.replace(/,/g, "");
    let pathArray = window.location.pathname.split("/");
    let productId = pathArray[2];

    if (this.state.localProductVariant.length < 1) {
      if (this.state.editProductVariant) {
        let bodyData = {
          product: parseInt(productId),
          description: this.state.description,
          product_code: this.state.productCode,
          manufacturer_part_code: this.state.manufacturerPartcode,
          unit: this.state.unit,
          average_cost: parseFloat(avgCost),
          min_sales_price: parseFloat(minSalePrice),
          origin_country: this.state.country,
        };
        this.props.productVariantUpdation(bodyData, this.state.variantId);
      } else {
        let bodyData = [
          {
            product: parseInt(productId),
            description: this.state.description,
            product_code: this.state.productCode,
            manufacturer_part_code: this.state.manufacturerPartcode,
            unit: this.state.unit,
            average_cost: parseFloat(avgCost),
            min_sales_price: parseFloat(minSalePrice),
            origin_country: this.state.country,
          },
        ];
        this.props.productVariantCreate(bodyData);
      }
    } else {
      if (this.state.editProductVariant)
        this.props.productVariantUpdation(
          this.state.localProductVariant,
          this.state.variantId
        );
      else this.props.productVariantCreate(localProductVariant);
    }

    setTimeout(() => {
      let pathArray = window.location.pathname.split("/");
      let productId = pathArray[2];
      this.props.fetchProductVariant(productId);
      //this.toggle();
      this.modalClose();
      this.state.modal = false;
    }, 1000);
  }
  handleChangeLocalProductCode(e) {
    this.setState({ localProductCode: e.target.value });
  }
  handleChangeLocalManufacturerPartcode(e) {
    this.setState({ localManufacturerPartcode: e.target.value });
  }
  handleChangeLocalAverageCost(e) {
    this.setState({ localAverageCost: e.target.value });
  }
  handleChangeLocalSalesPrice(e) {
    this.setState({ localSalesPrice: e.target.value });
  }
  handleChangeLocalUnit(e) {
    this.setState({ loaclUnit: e.value });
  }
  handleChangeLocalCountry(e) {
    this.setState({ localCountry: e.value });
  }
  handleChangeLocalDescription(e) {
    this.setState({ localDescription: e.target.value });
  }

  


  handleLocalSubmit(e) {
    e.preventDefault();
      this.state.localTitle = true;
        var obj = {};

        let avgCost = this.state.averageCost.replace(/,/g, "");
        let minSalePrice = this.state.salesPrice.replace(/,/g, "");
        let pathArray = window.location.pathname.split("/");
        let productId = pathArray[2];
        // let bodyData = {
        //   product: parseInt(productId),
        //   description: this.state.description,
        //   product_code: this.state.productCode,
        //   manufacturer_part_code: this.state.manufacturerPartcode,
        //   unit: this.state.unit,
        //   average_cost: this.state.averageCost,
        //   min_sales_price: this.state.salesPrice,
        //   origin_country: this.state.country,
        // };
        obj["product"] = parseInt(productId);
        obj["description"] = this.state.description;
        obj["product_code"] = this.state.productCode;
        obj["manufacturer_part_code"] = this.state.manufacturerPartcode;
        obj["unit"] = this.state.unit;
        obj["average_cost"] = parseFloat(avgCost);
        obj["min_sales_price"] = parseFloat(minSalePrice);
        obj["origin_country"] = this.state.country;
        localProductVariant.push(obj);
        obj = {};
        this.setState({ localProductVariant: localProductVariant });
        // this.props.productVariantCreate(bodyData);
        // setTimeout(() => {
        this.state.description = "";
        this.setState({ productCode: "" });
        this.setState({ manufacturerPartcode: "" });
        // this.state.unitOptions = [];
        this.state.averageCost = "";
        this.state.salesPrice = "";
        // this.state.countryOptions = [];
        this.state.unit = "";
        this.state.country = "";
        this.setState({ unit_place: "" });
        this.setState({ country_place: "" });
        // }, 1000);
      }
    
  handleEditProductVariant(variant) {
    console.log("variant", variant);
    this.setState({ variantId: variant.id });
    this.setState({ modal: true });
    this.setState({ editProductVariant: true });
    this.setState({ productCode: variant.product_code });
    this.setState({ manufacturerPartcode: variant.manufacturer_part_code });
    this.setState({ averageCost: parseInt(variant.average_cost).toFixed(2) });
    this.setState({ salesPrice: parseInt(variant.min_sales_price).toFixed(2) });
    this.setState({ unit: variant.unit });
    this.setState({ unit_place: variant.unit_details.name });
    this.setState({ country: variant.origin_country });
    this.setState({ country_place: variant.country_details.name });
    this.setState({ description: variant.description });
    this.setState({ localProductVariant: [] });
    this.setState({ localTitle: false });
  }
  handleRemoveProductVariant(variant) {
    console.log("fffff", variant);
    this.props.productVariantRemove(variant.id);
  }
  handleRemoveProductVariantLocal(variant) {
    this.state.localProductVariant.map((pv, i) => {
      if (variant.product_code == pv.product_code)
        this.state.localProductVariant.splice(i, 1);
    });
    this.forceUpdate();
  }
  importData(e) {
    console.log("bodyyyy", e.target.files);
    var fd = new FormData();
    fd.append("file", e.target.files[0]);
    fd.append("type", "PV");
    const url =
      "http://ec2-13-127-88-245.ap-south-1.compute.amazonaws.com:7004/api/products/files/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.post(url, fd).then((res) => {
      console.log("hhhhhhhh", res);
      let pathArray = window.location.pathname.split("/");
      let productId = pathArray[2];
      this.props.fetchProductVariant(productId);
    });
  }
  render() {
    return (
      <Fragment>
        {this.props.product_variants ? (
          <div className="userModule mT25">
            <Col md={6} className="pL0">
              <Breadcrumb>
                <BreadcrumbItem>
                  <a href="/">
                    <Home size={15} />
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <a href="/products">Products</a>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  {" "}
                  {this.props.product_variants.results.length > 0
                    ? this.props.product_variants.results[0].product_details
                        .name
                    : null}
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col md={6} className="justify-content-end d-flex pR0">
              {/* <Button className="white-btn">
                Import */}
              {/* <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={this.importData.bind(this)}
                className="white-btn"
                placeholder="Import"
              /> */}
              {/* </Button> */}
              <div class="upload-btn-wrapper">
                <button class="white-btn">Import</button>
                <input
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={this.importData.bind(this)}
                  className="white-btn"
                  placeholder="Import"
                />
              </div>
              <Button onClick={this.toggle} className="blue-btn">
                Add new Variant
              </Button>
              <div></div>
            </Col>
            <Card className="col-md-12">
              <CardHeader>
                <Row className="row align-items-center">
                  <Col>
                    {this.props.product_variants.results.length > 0
                      ? this.props.product_variants.results[0].product_details
                          .name
                      : null}
                  </Col>
                  <Col className="d-flex justify-content-md-end align-items-center">
                    <Form>
                      <FormGroup
                      className="searchInput"
                    >
                      <div className="position-relative has-icon-left">
                        <Input
                          
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
              <CardBody className="editModule">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Product code</th>
                      <th>Unit</th>
                      <th>Average cost</th>
                      <th>Sale price</th>
                      <th>Actions </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.product_variants.results.map((variant, i) => {
                      return (
                        <tr>
                          <td>{variant.description}</td>
                          <td>{variant.product_code}</td>
                          <td>{variant.unit_details.name}</td>
                          <td>
                            {" "}
                            <NumberFormat
                              value={parseFloat(variant.average_cost).toFixed(
                                2
                              )}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            {/* {parseInt(variant.average_cost).toFixed(2)} */}
                          </td>
                          <td>
                            <NumberFormat
                              value={parseFloat(
                                variant.min_sales_price
                              ).toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            {/* {parseInt(variant.min_sales_price).toFixed(2)} */}
                          </td>
                          <td className="action">
                            <span>
                              <Edit
                                onClick={() =>
                                  this.handleEditProductVariant(variant)
                                }
                                size={16}
                                className="mr-4 pointer"
                              />
                            </span>
                            <span>
                              <Trash2
                                onClick={() =>
                                  this.handleRemoveProductVariant(variant)
                                }
                                size={16}
                                className="mr-4 pointer"
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        ) : null}
        {this.props.product_variants ? (
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
            parentSelector={() => document.querySelector("#mainWrapper")}
          >
            <ModalHeader>
              <Row className="row align-items-center">
                {this.state.editProductVariant ? (
                  <Col>Edit product variant</Col>
                ) : (
                  <Col>Create new product variant</Col>
                )}
                {this.props.product_variants.results[0] ? (
                  <Col className="d-flex justify-content-md-end title-right">
                    Product :{" "}
                    {
                      this.props.product_variants.results[0].product_details
                        .name
                    }
                    <span
                      className="smartMilightBlue"
                      onClick={this.toggle}
                      style={{ cursor: "pointer" }}
                    ></span>
                  </Col>
                ) : null}
              </Row>
            </ModalHeader>
            <ModalBody
              className={this.state.editProductVariant ? "editModule" : null}
            >
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <Row>
                  <Col xl={6} lg={6} sm={12}>
                    <Row>
                      <Col md={6}>
                        <FormGroup
                          className={
                            this.state.productCodeFocus
                              ? "hasFloatingLabel isFocused"
                              : "hasFloatingLabel notFocused"
                          }
                          id={
                            this.state.productCode ? "hasValue" : "hasnoValue"
                          }
                        >
                          {/* <Label for="basicinput">Product code*</Label> */}
                          <Input
                            type="text"
                            className={
                              this.state.productCode
                                ? "form-control input floatingLabel"
                                : "form-control"
                            }
                            // id="basicinput"
                            name="basicinput"
                            onFocus={this.handleFocusProductCode.bind(this)}
                            onBlur={this.handleBlurProductCode.bind(this)}
                            // placeholder="Product/ Part code"
                            value={this.state.productCode}
                            id="code"
                            onChange={this.handleChangeProductCode.bind(this)}
                            validations={[productcode]}
                          />
                          <label
                            className="form-control-placeholder"
                            for="code"
                          >
                            Product code*
                          </label>
                          {this.state.codeError? (
                            <span style={{color:"red"}}>{this.state.codeError}
                            </span>
                            ):null
                          }
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        {/* <FormGroup>
                          <Label for="basicinput">Manufacturer partcode*</Label>
                          <Input
                            type="text"
                            id="basicinput"
                            name="basicinput"
                            value={this.state.manufacturerPartcode}
                            placeholder="Manufacturer partcode"
                            validations={[required]}
                            onChange={this.handleChangeManufacturerPartcode.bind(
                              this
                            )}
                          />
                        </FormGroup> */}
                        <FormGroup
                          className={
                            this.state.manufacturerPartCodeFocus
                              ? "hasFloatingLabel isFocused"
                              : "hasFloatingLabel notFocused"
                          }
                          id={
                            this.state.manufacturerPartcode
                              ? "hasValue"
                              : "hasnoValue"
                          }
                        >
                          <Input
                            type="text"
                            className={
                              this.state.manufacturerPartcode
                                ? "form-control input floatingLabel"
                                : "form-control"
                            }
                            id="manufacturer"
                            name="basicinput"
                            value={this.state.manufacturerPartcode}
                            onFocus={this.handleFocusManufacturerPartcode.bind(
                              this
                            )}
                            onBlur={this.handleBlurManufacturerPartcode.bind(
                              this
                            )}
                            validations={[required]}
                            onChange={this.handleChangeManufacturerPartcode.bind(
                              this
                            )}
                          />
                          <label
                            className="form-control-placeholder"
                            for="manufacturer"
                          >
                            Manufacturer partcode*
                          </label>
                        </FormGroup>
                      </Col>
                      <Col xl="6" lg="6" md="12">
                        <FormGroup
                          className={
                            this.state.averageCostFocus
                              ? "hasFloatingLabel isFocused"
                              : "hasFloatingLabel notFocused"
                          }
                          id={
                            this.state.averageCost ? "hasValue" : "hasnoValue"
                          }
                        >
                          {/* <Label for="basicinput">Average cost*</Label> */}
                          <div className="position-relative has-icon-right">
                            {/* <Input
                              type="text"
                              id="iconRight"
                              name="iconRight"
                              value={this.state.averageCost}
                              className="round"
                              placeholder="0.00"
                              onChange={this.handleChangeAverageCost.bind(this)}
                            /> */}
                            <NumberFormat
                              className={
                                this.state.averageCost
                                  ? "form-control input floatingLabel round"
                                  : "form-control round"
                              }
                              onChange={this.handleChangeAverageCost.bind(this)}
                              onFocus={this.handleFocusAverageCost.bind(this)}
                              onBlur={this.handleBlurAverageCost.bind(this)}
                              // placeholder="0.00"
                              thousandSeparator={true}
                              value={this.state.averageCost}
                              // className="form-control"
                              validations={[required]}
                              id="avgCost"
                            />
                            <label
                              className="form-control-placeholder"
                              for="avgCost"
                            >
                              Average cost*
                            </label>
                            <div className="form-control-position">
                              <span size={16} className="formIcon">
                                $
                              </span>
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xl="6" lg="6" md="12">
                        <FormGroup
                          className={
                            this.state.minPriceFocus
                              ? "hasFloatingLabel isFocused"
                              : "hasFloatingLabel notFocused"
                          }
                          id={this.state.salesPrice ? "hasValue" : "hasnoValue"}
                        >
                          {/* <Label for="basicinput">Minimum Sales price*</Label> */}
                          <div className="position-relative has-icon-right">
                            {/* <Input
                              type="text"
                              id="iconRight"
                              name="iconRight"
                              value={this.state.salesPrice}
                              className="round"
                              placeholder="0.00"
                              onChange={this.handleChangeSalesPrice.bind(this)}
                            /> */}
                            <NumberFormat
                              className={
                                this.state.salesPrice
                                  ? "form-control input floatingLabel round"
                                  : "form-control round"
                              }
                              onChange={this.handleChangeSalesPrice.bind(this)}
                              onFocus={this.handleFocusSalesPrice.bind(this)}
                              onBlur={this.handleBlurSalesPrice.bind(this)}
                              // placeholder="0.00"
                              thousandSeparator={true}
                              value={this.state.salesPrice}
                              // className="form-control"
                              validations={[required]}
                              id="minPrice"
                            />
                            <label
                              className="form-control-placeholder"
                              for="minPrice"
                            >
                              Minimum Sales price*
                            </label>
                            <div className="form-control-position">
                              <span size={16} className="formIcon">
                                $
                              </span>
                            </div>
                          </div>
                        </FormGroup>
                      </Col>

                      <Col xl={6} lg={6} sm={12}>
                        <FormGroup
                          className={
                            this.state.unitFocus
                              ? "hasFloatingLabel selectInput isFocused"
                              : "hasFloatingLabel selectInput notFocused"
                          }
                          id={this.state.unit ? "hasValue" : "hasnoValue"}
                        >
                          {/* <Label for="basicinput">Unit*</Label> */}
                          <Select
                            className={
                              this.state.unit
                                ? "basic-single floatingLabel"
                                : "basic-single" + this.state.unitFocusStyle
                                ? "focused"
                                : "unfocused"
                            }
                            className={this.getClass()}
                            classNamePrefix="select"
                            // defaultValue={colourOptions[0]}
                            value={"selected" || ""}
                            name="color"
                            placeholder={this.state.unit_place}
                            onChange={this.handleChangeUnit.bind(this)}
                            options={this.state.unitOptions}
                            onFocus={this.handleFocusUnit.bind(this)}
                            onBlur={this.handleBlurUnit.bind(this)}
                            id={this.state.unitFocus ? "focused" : "unfocused"}
                            validations={[required]}
                          />
                          <Label className="form-control-placeholder">
                            Unit*
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col xl={6} lg={6} sm={12}>
                        <FormGroup
                          className={
                            this.state.countryFocus
                              ? "hasFloatingLabel selectInput isFocused"
                              : "hasFloatingLabel selectInput notFocused"
                          }
                          id={this.state.country ? "hasValue" : "hasnoValue"}
                        >
                          {/* <Label for="basicinput">Country of origin*</Label> */}
                          <Select
                            className={
                              this.state.country
                                ? "basic-single floatingLabel"
                                : "basic-single" + this.state.countryFocusStyle
                                ? "focused"
                                : "unfocused"
                            }
                            // className="basic-single"
                            classNamePrefix="select"
                            value={"selected" || ""}
                            // defaultValue={colourOptions[0]}
                            name="color"
                            placeholder={this.state.country_place}
                            onChange={this.handleChangeCountry.bind(this)}
                            onFocus={this.handleFocusCountry.bind(this)}
                            onBlur={this.handleBlurCountry.bind(this)}
                            id={
                              this.state.countryFocus ? "focused" : "unfocused"
                            }
                            options={this.state.countryOptions}
                            validations={[required]}
                          />
                          <Label className="form-control-placeholder">
                            Country of origin*
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6} className="row">
                    <Col md={12}>
                      {/* <FormGroup>
                        <Label for="basicinput">
                          Description/Specification*
                        </Label>
                        <Input
                          type="textarea"
                          id="basicinput"
                          name="basicinput"
                          value={this.state.description}
                          placeholder="Product specification here"
                          className="textarea"
                          onChange={this.handleChangeDescription.bind(this)}
                          validations={[required]}
                        />
                      </FormGroup> */}
                      <FormGroup
                        className={
                          this.state.descriptionFocus
                            ? "hasFloatingLabel isFocused"
                            : "hasFloatingLabel notFocused"
                        }
                        id={this.state.description ? "hasValue" : "hasnoValue"}
                      >
                        <Input
                          type="textarea"
                          id="description"
                          className={
                            this.state.description
                              ? "form-control input floatingLabel minHeight120 textarea"
                              : "form-control minHeight120 textarea"
                          }
                          name="basicinput"
                          value={this.state.description}
                          // placeholder="Product specification here"
                          // className="textarea"
                          onFocus={this.handleFocusDescription.bind(this)}
                          onBlur={this.handleBlurDescription.bind(this)}
                          onChange={this.handleChangeDescription.bind(this)}
                          validations={[required]}
                        />
                        <label
                          className="form-control-placeholder"
                          for="description"
                        >
                          Description/Specification*
                        </label>
                      </FormGroup>
                    </Col>
                    {/* <Col md={6}></Col> */}

                    <Col
                      md={12}
                      className="justify-content-end d-flex align-items-end"
                      style={{ paddingBottom: 24 }}
                    >
                      {!this.state.editProductVariant ? (
                        <Button
                          className="white-btn"
                          onClick={this.handleLocalSubmit.bind(this)}
                        >
                          Add to list
                        </Button>
                      ) : null}
                      {this.state.editProductVariant ? (
                        <Button className="blue-btn">Update</Button>
                      ) : (
                        <Button
                          className="blue-btn"
                          disabled={!this.state.buttonEnabled}
                        >
                          Save
                        </Button>
                      )}
                    </Col>
                  </Col>
                  <Col md={12}>
                    <Card>
                      <CardBody className="editModule">
                        <Table responsive>
                          <thead>
                            {this.state.localTitle ? (
                              <tr>
                                <th>Description</th>
                                <th>Product code</th>
                                <th>Unit</th>
                                <th>Average cost</th>
                                <th>Sale price</th>
                                <th>Actions </th>
                              </tr>
                            ) : null}
                          </thead>
                          <tbody>
                            {this.state.localProductVariant
                              ? this.state.localProductVariant.map(
                                  (variant, i) => {
                                    return (
                                      <tr>
                                        <td>{variant.description}</td>
                                        <td>
                                          {variant.productCode}
                                        </td>
                                        <td>{variant.unit}</td>
                                        <td>
                                          <NumberFormat
                                            value={parseFloat(
                                              variant.average_cost
                                            ).toFixed(2)}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                          />
                                          {/* {parseInt(
                                            variant.average_cost
                                          ).toFixed(2)} */}
                                        </td>
                                        <td>
                                          <NumberFormat
                                            value={parseFloat(
                                              variant.min_sales_price
                                            ).toFixed(2)}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                          />
                                          {/* {parseInt(
                                            variant.min_sales_price
                                          ).toFixed(2)} */}
                                        </td>
                                        <td className="action">
                                          <span>
                                            <Trash2
                                              onClick={() =>
                                                this.handleRemoveProductVariantLocal(
                                                  variant
                                                )
                                              }
                                              size={16}
                                              className="mr-4 pointer"
                                            />
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )
                              : null}
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        ) : null}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  product_variants: state.productReducer.productVariant,
  unit_list: state.unitsReducer.unitsList,
  country_list: state.customerReducer.countryList,
  create_product_variant: state.productReducer.createProductVariant,
  product_variant_update: state.productReducer.updateProductVariant,
  product_variant_remove: state.productReducer.removeProductVariant,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchProductVariant,
      fetchUnitsList,
      countryList,
      productVariantCreate,
      productVariantUpdation,
      productVariantRemove,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
