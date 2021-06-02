import NotesIcon from "@material-ui/icons/Notes";
import classes from "./FeedbackInputs.module.scss";

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

const ScaleInput = ({ label, name }) => {
  return (
    <label className={classes.scaleWrapper}>
      <input type="radio" name={name} />
      <div className={classes.customRadio}></div>
      <span>{label}</span>
    </label>
  );
};

const ScaleQuestion = ({ id, question, system }) => {
  const items = getScale(system);

  return (
    <div className={`${classes.questionContainer} ${classes.scaleQuestion}`}>
      <div className={classes.question}>{question}</div>
      <div className={`${classes.scaleContainer} ${classes[system]}`}>
        {items.map((item) => (
          <ScaleInput key={id + item} label={item} name={id} />
        ))}
      </div>
    </div>
  );
};

const ListInput = ({ label, name }) => {
  return (
    <label className={classes.listWrapper}>
      <input type="radio" name={name} />
      <div className={classes.customRadio}></div>
      <span>{label}</span>
    </label>
  );
};

const ListQuestion = ({ id, question, options }) => {
  return (
    <div className={`${classes.questionContainer} ${classes.listQuestion}`}>
      <div className={classes.question}>{question}</div>
      <div className={`${classes.listContainer}`}>
        {options.map((option, index) => (
          <ListInput key={id + "_" + index} name={id} label={option} />
        ))}
      </div>
    </div>
  );
};

const TextQuestion = ({ question }) => {
  return (
    <div className={`${classes.questionContainer} ${classes.textQuestion}`}>
      <div className={classes.question}>{question}</div>
      <div className={classes.textWrapper}>
        <input type="text" />
        <NotesIcon />
        <span className={classes.underline}></span>
      </div>
    </div>
  );
};

const generateFeedbackForm = (form) => {
  return form.map((item) => {
    if (item.type === "scale") {
      return (
        <ScaleQuestion
          id={item.id}
          question={item.question}
          system={item.system}
        />
      );
    } else if (item.type === "list") {
      return (
        <ListQuestion
          id={item.id}
          question={item.question}
          options={item.options}
        />
      );
    } else {
      return <TextQuestion question={item.question} />;
    }
  });
};

export default generateFeedbackForm;
