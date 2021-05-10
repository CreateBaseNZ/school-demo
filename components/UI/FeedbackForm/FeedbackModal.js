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
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

import FeedbackContext from "../../../store/feedback-context";

import classes from "./FeedbackModal.module.scss";

const Backdrop = (props) => {
  const ctx = useContext(FeedbackContext);

  const closeButtonHandler = () => {
    if (props.hasInput()) {
      ctx.showConfirm();
    } else {
      ctx.hideForm();
    }
  };

  return <div className={classes.backdrop} onClick={closeButtonHandler} />;
};

const ConfirmMessage = () => {
  const ctx = useContext(FeedbackContext);

  return (
    <div
      className={`${classes.confirm} ${ctx.confirmVisible ? classes.show : ""}`}
    >
      <h2>Wait a second!</h2>
      <p>Are you sure you want to leave? Your message will be lost.</p>
      <div className={classes.btnContainer}>
        <button className={classes.cancel} onClick={ctx.hideConfirm}>
          Cancel
        </button>
        <button
          className={classes.discard}
          onClick={() => {
            ctx.hideConfirm();
            ctx.hideForm();
          }}
        >
          <DeleteOutlinedIcon fontSize="small" />
          Discard
        </button>
      </div>
    </div>
  );
};

const ModalOverlay = (props) => {
  const ctx = useContext(FeedbackContext);

  const closeButtonHandler = () => {
    if (props.hasInput()) {
      ctx.showConfirm();
    } else {
      ctx.hideForm();
    }
  };

  return (
    <div
      className={`${classes.card} ${
        ctx.confirmVisible ? classes.confirming : ""
      }`}
    >
      <CloseIcon
        style={{ fontSize: 36 }}
        className={classes.close}
        onClick={closeButtonHandler}
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
        {props.render()}
        <button type="submit" disabled={!props.isFormValid()}>
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
  const { renderFormInputs, isFormValid, formHasInput } = useForm(feedbackForm);

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop hasInput={formHasInput} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          render={renderFormInputs}
          isFormValid={isFormValid}
          hasInput={formHasInput}
        />,
        document.getElementById("overlay-root")
      )}
      {ReactDOM.createPortal(
        <ConfirmMessage />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default FeedbackModal;
