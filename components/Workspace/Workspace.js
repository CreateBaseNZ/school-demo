import Editor from "@monaco-editor/react";
import { useContext, useEffect, useRef, useState } from "react";
import themes from "../../utils/themes";

import SimulationContext, {
  unityContext,
} from "../../store/simulation-context";

import { ServoMotors } from "./ServoMotors.ts";

import classes from "./Workspace.module.scss";

const DUMMY_HEADER = "console.log('hello');";

const Workspace = () => {
  const editorRef = useRef();
  const monacoRef = useRef();
  const ctx = useContext(SimulationContext);
  // const [monacoTheme, setMonacoTheme] = useState("Monokai");
  // console.log(monacoTheme);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  const clickHandler = () => {
    let someCtx = ctx;
    let someVar = unityContext;
    let RoboticSystemName = "RoboticArm";
    let ServoMotorsClass = ServoMotors;
    const header = DUMMY_HEADER;
    eval(header + editorRef.current.getValue());
    monacoRef.current.editor.defineTheme("customTheme", themes["Monokai"]);
    monacoRef.current.editor.setTheme("customTheme");
  };

  const themeOptions = Object.keys(themes).map((key) => {
    return <button key={key}>{key}</button>;
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
      <button onClick={clickHandler}>Click me</button>
      <div className={classes.dropdown}>
        <button className={classes.dropdownBtn}>Click me</button>
        <div className={classes.dropdownMenu}>{themeOptions}</div>
      </div>
    </div>
  );
};

export default Workspace;
