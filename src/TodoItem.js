import React, { Component } from "react";
import PropTypes from "prop-types";

export default class TodoItem extends Component {
  render() {
    const { id, content, isChecked, onCheckChange, onDelete } = this.props;
    return (
      <div
        className={`todo__item-wrapper ${
          isChecked ? "todo__item-wrapper--checked" : ""
        }`}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheckChange(id)}
        />
        <div className="todo__item-cotent">{content}</div>
        <button className="todo__delete-btn" onClick={() => onDelete(id)}>
          x
        </button>
      </div>
    );
  }
}

TodoItem.defaultProps = {
  content: "",
  isChecked: false,
  onCheckChange: () => {},
  onDelete: () => {}
};

export const TodoItemPropTypes = {
  content: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheckChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

TodoItem.propTypes = TodoItemPropTypes;
