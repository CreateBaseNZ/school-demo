import { useRef, useEffect, useState, forwardRef } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import MonacoEditor from "../UI/MonacoEditor";
import EditorToggleButton from "../UI/EditorToggleButton";
import TabBar from "./TabBar";

import { CodeGenerator } from "./CodeGenerator.ts";

import classes from "./Workspace.module.scss";

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
  const [activeTab, setActiveTab] = useState("flow");
  const [textCode, setTextCode] = useState("// Start coding!");
  const flowRef = useRef();

  const toggleHandler = () => {
    if (activeTab) {
      const newCode = codeGen.build(flowRef.current.getBlockConfig());
      setTextCode(newCode);
    }
    setActiveTab((state) => !state);
  };

  const radioHandler = (option) => {
    setActiveTab(option);
  };

  return (
    <div className={classes.workspace}>
      {/* <ClientOnlyPortal selector="#editor-toggle-portal">
        <EditorToggleButton onChange={toggleHandler} />
      </ClientOnlyPortal> */}
      <FlowEditor hide={activeTab !== "flow"} ref={flowRef} />
      <MonacoEditor
        unityContext={props.unityContext}
        sensorData={props.sensorData}
        code={textCode}
        hide={activeTab !== "text"}
      />
      <TabBar active={activeTab} onChange={radioHandler} />
    </div>
  );
};

export default Workspace;
