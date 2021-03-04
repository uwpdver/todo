import React, { Component } from "react";
import "./styles.css";
import TodoList from "./TodoList";
import SearchBar from "./SearchBar";
import { loadState, saveState } from "./localState";

const InputMode = {
  add: 0,
  search: 1
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleOnTextChange = this.handleOnTextChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnItemDelete = this.handleOnItemDelete.bind(this);
    this.handleOnItemCheckChange = this.handleOnItemCheckChange.bind(this);
    this.handleSwitchInputModeBtnClick = this.handleSwitchInputModeBtnClick.bind(
      this
    );
    this.state = loadState() || {
      todos: [],
      textValue: "",
      queryString: "",
      inputMode: InputMode.add,
      maxTodoId: 1
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      saveState(this.state);
    }
  }

  handleSwitchInputModeBtnClick() {
    const { inputMode } = this.state;
    this.setState({
      inputMode: inputMode === InputMode.add ? InputMode.search : InputMode.add
    });
  }

  handleOnTextChange(e) {
    this.setState({ textValue: e.target.value });
  }

  handleOnSubmit(e) {
    e.preventDefault();

    const { todos, maxTodoId, textValue } = this.state;
    if (!textValue) {
      return undefined;
    }

    let todosCopied = todos.slice();
    let newTodoId = maxTodoId
      ? maxTodoId + 1
      : Math.max(...todos.map((todo) => todo.id));

    const newTodo = {
      id: newTodoId,
      content: textValue,
      isChecked: false
    };

    this.setState({
      todos: [newTodo].concat(todosCopied),
      maxTodoId: newTodoId,
      textValue: ""
    });
  }

  handleOnItemDelete(id) {
    const todosCopied = this.state.todos.slice();
    this.setState({
      todos: todosCopied.filter((todo) => todo.id !== id)
    });
  }

  handleOnItemCheckChange(id) {
    const todosCopied = this.state.todos.slice();
    try {
      const index = todosCopied.findIndex((todo) => todo.id === id);
      const todoWillBeModify = todosCopied[index];
      todoWillBeModify.isChecked = !todoWillBeModify.isChecked;
      this.setState({
        todos: todosCopied
      });
    } catch (error) {
      // ignore error
      console.log(error);
    }
  }

  render() {
    const { textValue, todos, inputMode } = this.state;
    const submitBtnText = inputMode === InputMode.add ? "add" : "search";
    const {
      handleOnTextChange,
      handleOnSubmit,
      handleOnItemDelete,
      handleOnItemCheckChange,
      handleSwitchInputModeBtnClick
    } = this;

    return (
      <div className="App">
        <div className="page-header">
          <div className="page-title">Todo</div>
          <button
            className="header__switch-input-mode-btn"
            onClick={handleSwitchInputModeBtnClick}
          >
            <span role="img" aria-label="search">
              🔍
            </span>
          </button>
        </div>
        <SearchBar
          textValue={textValue}
          onSubmit={handleOnSubmit}
          submitBtnText={submitBtnText}
          onTextChange={handleOnTextChange}
        />
        <TodoList
          todos={todos}
          onItemCheckChange={handleOnItemCheckChange}
          onItemDelete={handleOnItemDelete}
        />
      </div>
    );
  }
}
