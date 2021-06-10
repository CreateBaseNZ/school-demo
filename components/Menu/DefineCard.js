import RecordVoiceOverRoundedIcon from "@material-ui/icons/RecordVoiceOverRounded";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import classes from "./ContentWrapper.module.scss";

import useTts from "/hooks/useTts";

const ttsText =
  "When designing a solution, the first step is to understand the problem. After watching the video on the right, we can see that a self-driving vehicle has spilt bags of rubbish all over a factory floor! Luckily, there are a pair of bins at the edge of the room that we can deposit the rubbish into. However, rather than cleaning it up ourselves, what if we program the HERO robotic arm to do it for us? Let's start by defining the capabilities of the HERO robotic arm. There is a gravity wand attached to the end of the arm (don't ask us how it works) that we can turn on and off. It could be turned on to attract the items of rubbish and turned off to drop them into a bin. The arm has four motors to move it around in 3D space. We could control each motor individually or, instead, use a pre-made function to move them together. The HERO robot can only be programmed to perform one task at a time. This means that we need to first move the gravity wand into position, and then turn the gravity wand on or off.";

const DefineCard = () => {
  const [supported, isSpeaking, speak, stopSpeak] = useTts(ttsText);

  return (
    <div className={classes.contentWrapper}>
      <h2>H.E.R.&#216;</h2>
      <section>
        <p style={{ fontWeight: 600 }}>
          When designing a solution, the first step is to understand the
          problem:
        </p>
        <p>
          After watching the video on the right, we can see that a self-driving
          vehicle has spilt bags of rubbish all over a factory floor! 🙀
        </p>
        <p>
          Luckily, there are a pair of bins at the edge of the room that we can
          deposit the rubbish into. However, rather than cleaning it up
          ourselves, what if we program the H.E.R.&#216; robotic arm to do it
          for us? 🤔
        </p>
      </section>
      <section>
        <p style={{ fontWeight: 600 }}>
          <br />
          Let's start by defining the capabilities of the H.E.R.&#216; robotic
          arm:
        </p>
        <ol>
          <li>
            There is a gravity wand attached to the end of the arm (don't ask us
            how it works) that we can turn on and off. It could be turned{" "}
            <b>on</b> to attract the items of rubbish and turned <b>off</b> to
            drop them into a bin. 🧙‍♂️ ♻
          </li>
          <li>
            The arm has four motors to move it around in 3D space. We could
            control each motor individually or, instead, use a pre-made function
            to move them together. 🦾⛓
          </li>
          <li>
            The H.E.R.&#216; robot can only be programmed to perform one task at
            a time. This means that we need to first move the gravity wand into
            position, and then turn the gravity wand on/off. 1️⃣➡2️⃣
          </li>
        </ol>
      </section>
      {!isSpeaking ? (
        <button className={classes.tts} title="Text-to-speech" onClick={speak}>
          <RecordVoiceOverRoundedIcon style={{ fontSize: "16" }} />
        </button>
      ) : (
        <button className={classes.tts} title="Stop" onClick={stopSpeak}>
          <StopRoundedIcon style={{ fontSize: "16" }} />
        </button>
      )}
    </div>
  );
};

export default DefineCard;
