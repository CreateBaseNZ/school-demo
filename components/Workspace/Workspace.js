import Editor from "@monaco-editor/react";
import { useRef } from "react";
import themes from "../../utils/themes";

import { ServoMotors } from "./ServoMotors.ts";
import { Actuation } from "./Actuation.ts";
import { Block } from "./Block";

import classes from "./Workspace.module.scss";

const DUMMY_HEADER = "console.log('hello');";

const Workspace = (props) => {
  const editorRef = useRef();
  const monacoRef = useRef();
  // const [monacoTheme, setMonacoTheme] = useState("Monokai");
  // console.log(monacoTheme);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  const clickHandler = async () => {
    let someVar = props.unityContext;
    let RoboticSystemName = "RoboticArm";
    let ServoMotorsClass = ServoMotors;
    let ActuationClass = Actuation;
    let sensorData;
    let promise = () => {
      return new Promise((resolve, reject) => {
        someVar.on("GetSensorData", (data) => {
          sensorData = JSON.parse(data);
          resolve();
        });
      });
    };
    sensorData = await promise();
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
      />{" "}
      <button onClick={clickHandler}> Click me </button>{" "}
      <div className={classes.dropdown}>
        <button className={classes.dropdownBtn}> Click me </button>{" "}
        <div className={classes.dropdownMenu}> {themeOptions} </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Workspace;
