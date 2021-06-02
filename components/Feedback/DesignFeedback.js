import NotesIcon from "@material-ui/icons/Notes";

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

const RadioInput = ({ label, clickHandler, name }) => {
  return (
    <label className={classes.radioWrapper} onClick={clickHandler}>
      <input type="radio" id="design-q1-0" name={name} checked={true} />
      <div className={classes.customRadio}></div>
      <span>{label}</span>
    </label>
  );
};

const getScale = (type) => {
  switch (type) {
    case "five":
      return [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree",
      ];
    default:
      return [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree",
      ];
  }
};

const LikertScale = ({ id, question, system, clickHandler }) => {
  const items = getScale(system);

  return (
    <div className={classes.questionWrapper}>
      <div className={classes.question}>{question}</div>
      <div className={`${classes.radioContainer} ${classes[system]}`}>
        {items.map((item) => (
          <RadioInput
            key={id + item}
            label={item}
            name={id}
            clickHandler={clickHandler}
          />
        ))}
      </div>
    </div>
  );
};

const TextQuestion = ({ question }) => {
  return (
    <div className={classes.textContainer}>
      <div className={classes.question}>{question}</div>
      <div className={classes.textWrapper}>
        <input type="text" />
        <NotesIcon />
        <span className={classes.underline}></span>
      </div>
    </div>
  );
};

const DesignFeedback = (props) => {
  return (
    <div className={classes.formContainer}>
      <h1>Have your say - Design 🎨</h1>
      <h2>
        Please rate your experience when using this platform by indicating how
        much you agree with each of the following statements:
      </h2>
      <form className={classes.form}>
        {DESIGN_QUESTIONS.map((item) => {
          if (item.type === "scale") {
            return (
              <LikertScale
                id={item.id}
                question={item.question}
                system={item.system}
              />
            );
          } else {
            return <TextQuestion question={item.question} />;
          }
        })}
      </form>
    </div>
  );
};

export default DesignFeedback;
