import classes from "./ContentWrapper.module.scss";

const DefineCard = () => {
  return (
    <div className={classes.contentWrapper}>
      <h2>Project Name</h2>
      <section>
        <p>
          The first step to produce the solution is to understand the problem:
        </p>
        <p>
          We are trying to program the arm to make it possible to pick up the
          rubbish and transport it to the rubbish bin.
        </p>
      </section>
      <section>
        <p>As we already have the arm, we should understand its capabilities</p>
        <ul>
          <li>
            The arm has five motors, 4 to move the arm around the space and 1 to
            open and close the claw.
          </li>
          <li>The claw should be used to pick up the rubbish</li>
          <li>
            The claw is closed above the rubbish to pick up the rubbish and
            opened
          </li>
        </ul>
      </section>
    </div>
  );
};

export default DefineCard;
