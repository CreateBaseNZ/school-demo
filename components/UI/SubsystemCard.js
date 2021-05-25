import Image from "next/image";
import Link from "next/link";

import classes from "./SubsystemCard.module.scss";

const SubsystemCard = (props) => {
  return (
    <Link href={props.href}>
      <div className={classes.subsystemCard}>
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
                        <li key={props.title + "-" + recom.title}>
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
