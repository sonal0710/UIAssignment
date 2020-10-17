import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

class Pagee404 extends Component {
  render() {
    return (
      <div className="text-center mt-5 page-not-found">
        <div>404</div>
        <p>Oops ! Page Not Found</p>
        <Link to="/">
          <Button className="gradient-fill-btn">Go To Main Page</Button>
        </Link>
      </div>
    );
  }
}

export default Pagee404;
