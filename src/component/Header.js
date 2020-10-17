import * as React from "react";
import { Navbar } from "reactstrap";

export default function Header() {
  return (
    <Navbar bg="light" className="main-header">
      <div className="container">
        <div className="header-nav desk col-md-9">
          <div className="top-heading">
            Question System
          </div>
        </div>
      </div>
    </Navbar>
  );
};
