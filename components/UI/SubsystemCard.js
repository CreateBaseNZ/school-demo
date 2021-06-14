import Image from "next/image";
import Link from "next/link";

import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";

import classes from "./SubsystemCard.module.scss";

import tracker from "/utils/tracker";

const SubsystemCard = (props) => {
  const status = localStorage.getItem(props.id);

  const getStatus = (id) => {
    const status = localStorage.getItem(id);
    if (status === "completed") {
      return classes.completed;
    }
    if (status === "in-progress") {
      return classes.inProgress;
    }
    return "";
  };

  const clickHandler = () => {
    if (props.title === "We want to hear from you!") {
      tracker.click(18);
    } else if (props.title === "Sandbox") {
      tracker.click(17);
    }
    if (props.showTutorial) {
      props.showTutorialHandler();
      localStorage.setItem(props.id, "completed");
    } else {
      if (!localStorage.getItem(props.id)) {
        localStorage.setItem(props.id, "in-progress");
      }
    }
  };

  return (
    <Link href={props.href}>
      <div
        className={`${classes.subsystemCard} ${getStatus(props.id)}`}
        onClick={clickHandler}
      >
        {status === "completed" && (
          <div className={`${classes.status} ${classes.completed}`}>
            <CheckCircleOutlineRoundedIcon style={{ fontSize: "14" }} />
            <span>Completed</span>
          </div>
        )}
        {status === "in-progress" && (
          <div className={`${classes.status} ${classes.inProgress}`}>
            <ScheduleRoundedIcon style={{ fontSize: "14" }} />
            <span>In Progress</span>
          </div>
        )}
        <div className={classes.imgWrapper}>
          <Image
            src={props.src}
            layout="fill"
            objectFit="cover"
            quality={100}
            alt={props.title}
          />
        </div>
        <div className={classes.mainContainer}>
          <h3>{props.title}</h3>
          <div className={classes.mainWrapper}>
            <p>{props.description}</p>
            {props.recommended && (
              <>
                <div className={classes.separator} />
                <div className={classes.recommended}>
                  <h4>Recommended</h4>
                  <ul>
                    {props.recommended.map((recom) => {
                      return (
                        <li
                          key={props.title + "-" + recom.title}
                          className={getStatus(recom.id)}
                        >
                          <Link href={recom.href}>{recom.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubsystemCard;
