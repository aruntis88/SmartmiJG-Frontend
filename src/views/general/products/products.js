import React, { Component, Fragment } from "react";

// import external modules
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Toggle from "react-toggle";
import Select from "react-select";
import classnames from "classnames";
import Dropzone from "react-dropzone";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

// Import Reactstrap Redux
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  Row,
  Col,
  FormGroup,
  CardBody,
  CardHeader,
  Table,
  Label,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { X } from "react-feather";
// Import Unit Redux
import { fetchUnitsList } from "../../../redux/sagas/units/fetchUnits";
import { fetchUnit } from "../../../redux/sagas/units/fetchUnit";
import { unitdeletion } from "../../../redux/sagas/units/fetchUnitDelete";
import { unitsCreation } from "../../../redux/sagas/units/fetchUnitsCreate";
import { unitUpdation } from "../../../redux/sagas/units/fetchUnitUpdate";

// Import Manufacturers Redux
import { fetchManufacturersList } from "../../../redux/sagas/manufacturers/fetchManufacturers";
import { fetchManufacturer } from "../../../redux/sagas/manufacturers/fetchManufacturer";
import { manufacturerUpdation } from "../../../redux/sagas/manufacturers/fetchManufacturerUpdate";
import { manufacturersCreation } from "../../../redux/sagas/manufacturers/fetchManufacturersCreate";
import { manufacturersDeletion } from "../../../redux/sagas/manufacturers/fetchManufacturersDelete";

// Import AverageCost Redux
import { averageCostUpdation } from "../../../redux/sagas/averageCost/fetchAverageCostUpdate";

// Import Product Variant Redux
import { fetchProductVariantList } from "../../../redux/sagas/products/fetchProductVariantList";

// Import Images Redux
import companyLogo1 from "../../../assets/img/companyLogo1.png";
import infoYellow from "../../../assets/img/infoYellow.png";

// Import Icons Redux
import { Edit, Trash2 } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faCloudUploadAlt
} from "@fortawesome/free-solid-svg-icons";
import { CalculatorIcon } from "react-line-awesome";

    // let numbers = /^[0-9]+$/;
    // let letters = /^[a-zA-Z,. ]*$/;
    // let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // let phoneno = /^\d{10}$/;
    // let alphanumeric = /^[0-9a-zA-Z,/ ]+$/;
    // let sting = /^[a-zAZ]*$/;
let reqErr="";
const required = (value) => {
  if (!value.toString().trim().length) {
    reqErr = true;
    // We can return string or jsx as the 'error' prop for the validated Component
    return <span className="error">Required Fields cannot be blank</span>;
  }   else reqErr = false;
};

let unitErr="";
const unit = (value) => {
  if (value.length > 15) {
      unitErr = true;
      return <span className="error">Unit Name is too lengthy</span>;
  } else unitErr = false;
}

let symbolErr="";
const symbol = (value) => {
  if (value.length > 5) {
        symbolErr = true;
      return <span className="error">Unit Symbol is too lengthy</span>;
  }   else symbolErr = false;
}

