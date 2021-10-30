import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateStudent from "./components/create-student.component";
import EditStudent from "./components/edit-student.component";
import StudentList from "./components/student-list.component";
import DisplayStudent from "./components/displayStudent.component";
import './App.css'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">SIS</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Students</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Add Student</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/display" className="nav-link">Display All</Link>
                </li>

              </ul>
            </div>
          </nav>

          <Route path="/" exact component={StudentList} />
          <Route path="/edit/:id" component={EditStudent} />
          <Route path="/create" component={CreateStudent} />
          <Route path="/display" component={DisplayStudent} />
        </div>
      </Router>
    );
  }
}

export default App;
