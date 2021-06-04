import { useEffect, memo } from "react";
import generateFeedbackForm from "/components/UI/FeedbackInputs";

import classes from "./Feedback.module.scss";

const PRACTICALITY_QUESTIONS = [
  {
    type: "scale",
    id: "practicality-q1",
    question:
      " Using a platform like this in a classroom would make my learning more enjoyable",
    system: "five",
  },
  {
    type: "scale",
    id: "practicality-q2",
    question:
      "Based on what I have experienced so far, I would use a platform like this on my own time if I had a compatible device (laptop or PC)",
    system: "five",
  },
  {
    type: "text",
    id: "practicality-q3",
    question:
      "If you could add any feature that you could dream of to the platform, what would it be?",
  },
  {
    type: "text",
    id: "practicality-q4",
    question:
      "If you could remove any of the current features from the platform, what would they be?",
  },
  {
    type: "text",
    id: "practicality-q5",
    question:
      "If you have any other comments or suggestions then we would love to hear them below!",
  },
];

const PracticalityFeedback = (props) => {
  useEffect(() => {
    const state = PRACTICALITY_QUESTIONS.reduce(
      (o, question) => ({ ...o, [question.id]: "" }),
      {}
    );
    props.setState(state);
  }, []);

  return (
    <div className={classes.formContainer} style={props.style}>
      <h1>Have your say - Practicality 🧰</h1>
      <h2>Please indicate where you feel you would best use the platform</h2>
      <form className={classes.form}>
        {generateFeedbackForm(
          PRACTICALITY_QUESTIONS,
          props.state,
          props.setState
        )}
      </form>
    </div>
  );
};

export default memo(PracticalityFeedback);
