import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import SplitPaneContext from "../../store/split-pane-context";

import classes from "./SplitPane.module.scss";

const SplitPane = ({ children, className, orientation }) => {
  const [clientHeight, setClientHeight] = useState(null);
  const [clientWidth, setClientWidth] = useState(null);
  const yDividerPos = useRef(null);
  const xDividerPos = useRef(null);

  const onMouseHoldDown = (orientation, e) => {
    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
    if (orientation === "vertical") {
      document.body.style.cursor = "ew-resize";
    } else {
      document.body.style.cursor = "ns-resize";
    }
  };

  const onMouseHoldUp = () => {
    yDividerPos.current = null;
    xDividerPos.current = null;
    document.body.style.cursor = "default";
  };

  const onMouseHoldMove = (e) => {
    if (!yDividerPos.current && !xDividerPos.current) {
      return;
    }

    setClientHeight(clientHeight + e.clientY - yDividerPos.current);
    setClientWidth(clientWidth + e.clientX - xDividerPos.current);

    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  useEffect(() => {
    document.addEventListener("mouseup", onMouseHoldUp);
    document.addEventListener("mousemove", onMouseHoldMove);

    return () => {
      document.removeEventListener("mouseup", onMouseHoldUp);
      document.removeEventListener("mousemove", onMouseHoldMove);
    };
  });

  const splitClasses = `${
    orientation === "shelve" ? classes.splitShelve : classes.splitStack
  } ${className}`;

  return (
    <div className={splitClasses}>
      <SplitPaneContext.Provider
        value={{
          clientHeight,
          setClientHeight,
          clientWidth,
          setClientWidth,
          onMouseHoldDown,
        }}
      >
        {children}
      </SplitPaneContext.Provider>
    </div>
  );
};

export const Divider = (props) => {
  const { onMouseHoldDown } = useContext(SplitPaneContext);

  const className =
    props.orientation === "vertical"
      ? classes.dividerVertical
      : classes.dividerHorizontal;

  return (
    <div
      className={className}
      onMouseDown={onMouseHoldDown.bind(null, props.orientation)}
    />
  );
};

export const SplitPaneTop = (props) => {
  const topRef = createRef();
  const { clientHeight, setClientHeight } = useContext(SplitPaneContext);

  useEffect(() => {
    if (!clientHeight) {
      setClientHeight(topRef.current.clientHeight);
      return;
    }

    topRef.current.style.minHeight = clientHeight + "px";
    topRef.current.style.maxHeight = clientHeight + "px";
  }, [clientHeight]);

  // const focusHandler

  return <div {...props} className={classes.pane} ref={topRef}></div>;
};

export const SplitPaneBottom = (props) => {
  return <div {...props} className={classes.pane}></div>;
};

export const SplitPaneLeft = (props) => {
  const topRef = createRef();
  const { clientWidth, setClientWidth } = useContext(SplitPaneContext);

  useEffect(() => {
    if (!clientWidth) {
      setClientWidth(topRef.current.clientWidth / 2);
      return;
    }

    topRef.current.style.minWidth = clientWidth + "px";
    topRef.current.style.maxWidth = clientWidth + "px";
  }, [clientWidth]);

  return <div {...props} className={classes.pane} ref={topRef} />;
};

export const SplitPaneRight = (props) => {
  return <div {...props} className={classes.pane}></div>;
};

export default SplitPane;
