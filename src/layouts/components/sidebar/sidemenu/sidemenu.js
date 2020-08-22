// import external modules
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Mail,
  MessageSquare,
  ChevronRight,
  Aperture,
  Box,
  Edit,
  Grid,
  Layers,
  Sliders,
  Map,
  BarChart2,
  Calendar,
  Copy,
  Book,
  CheckSquare,
  LifeBuoy,
  Users,
} from "react-feather";
import { Tooltip } from "reactstrap";
import { NavLink } from "react-router-dom";

// Styling
import "../../../../assets/scss/components/sidebar/sidemenu/sidemenu.scss";
// import internal(own) modules
import SideMenu from "../sidemenuHelper";

class SideMenuContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathLink: "",
      productToggle: false,
      usersToggle: false,
      projectsToggle: false,
      tooltipOpen: false,
    };
  }
  toggleMenu(menu) {
    if (menu == "product") {
      this.setState({ productToggle: !this.state.productToggle });
    } else if (menu == "users") {
      this.setState({ usersToggle: !this.state.usersToggle });
    } else if (menu == "projects") {
      this.setState({ projectsToggle: !this.state.projectsToggle });
    }
  }
  toggleLeads = () => {
    this.setState({
      tooltipLeadsOpen: !this.state.tooltipLeadsOpen,
    });
  };
  toggleQuotes = () => {
    this.setState({
      tooltipQuotesOpen: !this.state.tooltipQuotesOpen,
    });
  };
  toggleProducts = () => {
    this.setState({
      tooltipProductsOpen: !this.state.tooltipProductsOpen,
    });
  };
  toggleUsers = () => {
    this.setState({
      tooltipUsersOpen: !this.state.tooltipUsersOpen,
    });
  };
  toggleCustomers = () => {
    this.setState({
      tooltipCustomersOpen: !this.state.tooltipCustomersOpen,
    });
  };
  toggleProjects = () => {
    this.setState({
      tooltipProjectsOpen: !this.state.tooltipProjectsOpen,
    });
  };
  toggleGeneral = () => {
    this.setState({
      tooltipGeneralOpen: !this.state.tooltipGeneralOpen,
    });
  };
  componentWillUpdate() {
    var pathArray = window.location.pathname.split("/");

    this.state.pathLink = pathArray[1];
    console.log("this.state.pathLink", this.state.pathLink);
  }
  render() {
    return (
      <nav className="sidebar-content-custom">
        <ul id="main-menu-navigation" className="navigation navigation-main">
          {/* <li className="nav-item">
            <a className="menulable active">
              <span className="menu-item-text">SALES</span>
            </a>
          </li> */}
          <li className="nav-item">
            <Link
              to="/leads"
              className={this.state.pathLink == "leads" ? "active" : null}
              onClick={() => this.toggleMenu("leads")}
              id="Tooltip-leads"
            >
              <i className="menu-icon leads-smartmi">
                <Tooltip
                  placement="right"
                  isOpen={this.state.tooltipLeadsOpen}
                  target="Tooltip-leads"
                  toggle={this.toggleLeads}
                  autohide={false}
                  className="menuTooltip"
                >
                  <ul>
                    <li>Leads</li>
                  </ul>
                </Tooltip>
              </i>
              {/* <span className="menu-item-text">Leads</span> */}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/quotes"
              className={this.state.pathLink == "quotes" ? "active" : null}
              onClick={() => this.toggleMenu("quote")}
              id="Tooltip-quotes"
            >
              <i className="menu-icon quotes-smartmi">
                <Tooltip
                  placement="right"
                  isOpen={this.state.tooltipQuotesOpen}
                  target="Tooltip-quotes"
                  toggle={this.toggleQuotes}
                  autohide={false}
                  className="menuTooltip"
                >
                  <ul>
                    <li>Quotes</li>
                  </ul>
                </Tooltip>
              </i>
              {/* <span className="menu-item-text">Quotes</span> */}
            </Link>
          </li>
          {/* <li className="nav-item">
            <a className="menulable active">
              <span className="menu-item-text">MASTER</span>
            </a>
          </li> */}
          <li className="has-sub nav-item  ">
            <Link
              to="/products"
              className={
                this.state.pathLink == "products" ||
                this.state.pathLink == "product-categories" ||
                this.state.pathLink == "average-cost"
                  ? "active"
                  : null
              }
              id="Tooltip-products"
            >
              <i className="menu-icon producs-smartmi">
                <Tooltip
                  placement="right"
                  isOpen={this.state.tooltipProductsOpen}
                  target="Tooltip-products"
                  toggle={this.toggleProducts}
                  autohide={false}
                  className="menuTooltip"
                >
                  <ul>
                    <li>Products</li>
                    <li>
                      <Link
                        className={
                          this.state.pathLink == "product-categories"
                            ? "active"
                            : null
                        }
                        onClick={() => this.toggleMenu("productscategory")}
                        to="/product-categories"
                      >
                        Product Categories
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          this.state.pathLink == "average-cost"
                            ? "active"
                            : null
                        }
                        onClick={() => this.toggleMenu("averagecost")}
                        to="/average-cost"
                      >
                        Average Cost
                      </Link>
                    </li>
                  </ul>
                </Tooltip>
              </i>
            </Link>
          </li>
          <li className="has-sub nav-item  ">
            <Link
              to="/Users"
              className={
                this.state.pathLink == "Users" ||
                this.state.pathLink == "roles-accessibilites"
                  ? "active"
                  : null
              }
              id="Tooltip-users"
            >
              <i className="menu-icon users-smartmi">
                <Tooltip
                  placement="right"
                  isOpen={this.state.tooltipUsersOpen}
                  target="Tooltip-users"
                  toggle={this.toggleUsers}
                  autohide={false}
                  className="menuTooltip"
                >
                  <ul>
                    <li>Users</li>
                    <li>
                      <Link
                        className={
                          this.state.pathLink == "roles-accessibilites"
                            ? "active"
                            : null
                        }
                        to="/Users"
                      >
                        <span className="menu-item-text">
                          Roles & Accessibilities
                        </span>
                      </Link>
                    </li>
                  </ul>
                </Tooltip>
              </i>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/customers"
              className={this.state.pathLink == "customers" ? "active" : null}
              id="Tooltip-customers"
            >
              <i className="menu-icon customers-smartmi">
                <Tooltip
                  placement="right"
                  isOpen={this.state.tooltipCustomersOpen}
                  target="Tooltip-customers"
                  toggle={this.toggleCustomers}
                  autohide={false}
                  className="menuTooltip"
                >
                  <ul>
                    <li>Customers</li>
                  </ul>
                </Tooltip>
              </i>
            </Link>
          </li>
          <li className="has-sub nav-item  ">
            <Link
              to="/projects"
              className={
                this.state.pathLink == "projects" ||
                this.state.pathLink == "projects-requirement"
                  ? "active"
                  : null
              }
              id="Tooltip-projects"
            >
              <i className="menu-icon projects-smartmi">
                <Tooltip
                  placement="right"
                  isOpen={this.state.tooltipProjectsOpen}
                  target="Tooltip-projects"
                  toggle={this.toggleProjects}
                  autohide={false}
                  className="menuTooltip"
                >
                  <ul>
                    <li>Projects</li>
                    <li>
                      <Link
                        className={
                          this.state.pathLink == "projects-requirement"
                            ? "active"
                            : null
                        }
                        to="/projects-requirement"
                      >
                        <span className="menu-item-text">
                          Projects Requirement
                        </span>
                      </Link>
                    </li>
                  </ul>
                </Tooltip>
              </i>

              {/* <span className="menu-item-text d-inline"> Projects</span> */}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/general"
              className={this.state.pathLink == "general" ? "active" : null}
              id="Tooltip-general"
            >
              <i className="menu-icon general-smartmi">
                {" "}
                <Tooltip
                  placement="right"
                  isOpen={this.state.tooltipGeneralOpen}
                  target="Tooltip-general"
                  toggle={this.toggleGeneral}
                  autohide={false}
                  className="menuTooltip"
                >
                  <ul>
                    <li>General</li>
                  </ul>
                </Tooltip>
              </i>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default SideMenuContent;
