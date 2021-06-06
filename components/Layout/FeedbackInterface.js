import { useState } from "react";
import useForm from "/hooks/useForm";

import axios from "axios";
import DesignForm, { designForm } from "/components/Feedback/DesignForm";
import CodingForm, { codingForm } from "/components/Feedback/CodingForm";
import ExperienceForm, {
  experienceForm,
} from "/components/Feedback/ExperienceForm";
import PracticalityForm, {
  practicalityForm,
} from "/components/Feedback/PracticalityForm";
import GeneralForm, { generalForm } from "/components/Feedback/GeneralForm";
import FormButtons from "/components/Feedback/FormButtons";
import Finished from "/components/Feedback/Finished";

import classes from "./FeedbackInterface.module.scss";

const title = [
  {
    h1: "Have your say - Design 🎨",
    h2: "Please rate your experience when using this platform by indicating how much you agree with each of the following statements:",
  },
  {
    h1: "Have your say - Coding 💻",
    h2: "Please rate your experience when writing code on this platform by indicating how much you agree with each of the following statements:",
  },
  {
    h1: "Have your say - Experience 😀",
    h2: 'Please indicate how you most commonly used the "reveal code answer" functionality',
  },
  {
    h1: "Have your say - Practicality 🧰",
    h2: "Please indicate where you feel you would best use the platform",
  },
  {
    h1: "Have your say - General ✍️",
    h2: "Please answer some basic questions about yourself",
  },
  {
    h1: "Have your say - Finished! 🥳🎉",
  },
];

const surveyLength = 5;

const FeedbackInterface = () => {
  const [step, setStep] = useState(0);
  const { renderFormInputs: renderDesignForm, isFormValid: isDesignFormValid } =
    useForm(designForm);
  const { renderFormInputs: renderCodingForm, isFormValid: isCodingFormValid } =
    useForm(codingForm);
  const {
    renderFormInputs: renderExperienceForm,
    isFormValid: isExperienceFormValid,
  } = useForm(experienceForm);
  const {
    renderFormInputs: renderPracticalityForm,
    isFormValid: isPracticalityFormValid,
  } = useForm(practicalityForm);
  const {
    renderFormInputs: renderGeneralForm,
    isFormValid: isGeneralFormValid,
  } = useForm(generalForm);

  const isFormValid = [
    isDesignFormValid(),
    isCodingFormValid(),
    isExperienceFormValid(),
    isPracticalityFormValid(),
    isGeneralFormValid(),
  ];

  const [awaitingResponse, setAwaitingResponse] = useState(false);

  const nextHandler = (e) => {
    e.preventDefault();
    setStep((step) => (step += 1));
  };

  const prevHandler = (e) => {
    e.preventDefault();
    setStep((step) => (step -= 1));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // Construct the feedback
    let items = new Object();
    for (let i = 0; i < e.target.length; i++) {
      const element = e.target[i];
      if (element.type === "radio" && element.checked) {
        items[element.name] = element.value;
      } else if (element.type === "text" || element.type === "number") {
        items[element.name] = element.value;
      }
    }
    // Store feedback on backend
    let data;
    try {
      setAwaitingResponse(true);
      data = (
        await axios.post(
          "https://createbase.co.nz/alpha/feedback/version-2/submit",
          { items }
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
      <h1>{title[step].h1}</h1>
      <h2>{title[step].h2}</h2>
      <form
        className={classes.form}
        style={{ display: step >= surveyLength && "none" }}
        onSubmit={submitHandler}
      >
        <DesignForm
          style={{ display: step !== 0 && "none" }}
          render={renderDesignForm}
        />
        <CodingForm
          style={{ display: step !== 1 && "none" }}
          render={renderCodingForm}
        />
        <ExperienceForm
          style={{ display: step !== 2 && "none" }}
          render={renderExperienceForm}
        />
        <PracticalityForm
          style={{ display: step !== 3 && "none" }}
          render={renderPracticalityForm}
        />
        <GeneralForm
          style={{ display: step !== 4 && "none" }}
          render={renderGeneralForm}
        />
        <FormButtons
          style={{ display: step > surveyLength - 1 && "none" }}
          prev={step > 0}
          next={step < surveyLength - 1}
          submit={step === surveyLength - 1}
          isValid={isFormValid[step]}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          submitHandler
        />
      </form>
      <Finished style={{ display: step !== surveyLength && "none" }} />
      <div
        className={classes.progressBar}
        style={{
          display: step >= surveyLength && "none",
          width: `${((step + 1) / surveyLength) * 100}%`,
        }}
      />
    </div>
  );
};

export default FeedbackInterface;
