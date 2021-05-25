import classes from "./ContentWrapper.module.scss";

const DefineCard = () => {
  return (
    <div className={classes.contentWrapper}>
      <h2>H.E.R.&#216;</h2>
      <section>
        <p style={{ fontWeight: 500 }}>
          The first step to produce the solution is to understand the problem:
        </p>
        <p>
          In this situation, a self-driving transport vehicle has spilt items of
          rubbish all over a factory floor! Rather than having to clean it up
          ourselves, we could instead program the robotic arm in the centre of
          the room to pick up the rubbish and transport it to the rubbish bins
          at the edge of the room for us!
        </p>
      </section>
      <section>
        <p style={{ fontWeight: 500 }}>
          If we are going to use the robotic arm to try and solve our problem,
          we will first need to understand its capabilities. This will help us
          decide if it will be a suitable tool for the task:
        </p>
        <ul>
          <li>
            There is a claw attachment on the end of the arm that can be opened
            and closed. It could be used to grasp the items of rubbish.
          </li>
          <li>
            The arm has five motors, four to move the arm around the space and
            one to open and close the claw. We could control them individually
            or instead use a function that uses inverse kinematics to move them
            together.
          </li>
          <li>
            The robotic arm is strong enough to lift up and move any of the
            individual pieces of rubbish.
          </li>
          <li>
            Because of how it needs to be programmed, we can’t move this robotic
            arm and open/close its claw at the same time.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default DefineCard;
