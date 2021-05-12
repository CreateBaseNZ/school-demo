import Editor from "@monaco-editor/react";
import { useRef } from "react";

import classes from "./Workspace.module.scss";

const Workspace = () => {
  const editorRef = useRef();

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const getEditorValue = () => {
    alert(editorRef.current.getValue());
  };

  return (
    <div className={classes.workspace}>
      <Editor defaultLanguage="javascript" onMount={handleEditorDidMount} />
      <button onClick={getEditorValue}>Click me</button>
    </div>
  );
};

export default Workspace;
