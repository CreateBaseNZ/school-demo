import classes from "./Nav.module.scss";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Nav = () => {
  return (
    <nav>
      <div className={classes.path}>
        <div className={classes.pathLink}>Project Name</div>
        <ChevronRightIcon fontSize="small" />
        <div className={classes.pathLink}>Subsystem Name</div>
        <ChevronRightIcon fontSize="small" />
        <div className={classes.pathLink}>Step Name</div>
      </div>
    </nav>
  );
};

export default Nav;
