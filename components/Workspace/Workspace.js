import Editor from "@monaco-editor/react";
// import { FlowEditor } from "elena-editor";

import { useState, useEffect, useRef } from "react";
import themes from "../../utils/themes";

import { ServoMotors } from "./ServoMotors.ts";
import { Actuation } from "./Actuation.ts";
import { Block } from "./Block";

import classes from "./Workspace.module.scss";

const DUMMY_HEADER = "console.log('hello');";

const Workspace = (props) => {
  const editorRef = useRef();
  const monacoRef = useRef();
  const [flowEditor, setFlowEditor] = useState();
  // const [monacoTheme, setMonacoTheme] = useState("Monokai");
  // console.log(monacoTheme);

  useEffect(async () => {
    const loadElena = async () => {
      const { FlowEditor } = await import("elena-editor");
      return (
        <FlowEditor
          nodeList={[
            {
              id: "base_start",
              isStatic: true,
              name: "Start",
              priority: 0,
              type: "Terminator",
              xPos: 0,
              yPos: 0,
              code: "console.log('hello')",
            },
            {
              id: "base_process_1",
              isStatic: true,
              name: "Proc",
              priority: 0,
              type: "Process",
              xPos: 0,
              yPos: 0,
              inputs: ["in1", "in2"],
              outputs: ["out2"],
              code: "hi there",
            },
          ]}
        />
      );
    };
    setFlowEditor(await loadElena());
  }, []);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  const clickHandler = async () => {
    let someVar = props.unityContext;
    let RoboticSystemName = "RoboticArm";
    let ServoMotorsClass = ServoMotors;
    let ActuationClass = Actuation;
    let sensorData = props.sensorData;
    // let promise = () => {
    //   return new Promise((resolve, reject) => {
    //     someVar.on("GetSensorData", (data) => {
    //       sensorData = JSON.parse(data);
    //       resolve();
    //     });
    //   });
    // };
    // sensorData = await promise();
    eval("(async () => {" + editorRef.current.getValue() + "})()");
    monacoRef.current.editor.defineTheme("customTheme", themes["Monokai"]);
    monacoRef.current.editor.setTheme("customTheme");
  };

  const themeOptions = Object.keys(themes).map((key) => {
    return <button key={key}> {key} </button>;
  });

  return (
    <div className={classes.workspace}>
      <Editor
        defaultLanguage="javascript"
        defaultValue="// Start coding!"
        onMount={handleEditorDidMount}
        className={classes.editor}
        theme={"vs-dark"}
      />
      <button onClick={clickHandler}> Click me </button>{" "}
      <div className={classes.dropdown}>
        <button className={classes.dropdownBtn}> Click me </button>{" "}
        <div className={classes.dropdownMenu}> {themeOptions} </div>{" "}
      </div>
      {/* {flowEditor} */}
    </div>
  );
};

export default Workspace;
