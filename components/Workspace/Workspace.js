import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import MonacoEditor from "../UI/MonacoEditor";

import blockConfigs from "../../public/data/blocksConfig.json";
import { CodeGenerator } from "./CodeGenerator.ts";

import classes from "./Workspace.module.scss";
import EditorToggleButton from "../UI/EditorToggleButton";

const FlowEditor = dynamic(() => import("../UI/FlowEditor/FlowEditor"), {
  ssr: false,
});

const ClientOnlyPortal = ({ children, selector }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
};

const Workspace = (props) => {
  const [isFlow, setIsFlow] = useState(true);

  const toggleHandler = () => {
    setIsFlow((state) => !state);
  };

  return (
    <div className={classes.workspace}>
      <ClientOnlyPortal selector="#editor-toggle-portal">
        <EditorToggleButton onChange={toggleHandler} />
      </ClientOnlyPortal>
      {isFlow && <FlowEditor />}
      {!isFlow && (
        <MonacoEditor
          unityContext={props.unityContext}
          sensorData={props.sensorData}
        />
      )}
    </div>
  );
};

export default Workspace;
