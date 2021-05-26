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
        "Once you have connected each of your blocks in the correct order (don’t forget to connect to the start and end blocks), hit Verify My Code on the next slide to check your code answer. Note: If you want to run some code you are testing without having your answer checked, then use the Play button instead.",
    },
  ],

  [
    {
      id: "sub1-page1",
      title: "Slide 1",
      type: "text",
      contents:
        "In this subsystem, the claw attachment is holding another gem! You will need to drop it into the collection bin by opening the claw when it moves into position. Be careful though, the bin won’t stay in the same place for long.",
    },
    {
      id: "sub1-page2",
      title: "Slide 2",
      type: "text",
      contents:
        "The arm will automatically move into the correct position above the bin, you only need to control the claw. By default, if you add an open claw block to the workspace and then click run, the claw will open as soon as the code is run. This will cause it to drop the rubbish too early.",
    },
    {
      id: "sub1-page3",
      title: "Slide 3",
      type: "text",
      contents:
        "You will need to use a Delay block followed by a <span style={{fontWeight: 700, fontSize: 12}}>Toggle Claw</span> block to make the claw open only once it is in the correct position. Using trial-and-error, you will need to find the correct time to wait.",
    },
    {
      id: "sub1-page4",
      title: "Slide 4",
      type: "text",
      contents:
        "When you have connected each of your blocks together in the correct order, hit Verify My Code on the next slide to check your code answer. Note: If you want to run some code you are testing without having your answer checked, then use the Play button instead.",
    },
  ],

  [
    {
      id: "sub1-page1",
      title: "Slide 1",
      type: "text",
      contents:
        "In this subsystem, the aim is to grab a rubbish bag with the claw, pick it up, carry it to the rubbish bin, and then drop it inside. This process will be repeated for each item of rubbish. You will need to use the functions that you have learnt in the first two subsystems to accomplish this task.",
    },
    {
      id: "sub1-page2",
      title: "Slide 2",
      type: "text",
      contents:
        "Place your cursor over each rubbish bag or bin to reveal the location of the centre of that object. The first number is the x coordinate (distance along the x-axis), followed by the y coordinate (distance along the y-axis). The last number is the z coordinate (height above the ground).",
    },
    {
      id: "sub1-page3",
      title: "Slide 3",
      type: "text",
      contents:
        "When you use the Move Motor block, the coordinates that you enter will be where the centre of the claw attachment will end up once the block has finished running.",
    },
    {
      id: "sub1-page4",
      title: "Slide 4",
      type: "text",
      contents:
        "Trying to move the arm straight between the items of rubbish and the bin may result in the arm crashing into objects that you don’t intend to hit. You will need to split each motion into multiple movements (by using multiple Move Motor blocks).",
    },
    {
      id: "sub1-page5",
      title: "Slide 5",
      type: "text",
      contents:
        "Make sure when you approach a piece of rubbish that the claw is already open. You may also have the most success positioning the arm so that it approaches the rubbish bags either from directly above or directly in front.",
    },
    {
      id: "sub1-page6",
      title: "Slide 6",
      type: "text",
      contents:
        "When you have connected each of your blocks together in the correct order, hit Verify My Code on the next slide to check your final answer. ",
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
