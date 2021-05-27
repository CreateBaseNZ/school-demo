import { Fragment, useContext } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

import ReplayRoundedIcon from "@material-ui/icons/ReplayRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

import classes from "./SuccessModal.module.scss";

const Backdrop = (props) => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.card}>
      <Image
        src="/success.png"
        alt="Congratulations!"
        layout="fill"
        objectFit="contain"
        objectPosition="right center"
      />
      <CloseRoundedIcon
        style={{ fontSize: 36 }}
        className={classes.closeIcon}
        onClick={props.tempHandler}
      />
      <div className={classes.wrapper}>
        <h2>Good work!</h2>
        <p>You have finished this subsystem</p>
        <Link href="/menu/create">
          <button className={classes.continue}>
            Continue
            <SendRoundedIcon style={{ fontSize: 28 }} />
          </button>
        </Link>
        <button className={classes.restart}>
          Restart
          <ReplayRoundedIcon style={{ fontSize: 28 }} />
        </button>
        <button className={classes.close} onClick={props.tempHandler}>
          <CloseRoundedIcon style={{ fontSize: 28 }} />
          Close
        </button>
      </div>
    </div>
  );
};

const SuccessModal = (props) => {
  return (
    <Fragment>
      {createPortal(<Backdrop />, document.getElementById("backdrop-root"))}
      {createPortal(
        <ModalOverlay tempHandler={props.tempHandler} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default SuccessModal;
