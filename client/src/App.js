import React, { Component } from "react";
//import logo from "./logo.svg";

//css
import "./App.css";

// pages
import Saved from "./pages/saved"
import Search from "./pages/search"

// dependency components
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import io from "socket.io-client";

// utils
import API from "./utils/API";



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
