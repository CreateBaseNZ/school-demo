import React from "react";
import Input, { TextArea, Scale, List } from "../components/UI/Input";

/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 */
const generateFormField = ({
  element,
  label,
  name,
  type,
  placeholder = "",
  defaultValid = false,
  defaultValue = "",
  options,
  question,
  className,
}) => {
  if (element === "input") {
    return {
      renderInput: (handleChange, value, isValid, error) => {
        return (
          <Input
            key={name}
            className={className}
            name={name}
            type={type}
            label={label}
            isValid={isValid}
            value={value}
            placeholder={placeholder}
            handleChange={handleChange}
            errorMessage={error}
            question={question}
          />
        );
      },
      name,
      value: defaultValue,
      valid: defaultValid,
      errorMessage: "",
      touched: false,
    };
  } else if (element === "textarea") {
    return {
      renderInput: (handleChange, value, isValid, error) => {
        return (
          <TextArea
            key={name}
            className={className}
            name={name}
            label={label}
            isValid={isValid}
            value={value}
            placeholder={placeholder}
            handleChange={handleChange}
            errorMessage={error}
            question={question}
          />
        );
      },
      name,
      value: defaultValue,
      valid: defaultValid,
      errorMessage: "",
      touched: false,
    };
  } else if (element === "scale") {
    return {
      renderInput: (handleChange, value, isValid, error) => {
        return (
          <Scale
            key={name}
            className={className}
            name={name}
            isValid={isValid}
            value={value}
            handleChange={handleChange}
            errorMessage={error}
            question={question}
          />
        );
      },
      name,
      value: defaultValue,
      valid: defaultValid,
      errorMessage: "",
      touched: false,
    };
  } else if (element === "list") {
    return {
      renderInput: (handleChange, value, isValid, error) => {
        return (
          <List
            key={name}
            className={className}
            name={name}
            isValid={isValid}
            value={value}
            handleChange={handleChange}
            errorMessage={error}
            question={question}
            options={options}
          />
        );
      },
      name,
      value: defaultValue,
      valid: defaultValid,
      errorMessage: "",
      touched: false,
    };
  }
};

export default generateFormField;
