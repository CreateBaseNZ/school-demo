import DesignFeedback from "/components/Feedback/DesignFeedback";
import CodingFeedback from "/components/Feedback/CodingFeedback";
import ExperienceFeedback from "/components/Feedback/ExperienceFeedback";
import GeneralFeedback from "/components/Feedback/GeneralFeedback";
import PracticalityFeedback from "/components/Feedback/PracticalityFeedback";

import classes from "./FeedbackInterface.module.scss";

const FeedbackInterface = () => {
  const test = () => {
    console.log("hello");
  };

  return (
    <div className={`${classes.interface}`}>
      {/* <DesignFeedback /> */}
      {/* <CodingFeedback /> */}
      {/* <ExperienceFeedback /> */}
      <PracticalityFeedback />
      {/* <GeneralFeedback /> */}
    </div>
  );
};

export default FeedbackInterface;
