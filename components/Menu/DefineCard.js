import classes from "./ContentWrapper.module.scss";

const DefineCard = () => {
  return (
    <div className={classes.contentWrapper}>
      <h2>H.E.R.&#216;</h2>
      <section>
        <p style={{ fontWeight: 600 }}>
          When designing a solution, the first step is to understand the problem:
        </p>
        <p>
        After watching the cutscene, we can see that a self-driving vehicle has 
        spilt bags of rubbish all over a factory floor! Luckily, there are a pair 
        of bins at the edge of the room that we can deposit the rubbish into. 
        However, rather than cleaning it up ourselves, what if we program the 
        H.E.R.&#216; robotic arm to do it for us?
        </p>
      </section>
      <section>
      <p style={{ fontWeight: 600 }}>
      <br/>
          If we are going to solve our problem with the H.E.R.&#216; robotic arm,
          we will first need to understand its capabilities:
        </p>
        <ol>
          <li>
            There is a gravity sphere attachment on the end of the arm (don't ask us 
            how it works) that can be activated and deactivated. It could be turned on 
            to attract the items of rubbish and turned off to drop them into a bin.
          </li>
          <li>
            The arm has four motors to move it around in 3D space. We could control 
            each motor individually or, instead, use a pre-made function to move them 
            together.
          </li>
          <li>
            Because of the way it needs to be programmed, we can’t move this robotic 
            arm and activate/deactivate its gravity sphere at the same time. We will 
            have to do one after the other.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default DefineCard;
