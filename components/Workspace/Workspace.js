import { useRef, useEffect, useState, forwardRef } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import MonacoEditor from "../UI/MonacoEditor";
import EditorToggleButton from "../UI/EditorToggleButton";
import PlayButtons from "../UI/PlayButtons";
import TabBar from "./TabBar";
import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import { ServoMotors } from "./ServoMotors.ts";
import { Actuation } from "./Actuation.ts";
import { Block } from "./Block";

import { CodeGenerator } from "./CodeGenerator.ts";

import classes from "./Workspace.module.scss";

const FlowEditorRender = dynamic(() => import("../UI/FlowEditor/FlowEditor"), {
  ssr: false,
});

const FlowEditor = forwardRef((props, ref) => (
  <FlowEditorRender {...props} forwardedRef={ref} />
));

const ClientOnlyPortal = ({ children, selector }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
};

const codeGen = new CodeGenerator();

const Workspace = (props) => {
  const [activeTab, setActiveTab] = useState("flow");
  const [textCode, setTextCode] = useState("console.log('Hi');");
  const flowRef = useRef();

  const toggleHandler = () => {
    if (activeTab) {
      const newCode = codeGen.build(flowRef.current.getBlockConfig());
      setTextCode(newCode);
    }
    setActiveTab((state) => !state);
  };

  const radioHandler = (option) => {
    if (activeTab === "flow" && option === "text") {
      const newCode = codeGen.build(flowRef.current.getBlockConfig());
      setTextCode(newCode);
    }
    setActiveTab(option);
  };

  // Declarations for playHandler
  let sensorData;
  let communication;
  let interval;
  const playHandler = async () => {
    const newCode = codeGen.build(flowRef.current.getBlockConfig());
    // Declare header functions and configurations
    let someVar = props.unityContext;
    let RoboticSystemName = "Arm";
    let ServoMotorsClass = ServoMotors;
    let ActuationClass = Actuation;
    let BlockClass = Block;
    // Activate fetching of sensor data
    if (!sensorData) {
      let promise = () => {
        return new Promise((resolve, reject) => {
          someVar.on("GetSensorData", (data) => {
            sensorData = JSON.parse(data);
            return resolve();
          });
        });
      };
      await promise();
    }
    // Run the function
    eval("(async () => {" + newCode + "})()");

    setTextCode(newCode);
    // monacoRef.current.editor.defineTheme("customTheme", themes["Monokai"]);
    // monacoRef.current.editor.setTheme("customTheme");
  };

  const verifyHandler = () => {
    playHandler();
    props.verifyHandler();
  };

  const cancelHandler = () => {
    props.cancelVerifyHandler();
  };

  return (
    <div className={classes.workspace}>
      {/* <ClientOnlyPortal selector="#editor-toggle-portal">
        <EditorToggleButton onChange={toggleHandler} />
      </ClientOnlyPortal> */}
      <FlowEditor hide={activeTab !== "flow"} ref={flowRef} />
      <MonacoEditor
        unityContext={props.unityContext}
        sensorData={props.sensorData}
        code={textCode}
        hide={activeTab !== "text"}
        isPlaying={props.isPlaying}
        clickHandler={props.clickHandler}
      />
      <TabBar active={activeTab} onChange={radioHandler} />
      {!props.isVerifying && (
        <ClientOnlyPortal selector="#play-buttons-portal">
          <PlayButtons
            clickHandler={props.clickHandler}
            playHandler={playHandler}
            isPlaying={props.isPlaying}
          />
        </ClientOnlyPortal>
      )}
      <ClientOnlyPortal selector="#last-slide">
        <div className={classes.lastSlideWrapper}>
          {!props.isVerifying && !props.isPlaying && (
            <button className={classes.verifyBtn} onClick={verifyHandler}>
              <SlowMotionVideoIcon fontSize="large" />
              Verify my code!
            </button>
          )}
          {props.isVerifying && (
            <>
              <span>VERIFYING</span>
              <div className={classes.ldsEllipsis}>
                <div />
                <div />
                <div />
                <div />
              </div>
              <button
                id="cancel-verify-button"
                className={classes.cancelBtn}
                onClick={cancelHandler}
              >
                <CloseRoundedIcon fontSize="small" />
                Cancel
              </button>
            </>
          )}
          {props.isPlaying && (
            <div style={{ opacity: 0.75 }}>Simulation in progress...</div>
          )}
        </div>
      </ClientOnlyPortal>
    </div>
  );
};

export default Workspace;
