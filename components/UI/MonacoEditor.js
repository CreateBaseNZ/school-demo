import { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

import themes from "../../utils/themes";

import classes from "./MonacoEditor.module.scss";

const MonacoEditor = (props) => {
  const editorRef = useRef();
  const monacoRef = useRef();

  // const [monacoTheme, setMonacoTheme] = useState("Monokai");
  // console.log(monacoTheme);

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
    </div>
  );
};

export default MonacoEditor;
