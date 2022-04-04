import chroma from "chroma-js";
import React, { useState } from "react";

import Select, { StylesConfig } from "react-select";

export const colourOptions = [
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "lightBlue", label: "Light Blue", color: "#00B8D9" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "darkGreen", label: "Dark Green", color: "#00875A" },
  { value: "grey", label: "Grey", color: "#666666" },
  { value: "darkGrey", label: "Dark Grey", color: "#253858" },
];

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};

const MultiValueSelectColours = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  props.setSelectedColours(selectedOption);
  return (
    <Select
      closeMenuOnSelect={false}
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      isMulti={true}
      options={colourOptions}
      styles={colourStyles}
    />
  );
};

export default MultiValueSelectColours;
