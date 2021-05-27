import SubsystemCard from "../UI/SubsystemCard";
import classes from "./ContentWrapper.module.scss";

const DUMMY_DATA = [
  {
    title: "Moving the Arm",
    href: "/play/moving-the-arm",
    src: "/moving-the-arm.png",
    description:
      "Collect a sequence of floating gems by touching them with the end of the robotic arm. ",
  },
  {
    title: "Operating the Claw",
    href: "/play/operating-the-claw",
    src: "/operating-the-claw.png",
    description:
      "Find the right timing to catch and release an object with a robotic claw attachment.",
  },
  {
    title: "Collecting the Items",
    href: "/play/collecting-the-items",
    src: "/collecting-the-items.png",
    description:
      "Combine your learnings from the first two subsystems to use the claw and the robotic arm to pick up pieces of rubbish at specific locations, before transporting and dropping them into a collection bin.",
    recommended: [
      {
        title: "Moving the Arm",
        href: "/menu/create",
      },
      {
        title: "Collecting the Items",
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
