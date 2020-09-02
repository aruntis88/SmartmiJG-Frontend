// import external modules
import React, { PureComponent } from "react";
import classnames from "classnames";
import { Row, Col } from "reactstrap";
// import internal(own) modules
import {
  FoldedContentConsumer,
  FoldedContentProvider,
} from "../utility/context/toggleContentContext";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import templateConfig from "../templateConfig";
import SideMenuContent from "./components/sidebar/sidemenu/sidemenu";
class MainLayout extends PureComponent {
  state = {
    width: window.innerWidth,
    sidebarState: "close",
    sidebarSize: "",
    layout: "",
  };

  updateWidth = () => {
    this.setState((prevState) => ({
      width: window.innerWidth,
    }));
  };

  handleSidebarSize = (sidebarSize) => {
    this.setState({ sidebarSize });
  };

  handleLayout = (layout) => {
    this.setState({ layout });
  };

  componentDidMount() {
    if (window !== "undefined") {
      window.addEventListener("resize", this.updateWidth, false);
    }
  }

  componentWillUnmount() {
    if (window !== "undefined") {
      window.removeEventListener("resize", this.updateWidth, false);
    }
  }

  toggleSidebarMenu(sidebarState) {
    this.setState({ sidebarState });
  }

  render() {
    return (
      <FoldedContentProvider>
        <FoldedContentConsumer>
          {(context) => (
            <div
              id="mainWrapper"
              // className={classnames("wrapper ", {
              //   "menu-collapsed":
              //     context.foldedContent || this.state.width < 991,
              //   "main-layout": !context.foldedContent,
              //   [`${templateConfig.sidebar.size}`]:
              //     this.state.sidebarSize === "",
              //   [`${this.state.sidebarSize}`]: this.state.sidebarSize !== "",
              //   //    "layout-dark": (this.state.layout === 'layout-dark'),
              //   //    " layout-dark": (this.state.layout === '' && templateConfig.layoutDark === true)
              //   [`${templateConfig.layoutColor}`]: this.state.layout === "",
              //   [`${this.state.layout}`]: this.state.layout !== ""
              // })}
              className="d-flex flex-wrap"
            >
              {/* <Sidebar
                toggleSidebarMenu={this.toggleSidebarMenu.bind(this)}
                sidebarState={this.state.sidebarState}
                handleSidebarSize={this.handleSidebarSize.bind(this)}
                handleLayout={this.handleLayout.bind(this)}
              /> */}
              <Navbar
                toggleSidebarMenu={this.toggleSidebarMenu.bind(this)}
                sidebarState={this.state.sidebarState}
                className="col-md-12"
              />
              <main className="col-md-12">
                <Row>
                  <div
                    style={{
                      width: "70px",
                      background: "#5E77FF",
                      height: "calc(100vh - 50px)",
                    }}
                  >
                    <SideMenuContent />
                  </div>
                  <div
                    style={{
                      width: "calc(100% - 70px)",
                      padding: "0 15px",
                      height: "calc(100vh - 50px)",
                      overflowY: "scroll",
                    }}
                  >
                    {" "}
                    {this.props.children}
                    <Footer />
                  </div>
                </Row>
              </main>
            </div>
          )}
        </FoldedContentConsumer>
      </FoldedContentProvider>
    );
  }
}

export default MainLayout;
