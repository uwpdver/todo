import React, { Component } from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import TodoItemPropTypes from "./TodoItem";

export default class TodoList extends Component {
  render() {
    const { todos, onItemCheckChange, onItemDelete } = this.props;
    return (
      <div>
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            content={todo.content}
            isChecked={todo.isChecked}
            onCheckChange={onItemCheckChange}
            onDelete={onItemDelete}
          />
        ))}
      </div>
    );
  }
}

TodoList.defaultProps = {
  todos: [],
  onItemCheckChange: () => {},
  onItemDelete: () => {}
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoItemPropTypes).isRequired,
  onItemCheckChange: PropTypes.func.isRequired,
  onItemDelete: PropTypes.func.isRequired
};
