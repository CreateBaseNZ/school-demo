import React from "react";
import Input, { InputArea } from "/components/UI/Input";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import TitleIcon from "@material-ui/icons/Title";
import NotesIcon from "@material-ui/icons/Notes";

import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
  validEmailRule,
  passwordMatchRule,
} from "./inputValidationRules";

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

// object representation of signup form
export const feedbackForm = {
  name: {
    ...createFormFieldConfig(
      <AccountCircleIcon />,
      "name",
      "text",
      "Name (optional)"
    ),
    validationRules: [minLengthRule("Name", 3), maxLengthRule("Name", 25)],
  },
  email: {
    ...createFormFieldConfig(
      <EmailRoundedIcon />,
      "email",
      "email",
      "Email (optional)"
    ),
    validationRules: [validEmailRule(), maxLengthRule("Email", 320)],
  },
  subject: {
    ...createFormFieldConfig(<TitleIcon />, "subject", "text", "Subject"),
    validationRules: [requiredRule("Subject"), maxLengthRule("Subject", 50)],
  },
  message: {
    ...createFormFieldConfig(<NotesIcon />, "message", "textarea", "Message"),
    validationRules: [requiredRule("Message")],
  },
};
