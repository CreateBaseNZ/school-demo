import generateFormField from "/utils/generateFormField";
import { requiredRule } from "/utils/inputValidationRules";

import classes from "./Feedback.module.scss";

import NotesIcon from "@material-ui/icons/Notes";

export const designForm = {
  design_q1: {
    ...generateFormField({
      element: "scale",
      name: "design_q1",
      type: "radio",
      question: "I like the colour scheme of the platform",
      className: classes.scale,
    }),
    validationRules: [requiredRule("Response")],
  },
  design_q2: {
    ...generateFormField({
      element: "scale",
      name: "design_q2",
      type: "radio",
      question:
        "I would prefer lighter and/or brighter colours on the platform",
      className: classes.scale,
    }),
    validationRules: [requiredRule("Response")],
  },
  design_q3: {
    ...generateFormField({
      element: "scale",
      name: "design_q3",
      type: "radio",
      question: "I was able to easily navigate around the platform",
      className: classes.scale,
    }),
    validationRules: [requiredRule("Response")],
  },
  design_q4: {
    ...generateFormField({
      element: "input",
      label: <NotesIcon />,
      name: "design_q4",
      type: "text",
      question:
        "Were there any controls that you found confusing? If so, please list them and the reason(s) why.",
      className: classes.input,
    }),
    validationRules: [requiredRule("Response")],
  },
};

const DesignForm = (props) => {
  return <div style={props.style}>{props.render()}</div>;
};

export default DesignForm;
