import Dropdown from "react-dropdown";
import React from "react";
import './_dropdownComponent.scss'

const CustomDropdown = (props) => {
  return (
    <div className="speed">
      <Dropdown
        className="dropdown"
        placeholder="Select a condition"
        options={props.options}
        onChange={props.dropdownOnChange}
      ></Dropdown>
      <input
      className="input"
        type={props.inputType}
        placeholder={props.inputPlaceholder}
        onChange={(e) => props.setInputValue(e.target.value)}
        min={props.min}
        max={props.max}
        />
    </div>
  );
};

export default CustomDropdown;
