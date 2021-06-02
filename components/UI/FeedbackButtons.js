import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import classes from "./FeedbackButtons.module.scss";

const PreviousButton = () => {
  return (
    <button className={`${classes.button} ${classes.previous}`}>
      <NavigateBeforeIcon fontSize="large" />
      Previous
    </button>
  );
};

const NextButton = () => {
  return (
    <button className={`${classes.button} ${classes.next}`}>
      Next
      <NavigateNextIcon fontSize="large" />
    </button>
  );
};

const SubmitButton = () => {
  return (
    <button className={`${classes.button} ${classes.submit}`}>
      Submit
      <NavigateNextIcon fontSize="large" />
    </button>
  );
};

const FormNavButtons = ({ next = true, prev = true, submit = false }) => {
  return (
    <div className={classes.buttonContainer}>
      {prev ? <PreviousButton /> : <div />}
      {next && <NextButton />}
      {submit && <SubmitButton />}
    </div>
  );
};

export default FormNavButtons;
