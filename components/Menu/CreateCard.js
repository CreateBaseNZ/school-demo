import SubsystemCard from "/components/UI/SubsystemCard";
import classes from "./ContentWrapper.module.scss";

const DUMMY_DATA = [
  {
    title: "Subsystem 1: The Gravity Wand",
    href: "/play/the-gravity-wand",
    src: "/the-gravity-wand.png",
    description:
      "Learn how to grab/release an object with the gravity wand.",
  },
  {
    title: "Subsystem 2: Moving the Arm",
    href: "/play/moving-the-arm",
    src: "/moving-the-arm.png",
    description:
      "Learn how to move the gravity wand to collect a sequence of floating gems. ",
  },
  {
    title: "Final System: Collecting the Items",
    href: "/play/collecting-the-items",
    src: "/collecting-the-items.png",
    description:
      "Using the gravity wand and the robotic arm, pick up pieces of rubbish before transporting and dropping them into one of two collection bins.",
    recommended: [
      {
        title: "The Gravity Wand",
        href: "/menu/create",
      },
      {
        title: "Moving the Arm",
        href: "/menu/create",
      },
    ],
  },
];

const CreateCard = () => {
  return (
    <div className={classes.createWrapper}>
      {DUMMY_DATA.map((subsystem) => {
        return <SubsystemCard {...subsystem} key={subsystem.title} />;
      })}
    </div>
  );
};

export default CreateCard;
