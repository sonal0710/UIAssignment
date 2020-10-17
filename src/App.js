import React from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./container/HomePage";
import Page404 from "./container/Page404";
import Header from "./component/Header";
import Footer from "./component/Footer";
import "./assets/css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="" component={Page404} />
        </Switch>
        <Footer />
      </Router>
    );
}

export default App;
