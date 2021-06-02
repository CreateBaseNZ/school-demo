import generateFeedbackForm from "/components/UI/FeedbackInputs";
import FormNavButtons from "/components/UI/FeedbackButtons";

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
    type: "scale",
    id: "practicality-q3",
    question:
      "If you could add any feature that you could dream of to the platform, what would it be?",
  },
  {
    type: "scale",
    id: "practicality-q4",
    question:
      "If you could remove any of the current features from the platform, what would they be?",
  },
  {
    type: "scale",
    id: "practicality-q5",
    question:
      "If you have any other comments or suggestions then we would love to hear them below!",
  },
];

const PracticalityFeedback = () => {
  return (
    <div className={classes.formContainer}>
      <h1>Have your say - Practicality 🧰</h1>
      <h2>Please indicate where you feel you would best use the platform</h2>
      <form className={classes.form}>
        {generateFeedbackForm(PRACTICALITY_QUESTIONS)}
        <FormNavButtons />
      </form>
    </div>
  );
};

export default PracticalityFeedback;
