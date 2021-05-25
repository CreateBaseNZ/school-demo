import classes from "./ContentWrapper.module.scss";

const PlanCard = () => {
  return (
    <div className={classes.contentWrapper}>
      <h2>Project Name</h2>
      <section>
        <p>
          Now that we understand our problem and the tools we have access to, we
          will need to plan how to implement our solution. It is crucial to plan
          our approach before we begin as it helps us identify potential
          problems at an early stage, saving us time and headaches in the
          future.
        </p>
      </section>
      <section>
        <p>
          Because the robotic arm and its claw attachment (explained in the
          define step) meet our requirements, we will use it to form our
          solution.
        </p>
      </section>
      <section>
        <p>
          A good practice when forming a complex solution is to implement a
          divide and conquer approach. To do this, we will divide our solution
          into different parts, called subsystems, that we can implement
          individually and then combine at the end. This is an excellent method
          for breaking down a complex problem into a series of simpler problems.
        </p>
      </section>
      <section>
        <p>
          To solve our problem that was described in the define step, we will
          need to implement the following functionalities with our robotic arm:
        </p>
        <ol>
          <li>
            Moving the end of the arm between points in space (x, y, z)
            <ul>
              <li>
                <b>Subsystem 1</b>: Learn the functions to move the claw
                attachment from one location to another
              </li>
            </ul>
          </li>
          <li>
            Opening and closing the claw attachment
            <ul>
              <li>
                <b>Subsystem 2</b>: Learn how to operate the claw to pick up
                items of rubbish
              </li>
            </ul>
          </li>
        </ol>
        <p>
          After implementing each of these subsystems individually, we will then
          combine them into one system that we will use to solve our problem.
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
