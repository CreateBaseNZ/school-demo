import generateFormField from "/utils/generateFormField";
import { requiredRule } from "/utils/inputValidationRules";

import EventIcon from "@material-ui/icons/Event";

import classes from "./Feedback.module.scss";

export const generalForm = {
  general_q1: {
    ...generateFormField({
      element: "list",
      name: "general_q1",
      type: "radio",
      question: "Please indicate your gender:",
      className: classes.list,
      options: ["Female", "Male", "Other", "Would rather not say"],
    }),
    validationRules: [requiredRule("Response")],
  },
  general_q2: {
    ...generateFormField({
      element: "input",
      label: <EventIcon />,
      name: "general_q2",
      type: "number",
      question: "What is your age?",
      className: `${classes.input} ${classes.number}`,
    }),
    validationRules: [requiredRule("Response")],
  },
};

const GeneralForm = (props) => {
  return <div style={props.style}>{props.render()}</div>;
};

export default GeneralForm;
