import React, { Component } from "react";
import EmployeeDataService from "../../services/employee.service";

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    // 'name','job_title','salary','department','joined_date'
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeJoinedDate = this.onChangeJoinedDate.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      id: null,
      name: "",
      job_title: "",
      salary: "",
      department: "",
      joined_date: "",

      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeJobTitle(e) {
    this.setState({
      job_title: e.target.value,
    });
  }

  onChangeSalary(e) {
    this.setState({
      salary: e.target.value,
    });
  }

  onChangeDepartment(e) {
    this.setState({
      department: e.target.value,
    });
  }

  onChangeJoinedDate(e) {
    this.setState({
      joined_date: e.target.value,
    });
  }

  saveEmployee() {
    const formattedJoinedDate = new Date(
      this.state.joined_date
    ).toLocaleDateString("en-CA");

    const data = {
      name: this.state.name,
      job_title: this.state.job_title,
      salary: this.state.salary,
      department: this.state.department,
      joined_date: formattedJoinedDate, // Use the formatted date
    };

    EmployeeDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          job_title: response.data.job_title,
          salary: response.data.salary,
          department: response.data.department,
          joined_date: response.data.joined_date,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newEmployee() {
    this.setState({
      id: null,
      name: "",
      job_title: "",
      salary: "",
      department: "",
      joined_date: "",

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newEmployee}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="job_title">Job Title</label>
              <input
                type="text"
                className="form-control"
                id="job_title"
                required
                value={this.state.job_title}
                onChange={this.onChangeJobTitle}
                name="job_title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="salary">salary</label>
              <input
                type="number"
                className="form-control"
                id="salary"
                required
                value={this.state.salary}
                onChange={this.onChangeSalary}
                name="salary"
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                className="form-control"
                id="department"
                required
                value={this.state.department}
                onChange={this.onChangeDepartment}
                name="department"
              />
            </div>

            <div className="form-group">
              <label htmlFor="joined_date">Joined Date</label>
              <input
                type="date"
                className="form-control"
                id="joined_date"
                required
                value={this.state.joined_date}
                onChange={this.onChangeJoinedDate}
                name="joined_date"
              />
            </div>

            <button onClick={this.saveEmployee} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
