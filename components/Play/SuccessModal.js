import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import ClientOnlyPortal from "/utils/ClientOnlyPortal";

import ReplayRoundedIcon from "@material-ui/icons/ReplayRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

import classes from "./SuccessModal.module.scss";

const Backdrop = (props) => {
  return <div className={classes.backdrop} style={props.style} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.card} style={props.style}>
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
        onClick={props.closeSuccessHandler}
      />
      <div className={classes.wrapper}>
        <h2>Good work!</h2>
        <p>You have finished this subsystem</p>
        <Link href="/menu/create">
          <button className={`${classes.continue} terminate-code`}>
            Continue
            <SendRoundedIcon style={{ fontSize: 28 }} />
          </button>
        </Link>
        <button
          className={`${classes.restart} terminate-code`}
          onClick={props.restartHandler}
        >
          Restart
          <ReplayRoundedIcon style={{ fontSize: 28 }} />
        </button>
        <button className={classes.close} onClick={props.closeSuccessHandler}>
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
      <ClientOnlyPortal selector="#backdrop-root">
        <Backdrop style={props.style} />
      </ClientOnlyPortal>
      <ClientOnlyPortal selector="#overlay-root">
        <ModalOverlay
          style={props.style}
          restartHandler={props.restartHandler}
          closeSuccessHandler={props.closeSuccessHandler}
        />
      </ClientOnlyPortal>
    </Fragment>
  );
};

export default SuccessModal;
