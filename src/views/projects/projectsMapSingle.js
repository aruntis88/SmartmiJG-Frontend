// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProject } from "../../redux/sagas/projects/fetchProject";
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
  Tooltip
} from "reactstrap";
import { Link } from "react-router-dom";
import { Home, Search, Edit, Trash2, X } from "react-feather";
import locationIMG from "../../assets/img/location.png";
const K_WIDTH = 80;
const K_HEIGHT = 80;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: "absolute",
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  // border: "5px solid #f44336",
  // borderRadius: K_HEIGHT,
  // backgroundColor: "white",
  // textAlign: "center",
  // color: "#3f51b5",
  // fontSize: 16,
  // fontWeight: "bold",
  padding: "15px 8px"
};

class ProjectsMapSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: parseInt(localStorage.getItem("projectLat")),
        lng: parseInt(localStorage.getItem("projectLng"))
      },
      zoom: 11,
      tooltip: false
    };
    let pathArray = window.location.pathname.split("/");
    let projectId = pathArray[2];
    console.log(
      "projectId",
      projectId,
      localStorage.getItem("projectLat"),
      localStorage.getItem("projectLng")
    );
    this.props.fetchProject(projectId);
  }

  componentWillReceiveProps() {
    setTimeout(
      () => {
        if (this.props.project_data) {
          console.log("dfgdff", this.props.project_data.status);
          switch (this.props.project_data.status) {
            case "TR":
              this.setState({ status_place: "Tender" });
              break;
            case "JC":
              this.setState({ status_place: "JJIH-Main Contractor" });
              break;
            case "J1":
              this.setState({ status_place: "JIH-Stage 1" });
              break;
            case "J2":
              this.setState({ status_place: "JIH-Stage 2" });
              break;
            case "J3":
              this.setState({ status_place: "JIH-Stage 3" });
              break;
            case "J4":
              this.setState({ status_place: "JIH-Stage 4" });
              break;
            case "CL":
              this.setState({ status_place: "Closed" });
              break;
            case "CA":
              this.setState({ status_place: "Cancelled" });
              break;
            default:
            // code block
          }
        }
      },

      1000
    );
  }
  // componentDidMount() {
  //   setTimeout(
  //     () => {
  //       if (this.props.project_data){
  //         this.setState({ center.lat : this.props.project_data.latitude)};
  //         this.setState({ center.lng : this.props.project_data.longitude)};
  //       }      
  //     },

  //     1000
  //   );
  // }
  locationDesc() {
    this.setState({
      tooltip: !this.state.tooltip
    });
    console.log("tooltip", this.state.tooltip);
  }
  render() {
    let title = "";
    if (this.props.project_data){
      title = this.props.project_data.reference_no;
    } else title = "Projects"
    const AnyReactComponent = ({ text }) => (
      <div style={greatPlaceStyle}>
        {this.props.project_data ? (
          <div className="position-relative">
            {text}
            <img
              src={locationIMG}
              className="locationIMG img-fluid"
              onClick={this.locationDesc.bind(this)}
              // onMouseEnter={this.locationDesc.bind(this)}
              // onMouseLeave={this.locationDesc.bind(this)}
            />

            <div
              className={
                this.state.tooltip
                  ? "d-flex justify-content-center toolTipContainer arrow-down-custom"
                  : "d-none"
              }
            >
              <Table className="locationTable">
                <thead>
                  <tr>
                    <th>Project Information</th>
                    <th>
                      <X
                        size={15}
                        onClick={this.locationDesc.bind(this)}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          cursor: "pointer"
                        }}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width="70%">
                      Name : <span>{this.props.project_data.name}</span>
                    </td>
                    <td width="30%">
                      Project Value :{" "}
                      <span>{this.props.project_data.value}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Project Stage :{" "}
                      <span>
                        {" "}
                        {this.props.project_data.stage == "T"
                          ? "Tender"
                          : "Job In Hand"}
                      </span>
                    </td>
                    <td>
                      Project Status: <span>{this.state.status_place}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Start Date :{" "}
                      <span>
                        {" "}
                        {moment(this.props.project_data.exp_start_date).format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                    </td>
                    <td>
                      End Date :{" "}
                      <span>
                        {moment(this.props.project_data.exp_end_date).format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Main Contractor :{" "}
                      <span>
                        {this.props.project_data.main_contractor_details.name}
                      </span>
                    </td>
                    <td>
                      Main Sub Contractor :{" "}
                      <span>
                        {
                          this.props.project_data.main_sub_contractor_details
                            .name
                        }
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        ) : null}
      </div>
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
              <BreadcrumbItem>
                <a href="/projects">Projects</a>
              </BreadcrumbItem>
              <BreadcrumbItem active>{title}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0"></Col>
          <Card className="col-md-12">
            <CardHeader>
              <Row className="row align-items-center">
                <Col>{title}</Col>
                <Col className="d-flex justify-content-md-end align-items-center">
                  <Form>
                    <FormGroup className="searchInput">
                      <div className="position-relative has-icon-left">
                        <Input type="text" id="iconLeft" name="iconLeft" />
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
              <div style={{ height: "calc(100vh - 250px)", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyCcjzmUVwQgCgui-M1ouF1Ft9TKWuj_QRQ"
                  }}
                  defaultCenter={this.state.center}
                  defaultZoom={this.state.zoom}
                >
                  <AnyReactComponent
                    lat={this.state.center.lat}
                    lng={this.state.center.lng}
                    //text={"Kreyser Avrora"}
                    id={"Tooltip-" + this.props.id}
                  />
                </GoogleMapReact>
              </div>
            </CardBody>
          </Card>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  project_data: state.projectReducer.projectData
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProject
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsMapSingle);
