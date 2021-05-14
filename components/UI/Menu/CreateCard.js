import Image from "next/image";
import classes from "./ContentWrapper.module.scss";

const DUMMY_DATA = [
  {
    title: "Subsystem A",
    src: "/subsystem.jpg",
  },
  {
    title: "Subsystem B",
    src: "/subsystem.jpg",
  },
];

const CreateCard = () => {
  return (
    <div className={classes.createWrapper}>
      {DUMMY_DATA.map((subsystem) => {
        return (
          <div className={classes.subsystemCard} key={subsystem.title}>
            <Image
              src={subsystem.src}
              layout="fill"
              objectFit="cover"
              quality={100}
              alt={subsystem.title}
            />
            <div>Hello</div>
          </div>
        );
      })}
    </div>
  );
};

export default CreateCard;
