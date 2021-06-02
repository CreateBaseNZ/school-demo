import { useContext, useEffect, useState } from "react";
import capitalise from "/utils/capitaliseString";

import DesignFeedback from "/components/Feedback/DesignFeedback";

import classes from "./FeedbackInterface.module.scss";

const FeedbackInterface = () => {
  const test = () => {
    console.log("hello");
  };

  return (
    <div className={`${classes.interface}`}>
      <DesignFeedback clickHandler={test} />
    </div>
  );
};

export default FeedbackInterface;
