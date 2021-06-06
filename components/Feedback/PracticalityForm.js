import generateFormField from "/utils/generateFormField";
import { requiredRule } from "/utils/inputValidationRules";

import classes from "./Feedback.module.scss";

import NotesIcon from "@material-ui/icons/Notes";

export const practicalityForm = {
  practicality_q1: {
    ...generateFormField({
      element: "scale",
      name: "practicality_q1",
      type: "radio",
      question:
        "Using a platform like this in a classroom would make my learning more enjoyable",
      className: classes.scale,
    }),
    validationRules: [requiredRule("Response")],
  },
  practicality_q2: {
    ...generateFormField({
      element: "scale",
      name: "practicality_q2",
      type: "radio",
      question:
        "Based on what I have experienced so far, I would use a platform like this on my own time if I had a compatible device (laptop or PC)",
      className: classes.scale,
    }),
    validationRules: [requiredRule("Response")],
  },
  practicality_q3: {
    ...generateFormField({
      element: "input",
      label: <NotesIcon />,
      name: "practicality_q3",
      type: "text",
      question:
        "If you could add any feature that you could dream of to the platform, what would it be?",
      className: classes.input,
    }),
    validationRules: [requiredRule("Response")],
  },
  practicality_q4: {
    ...generateFormField({
      element: "input",
      label: <NotesIcon />,
      name: "practicality_q4",
      type: "text",
      question:
        "If you could remove any of the current features from the platform, what would they be?",
      className: classes.input,
    }),
    validationRules: [requiredRule("Response")],
  },
  practicality_q5: {
    ...generateFormField({
      element: "input",
      label: <NotesIcon />,
      name: "practicality_q5",
      type: "text",
      question:
        "If you have any other comments or suggestions then we would love to hear them below!",
      className: classes.input,
    }),
    validationRules: [requiredRule("Response")],
  },
};

const PracticalityForm = (props) => {
  return <div style={props.style}>{props.render()}</div>;
};

export default PracticalityForm;