library.add(faCheckSquare, faCoffee, faCloudUploadAlt);
let partcodeOptions = [];
class Products extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUnitsList();
    this.props.fetchManufacturersList();
    this.props.fetchProductVariantList();

    this.state = {
      activeTab: "1",
      unitsName: "",
      unitsSymbol: "",
      unitsNameUpdate: "",
      unitsSymbolUpdate: "",
      manufacturersName: "",
      manufacturersWebsite: "",
      manufacturersLogo: "",
      manufacturersNameUpdate: "",
      manufacturersWebsiteUpdate: "",
      manufacturersLogoUpdate: "",
      partcode: "",
      averageCost: "",
      partcodeOptions: [],
      files: [],
      filesUpdate: [],
      unitid: "",
      manufacturerid: "",
      modalUpdate: false,
      modalUpdateUnit: false,
      is_active: true,
      is_activeUpdate: false,
      manLogoError: "",
      manLogoUpdateError: "",

    };
  }

  onDropUpdate = filesUpdate => {
    const imageFile = filesUpdate[0];
    
    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      this.setState({        
          manLogoUpdateError: 'Please select valid image' 
      });
      return false;
    }
    if (imageFile.size > 1000000 ) {
      this.setState({ 
          manLogoUpdateError: 'File size is greater than 1 Mb' 
      });
      return false;
    }
    console.log("file", filesUpdate);
    this.setState({
      filesUpdate,
      manLogoUpdateError: ""
    });
  };
  clearPreviewuUpdate() {
    this.state.filesUpdate = [];
    this.forceUpdate();
  }
  onDrop = files => {
    const imageFile = files[0];
    
    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      this.setState({        
          manLogoError: 'Please select valid image' 
      });
      return false;
    }
    if (imageFile.size > 1000000 ) {
      this.setState({ 
          manLogoError: 'File size is greater than 1 Mb' 
      });
      return false;
    }
    console.log("file", files);
    this.setState({
      files,
      manLogoError: ""
    });
  };
  clearPreview() {
    this.state.files = [];
    this.forceUpdate();
  }
  componentWillReceiveProps() {
    // this.props.fetchProductVariantList();
    setTimeout(() => {
      if (this.props.productVariant_list) {
        this.props.productVariant_list.map((productVariant, key) => {
          var obj = {};

          obj["value"] = productVariant.id;
          obj["label"] = productVariant.manufacturer_part_code;
          partcodeOptions.push(obj);
          obj = {};
        });
        this.setState({ partcodeOptions: partcodeOptions });
        partcodeOptions = [];
      }
    }, 1000);
  }

  handleChangePartcode(e) {
    this.setState({ partcode: e.label });

    localStorage.setItem("Variant ID", e.value);
  }
  handleChangeAverageCost(e) {
    this.setState({ averageCost: e.target.value });
  }

  handleSubmitAverageCost(e) {
    e.preventDefault();
    let userBody = {
      manufacturer_part_code: this.state.partcode,
      average_cost: this.state.averageCost
    };
    this.props.averageCostUpdation(userBody);
  }

  handleChangeUnitsName(e) {
    this.setState({ unitsName: e.target.value });
  }
  handleFocusUnitsName() {
    this.setState({ unitsNameFocus: true });
  }
  handleBlurUnitsName() {
    this.setState({ unitsNameFocus: false });
  }
  
  handleChangeUnitsSymbol(e) {
    this.setState({ unitsSymbol: e.target.value });
  }
  handleFocusUnitsSymbol() {
    this.setState({ unitsSymbolFocus: true });
  }
  handleBlurUnitsSymbol() {
    this.setState({ unitsSymbolFocus: false });
  }

  handleChangeUnitsNameUpdate(e) {
    this.setState({ unitsNameUpdate: e.target.value });
  }
  handleFocusUnitsNameUpdate() {
    this.setState({ unitsNameUpdateFocus: true });
  }
  handleBlurUnitsNameUpdate() {
    this.setState({ unitsNameUpdateFocus: false });
  }

  handleChangeUnitsSymbolUpdate(e) {
    this.setState({ unitsSymbolUpdate: e.target.value });
  }
  handleFocusUnitsSymbolUpdate() {
    this.setState({ unitsSymbolUpdateFocus: true });
  }
  handleBlurUnitsSymbolUpdate() {
    this.setState({ unitsSymbolUpdateFocus: false });
  }

  handleChangeManufacturersName(e) {
    this.setState({ manufacturersName: e.target.value });
  }
  handleFocusManufacturersName() {
    this.setState({ ManufacturersNameFocus: true });
  }
  handleBlurManufacturersName() {
    this.setState({ ManufacturersNameFocus: false });
  }

  handleChangeManufacturersWebsite(e) {
    this.setState({ manufacturersWebsite: e.target.value });
  }
  handleFocusManufacturersWebsite() {
    this.setState({ ManufacturersWebsiteFocus: true });
  }
  handleBlurManufacturersWebsite() {
    this.setState({ ManufacturersWebsiteFocus: false });
  }

  handleChangeManufacturersLogo(e) {
    this.setState({ manufacturersLogo: e.target.value });
  }
  handleSoupChange(e) {
    this.setState({ is_active: e.target.checked });
  }
  handleChangeManufacturersNameUpdate(e) {
    this.setState({ manufacturersNameUpdate: e.target.value });
  }
  handleFocusManufacturersNameUpdate() {
    this.setState({ ManufacturersNameUpdateFocus: true });
  }
  handleBlurManufacturersNameUpdate() {
    this.setState({ ManufacturersNameUpdateFocus: false });
  }

  handleChangeManufacturersWebsiteUpdate(e) {
    this.setState({ manufacturersWebsiteUpdate: e.target.value });
  }
  handleFocusManufacturersWebsiteUpdate() {
    this.setState({ ManufacturersWebsiteUpdateFocus: true });
  }
  handleBlurManufacturersWebsiteUpdate() {
    this.setState({ ManufacturersWebsiteUpdateFocus: false });
  }
  handleChangeManufacturersLogoUpdate(e) {
    this.setState({ manufacturersLogoUpdate: e.target.value });
  }
  handleSoupChangeUpdate(e) {
    console.log(this.state.is_activeUpdate)
    this.setState({ is_activeUpdate: e.target.checked });
    console.log(this.state.is_activeUpdate)
  }



  // validate = () => {
    
  //   let unitsNameError = "";
  //   let unitsSymbolError = "";


  //   if (this.state.unitsName.length < 1) {
  //     unitsNameError = "Unit name should not empty";
  //   }

  //   if (!this.state.unitsName.match(sting)) {
  //     unitsNameError = "Unit name should be alphabetical";
  //   }

    
  //   if (this.state.unitsSymbol.length < 1) {
  //     unitsSymbolError = "Unit symbol should not empty";
  //   }

  //   if (!this.state.unitsSymbol.match(sting) && this.state.unitsSymbol.length> 3) {
  //     unitsNameError = "Unit symbol should be alphabets and not more than 3";
  //   }

  //   if (unitsNameError || unitsSymbolError ) {
  //     this.setState({ unitsNameError, unitsSymbolError });
  //     return false;
  //   }

  //   return true;
  // }
  handleSubmitUnits(e) {
    // const isValid = this.validate();
    // if (isValid) {
      // this.setState({ unitsNameError:"", unitsSymbolError:"" })
      let bodyData = {
      name: this.state.unitsName,
      symbol: this.state.unitsSymbol
    };
    this.props.unitsCreation(bodyData);
    this.state.unitsName = "";
    this.state.unitsSymbol = "";
    setTimeout(() => {
      this.props.fetchUnitsList();
    }, 1000);
    // }  
  }

