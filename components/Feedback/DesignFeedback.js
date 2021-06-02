import generateFeedbackForm from "/components/UI/FeedbackInputs";

import classes from "./Feedback.module.scss";

const DESIGN_QUESTIONS = [
  {
    type: "scale",
    id: "design-q1",
    question: "I like the colour scheme of the platform",
    system: "five",
  },
  {
    type: "scale",
    id: "design-q2",
    question: "I would prefer lighter and/or brighter colours on the platform",
    system: "five",
  },
  {
    type: "scale",
    id: "design-q3",
    question: "I was able to easily navigate around the platform",
    system: "five",
  },
  {
    type: "text",
    id: "design-q4",
    question:
      "Were there any controls that you found confusing? If so, please list them and the reason(s) why",
  },
  {
    type: "text",
    id: "design-q5",
    question:
      "Were there any controls that you were looking for but could not find? If so, please list them and the reason(s) why you were searching for them",
  },
];

const DesignFeedback = (props) => {
  return (
    <div className={classes.formContainer}>
      <h1>Have your say - Design 🎨</h1>
      <h2>
        Please rate your experience when using this platform by indicating how
        much you agree with each of the following statements:
      </h2>
      <form className={classes.form}>
        {generateFeedbackForm(DESIGN_QUESTIONS)}
      </form>
    </div>
  );
};

export default DesignFeedback;
