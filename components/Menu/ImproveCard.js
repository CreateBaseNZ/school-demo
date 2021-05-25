import Image from "next/image";
import classes from "./ContentWrapper.module.scss";
import SubsystemCard from "../UI/SubsystemCard";

const DUMMY_DATA = [
  {
    title: "Subsystem ",
    href: "/",
    src: "/subsystem.jpg",
    description:
      "In the metaphysics of identity, the ship of Theseus is a thought experiment that raises the question of whether an object that has had all of its components replaced remains fundamentally the same object. The concept is one of the oldest in Western philosophy, having been discussed by the likes of Heraclitus and Plato by c. 500–400 BC.",
    recommended: [
      {
        title: "Subsystem A",
        href: "/",
      },
      {
        title: "Subsystem B",
        href: "/",
      },
    ],
  },
  {
    title: "Subsystem B",
    href: "/",
    src: "/subsystem.jpg",
    description:
      "In the metaphysics of identity, the ship of Theseus is a thought experiment that raises the question of whether an object that has had all of its components replaced remains fundamentally the same object. The concept is one of the oldest in Western philosophy, having been discussed by the likes of Heraclitus and Plato by c. 500–400 BC.",
    recommended: [
      {
        title: "Subsystem A",
        href: "/",
      },
      {
        title: "Subsystem B",
        href: "/",
      },
    ],
  },
];

const ImproveCard = () => {
  return (
    <div className={classes.improveWrapper}>
      {/* <div className={classes.contentWrapper}></div>
      <div className={classes.createWrapper}>
        {DUMMY_DATA.map((subsystem) => {
          return <SubsystemCard {...subsystem} key={subsystem.title} />;
        })}
      </div> */}
    </div>
  );
};

export default ImproveCard;
