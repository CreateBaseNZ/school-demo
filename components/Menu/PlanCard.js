import classes from "./ContentWrapper.module.scss";

const PlanCard = () => {
  return (
    <div className={classes.contentWrapper}>
      <h2>H.E.R.&#216;</h2>
      <section>
        <p style={{ fontWeight: 600 }}>
          Now that we have defined the problem and our available tools, we
          need to plan our solution:
        </p>
        <p>
          It is crucial to plan how we will build our solution before we begin as 
          it helps us identify potential problems at an early stage, saving us time 
          and headaches in the future.
          </p>
          </section>
          <section>
          <p>
          A good practice when building a complex solution is to break it down
          into a series of simpler problems. In our situation, we will split our
          solution into different parts, called <i>subsystems</i>, that we can implement
          individually and then combine at the end. It makes sense that each of
          our <i>subsystems</i> represents a different functionality.
        </p>
      </section>
      <section>
      <p style={{ fontWeight: 600 }}>
          <br/>
          To pick up and transport items of rubbish into the bins, we will need to
          implement the following functionalities with our H.E.R.&#216; robotic arm:
        </p>
        <ol>
          <li>
          <i>Subsystem 1</i>: Turning the gravity wand on and off. 
          </li>
          <li>
          <i>Subsystem 2</i>: Moving the end of the arm between points in space (x, y, z).
          </li>
        </ol>
      </section>
      <section>
        <p>
          After implementing each of these subsystems individually, we will then
          combine them into one solution that we will use to solve our problem.
        </p>
      </section>
      {/* <section>
        <ul className={classes.subsystemList}>
          <li>Subsystem 1</li>
          <li>Subsystem 2</li>
          <li>Subsystem 3</li>
        </ul>
      </section> */}
    </div>
  );
};

export default PlanCard;
