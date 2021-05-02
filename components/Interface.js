import Link from "next/link";

import Contents from "./Contents";

import classes from "./Interface.module.scss";

const Interface = () => {
  return (
    <div className={classes.interface}>
      <div className={classes.simulation}>
        <h1>Demo Page</h1>
        <Link href="/">Back to home</Link>
      </div>
      <Contents className={classes.contents} />
      <div className={classes.editor}>
        <h1>Demo Page</h1>
        <Link href="/">Back to home</Link>
      </div>
    </div>
  );
};

export default Interface;
