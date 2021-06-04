import { useEffect, memo } from "react";
import generateFeedbackForm from "/components/UI/FeedbackInputs";

import classes from "./Feedback.module.scss";

const EXPERIENCE_QUESTIONS = [
  {
    type: "list",
    id: "experience-q1",
    question: "For the “Reveal code answer” button",
    options: [
      "I checked the code answers before I started coding my answer",
      "I checked the code answers when I was slightly stuck",
      "I checked the code answers when I was really stuck",
      "I checked the code answers when I completed the subsystem",
      "I never checked the code answers",
    ],
  },
  {
    type: "scale",
    id: "experience-q2",
    question:
      "Being able to view the code answers increased my enjoyment of the platform",
    system: "five",
  },
  {
    type: "scale",
    id: "experience-q3",
    question: "Being able to view the code answers helped my learning",
    system: "five",
  },
];

const DesignFeedback = (props) => {
  useEffect(() => {
    const state = EXPERIENCE_QUESTIONS.reduce(
      (o, question) => ({ ...o, [question.id]: "" }),
      {}
    );
    props.setState(state);
  }, []);

  return (
    <div className={classes.formContainer} style={props.style}>
      <h1>Have your say - Experience 😀</h1>
      <h2>
        Please indicate how you most commonly used the “reveal code answer”
        functionality
      </h2>
      <form className={classes.form}>
        {generateFeedbackForm(
          EXPERIENCE_QUESTIONS,
          props.state,
          props.setState
        )}
      </form>
    </div>
  );
};

export default memo(DesignFeedback);
