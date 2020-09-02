// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GoogleMapReact from "google-map-react";
import Marker from "react-google-maps";
import { fetchProjectList } from "../../redux/sagas/projects/fetchProjectList";
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
  Tooltip,
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
  padding: "15px 8px",
};

class ProjectsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 25.3548,
        lng: 51.1839,
      },
      zoom: 8,
      tooltip: false,
    };
    this.props.fetchProjectList();
    console.log(this.props.project_list)
  }

  render() {
    const AnyReactComponent = ({ text }) => (
      <div style={greatPlaceStyle}>
        <div className="position-relative">
          {text}
          <img src={locationIMG} className="locationIMG img-fluid" />
        </div>
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
              <BreadcrumbItem active>Projects</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md={6} className="justify-content-end d-flex pR0"></Col>
          <Card className="col-md-12">
            <CardHeader>
              <Row className="row align-items-center">
                <Col>Projects</Col>
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
                  {this.props.project_list.length>0
                    ? this.props.project_list.map((project, i) => {
                        console.log("nnnnnnnnnnn", project);
                        return (
                            <AnyReactComponent
                              lat={project.latitude}
                              lng={project.longitude}
                              //text={"Kreyser Avrora"}
                            />
                        );
                      })
                    : null}
                </GoogleMapReact>
              </div>
            </CardBody>
          </Card>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  project_list: state.projectReducer.projectList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchProjectList,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsMap);
