import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SearchBar extends Component {
  render() {
    const { textValue, submitBtnText, onTextChange, onSubmit } = this.props;
    return (
      <form onSubmit={onSubmit} className="searchbar">
        <input
          className="searchbar__text-input"
          type="text"
          value={textValue}
          onChange={onTextChange}
        />
        <button type="submit" className="searchbar__submit-btn">
          {submitBtnText}
        </button>
      </form>
    );
  }
}

SearchBar.defaultProps = {
  textValue: "",
  submitBtnText: "add",
  onTextChange: () => {},
  onSubmit: () => {}
};

export const TodoItemPropTypes = {
  textValue: PropTypes.string.isRequired,
  submitBtnText: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

SearchBar.propTypes = TodoItemPropTypes;
