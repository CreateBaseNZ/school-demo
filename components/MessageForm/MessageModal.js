import { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import messageForm from "./MessageForm";
import useForm from "/hooks/useForm";
import Image from "next/image";

import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import WhiteLogo from "/components/UI/Icons/WhiteLogo";
import FaceBookIcon from "../UI/Icons/FacebookIcon";
import InstagramIcon from "../UI/Icons/InstagramIcon";
import TwitterIcon from "../UI/Icons/TwitterIcon";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

import MessageContext from "../../store/message-context";

import classes from "./MessageModal.module.scss";

const Backdrop = (props) => {
  const ctx = useContext(MessageContext);

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
  const ctx = useContext(MessageContext);

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
  const ctx = useContext(MessageContext);

  const closeButtonHandler = () => {
    if (props.hasInput()) {
      ctx.showConfirm();
    } else {
      ctx.hideForm();
    }
  };

  const submitMessage = async (event) => {
    // Prevent form's default behaviour of redirecting
    event.preventDefault();
    // Construct the object that will be sent to the backend
    let object = {
      name: event.target[0].value,
      email: event.target[1].value,
      subject: event.target[2].value,
      message: event.target[3].value,
    };
    // Submit the object to the backend
    let data;
    try {
      data = await fetch("https://createbase.co.nz/alpha/message/submit", {
        method: "POST",
        body: JSON.stringify(object),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      data = { status: "error", content: error };
    }
    console.log(data);
    // Handlers
    switch (data.status) {
      case "succeeded":
        // TODO: Success handling
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
  };

  return (
    <div
      className={`${classes.card} ${
        ctx.confirmVisible ? classes.confirming : ""
      }`}
    >
      <div className={classes.img}>
        <Image
          src="/message.png"
          alt="Magic wand"
          layout="fill"
          objectFit="contain"
          objectPosition="bottom left"
        />
      </div>
      <CloseIcon
        style={{ fontSize: 36 }}
        className={classes.close}
        onClick={closeButtonHandler}
      />
      <section>
        <h1>Send us a message!</h1>
        <p>
          Your feedback will help us deliver the best experience to creators
          like yourself. Whether you’ve found a bug, got some message, just want
          to have a chat, or anything else - get in touch! We’d love to hear
          your thoughts.
        </p>
      </section>
      <form onSubmit={submitMessage}>
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

const MessageModal = (props) => {
  const { renderFormInputs, isFormValid, formHasInput } = useForm(messageForm);

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

export default MessageModal;
