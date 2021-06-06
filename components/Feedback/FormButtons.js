import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

import classes from "./FormButtons.module.scss";
import { useState } from "react";

const BackButton = (props) => {
  return (
    <button
      className={`${classes.button} ${classes.back}`}
      onClick={props.prevHandler}
      style={props.style}
    >
      <NavigateBeforeIcon />
      Back
    </button>
  );
};

const NextButton = (props) => {
  return (
    <button
      className={`${classes.button} ${classes.next} ${
        !props.isValid && classes.invalid
      }`}
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
      className={`${classes.button} ${classes.submit}  ${
        !props.isValid && classes.invalid
      }`}
      type="submit"
    >
      Submit
      <SendRoundedIcon />
    </button>
  );
};

const FormButtons = ({
  next = true,
  prev = true,
  submit = false,
  isValid,
  prevHandler,
  nextHandler,
  submitHandler,
  style,
}) => {
  return (
    <div className={classes.buttonContainer} style={style}>
      <BackButton
        prevHandler={prevHandler}
        style={{ visibility: !prev && "hidden" }}
      />
      {/* {!isValid && (
        <span className={classes.errorMessage}>
          Please answer all the questions ("None" is also an acceptable answer)
        </span>
      )} */}
      {next && <NextButton nextHandler={nextHandler} isValid={isValid} />}
      {submit && (
        <SubmitButton submitHandler={submitHandler} isValid={isValid} />
      )}
    </div>
  );
};

export default FormButtons;
