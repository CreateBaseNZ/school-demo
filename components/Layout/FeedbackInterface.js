import DesignFeedback from "/components/Feedback/DesignFeedback";
import CodingFeedback from "/components/Feedback/CodingFeedback";
import ExperienceFeedback from "/components/Feedback/ExperienceFeedback";

import classes from "./FeedbackInterface.module.scss";

const FeedbackInterface = () => {
  const test = () => {
    console.log("hello");
  };

  return (
    <div className={`${classes.interface}`}>
      {/* <DesignFeedback clickHandler={test} /> */}
      {/* <CodingFeedback clickHandler={test} /> */}
      <ExperienceFeedback clickHandler={test} />
    </div>
  );
};

export default FeedbackInterface;
