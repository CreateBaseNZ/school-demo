import DesignFeedback from "/components/Feedback/DesignFeedback";
import CodingFeedback from "/components/Feedback/CodingFeedback";
import ExperienceFeedback from "/components/Feedback/ExperienceFeedback";
import GeneralFeedback from "/components/Feedback/GeneralFeedback";

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
      <GeneralFeedback />
    </div>
  );
};

export default FeedbackInterface;
