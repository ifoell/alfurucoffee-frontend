import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import AddEmployee from "./components/employee/add-employee.component";
import Employee from "./components/employee/employee.component";
import EmployeeList from "./components/employee/employee-list.component";
import TodoPage from "./components/todo_page";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/employee"} className="navbar-brand">
            Al-Furucoffee
          </Link>
          <div className="navbar-nav mr-auto">
          <li className="nav-item">
              <Link to={"/todo"} className="nav-link">
                Todo List
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/employee"} className="nav-link">
                Employee
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add-employee"} className="nav-link">
                Add Employee
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<EmployeeList/>} />
            <Route path="/employee" element={<EmployeeList/>} />
            <Route path="/add-employee" element={<AddEmployee/>} />
            <Route path="/employee/:id" element={<Employee/>} />
            <Route path="/todo" element={<TodoPage/>}/>
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
