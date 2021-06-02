import Image from "next/image";
import classes from "./ContentWrapper.module.scss";
import SubsystemCard from "/components/UI/SubsystemCard";

const DUMMY_DATA = [
  {
    title: "Sandbox",
    href: "/play",
    src: "/collecting-the-items.png",
    description:
      "Welcome to the sandbox. In this simulation, only your imagination is the limit! Experiment with all of the blocks that you have used so far without any pesky objectives. ",
    recommended: [
      {
        title: "Collecting the Items",
        href: "/menu/create",
      },
    ],
  },
];

const ImproveCard = () => {
  return (
    <div className={classes.improveWrapper}>
      <div className={classes.contentWrapper}>
        <h2>H.E.R.&#216;</h2>
        <section>
          <p style={{ fontWeight: 600 }}>
            With our final solution successfully tested, our next step is to work out how we could improve it
          </p>
          <p>
            There is very rarely such thing as a perfect solution. With the introduction of more time, money and resources, almost anything can be improved upon. On the other hand, sometimes changes or additions to the original problem can result in the need for a (sometimes greatly) 
            adapted solution. This is what the improve step is all about, pushing a solution to the limits in the face of changing requirements.
          </p>
          </section>
          <section>
          <p>
            Coming soon: <i>Take your creation beyond the basic solution with the introduction of additional problem parameters. Adapt and improve your previous solutions with even less guidance in these additional challenging subsytems.</i>
          </p>
          </section>
          <section>
          <p>
            Although the improve subsystems are still under construction, if you have managed to complete all other systems then why not spend some time playing around with our sandbox?
          </p>
          </section>
      </div>
      <div className={classes.createWrapper}>
        {DUMMY_DATA.map((subsystem) => {
          return <SubsystemCard {...subsystem} key={subsystem.title} />;
        })}
      </div>
    </div>
  );
};

export default ImproveCard;
