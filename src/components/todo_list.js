import React, { Component } from "react";
import TodoDataService from "../services/todo.service";
import { withRouter } from "../common/with-router";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [], // Added todos property to the state
      newTodo: "",
    };
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = () => {
    // Assuming TodoDataService.getAll() returns a promise with the list of todos
    console.log("Fetching todos...");
    TodoDataService.getAll()
      .then((response) => {
        console.log("Todo response:", response);
        this.setState({
          todos: response.data,
        });
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  };

  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  addTodo = () => {
    if (this.state.newTodo.trim() !== "") {
      TodoDataService.create({ title: this.state.newTodo, done: false })
        .then((response) => {
          console.log("Todo created:", response.data); // Log the response data
          this.setState((prevState) => ({
            todos: [...prevState.todos, response.data],
            newTodo: "",
          }));
          this.fetchTodos();
        })
        .catch((error) => {
          console.error("Error adding todo:", error);
        });
    }
  };  
  

  toggleTodo = (id) => {
    TodoDataService.update(id, {
      completed: !this.state.todos.find((todo) => todo.id === id).completed,
    })
      .then(() => {
        this.fetchTodos();
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };
  

  deleteTodo = (id) => {
    TodoDataService.delete(id)
      .then(() => {
        this.fetchTodos();
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  render() {
    return (
      <div>
        <ul>
        {this.state.todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => this.toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.title}
            </span>
            <button onClick={() => this.deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}

        </ul>
        <div>
          <input
            type="text"
            id="title"
            value={this.state.newTodo}
            onChange={this.handleInputChange}
          />
          <button onClick={this.addTodo}>Add Todo</button>
        </div>
      </div>
    );
  }
}

export default withRouter(TodoList);
