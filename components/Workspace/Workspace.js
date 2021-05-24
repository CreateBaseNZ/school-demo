import { useRef, useEffect, useState, forwardRef } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import MonacoEditor from "../UI/MonacoEditor";

import { CodeGenerator } from "./CodeGenerator.ts";

import classes from "./Workspace.module.scss";
import EditorToggleButton from "../UI/EditorToggleButton";

const FlowEditorRender = dynamic(() => import("../UI/FlowEditor/FlowEditor"), {
  ssr: false,
});

const FlowEditor = forwardRef((props, ref) => (
  <FlowEditorRender {...props} forwardedRef={ref} />
));

const ClientOnlyPortal = ({ children, selector }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
};

const codeGen = new CodeGenerator();

const Workspace = (props) => {
  const [isFlow, setIsFlow] = useState(true);
  const [textCode, setTextCode] = useState("// Start coding!");
  const flowRef = useRef();

  const toggleHandler = () => {
    if (isFlow) {
      const newCode = codeGen.build(flowRef.current.getBlockConfig());
      setTextCode(newCode);
    }
    setIsFlow((state) => !state);
  };

  return (
    <div className={classes.workspace}>
      <ClientOnlyPortal selector="#editor-toggle-portal">
        <EditorToggleButton onChange={toggleHandler} />
      </ClientOnlyPortal>
      <FlowEditor hide={!isFlow} ref={flowRef} />
      <MonacoEditor
        unityContext={props.unityContext}
        sensorData={props.sensorData}
        code={textCode}
        hide={isFlow}
      />
    </div>
  );
};

export default Workspace;
