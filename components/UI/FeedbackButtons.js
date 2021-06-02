import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import classes from "./FeedbackButtons.module.scss";

const PreviousButton = (props) => {
  return (
    <button
      className={`${classes.button} ${classes.previous}`}
      onClick={props.prevHandler}
    >
      <NavigateBeforeIcon />
      Previous
    </button>
  );
};

const NextButton = (props) => {
  return (
    <button
      className={`${classes.button} ${classes.next}`}
      onClick={props.nextHandler}
    >
      Next
      <NavigateNextIcon />
    </button>
  );
};

const SubmitButton = (props) => {
  return (
    <button
      className={`${classes.button} ${classes.submit}`}
      onClick={props.submitHandler}
    >
      Submit
      <NavigateNextIcon />
    </button>
  );
};

const FormNavButtons = ({
  next = true,
  prev = true,
  submit = false,
  prevHandler,
  nextHandler,
  submitHandler,
}) => {
  return (
    <div className={classes.buttonContainer}>
      {prev ? <PreviousButton prevHandler={prevHandler} /> : <div />}
      {next && <NextButton nextHandler={nextHandler} />}
      {submit && <SubmitButton submitHandler={submitHandler} />}
    </div>
  );
};

export default FormNavButtons;
