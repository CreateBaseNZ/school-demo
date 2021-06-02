import Image from "next/image";
import classes from "./ContentWrapper.module.scss";
import SubsystemCard from "/components/UI/SubsystemCard";

const DUMMY_DATA = [
  {
    title: "Sandbox",
    href: "/play",
    src: "/collecting-the-items.png",
    description:
      "In the metaphysics of identity, the ship of Theseus is a thought experiment that raises the question of whether an object that has had all of its components replaced remains fundamentally the same object. The concept is one of the oldest in Western philosophy, having been discussed by the likes of Heraclitus and Plato by c. 500–400 BC.",
    recommended: [
      {
        title: "Collecting the Items",
        href: "/menu/create",
      },
    ],
  },
  {
    title: "We want to hear from you!",
    href: "/have-your-say",
    src: "/team.jpg",
    description:
      "Our team at CreateBase would love to hear your thoughts, feedback, and suggestions to make this platform even better for you and your friends. It won't take long, we promise!",
  },
];

const ImproveCard = () => {
  return (
    <div className={classes.improveWrapper}>
      <div className={classes.contentWrapper}>!! TO DO !!</div>
      <div className={classes.createWrapper}>
        {DUMMY_DATA.map((subsystem) => {
          return <SubsystemCard {...subsystem} key={subsystem.title} />;
        })}
      </div>
    </div>
  );
};

export default ImproveCard;
