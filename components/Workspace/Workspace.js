import Editor from "@monaco-editor/react";
import { useRef } from "react";

import { unityContext } from "../Simulation/Simulation";

import { ServoMotors } from "./ServoMotors.ts";

import classes from "./Workspace.module.scss";

const DUMMY_HEADER = "console.log('hello');";

const Workspace = () => {
  const editorRef = useRef();

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const clickHandler = () => {
    let someVar = unityContext;
    let RoboticSystemName = "RoboticArm";
    let ServoMotorsClass = ServoMotors;
    const header = DUMMY_HEADER;
    eval(header + editorRef.current.getValue());
  };

  return (
    <div className={classes.workspace}>
      <Editor defaultLanguage="javascript" onMount={handleEditorDidMount} />
      <button onClick={clickHandler}>Click me</button>
    </div>
  );
};

export default Workspace;
