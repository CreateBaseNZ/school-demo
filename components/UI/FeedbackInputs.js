import NotesIcon from "@material-ui/icons/Notes";
import EventIcon from "@material-ui/icons/Event";
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
      <input type="radio" name={name} value={label} />
      <div className={classes.customRadio}></div>
      <span>{label}</span>
    </label>
  );
};

const ScaleQuestion = ({ id, question, system, setState }) => {
  const items = getScale(system);

  const changeHandler = (e) => {
    setState((current) => ({ ...current, [id]: e.target.value }));
  };

  return (
    <div className={`${classes.questionContainer} ${classes.scaleQuestion}`}>
      <div className={classes.question}>{question}</div>
      <div
        className={`${classes.scaleContainer} ${classes[system]}`}
        onChange={changeHandler}
      >
        {items.map((item) => (
          <ScaleInput key={id + "_" + item} label={item} name={id} />
        ))}
      </div>
    </div>
  );
};

const ListInput = ({ label, name }) => {
  return (
    <label className={classes.listWrapper}>
      <input type="radio" name={name} value={label} />
      <div className={classes.customRadio}></div>
      <span>{label}</span>
    </label>
  );
};

const ListQuestion = ({ id, question, options, setState }) => {
  const changeHandler = (e) => {
    setState((current) => ({ ...current, [id]: e.target.value }));
  };

  return (
    <div className={`${classes.questionContainer} ${classes.listQuestion}`}>
      <div className={classes.question}>{question}</div>
      <div className={`${classes.listContainer}`} onChange={changeHandler}>
        {options.map((option, index) => (
          <ListInput key={id + "_" + index} name={id} label={option} />
        ))}
      </div>
    </div>
  );
};

const AgeQuestion = ({ id, question, setState }) => {
  const changeHandler = (e) => {
    setState((current) => ({ ...current, [id]: e.target.value }));
  };

  return (
    <div className={`${classes.questionContainer} ${classes.ageQuestion}`}>
      <div className={classes.question}>{question}</div>
      <div className={classes.ageWrapper}>
        <input type="number" onChange={changeHandler} />
        <EventIcon />
        <span className={classes.underline}></span>
      </div>
    </div>
  );
};

const TextQuestion = ({ id, question, setState }) => {
  const changeHandler = (e) => {
    setState((current) => ({ ...current, [id]: e.target.value }));
  };

  return (
    <div className={`${classes.questionContainer} ${classes.textQuestion}`}>
      <div className={classes.question}>{question}</div>
      <div className={classes.textWrapper}>
        <input type="text" onChange={changeHandler} />
        <NotesIcon />
        <span className={classes.underline}></span>
      </div>
    </div>
  );
};

const generateFeedbackForm = (form, state, setState) => {
  return form.map((item) => {
    if (item.type === "scale") {
      return (
        <ScaleQuestion
          key={item.id}
          id={item.id}
          question={item.question}
          system={item.system}
          setState={setState}
        />
      );
    } else if (item.type === "list") {
      return (
        <ListQuestion
          key={item.id}
          id={item.id}
          question={item.question}
          options={item.options}
          setState={setState}
        />
      );
    } else if (item.type === "age") {
      return (
        <AgeQuestion
          key={item.id}
          id={item.id}
          question={item.question}
          setState={setState}
        />
      );
    } else {
      return (
        <TextQuestion
          key={item.id}
          id={item.id}
          question={item.question}
          setState={setState}
        />
      );
    }
  });
};

export default generateFeedbackForm;
