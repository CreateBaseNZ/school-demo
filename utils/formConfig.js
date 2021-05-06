import React from "react";
import Input, { InputArea } from "/components/UI/Input";

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
  defaultValue = ""
) => {
  return {
    renderInput: (handleChange, value, isValid, error, key) => {
      if (type === "textarea") {
        return (
          <InputArea
            key={key}
            name={name}
            type={type}
            label={label}
            isValid={isValid}
            value={value}
            placeholder={placeholder}
            handleChange={handleChange}
            errorMessage={error}
          />
        );
      }
      return (
        <Input
          key={key}
          name={name}
          type={type}
          label={label}
          isValid={isValid}
          value={value}
          placeholder={placeholder}
          handleChange={handleChange}
          errorMessage={error}
        />
      );
    },
    name,
    value: defaultValue,
    valid: false,
    errorMessage: "",
    touched: false,
  };
};

export default createFormFieldConfig;
