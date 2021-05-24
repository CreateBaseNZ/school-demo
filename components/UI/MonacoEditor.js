import { useRef } from "react";
import Editor from "@monaco-editor/react";

import { ServoMotors } from "../Workspace/ServoMotors.ts";
import { Actuation } from "../Workspace/Actuation.ts";
import { Block } from "../Workspace/Block";

import themes from "../../utils/themes";

import classes from "./MonacoEditor.module.scss";

const DUMMY_HEADER = "console.log('hello');";

const MonacoEditor = (props) => {
  const editorRef = useRef();
  const monacoRef = useRef();

  // const [monacoTheme, setMonacoTheme] = useState("Monokai");
  // console.log(monacoTheme);

  const clickHandler = async () => {
    let someVar = props.unityContext;
    let RoboticSystemName = "Arm";
    let ServoMotorsClass = ServoMotors;
    let ActuationClass = Actuation;
    let sensorData = props.sensorData;
    let BlockClass = Block;
    console.log(props);
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

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  // const themeOptions = Object.keys(themes).map((key) => {
  //   return <button key={key}> {key} </button>;
  // });

  return (
    <div
      className={classes.editorContainer}
      style={{ display: props.hide && "none" }}
    >
      <Editor
        defaultLanguage="javascript"
        value={props.code}
        onMount={handleEditorDidMount}
        className={classes.editor}
        theme={"vs-dark"}
      />
      <button onClick={clickHandler}>Click me</button>
    </div>
  );
};

export default MonacoEditor;
