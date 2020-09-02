import React from "react";
// import { ShoppingCart } from "react-feather";

// import templateConfig from "../../../templateConfig";

const Footer = (props) => (
  <footer className="col-md-12">
    <div className="container-fluid">
      <p className="text-center">
        © {" " + new Date().getFullYear() + " "} SmartMi Crafted by{" "}
        <i className="ft-heart font-small-3" />
        <a
          href="https://www.nubestechno.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          {" "}
          Nubes Technologies
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
