import generateFormField from "/utils/generateFormField";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import TitleIcon from "@material-ui/icons/Title";
import NotesIcon from "@material-ui/icons/Notes";

import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
  validEmailRule,
} from "../../utils/inputValidationRules";

const messageForm = {
  name: {
    ...generateFormField({
      element: "input",
      label: <AccountCircleIcon />,
      name: "name",
      type: "text",
      placeholder: "Name (optional)",
      defaultValid: true,
    }),
    validationRules: [minLengthRule("Name", 3), maxLengthRule("Name", 25)],
  },
  email: {
    ...generateFormField({
      element: "input",
      label: <EmailRoundedIcon />,
      name: "email",
      type: "email",
      placeholder: "Email (optional)",
      defaultValid: true,
    }),
    validationRules: [validEmailRule(), maxLengthRule("Email", 320)],
  },
  subject: {
    ...generateFormField({
      element: "input",
      label: <TitleIcon />,
      name: "subject",
      type: "text",
      placeholder: "Subject",
    }),
    validationRules: [requiredRule("Subject"), maxLengthRule("Subject", 50)],
  },
  message: {
    ...generateFormField({
      element: "textarea",
      label: <NotesIcon />,
      name: "message",
      type: "text",
      placeholder: "Message",
    }),
    validationRules: [requiredRule("Message"), maxLengthRule("Message", 500)],
  },
};

export default messageForm;
