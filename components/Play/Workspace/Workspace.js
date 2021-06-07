import { useRef, useState, forwardRef } from "react";
import dynamic from "next/dynamic";
import MonacoEditor from "./MonacoEditor/MonacoEditor";
import Console from "./Console/Console";
import EditorToggleButton from "/components/Header/EditorToggleButton";
import PlayButtons from "../PlayButtons";
import TabBar from "./TabBar";
import ClientOnlyPortal from "/utils/ClientOnlyPortal";
import LastSlide from "../Contents/LastSlide";

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

  const isBusy = props.isTesting || props.isVerifying;

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

  const testHandler = () => {
    executeCode();
    props.testHandler();
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
      <FlowEditor mode={props.mode} hide={activeTab !== "flow"} ref={flowRef} />
      <MonacoEditor
        unityContext={props.unityContext}
        sensorData={props.sensorData}
        code={textCode}
        hide={activeTab !== "text"}
        mode={props.mode}
        clickHandler={props.clickHandler}
      />
      <Console hide={activeTab !== "console"} />
      <TabBar active={activeTab} onChange={changeTabHandler} />
      <ClientOnlyPortal selector="#play-portal">
        <PlayButtons
          testHandler={testHandler}
          stopTestHandler={props.stopTestHandler}
          mode={props.mode}
        />
      </ClientOnlyPortal>
      <ClientOnlyPortal selector="#last-slide">
        <LastSlide
          mode={props.mode}
          verifyHandler={verifyHandler}
          cancelVerifyHandler={props.cancelVerifyHandler}
        />
      </ClientOnlyPortal>
    </div>
  );
};

export default Workspace;
