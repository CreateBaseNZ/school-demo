import { useRef, useState, forwardRef } from "react";
import dynamic from "next/dynamic";
import MonacoEditor from "./MonacoEditor/MonacoEditor";
import Console from "./Console/Console";
import EditorToggleButton from "/components/Header/EditorToggleButton";
import PlayButtons from "../PlayButtons";
import TabBar from "./TabBar";
import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import EllipsesLoading from "/components/UI/EllipsesLoading";
import ClientOnlyPortal from "/utils/ClientOnlyPortal";

import { ServoMotors } from "./ServoMotors.ts";
import { Actuation } from "./Actuation.ts";
import { Block } from "./Block";

import { CodeGenerator } from "./CodeGenerator.ts";

import classes from "./Workspace.module.scss";

const FlowEditorRender = dynamic(() => import("./FlowEditor/FlowEditor"), {
  ssr: false,
});

const FlowEditor = forwardRef((props, ref) => (
  <FlowEditorRender {...props} forwardedRef={ref} />
));

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

  const changeTabHandler = (option) => {
    if (activeTab === "flow" && option === "text") {
      const newCode = codeGen.build(flowRef.current.getBlockConfig());
      setTextCode(newCode);
    }
    setActiveTab(option);
  };

  // Declarations for executeCode
  let sensorData;
  let communication;
  let interval;
  const executeCode = async () => {
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

  const playHandler = () => {
    executeCode();
    props.playHandler();
  };

  const verifyHandler = () => {
    executeCode();
    props.verifyHandler();
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
      <Console hide={activeTab !== "console"} />
      <TabBar active={activeTab} onChange={changeTabHandler} />
      <ClientOnlyPortal selector="#play-portal">
        <PlayButtons
          playHandler={playHandler}
          stopPlayHandler={props.stopPlayHandler}
          isPlaying={props.isPlaying}
          style={{ display: props.isVerifying && "none" }}
        />
      </ClientOnlyPortal>
      <ClientOnlyPortal selector="#last-slide">
        <div className={classes.lastSlideWrapper}>
          <button
            className={classes.verifyBtn}
            onClick={verifyHandler}
            style={{
              display: (props.isVerifying || props.isPlaying) && "none",
            }}
          >
            <SlowMotionVideoIcon fontSize="large" />
            Verify my code!
          </button>
          <div
            className={classes.verifyingWrapper}
            style={{
              display: !props.isVerifying && "none",
            }}
          >
            <span>VERIFYING</span>
            <EllipsesLoading />
            <button
              id="cancel-verify-button"
              className={classes.cancelBtn}
              onClick={props.cancelVerifyHandler}
            >
              <CloseRoundedIcon fontSize="small" />
              Cancel
            </button>
          </div>
          {props.isPlaying && (
            <div style={{ opacity: 0.75 }}>Simulation in progress...</div>
          )}
        </div>
      </ClientOnlyPortal>
    </div>
  );
};

export default Workspace;
