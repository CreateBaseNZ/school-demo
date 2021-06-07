import { Fragment } from "react";
import ClientOnlyPortal from "/utils/ClientOnlyPortal";

import classes from "./TutorialModal.module.scss";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.closeHandler} />;
};

const ModalOverlay = () => {
  return (
    <div className={classes.card}>
      <video width="100%" height="100%" controls>
        <source src="/situation.mp4" type="video/mp4" />
        <source src="/situation.ogg" type="video/ogg" />
      </video>
    </div>
  );
};

const TutorialModal = (props) => {
  return (
    <Fragment>
      <ClientOnlyPortal selector="#backdrop-root">
        <Backdrop closeHandler={props.closeHandler} />
      </ClientOnlyPortal>
      <ClientOnlyPortal selector="#overlay-root">
        <ModalOverlay />
      </ClientOnlyPortal>
    </Fragment>
  );
};

export default TutorialModal;
