import { useState } from "react";
import SubsystemCard from "/components/UI/SubsystemCard";
import TutorialModal from "/components/Menu/TutorialModal";

import classes from "./ContentWrapper.module.scss";

const DUMMY_DATA = [
  {
    title: "Intro to Create",
    href: "/menu/create",
    src: "/tutorial_edited.png",
    description: "Watch this quick tutorial to learn how to create like a pro!",
    showTutorial: true,
    id: "intro-to-create",
  },
  {
    title: "Subsystem 1: The Gravity Wand",
    href: "/play/the-gravity-wand",
    src: "/the-gravity-wand.png",
    description: "Learn how to grab/release an object with the gravity wand.",
    recommended: [
      {
        title: "Intro to Create",
        href: "/menu/create",
        id: "intro-to-create",
      },
    ],
    id: "the-gravity-wand",
  },
  {
    title: "Subsystem 2: Moving the Arm",
    href: "/play/moving-the-arm",
    src: "/moving-the-arm.png",
    description:
      "Learn how to move the gravity wand to collect a sequence of floating gems. ",
    recommended: [
      {
        title: "Intro to Create",
        href: "/menu/create",
        id: "intro-to-create",
      },
    ],
    id: "moving-the-arm",
  },
  {
    title: "Collecting the Items",
    href: "/play/collecting-the-items",
    src: "/collecting-the-items.png",
    description:
      "Using the gravity wand and the robotic arm, pick up pieces of rubbish before transporting and dropping them into one of two collection bins.",
    recommended: [
      {
        title: "The Gravity Wand",
        href: "/menu/create",
        id: "the-gravity-wand",
      },
      {
        title: "Moving the Arm",
        href: "/menu/create",
        id: "moving-the-arm",
      },
    ],
    id: "collecting-the-items",
  },
];

const CreateCard = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  const clickHandler = () => {
    setShowTutorial(true);
  };

  const closeHandler = () => {
    setShowTutorial(false);
  };

  return (
    <div className={classes.createWrapper}>
      {DUMMY_DATA.map((subsystem) => {
        return (
          <SubsystemCard
            {...subsystem}
            key={subsystem.title}
            clickHandler={clickHandler}
            closeHandler={closeHandler}
          />
        );
      })}
      {showTutorial && <TutorialModal closeHandler={closeHandler} />}
    </div>
  );
};

export default CreateCard;
