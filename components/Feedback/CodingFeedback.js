import generateFeedbackForm from "/components/UI/FeedbackInputs";
import FormNavButtons from "/components/UI/FeedbackButtons";

import classes from "./Feedback.module.scss";

const CODING_QUESTIONS = [
  {
    type: "scale",
    id: "coding-q1",
    question:
      "It was easy to understand how to write code using the visual flow-based programming editor",
    system: "five",
  },
  {
    type: "scale",
    id: "coding-q2",
    question:
      "I enjoyed being able to view the text version of the code that I was writing",
    system: "five",
  },
  {
    type: "scale",
    id: "coding-q3",
    question:
      "I wanted to edit the text version of the code that I was writing",
    system: "five",
  },
  {
    type: "scale",
    id: "coding-q4",
    question:
      "I would have preferred more in-depth instructions for how to create answers to each subsystem",
    system: "five",
  },
  {
    type: "scale",
    id: "coding-q5",
    question:
      "I would have liked in-depth explanations about how the code that I was writing works",
    system: "five",
  },
];

const CodingFeedback = (props) => {
  return (
    <div className={classes.formContainer}>
      <h1>Have your say - Coding 💻</h1>
      <h2>
        Please rate your experience when writing code on this platform by
        indicating how much you agree with each of the following statements:
      </h2>
      <form className={classes.form}>
        {generateFeedbackForm(CODING_QUESTIONS)}
        <FormNavButtons />
      </form>
    </div>
  );
};

export default CodingFeedback;
