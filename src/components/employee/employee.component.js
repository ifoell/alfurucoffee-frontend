import React, { Component } from "react";
import EmployeeDataService from "../../services/employee.service";
import { withRouter } from "../../common/with-router";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeJoinedDate = this.onChangeJoinedDate.bind(this);
    this.getEmployee = this.getEmployee.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);

    this.state = {
      currentEmployee: {
        id: null,
        name: "",
        job_title: "",
        salary: "",
        department: "",
        joined_date: "",

        submitted: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getEmployee(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          name: name,
        },
      };
    });
  }

  onChangeJobTitle(e) {
    const job_title = e.target.value;

    this.setState((prevState) => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        job_title: job_title,
      },
    }));
  }

  onChangeSalary(e) {
    const salary = e.target.value;

    this.setState((prevState) => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        salary: salary,
      },
    }));
  }

  onChangeDepartment(e) {
    const department = e.target.value;

    this.setState((prevState) => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        department: department,
      },
    }));
  }

  onChangeJoinedDate(e) {
    const joined_date = e.target.value;

    this.setState((prevState) => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        joined_date: joined_date,
      },
    }));
  }

  getEmployee(id) {
    EmployeeDataService.get(id)
      .then((response) => {
        this.setState({
          currentEmployee: response.data[0],
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateEmployee() {
    EmployeeDataService.update(
      this.state.currentEmployee.id,
      this.state.currentEmployee
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The Employee Data was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteEmployee() {
    EmployeeDataService.delete(this.state.currentEmployee.id)
      .then((response) => {
        console.log(response.data);
        this.props.router.navigate("/employee");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentEmployee } = this.state;

    return (
      <div>
        {currentEmployee ? (
          <div className="edit-form">
            <h4>Employee</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentEmployee.name || ""}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="job_title">Job Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="job_title"
                  value={currentEmployee.job_title || ""}
                  onChange={this.onChangeJobTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="salary">Salary</label>
                <input
                  type="number"
                  className="form-control"
                  id="salary"
                  value={currentEmployee.salary || ""}
                  onChange={this.onChangeSalary}
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  value={currentEmployee.department || ""}
                  onChange={this.onChangeDepartment}
                />
              </div>
              <div className="form-group">
                <label htmlFor="joined_date">Joined Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="joined_date"
                  value={currentEmployee.joined_date || ""}
                  onChange={this.onChangeJoinedDate}
                />
              </div>
            </form>

            <div className="mt-3">
              <button
                className="btn btn-danger"
                onClick={this.deleteEmployee}
              >
                Delete
              </button>

              <button
                type="submit"
                className="btn btn-success"
                onClick={this.updateEmployee}
              >
                Update
              </button>
            </div>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Employee...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Employee);
