import classes from "./ContentWrapper.module.scss";

const PlanCard = () => {
  return (
    <div className={classes.contentWrapper}>
      <h2>Project Name</h2>
      <section>
        <p>
          Once we understand what should be done, a good practice is to
          implement a divide and conquer approach. Through this approach, we
          will divide our solution into different parts that we could solve on
          its own, then we could combine it at the end.
        </p>
      </section>
      <section>
        <p>From the define stage, we would then need</p>
        <ol>
          <li>
            Moving the arm between points
            <ul>
              <li>
                Learn the functions to move the arm from one location to another
              </li>
            </ul>
          </li>
          <li>
            Familiarize with the claw
            <ul>
              <li>
                Learn how to operate the claw to be able to pick up the rubbish
              </li>
            </ul>
          </li>
        </ol>
        <p>
          After being able to work these two subsystems we will be able to
          combine the work into one system solving our problem.
        </p>
      </section>
      <section>
        <ul className={classes.subsystemList}>
          <li>Subsystem 1</li>
          <li>Subsystem 2</li>
          <li>Subsystem 3</li>
        </ul>
      </section>
    </div>
  );
};

export default PlanCard;