// updateValidate = () => {
    
//     let unitsNameupdateError:"";
//     let unitsSymbolupdateError: "";

   

//     if (this.state.unitsNameUpdate.length < 1) {
//       unitsNameupdateError = "Unit name required";
//     }

    
//     if (this.state.unitsSymbolUpdate.length < 1) {
//       unitsSymbolupdateError = "Unit symbol required";
//     }

//     if ( unitsNameupdateError || unitsSymbolupdateError ) {
//       this.setState({  unitsNameupdateError, unitsSymbolupdateError });
//       return false;
//     }

//     return true;
//   }

  handleSubmitUnitsUpdate(e) {
    // const isValid = this.updateValidate();
    // if (isValid) {
    //   this.setState({ unitsNameupdateError:"", unitsSymbolupdateError:""})
      let bodyData = {
      name: this.state.unitsNameUpdate,
      symbol: this.state.unitsSymbolUpdate
    };
    this.props.unitUpdation(bodyData, this.state.unitid);
    this.state.unitsNameUpdate = "";
    this.state.unitsSymbolUpdate = "";
    this.togglemodalUpdateUnit();
    setTimeout(() => {
      this.props.fetchUnitsList();
    }, 1000);
    // }
    
  }

handleDeleteUnit= unitId => {
  this.props.unitdeletion(unitId);
  setTimeout(() => {
      this.props.fetchUnitsList();
    }, 1000);
}

// manValidate = () => {
//     let manNameError:"";
//     let manWebsiteError: "";
  

//     if (this.state.manufacturersName.length < 1) {
//       manNameError = "Manufacturers name required";
//     }
 
//     if (!this.state.manufacturersWebsite.includes("www")
//        && !this.state.manufacturersWebsite.includes(".")) {

//       manWebsiteError = "Enter a valid Web Url";
//     }

//     if ( manNameError || manWebsiteError ) {
//       this.setState({  manNameError, manWebsiteError });
//       return false;
//     }

