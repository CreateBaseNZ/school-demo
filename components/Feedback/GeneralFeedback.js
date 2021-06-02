import { useEffect, memo } from "react";
import generateFeedbackForm from "/components/UI/FeedbackInputs";

import classes from "./Feedback.module.scss";

const GENERAL_QUESTIONS = [
  {
    type: "list",
    id: "general-q1",
    question: "Please indicate your gender:",
    options: ["Female", "Male", "Other", "Would rather not say"],
  },
  {
    type: "age",
    id: "experience-q2",
    question: "What is your age?",
  },
];

const GeneralFeedback = (props) => {
  useEffect(() => {
    const state = GENERAL_QUESTIONS.reduce(
      (o, question) => ({ ...o, [question.id]: "" }),
      {}
    );
    props.setState(state);
  }, []);

  return (
    <div className={classes.formContainer} style={props.style}>
      <h1>Have your say - General ✍️</h1>
      <h2>Please answer some basic questions about yourself</h2>
      <form className={classes.form}>
        {generateFeedbackForm(GENERAL_QUESTIONS, props.state, props.setState)}
      </form>
    </div>
  );
};

export default memo(GeneralFeedback);
