import { memo } from "react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";

import classes from "./Contents.module.scss";

SwiperCore.use([Pagination, Navigation]);

const DUMMY_DATA = [
  [
    {
      id: "sub1-page1",
      title: "Slide 1",
      type: "text",
      contents:
        "To complete the subsystem, you have to collect all of the floating gems by moving the collector at the robotic arm’s end through each of their locations.",
    },
    {
      id: "sub1-page2",
      title: "Slide 2",
      type: "text",
      contents:
        "Place your cursor over each gem to reveal the location of the centre of that gem. The first number is the x coordinate (distance along the x-axis), followed by the y coordinate (distance along the y-axis). The last number is the z coordinate (height above the ground).",
    },
    {
      id: "sub1-page3",
      title: "Slide 3",
      type: "text",
      contents:
        "You can program the robotic arm to move to a specific location by placing a Move Motor block and entering the desired coordinates. To run your code, you will need to connect it to the start and end blocks, then press run. Connecting blocks together is as simple as dragging from the output handle of one block to the input handle of another.",
    },
    {
      id: "sub1-page4",
      title: "Slide 4",
      type: "text",
      contents:
        "To make the end of the robotic arm travel to multiple locations, you will need to place a sequence of Move Motor blocks into the workspace and connect them together in your desired order.",
    },
    {
      id: "sub1-page5",
      title: "Slide 5",
      type: "text",
      contents:
        "Once you have connected each of your blocks in the correct order (don’t forget to connect to the start and end blocks), hit verify to check your code answer.",
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
      <SwiperSlide className={classes.swiperSlide}>
        When you have connected each of your blocks together in the correct
        order, go to the next slide and hit verify to check your code answer!
      </SwiperSlide>
      <SwiperSlide className={`${classes.swiperSlide} ${classes.checkSlide}`}>
        <button>
          <SlowMotionVideoIcon fontSize="large" />
          Verify your code!
        </button>
      </SwiperSlide>
      <div className={classes.pagination}></div>
    </Swiper>
  );
};

export default memo(Contents);
