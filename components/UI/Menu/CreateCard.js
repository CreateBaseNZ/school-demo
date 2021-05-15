import Link from "next/link";
import Image from "next/image";
import classes from "./ContentWrapper.module.scss";

const DUMMY_DATA = [
  {
    title: "Subsystem A",
    href: "/",
    src: "/subsystem.jpg",
    description:
      "In the metaphysics of identity, the ship of Theseus is a thought experiment that raises the question of whether an object that has had all of its components replaced remains fundamentally the same object. The concept is one of the oldest in Western philosophy, having been discussed by the likes of Heraclitus and Plato by c. 500–400 BC.",
    recommended: [
      {
        title: "Subsystem A",
        href: "/",
      },
      {
        title: "Subsystem B",
        href: "/",
      },
    ],
  },
  {
    title: "Subsystem B",
    href: "/",
    src: "/subsystem.jpg",
    description:
      "In the metaphysics of identity, the ship of Theseus is a thought experiment that raises the question of whether an object that has had all of its components replaced remains fundamentally the same object. The concept is one of the oldest in Western philosophy, having been discussed by the likes of Heraclitus and Plato by c. 500–400 BC.",
    recommended: [
      {
        title: "Subsystem A",
        href: "/",
      },
      {
        title: "Subsystem B",
        href: "/",
      },
    ],
  },
];

const CreateCard = () => {
  return (
    <div className={classes.createWrapper}>
      {DUMMY_DATA.map((subsystem) => {
        return (
          <Link href={subsystem.href}>
            <div
              className={classes.subsystemCard}
              key={subsystem.title}
              href={subsystem.href}
            >
              <div className={classes.imgWrapper}>
                <Image
                  src={subsystem.src}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  alt={subsystem.title}
                />
              </div>
              <div className={classes.mainContainer}>
                <h3>{subsystem.title}</h3>
                <div className={classes.mainWrapper}>
                  <p>{subsystem.description}</p>
                  <div className={classes.separator} />
                  <div className={classes.recommended}>
                    <h4>Recommended</h4>
                    <ul>
                      {subsystem.recommended.map((recom) => {
                        return (
                          <li>
                            <Link href={recom.href}>{recom.title}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CreateCard;
