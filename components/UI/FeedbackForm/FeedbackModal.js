import { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import feedbackForm from "./FeedbackForm";
import useForm from "../../../hooks/useForm";

import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import WhiteLogo from "../../UI/WhiteLogo";
import FaceBookIcon from "../../Icons/FacebookIcon";
import InstagramIcon from "../../Icons/InstagramIcon";
import TwitterIcon from "../../Icons/TwitterIcon";

import FeedbackContext from "../../../store/feedback-context";

import classes from "./FeedbackModal.module.scss";

const Backdrop = (props) => {
  const ctx = useContext(FeedbackContext);

  return <div className={classes.backdrop} onClick={ctx.hideForm} />;
};

const ModalOverlay = (props) => {
  const ctx = useContext(FeedbackContext);
  const { renderFormInputs, isFormValid } = useForm(feedbackForm);

  return (
    <div className={classes.card}>
      <CloseIcon
        style={{ fontSize: 36 }}
        className={classes.close}
        onClick={ctx.hideForm}
      />
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
        <div className={classes.socials}>
          <span>Or drop us a direct message</span>
          <div className={classes.icons}>
            <FaceBookIcon />
            <InstagramIcon />
            <TwitterIcon />
          </div>
        </div>
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