//     return true;
//   }

  handleSubmitManufacturers(e) {
    
    // const isValid = this.manValidate();
    // if (isValid) {
    //   this.setState({ manNameError: "", manWebsiteError: ""})
      let bodyData = {
      name: this.state.manufacturersName,
      website: this.state.manufacturersWebsite,
      logo: this.state.files[0],
      is_active: this.state.is_active,
    };
    this.props.manufacturersCreation(bodyData);
    this.state.manufacturersName = "";
    this.state.manufacturersWebsite = "";
    this.state.manufacturersLogo = "";
    this.state.files = []; 
    this.state.is_active= false;
    this.setState({
      modal: !this.state.modal
    });
    setTimeout(() => {
      this.props.fetchManufacturersList();
    }, 5000);
    // }
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };
  toggleConfirmation = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  togglemodalUpdateUnit = unitId => {
    this.setState({
      modalUpdateUnit: !this.state.modalUpdateUnit,
      unitid: unitId
    });
    setTimeout(() => {
      this.props.fetchUnit(unitId);
    }, 500);

    setTimeout(() => {
      if (this.props.unit_data) {
        this.setState({ unitsNameUpdate: this.props.unit_data.name });
        this.setState({ unitsSymbolUpdate: this.props.unit_data.symbol });
      }
    }, 1000);
  };
  toggleUpdateManufacturer = manufacturerId => {
    this.setState({
      modalUpdate: !this.state.modalUpdate,
    });
    this.state.manufacturerid = manufacturerId;
    this.props.fetchManufacturer(manufacturerId);

    setTimeout(() => {
      if (this.props.manufacturer_data) {
        this.setState({
          manufacturersNameUpdate: this.props.manufacturer_data.name
        });
        this.setState({
          manufacturersWebsiteUpdate: this.props.manufacturer_data.website
        });
        this.setState({
          manufacturersLogoUpdate: this.props.manufacturer_data.logo
        });
        this.setState({
          is_activeUpdate: this.props.manufacturer_data.is_active
        });
      }
    }, 1000);
  };

  // manUpdateValidate = () => {
  //   let manNameUpdateError:"";
  //   let manWebsiteUpdateError: "";
  

  //   if (this.state.manufacturersNameUpdate.length < 1) {
  //     manNameUpdateError = "Manufacturers name required";
  //   }

    
  //   if (!this.state.manufacturersWebsiteUpdate.includes("www")
  //      && !this.state.manufacturersWebsiteUpdate.includes(".")) {

  //     manWebsiteUpdateError = "Enter a valid Web Url";
  //   }

  //   if ( manNameUpdateError || manWebsiteUpdateError ) {
  //     this.setState({  manNameUpdateError, manWebsiteUpdateError });
  //     return false;
  //   }

  //   return true;
  // }

  handleSubmitManufacturersUpdate(e) {
    console.log(this.state.is_activeUpdate)
    // const isValid = this.manUpdateValidate();
    // if (isValid) {
    //   this.setState({ manNameUpdateError:"", manWebsiteUpdateError:""});
      let bodyData = {
      name: this.state.manufacturersNameUpdate,
      website: this.state.manufacturersWebsiteUpdate,
      logo: this.state.filesUpdate[0],
      is_active: this.state.is_activeUpdate,
    };
    this.props.manufacturerUpdation(bodyData, this.state.manufacturerid);
    this.state.manufacturersNameUpdate = "";
    this.state.manufacturersWebsiteUpdate = "";
    this.state.manufacturersLogoUpdate = "";
    this.state.filesUpdate = [];
    this.state.is_activeUpdate = false;

    this.setState({
      modalUpdate: !this.state.modalUpdate
    });
    setTimeout(() => {
      this.props.fetchManufacturersList();
    }, 1000);
    // }
  }

  handleDeleteManufacturer = id  => {
  this.props.manufacturersDeletion(id);
  setTimeout(() => {
      this.props.fetchManufacturersList();
    }, 1000);
}

  status = (is_active) => {
    if (is_active) {
      return (
        <span className="activeStatus">
          Active
        </span>
      )
    } else {
      return (
        <span className="inactiveStatus">
          Inactive
        </span>
      )
    }
  }
  render() {
   
    return (
      <Fragment>
        <div className="tabModule generalProduct">
          <Card className="col-md-12 ">
            <CardHeader>
              <Row>
                <Nav tabs className="innerNavTab">
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1"
                      })}
                      onClick={() => {
                        this.toggle("1");
                      }}
                    >
                      Units
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "2"
                      })}
                      onClick={() => {
                        this.toggle("2");
                      }}
                    >
                      Manufacturers
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "3"
                      })}
                      onClick={() => {
                        this.toggle("3");
                      }}
                    >
                      Average cost
                    </NavLink>
                  </NavItem> */}
                </Nav>
              </Row>
            </CardHeader>
            <CardBody>
              <TabContent
                activeTab={this.state.activeTab}
                className="innerTabContent"
              >
                <TabPane tabId="1">
                  <Row>
                    <Col md={6} lg={6} xl={6} sm={12} className="borderRight">
                      <Table>
                        <thead>
                          <tr>
                            <th>Unit</th>
                            <th>Symbol</th>
                            <th>Actions </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.units_list
                            .slice(0)
                            .reverse()
                            .map((units, i) => {
                              return (
                                <tr>
                                  <td>{units.name}</td>
                                  <td>{units.symbol}</td>
                                  <td className="action">
                                    <span>
                                      <Edit
                                        size={16}
                                        className="mr-4 pointer"
                                        onClick={() => {
                                          this.togglemodalUpdateUnit(units.id);
                                        }}
                                        key={i}
                                      />
                                    </span>
                                    <span 
                                      className= "pointer"
                                      onClick={() => {
                                          this.handleDeleteUnit(units.id);
                                        }}
                                    >
                                      <Trash2 size={16} className="mr-4" />
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </Col>

                    <Col md={6} lg={6} xl={6} sm={12}>
                      <p>Add new measurement unit</p>
                      <Form>
                        <FormGroup
                      className={
                        this.state.unitsNameFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.unitsName ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        id="customerName"
                        className={
                          this.state.unitsName
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeUnitsName.bind(this)}
                        onFocus={this.handleFocusUnitsName.bind(this)}
                        onBlur={this.handleBlurUnitsName.bind(this)}
                        validations={[required, unit]}
                        value={this.state.unitsName}
                        style={{marginBottom: "4rem"}}
                      />
                      <Label className="form-control-placeholder">Unit name*</Label>
                    </FormGroup>

                        <FormGroup
                      className={
                        this.state.unitsSymbolFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.unitsSymbol ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        id="unitsSymbol"
                        className={
                          this.state.unitsSymbol
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeUnitsSymbol.bind(this)}
                        onFocus={this.handleFocusUnitsSymbol.bind(this)}
                        onBlur={this.handleBlurUnitsSymbol.bind(this)}
                        validations={[required, symbol]}
                        value={this.state.unitsSymbol}
                        style={{marginBottom: "4rem"}}
                      />
                      <Label className="form-control-placeholder">Unit Symbol*</Label>
                    </FormGroup>
                        <div className="d-flex justify-content-end">
                          <Button
                            className="blue-btn"
                            onClick={this.handleSubmitUnits.bind(this)}
                            disabled={ unitErr|| symbolErr || reqErr}
                          >
                            Save
                          </Button>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <Row>
                        <Col md={6}>List of manufactures</Col>
                        <Col md={6} className="d-flex justify-content-end">
                          <Button
                            className="blue-btn"
                            onClick={this.toggleConfirmation}
                          >
                            Add new brand
                          </Button>
                        </Col>
                        <Col md={12}>
                          <Table responsive className="mT25">
                            <thead>
                              <tr>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>Website</th>
                                <th>Status</th>
                                <th>Actions </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.props.manufacturers_list.map(
                                (manufacturers, i) => {
                                  return (
                                    <tr>
                                      <td>
                                        <img
                                          src={manufacturers.logo}
                                          className="img-fluid companyLogo"
                                        />
                                      </td>
                                      <td>{manufacturers.name}</td>
                                      <td>{manufacturers.website}</td>
                                      <td>
                                        {this.status(manufacturers.is_active)}
                                      </td>
                                      <td className="action">
                                        <span>
                                          <Edit
                                            size={16}
                                            className="mr-4 pointer"
                                            onClick={() => {
                                              this.toggleUpdateManufacturer(
                                                manufacturers.id
                                              );
                                            }}
                                          />
                                        </span>
                                        <span 
                                          className= "pointer"
                                          onClick={() => {
                                              this.handleDeleteManufacturer(manufacturers.id);
                                            }}
                                        >
                                          <Trash2 size={16} className="mr-4" />
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </TabPane>
                {/* <TabPane tabId="3">
                  <Row>
                    <Col sm="6">
                      <p style={{ color: "#3B4367", fontSize: 17 }}>
                        Update Average cost
                      </p>
                      <Form onSubmit={this.handleSubmitAverageCost.bind(this)}>
                        <FormGroup>
                          <Label for="basicinput">Partcode</Label>

                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            onChange={this.handleChangePartcode.bind(this)}
                            options={this.state.partcodeOptions}
                            placeholder={this.state.partcode}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="basicinput">Average cost</Label>

                          <Input
                            type="text"
                            id="iconLeft"
                            name="iconLeft"
                            onChange={this.handleChangeAverageCost.bind(this)}
                          />
                        </FormGroup>
                        <Button
                          className="blue-btn mR25"
                          style={{ margin: "auto", float: "right" }}
                        >
                          Update
                        </Button>
                      </Form>
                      <Row className="col-12" style={{ marginTop: 100 }}>
                        <Col md={1} className="img-fluid">
                          <img src={infoYellow} />
                        </Col>
                        <Col>
                          <p
                            style={{
                              color: "#646C9A",
                              fontSize: 14,
                              fontWeight: "500"
                            }}
                          >
                            Important Notice:
                          </p>
                          <p
                            style={{
                              color: "#646C9A",
                              fontSize: 14,
                              fontWeight: "normal"
                            }}
                          >
                            Please note that updating average cost for a given
                            part code will override the existing average cost
                            and it won’t be updated on the existing quotes.
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm="6"></Col>
                  </Row>
                </TabPane> */}
              </TabContent>
            </CardBody>
          </Card>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleConfirmation}
            backdrop={false}
            style={{ marginTop: "150px", width: "800px" }}
          >
            <ModalHeader toggle={this.toggleConfirmation}>
              Add new manufacturer
            </ModalHeader>
            <ModalBody className="bodyToggle">
              <Row>
                <Col md={6}>
                  <Form>
                      <FormGroup
                      className={
                        this.state.manufacturersNameFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.manufacturersName ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        id="customerName"
                        className={
                          this.state.manufacturersName
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeManufacturersName.bind(this)}
                        onFocus={this.handleFocusManufacturersName.bind(this)}
                        onBlur={this.handleBlurManufacturersName.bind(this)}
                        validations={[required]}
                        value={this.state.manufacturersName}
                        style={{marginBottom: "4rem"}}
                      />
                      <Label className="form-control-placeholder">Manufacturer name*</Label>
                    </FormGroup>
                  <FormGroup
                      className={
                        this.state.manufacturersWebsiteFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.manufacturersWebsite ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        id="customerName"
                        className={
                          this.state.manufacturersWebsite
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeManufacturersWebsite.bind(this)}
                        onFocus={this.handleFocusManufacturersWebsite.bind(this)}
                        onBlur={this.handleBlurManufacturersWebsite.bind(this)}
                        validations={[required]}
                        value={this.state.manufacturersWebsite}
                        style={{marginBottom: "4rem"}}
                      />
                      <Label className="form-control-placeholder">Website*</Label>
                    </FormGroup>
                  </Form>
                  
                </Col>
                <Col md={6}>
                  <div
                    className="dropzone position-relative ml-40"
                    style={{ minHeight: "auto" }}
                  >
                    <FormGroup style={{ height: "100%" }}>
                      <Label for="basicinput">Product image</Label>
                      {this.state.files.length > 0 ? (
                        <div className="position-relative">
                          {this.state.files.map(file => (
                            <img
                              src={file.preview}
                              className="img-fluid imgPreview"
                            />
                          ))}
                          <X
                            size={15}
                            className="imgPreviewClose"
                            onClick={this.clearPreview.bind(this)}
                          />
                        </div>
                      ) : (
                        <Dropzone
                          onDrop={this.onDrop.bind(this)}
                          className="drophere manuDrop"
                          style={{
                            minHeight: "auto",
                            padding: 5
                          }}
                        >
                          <div>
                            <FontAwesomeIcon
                              icon="cloud-upload-alt"
                              style={{ fontSize: 30 }}
                            />
                            <p style={{ fontSize: 13 }}>Upload logo</p>
                          </div>
                        </Dropzone>
                      )}
                      {this.state.manLogoError ? (
                          <div style={{color: "#c51244", fontSize: "12px", marginTop: "-5px"}}> 
                            {this.state.manLogoError}
                          </div>
                          ): null}
                    </FormGroup>
                  </div>
                    
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <form ref="breakfastForm">
                    {/* Custom icons */}

                    <label>
                      <Toggle
                        defaultChecked={this.state.is_active}
                        icons={{
                          checked: "Active",
                          unchecked: "Inactive"
                        }}
                        onChange={this.handleSoupChange.bind(this)}
                      />
                    </label>
                  </form>
                </Col>
                <Col md={6}>
                  <Button
                    className="blue-btn mR25"
                    style={{ margin: "auto", float: "right" }}
                    onClick={this.handleSubmitManufacturers.bind(this)}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
          <Modal
            isOpen={this.state.modalUpdate}
            toggle={this.toggleUpdateManufacturer}
            className=""
            backdrop={false}
            style={{ marginTop: "150px", width: "800px" }}
          >
            <ModalHeader toggle={this.toggleUpdateManufacturer}>
              Update manufacturer
            </ModalHeader>
            <ModalBody className="">
              <Row>
                <Col md={6}>
                  {" "}
                  <Form>
                      <FormGroup
                      className={
                        this.state.manufacturersNameUpdateFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.manufacturersNameUpdate ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        id="customerName"
                        className={
                          this.state.manufacturersNameUpdate
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeManufacturersNameUpdate.bind(this)}
                        onFocus={this.handleFocusManufacturersNameUpdate.bind(this)}
                        onBlur={this.handleBlurManufacturersNameUpdate.bind(this)}
                        validations={[required]}
                        value={this.state.manufacturersNameUpdate}
                        style={{marginBottom: "4rem"}}
                      />
                      <Label className="form-control-placeholder">Manufacturer name*</Label>
                    </FormGroup>
                  
                 <FormGroup
                      className={
                        this.state.manufacturersWebsiteUpdateFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.manufacturersWebsiteUpdate ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        id="customerName"
                        className={
                          this.state.manufacturersWebsiteUpdate
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeManufacturersWebsiteUpdate.bind(this)}
                        onFocus={this.handleFocusManufacturersWebsiteUpdate.bind(this)}
                        onBlur={this.handleBlurManufacturersWebsiteUpdate.bind(this)}
                        validations={[required]}
                        value={this.state.manufacturersWebsiteUpdate}
                        style={{marginBottom: "4rem"}}
                      />
                      <Label className="form-control-placeholder">Website*</Label>
                    </FormGroup>
                  </Form>

                </Col>
                <Col md={6}>
                  <div
                    className="dropzone position-relative"
                    style={{ minHeight: "auto" }}
                  >
                    <FormGroup style={{ height: "100%" }}>
                      <Label for="basicinput">Product image</Label>

                      {this.state.filesUpdate.length > 0 ? (
                        <div className="position-relative">
                          {this.state.filesUpdate.map(file => (

                            <img
                              src={file.preview}
                              className="img-fluid imgPreview"
                            />
                          ))}
                          <X
                            size={15}
                            className="imgPreviewClose"
                            onClick={this.clearPreviewuUpdate.bind(this)}
                          />
                        </div>
                      ) : (
                        <Dropzone
                          onDrop={this.onDropUpdate.bind(this)}
                          className="drophere manuDrop"
                          style={{
                            minHeight: "auto",
                            padding: 5
                          }}
                        >
                          <div>

                            <FontAwesomeIcon
                              icon="cloud-upload-alt"
                              style={{ fontSize: 30 }}
                            />
                            <p style={{ fontSize: 13 }}>Upload logo</p>
                          </div>
                        </Dropzone>
                      )}
                      {this.state.manLogoUpdateError ? (
                          <div style={{color: "#c51244", fontSize: "12px", marginTop: "-5px"}}> 
                            {this.state.manLogoUpdateError}
                          </div>
                          ): null}
                    </FormGroup>
                  </div>
                </Col>
                <Col md={6}>
                  <form ref="breakfastForm">
                    {/* Custom icons */}

                    <label>
                      <Toggle
                        defaultChecked={this.state.is_activeUpdate}
                        icons={{
                          checked: "Active",
                          unchecked: "Inactive"
                        }}
                        onChange={this.handleSoupChangeUpdate.bind(this)}
                      />
                    </label>
                  </form>
                </Col>
                <Col md={6}>
                  <Button
                    className="blue-btn mR25"
                    style={{ margin: "auto", float: "right" }}
                    onClick={this.handleSubmitManufacturersUpdate.bind(this)}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
          <Modal
            isOpen={this.state.modalUpdateUnit}
            toggle={this.togglemodalUpdateUnit}
            className=""
            backdrop={false}
            style={{ maxWidth: 380 }}
          >
            <ModalHeader toggle={this.togglemodalUpdateUnit}>
              Update Units
            </ModalHeader>
            <ModalBody className="">
              <Row>
                <Col md={12} lg={12} xl={12} sm={12}>
                  <p>Update measurement unit</p>
                  <Form>
                    <FormGroup
                      className={
                        this.state.unitsNameUpdateFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.unitsNameUpdate ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        id="customerName"
                        className={
                          this.state.unitsNameUpdate
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeUnitsNameUpdate.bind(this)}
                        onFocus={this.handleFocusUnitsNameUpdate.bind(this)}
                        onBlur={this.handleBlurUnitsNameUpdate.bind(this)}
                        validations={[required, unit]}
                        value={this.state.unitsNameUpdate}
                        style={{marginBottom: "4rem"}}
                      />
                      <Label className="form-control-placeholder">Unit name*</Label>
                    </FormGroup>

                    <FormGroup
                      className={
                        this.state.unitsSymbolUpdateFocus
                          ? "hasFloatingLabel isFocused"
                          : "hasFloatingLabel notFocused"
                      }
                      id={this.state.unitsSymbolUpdate ? "hasValue" : "hasnoValue"}
                    >
                      <Input
                        type="text"
                        id="unitsSymbolUpdate"
                        className={
                          this.state.unitsSymbolUpdate
                            ? "form-control input floatingLabel"
                            : "form-control"
                        }
                        onChange={this.handleChangeUnitsSymbolUpdate.bind(this)}
                        onFocus={this.handleFocusUnitsSymbolUpdate.bind(this)}
                        onBlur={this.handleBlurUnitsSymbolUpdate.bind(this)}
                        validations={[required, symbol]}
                        value={this.state.unitsSymbolUpdate}
                        style={{marginBottom: "2rem"}}
                      />
                      <Label className="form-control-placeholder">Unit Symbol*</Label>
                    </FormGroup>
                    <div className="d-flex justify-content-end">
                      <Button
                        className="blue-btn"
                        onClick={this.handleSubmitUnitsUpdate.bind(this)}
                        disabled={ unitErr|| symbolErr || reqErr}
                      >
                        Save
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  units_list: state.unitsReducer.unitsList,
  units_create: state.unitsReducer.createUnits,
  unit_data: state.unitsReducer.unitData,
  unit_update: state.unitsReducer.updateUnit,
  unit_delete: state.unitsReducer.deleteUnit,
  manufacturers_list: state.manufacturersReducer.manufacturersList,
  manufacturer_data: state.manufacturersReducer.manufacturerData,
  manufacturer_update: state.manufacturersReducer.updateManufacturer,
  productVariant_list: state.productReducer.productVariantList,
  manufacturers_create: state.manufacturersReducer.createManufacturers,
  manufacturer_delete: state.manufacturersReducer.deleteManufacturers,

  averageCost_update: state.averageCostReducer.updateAverageCost
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUnit,
      unitUpdation,
      fetchUnitsList,
      unitsCreation,
      unitdeletion,
      fetchManufacturersList,
      fetchProductVariantList,
      manufacturersCreation,
      manufacturersDeletion,
      fetchManufacturer,
      manufacturerUpdation,

      averageCostUpdation
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Products);
