import { useState } from "react";
import DesignFeedback from "/components/Feedback/DesignFeedback";
import CodingFeedback from "/components/Feedback/CodingFeedback";
import ExperienceFeedback from "/components/Feedback/ExperienceFeedback";
import GeneralFeedback from "/components/Feedback/GeneralFeedback";
import PracticalityFeedback from "/components/Feedback/PracticalityFeedback";
import FormNavButtons from "/components/UI/FeedbackButtons";

import classes from "./FeedbackInterface.module.scss";

const FeedbackInterface = () => {
  const [designState, setDesignState] = useState({});
  const [codingState, setCodingState] = useState({});
  const [experienceState, setExperienceState] = useState({});
  const [practicalityState, setPracticalityState] = useState({});
  const [generalState, setGeneralState] = useState({});
  const [step, setStep] = useState(0);

  const [isValid, setIsValid] = useState(true);

  const allStates = [
    designState,
    codingState,
    experienceState,
    practicalityState,
    generalState,
  ];

  const nextHandler = () => {
    for (const response in allStates[step]) {
      console.log(allStates[step]);
      if (!allStates[step][response]) {
        setIsValid(false);
        return;
      }
    }
    setIsValid(true);
    setStep((step) => (step += 1));
  };

  const prevHandler = () => {
    for (const response in allStates[step]) {
      console.log(allStates[step]);
      if (!allStates[step][response]) {
        setIsValid(false);
        return;
      }
    }
    setIsValid(true);
    setStep((step) => (step -= 1));
  };

  const submitHandler = () => {
    for (const response in allStates[step]) {
      console.log(allStates[step]);
      if (!allStates[step][response]) {
        setIsValid(false);
        return;
      }
    }
    setIsValid(true);
    setStep((step) => (step += 1));
  };

  return (
    <div className={`${classes.interface}`}>
      <DesignFeedback
        style={{ display: step !== 0 && "none" }}
        state={designState}
        setState={setDesignState}
      />
      <CodingFeedback
        style={{ display: step !== 1 && "none" }}
        state={codingState}
        setState={setCodingState}
      />
      <ExperienceFeedback
        style={{ display: step !== 2 && "none" }}
        state={experienceState}
        setState={setExperienceState}
      />
      <PracticalityFeedback
        style={{ display: step !== 3 && "none" }}
        state={practicalityState}
        setState={setPracticalityState}
      />
      <GeneralFeedback
        style={{ display: step !== 4 && "none" }}
        state={generalState}
        setState={setGeneralState}
      />
      <FormNavButtons
        style={{ display: step > 4 && "none" }}
        prev={step > 0}
        next={step < 4}
        submit={step === 4}
        isValid={isValid}
        prevHandler={prevHandler}
        nextHandler={nextHandler}
        submitHandler={submitHandler}
      />
    </div>
  );
};

export default FeedbackInterface;
