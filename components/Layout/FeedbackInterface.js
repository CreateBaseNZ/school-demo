import { useState } from "react";
import DesignFeedback from "/components/Feedback/DesignFeedback";
import CodingFeedback from "/components/Feedback/CodingFeedback";
import ExperienceFeedback from "/components/Feedback/ExperienceFeedback";
import GeneralFeedback from "/components/Feedback/GeneralFeedback";
import PracticalityFeedback from "/components/Feedback/PracticalityFeedback";
import FormNavButtons from "/components/UI/FeedbackButtons";

import classes from "./FeedbackInterface.module.scss";

const FeedbackInterface = () => {
  const [step, setStep] = useState(0);

  const nextHandler = () => {
    setStep((step) => (step += 1));
  };

  const prevHandler = () => {
    setStep((step) => (step -= 1));
  };

  const submitHandler = () => {};

  return (
    <div className={`${classes.interface}`}>
      <DesignFeedback style={{ display: step !== 0 && "none" }} />
      <CodingFeedback style={{ display: step !== 1 && "none" }} />
      <ExperienceFeedback style={{ display: step !== 2 && "none" }} />
      <PracticalityFeedback style={{ display: step !== 3 && "none" }} />
      <GeneralFeedback style={{ display: step !== 4 && "none" }} />
      <FormNavButtons
        prev={step > 0}
        next={step < 5}
        submit={step === 5}
        prevHandler={prevHandler}
        nextHandler={nextHandler}
        submitHandler={submitHandler}
      />
    </div>
  );
};

export default FeedbackInterface;
