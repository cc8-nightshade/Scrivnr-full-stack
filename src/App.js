import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ContactList from "./components/contacts/ContactList";
import Video from "./components/dashboard/Video";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import SignUpV from "./components/auth/SignUpV"
import SearchUsers from "./components/contacts/SearchUsers"

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Video} />
            <Route path="/about" component={Dashboard} />
            <Route path="/contacts" component={ContactList} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signupv" component={SignUpV} />
            <Route path="/search" component={SearchUsers} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
