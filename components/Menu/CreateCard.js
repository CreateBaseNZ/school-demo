import SubsystemCard from "../UI/SubsystemCard";
import classes from "./ContentWrapper.module.scss";

const DUMMY_DATA = [
  {
    title: "Moving the Arm",
    href: "/",
    src: "/subsystem.jpg",
    description:
      "Collect a sequence of floating gems by touching them with the end of the robotic arm. ",
  },
  {
    title: "Operating the Claw",
    href: "/",
    src: "/subsystem.jpg",
    description:
      "Find the right timing to catch and release an object with a robotic claw attachment.",
  },
  {
    title: "Collecting the Items",
    href: "/",
    src: "/subsystem.jpg",
    description:
      "Combine your learnings from the first two subsystems to use the claw and the robotic arm to pick up pieces of rubbish at specific locations, before transporting and dropping them into a collection bin.",
    recommended: [
      {
        title: "Moving the Arm",
        href: "/",
      },
      {
        title: "Collecting the Items",
        href: "/",
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
