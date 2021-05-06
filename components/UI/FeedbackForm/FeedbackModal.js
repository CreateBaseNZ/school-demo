import { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import useForm from "/hooks/useForm";
import feedbackForm from "./FeedbackForm";

import WhiteLogo from "/components/UI/WhiteLogo";
import SendIcon from "@material-ui/icons/Send";

import FeedbackContext from "/store/feedback-context";

import classes from "./FeedbackModal.module.scss";

const Backdrop = (props) => {
  const ctx = useContext(FeedbackContext);

  return <div className={classes.backdrop} onClick={ctx.hideForm} />;
};

const ModalOverlay = (props) => {
  const { renderFormInputs, isFormValid } = useForm(feedbackForm);

  return (
    <div className={classes.card}>
      <section>
        <h1>Have your say in shaping the future of STEAM education</h1>
        <p>
          Your feedback will help us deliver the best experience to creators
          like yourself. Whether you’ve found a bug, got some suggestions, just
          want to have a chat, or anything else - get in touch! We’d love to
          hear your thoughts.
        </p>
      </section>
      <form>
        {renderFormInputs()}
        <button type="submit" disabled={!isFormValid()}>
          Submit <SendIcon />
        </button>
      </form>

      <WhiteLogo className={classes.logo} width="87" height="16" />
    </div>
  );
};

const FeedbackModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default FeedbackModal;
