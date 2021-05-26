import { memo } from "react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import classes from "./Contents.module.scss";

SwiperCore.use([Pagination, Navigation]);

const DUMMY_DATA = [
  [
    {
      id: "sub1-page1",
      title: "Slide 1",
      type: "text",
      contents:
        "In this subsystem, you have to collect the gems floating around by moving the robotic arm end effector to the gem’s location. The gems locations are displayed above each gem.",
    },
    {
      id: "sub1-page2",
      title: "Slide 2",
      type: "text",
      contents:
        "The location of each gem is written in a cartesian coordinate. This means the first number is the x coordinate of the gem, followed by the y coordinate. The last number is the z coordinate.",
    },
    {
      id: "sub1-page3",
      title: "Slide 3",
      type: "text",
      contents:
        "Have the movement consecutively to move from one location to the next.",
    },
  ],
  [
    {
      id: "sub1-page1",
      title: "Slide 1",
      type: "text",
      contents:
        "In this subsystem, you have to catch an object in midair. By default, the claw will close as soon as the code is run. You will need to determine the timing for when you should order the claw to close.",
    },
    {
      id: "sub1-page2",
      title: "Slide 2",
      type: "text",
      contents:
        "Use the delay block to delay when the robotic arm closes. Using trial-and-error, you will need to find the correct time to wait before trying to close the claw so that it catches the object.",
    },
  ],
  [
    {
      id: "sub1-page1",
      title: "Slide 1",
      type: "text",
      contents:
        "Within this subsystem, the aim is to collect the trash from the ground, carry it, move it to the rubbish bin, and drop the rubbish into the bin. You will have to combine the first two subsystems to do this part.",
    },
    {
      id: "sub1-page2",
      title: "Slide 2",
      type: "text",
      contents:
        "Make sure when you approach a piece of rubbish that the claw is already open. The location of each rubbish and the bin can be found by hovering your cursor above each.",
    },
  ],
];

const renderBullet = (index, className) => {
  return `<span class="${className}"></span>`;
};

const swiperOptions = {
  observer: true,
  observeParents: true,
  navigation: {
    nextEl: `.${classes.swiperNext}`,
    prevEl: `.${classes.swiperPrev}`,
    disabledClass: classes.swiperDisabled,
  },
  pagination: {
    type: "bullets",
    el: `.${classes.pagination}`,
    bulletClass: classes.bullet,
    bulletActiveClass: classes.bulletActive,
    renderBullet: renderBullet,
    clickable: true,
  },
};

const Contents = (props) => {
  return (
    <Swiper {...swiperOptions} className={classes.swiperContainer}>
      <div className={classes.swiperPrev}>
        <KeyboardArrowLeftIcon style={{ fontSize: 48, padding: 0 }} />
      </div>
      <div className={classes.swiperNext}>
        <KeyboardArrowRightIcon style={{ fontSize: 48 }} />
      </div>
      {DUMMY_DATA[props.subsystemIndex].map((slide) => (
        <SwiperSlide key={slide.id} className={classes.swiperSlide}>
          {slide.contents}
        </SwiperSlide>
      ))}
      <div className={classes.pagination}></div>
    </Swiper>
  );
};

export default memo(Contents);
