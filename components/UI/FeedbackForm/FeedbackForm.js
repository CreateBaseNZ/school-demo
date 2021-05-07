import createFormFieldConfig from "/utils/formConfig";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import TitleIcon from "@material-ui/icons/Title";
import NotesIcon from "@material-ui/icons/Notes";

import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
  validEmailRule,
} from "/utils/inputValidationRules";

const feedbackForm = {
  name: {
    ...createFormFieldConfig(
      <AccountCircleIcon />,
      "name",
      "text",
      "Name (optional)",
      "input"
    ),
    validationRules: [minLengthRule("Name", 3), maxLengthRule("Name", 25)],
  },
  email: {
    ...createFormFieldConfig(
      <EmailRoundedIcon />,
      "email",
      "email",
      "Email (optional)",
      "input"
    ),
    validationRules: [validEmailRule(), maxLengthRule("Email", 320)],
  },
  subject: {
    ...createFormFieldConfig(
      <TitleIcon />,
      "subject",
      "text",
      "Subject",
      "input"
    ),
    validationRules: [requiredRule("Subject"), maxLengthRule("Subject", 50)],
  },
  message: {
    ...createFormFieldConfig(
      <NotesIcon />,
      "message",
      "text",
      "Message",
      "textarea"
    ),
    validationRules: [requiredRule("Message")],
  },
};

export default feedbackForm;
