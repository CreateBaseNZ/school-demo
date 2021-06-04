import { useState } from "react";
import axios from "axios";
import DesignFeedback from "/components/Feedback/DesignFeedback";
import CodingFeedback from "/components/Feedback/CodingFeedback";
import ExperienceFeedback from "/components/Feedback/ExperienceFeedback";
import GeneralFeedback from "/components/Feedback/GeneralFeedback";
import PracticalityFeedback from "/components/Feedback/PracticalityFeedback";
import FormNavButtons from "/components/UI/FeedbackButtons";
import Finished from "/components/Feedback/Finished";

import classes from "./FeedbackInterface.module.scss";

const FeedbackInterface = () => {
  const [designState, setDesignState] = useState({});
  const [codingState, setCodingState] = useState({});
  const [experienceState, setExperienceState] = useState({});
  const [practicalityState, setPracticalityState] = useState({});
  const [generalState, setGeneralState] = useState({});
  const [step, setStep] = useState(0);

  const [isValid, setIsValid] = useState(true);
  const [awaitingResponse, setAwaitingResponse] = useState(false);

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

  const submitHandler = async () => {
    for (const response in allStates[step]) {
      console.log(allStates[step]);
      if (!allStates[step][response]) {
        setIsValid(false);
        return;
      }
    }
    setIsValid(true);
    // Store feedback on backend
    let data;
    try {
      setAwaitingResponse(true);
      data = (
        await axios.post(
          "https://createbase.co.nz/alpha/feedback/version-1/submit",
          { items: allStates }
        )
      )["data"];
    } catch (error) {
      data = { status: "error", content: error };
    }
    setAwaitingResponse(false);
    switch (data.status) {
      case "succeeded":
        // TODO: Success handling
        setStep((step) => (step += 1));
        break;
      case "failed":
        // TODO: Fail handling
        break;
      case "error":
        // TODO: Error Handling
        break;
      default:
        break;
    }
    return;
  };

  return (
    <div className={`${classes.interface}`}>
      <DesignFeedback
        style={{ display: step !== 0 && "none" }}
        state={designState}
        setState={setDesignState}
      />
      {/* <CodingFeedback
        style={{ display: step !== 1 && "none" }}
        state={codingState}
        setState={setCodingState}
      /> */}
      <ExperienceFeedback
        style={{ display: step !== 1 && "none" }}
        state={experienceState}
        setState={setExperienceState}
      />
      <PracticalityFeedback
        style={{ display: step !== 2 && "none" }}
        state={practicalityState}
        setState={setPracticalityState}
      />
      <GeneralFeedback
        style={{ display: step !== 3 && "none" }}
        state={generalState}
        setState={setGeneralState}
      />
      <FormNavButtons
        style={{ display: step > 3 && "none" }}
        prev={step > 0}
        next={step < 3}
        submit={step === 3}
        isValid={isValid}
        prevHandler={prevHandler}
        nextHandler={nextHandler}
        submitHandler={submitHandler}
      />
      <Finished style={{ display: step < 4 && "none" }} />
    </div>
  );
};

export default FeedbackInterface;
