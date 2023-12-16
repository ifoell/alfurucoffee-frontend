import React, { Component } from "react";
import EmployeeDataService from "../../services/employee.service";
import { Link } from "react-router-dom";

export default class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveEmployee = this.retrieveEmployee.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEmployee = this.setActiveEmployee.bind(this);
    this.searchName = this.searchName.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      Employee: [],
      currentEmployee: null,
      currentIndex: -1,
      searchName: "",
    };
  }

  originalEmployeeList = [];

  componentDidMount() {
    this.retrieveEmployee();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;
    this.setState({
      searchName: searchName,
    });
  }

  retrieveEmployee() {
    EmployeeDataService.getAll()
      .then((response) => {
        this.originalEmployeeList = response.data; // Save the original list
        this.setState({
          Employee: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.setState({
      currentEmployee: null,
      currentIndex: -1,
      Employee: this.originalEmployeeList, // Restore the original list
    });
  }

  setActiveEmployee(employee, index) {
    this.setState({
      currentEmployee: employee,
      currentIndex: index,
    });
  }

  searchName() {
    const { searchName } = this.state;

    // Filter the original list based on the search input
    const filteredEmployees = this.originalEmployeeList.filter((employee) =>
      employee.name.toLowerCase().includes(searchName.toLowerCase())
    );

    this.setState({
      Employee: filteredEmployees,
    });
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      this.searchName();
    }
  }

  render() {
    const { searchName, Employee, currentEmployee, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchName}
              onChange={this.onChangeSearchName}
              onKeyDown={this.handleKeyDown}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Employee List</h4>

          <ul className="list-group">
            {Employee &&
              Employee.map((employees, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveEmployee(employees, index)}
                  key={index}
                >
                  {employees.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentEmployee ? (
            <div>
              <h4>Employee</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentEmployee.name}
              </div>
              <div>
                <label>
                  <strong>Job Title:</strong>
                </label>{" "}
                {currentEmployee.job_title}
              </div>
              <div>
                <label>
                  <strong>Salary:</strong>
                </label>{" "}
                {currentEmployee.salary}
              </div>
              <div>
                <label>
                  <strong>Department:</strong>
                </label>{" "}
                {currentEmployee.department}
              </div>
              <div>
                <label>
                  <strong>Joined Date:</strong>
                </label>{" "}
                {currentEmployee.joined_date}
              </div>
              <Link
                to={"/employee/" + currentEmployee.id}
                className="btn btn-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Employee Name...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
