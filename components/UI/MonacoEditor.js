import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Editor from "@monaco-editor/react";

import { ServoMotors } from "../Workspace/ServoMotors.ts";
import { Actuation } from "../Workspace/Actuation.ts";
import { Block } from "../Workspace/Block";
import PlayButtons from "./PlayButtons";

import themes from "../../utils/themes";

import classes from "./MonacoEditor.module.scss";

const ClientOnlyPortal = ({ children, selector }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
};

const MonacoEditor = (props) => {
  const editorRef = useRef();
  const monacoRef = useRef();

  // const [monacoTheme, setMonacoTheme] = useState("Monokai");
  // console.log(monacoTheme);

  const playHandler = async () => {
    let someVar = props.unityContext;
    let RoboticSystemName = "Arm";
    let ServoMotorsClass = ServoMotors;
    let ActuationClass = Actuation;
    let sensorData = props.sensorData;
    let BlockClass = Block;

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
    // monacoRef.current.editor.defineTheme("customTheme", themes["Monokai"]);
    // monacoRef.current.editor.setTheme("customTheme");
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
      <ClientOnlyPortal selector="#play-buttons-portal">
        <PlayButtons
          isPlaying={props.isPlaying}
          clickHandler={props.clickHandler}
          playHandler={playHandler}
        />
      </ClientOnlyPortal>
    </div>
  );
};

export default MonacoEditor;
