import generateFormField from "/utils/generateFormField";
import { requiredRule } from "/utils/inputValidationRules";

import classes from "./Feedback.module.scss";

export const experienceForm = {
  experience_q1: {
    ...generateFormField({
      element: "list",
      name: "experience_q1",
      type: "radio",
      question: 'For the "reveal code answer" button',
      className: classes.list,
      options: [
        "I checked the code answers before I started coding my answer",
        "I checked the code answers when I was slightly stuck",
        "I checked the code answers when I was really stuck",
        "I checked the code answers when I completed the subsystem",
        "I never checked the code answers",
      ],
    }),
    validationRules: [requiredRule("Response")],
  },
  experience_q2: {
    ...generateFormField({
      element: "scale",
      name: "experience_q2",
      type: "radio",
      question:
        "Being able to view the code answers positively impacted my enjoyment of the platform",
      className: classes.scale,
    }),
    validationRules: [requiredRule("Response")],
  },
  experience_q3: {
    ...generateFormField({
      element: "scale",
      name: "experience_q3",
      type: "radio",
      question:
        "Being able to view the code answers positively impacted my learning",
      className: classes.scale,
    }),
    validationRules: [requiredRule("Response")],
  },
};

const ExperienceForm = (props) => {
  return <div style={props.style}>{props.render()}</div>;
};

export default ExperienceForm;
