import NavDropdown from "./NavDropdown";

import classes from "./Nav.module.scss";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const projectSteps = ["Step 1", "Step 2"];
const subsystems = ["Subsystem 1", "Subsystem 2", "Subsystem 3"];
const tasks = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.navItem}>
        <button>Project Name</button>
        <NavDropdown type="Project steps" items={projectSteps} />
      </div>
      <ChevronRightIcon fontSize="small" />
      <div className={classes.navItem}>
        <button>Subsystem Name</button>
        <NavDropdown type="Subsystems" items={subsystems} />
      </div>
      <ChevronRightIcon fontSize="small" />
      <div className={classes.navItem}>
        <button>Step Name</button>
        <NavDropdown type="Tasks" items={tasks} />
      </div>
    </nav>
  );
};

export default Nav;
