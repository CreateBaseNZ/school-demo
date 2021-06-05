import generateFormField from "/utils/generateFormField";
import { requiredRule } from "/utils/inputValidationRules";

import classes from "./Feedback.module.scss";

export const codingForm = {
  coding_q1: {
    ...generateFormField({
      element: "scale",
      name: "coding_q1",
      type: "radio",
      question:
        "It was easy to understand how to write code using the visual flow-based programming editor",
      className: classes.scale,
    }),
    validationRules: [requiredRule("Response")],
  },
  coding_q2: {
    ...generateFormField({
      element: "scale",
      name: "coding_q2",
      type: "radio",
      question:
        "I enjoyed being able to view the text version of the code that I was writing",
      className: classes.scale,
    }),
    validationRules: [requiredRule("Response")],
  },
  coding_q3: {
    ...generateFormField({
      element: "scale",
      name: "coding_q3",
      type: "radio",
      question:
        "I wanted to edit the text version of the code that I was writing",
      className: classes.scale,
    }),
    validationRules: [requiredRule("Response")],
  },
  coding_q4: {
    ...generateFormField({
      element: "scale",
      name: "coding_q4",
      type: "radio",
      question:
        "I would have preferred more in-depth instructions for how to create answers to each subsystem",
      className: classes.scale,
    }),
    validationRules: [requiredRule("Response")],
  },
  coding_q5: {
    ...generateFormField({
      element: "scale",
      name: "coding_q5",
      type: "radio",
      question:
        "I would have liked in-depth explanations about how the code that I was writing works",
      className: classes.scale,
    }),
    validationRules: [requiredRule("Response")],
  },
};

const CodingForm = (props) => {
  return <div style={props.style}>{props.render()}</div>;
};

export default CodingForm;
