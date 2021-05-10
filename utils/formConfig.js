import React from "react";
import Input from "../components/UI/Input";

/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 */
const createFormFieldConfig = (
  label,
  name,
  type,
  placeholder = "",
  element,
  defaultValid = false,
  defaultValue = ""
) => {
  return {
    renderInput: (handleChange, value, isValid, error) => {
      return (
        <Input
          key={name}
          name={name}
          type={type}
          label={label}
          isValid={isValid}
          value={value}
          placeholder={placeholder}
          handleChange={handleChange}
          errorMessage={error}
          element={element}
        />
      );
    },
    name,
    value: defaultValue,
    valid: defaultValid,
    errorMessage: "",
    touched: false,
  };
};

export default createFormFieldConfig;
