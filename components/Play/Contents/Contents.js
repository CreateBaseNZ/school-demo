import { useState, createRef, memo, useEffect } from "react";
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
        "In this subsystem, the claw attachment is holding another gem! You will need to drop it into the collection bin by opening the claw when it moves into position. Be careful though, the bin won’t stay in the same place for long.",
    },
    {
      id: "sub1-page2",
      title: "Slide 2",
      type: "text",
      contents:
        'The arm will automatically move into the correct position above the bin, you only need to control the claw. By default, if you add a <span style="font-weight: 700;">Toggle Claw</span> block to the workspace and then click <span style="font-weight: 700; color: #18dbac;">Play</span>, the claw will open as soon as the code is run. This will cause it to drop the rubbish too early.',
    },
    {
      id: "sub1-page3",
      title: "Slide 3",
      type: "text",
      contents:
        'You will need to use a <span style="font-weight: 700;">Delay</span> block followed by a <span style="font-weight: 700;">Toggle Claw</span> block to make the claw open only once it is in the correct position. Using trial-and-error, you will need to find the correct time to wait.',
    },
    {
      id: "sub1-page4",
      title: "Slide 4",
      type: "text",
      contents:
        'When you have connected each of your blocks together in the correct order, press <span style="font-weight: 700; color: #9063f1;">Verify my code!</span> on the next slide to check your code answer. Note: If you want to run some code you are testing without having your answer checked, then use the <span style="font-weight: 700; color: #18dbac;">Play</span> button instead.',
    },
  ],
  [
    {
      id: "sub1-page1",
      title: "Slide 1",
      type: "text",
      contents:
        'In this subsystem, you will learn how to use the <span style="font-weight: 700;">Move Motor</span> code block to move the end of a robotic arm to specific x, y, z coordinates.',
    },
    {
      id: "sub1-page2",
      title: "Slide 2",
      type: "text",
      contents:
        "To complete the subsystem, you have to collect all of the floating gems by moving the gem collector through each of their locations.",
    },
    {
      id: "sub1-page3",
      title: "Slide 3",
      type: "text",
      contents:
        'Place your cursor over each gem to reveal the location of the centre of that gem. The first number is the x coordinate (distance along the <span style="font-weight: 700; color: red;">x-axis</span>), followed by the y coordinate (distance along the <span style="font-weight: 700; color: green;">y-axis</span>). The last number is the z coordinate (distance along the <span style="font-weight: 700; color: blue;">z-axis</span>).',
    },
    {
      id: "sub1-page4",
      title: "Slide 4",
      type: "text",
      contents:
        'You can program the robotic arm to move to a specific location by placing a <span style="font-weight: 700;">Move Motor</span> block into the workspace and entering the target coordinates.',
    },
    {
      id: "sub1-page5",
      title: "Slide 5",
      type: "text",
      contents:
        "To run your code, you will need to make sure that all of your blocks are connected together with a single path, including the start and end blocks. Connecting blocks together is as simple as dragging from the output handle of one block to the input handle of another.",
    },
    {
      id: "sub1-page6",
      title: "Slide 6",
      type: "text",
      contents:
        'Once all of your blocks in the workspace are connected via a single path, press the <span style="font-weight: 700; color: #18dbac;">Play</span> button to reset the simulation and run your code.',
    },
    {
      id: "sub1-page7",
      title: "Slide 7",
      type: "text",
      contents:
        'To make the end of the robotic arm travel to multiple locations, you will need to place a sequence of <span style="font-weight: 700;">Move Motor</span> blocks into the workspace and connect them together in your desired order.',
    },
    {
      id: "sub1-page8",
      title: "Slide 8",
      type: "text",
      contents:
        'Once you have connected each of your blocks in the correct order (don’t forget to connect to the start and end blocks), hit <span style="font-weight: 700; color: #9063f1;">Verify my code!</span> on the next slide to check your code answer.',
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
        "Place your cursor over each rubbish bag or bin to reveal the location of the centre of that object. The first number is the x coordinate, followed by the y coordinate. The last number is the z coordinate.",
    },
    {
      id: "sub1-page3",
      title: "Slide 3",
      type: "text",
      contents:
        'When using the <span style="font-weight: 700;">Move Motor</span> block, the coordinates that you enter will be the location of the centre of the claw attachment when the block has finished running.',
    },
    {
      id: "sub1-page4",
      title: "Slide 4",
      type: "text",
      contents:
        'Trying to move the arm straight between the items of rubbish and the bin may result in the arm crashing into objects that you don’t intend to hit. You will need to split each motion into multiple movements (by using multiple <span style="font-weight: 700;">Move Motor</span> blocks).',
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
        'When you have connected each of your blocks together in the correct order, press <span style="font-weight: 700; color: #9063f1;">Verify my code!</span> on the next slide to check your final answer. ',
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
  const slideChangeHandler = () => {
    const el = document.querySelector("." + classes.activeSlide);
    if (el) {
      if (el.scrollHeight > el.clientHeight) {
        console.log("is overflowing");
      } else {
        console.log("not overflowing");
      }
    }
  };

  return (
    <div className={classes.contentsWrapper}>
      <div
        className={classes.swiperPrev}
        style={{ visibility: props.isVerifying ? "hidden" : "visible" }}
      >
        <KeyboardArrowLeftIcon style={{ fontSize: 48, padding: 0 }} />
      </div>
      <Swiper
        {...swiperOptions}
        className={classes.swiperContainer}
        onSlideChange={slideChangeHandler}
        slideActiveClass={classes.activeSlide}
      >
        {DUMMY_DATA[props.subsystemIndex].map((slide) => {
          return (
            <SwiperSlide
              key={slide.id}
              className={classes.swiperSlide}
              dangerouslySetInnerHTML={{ __html: slide.contents }}
            ></SwiperSlide>
          );
        })}
        <SwiperSlide
          id="last-slide"
          className={`${classes.swiperSlide} ${
            props.isVerifying && classes.verifying
          }`}
        ></SwiperSlide>
        <div
          className={classes.pagination}
          style={{ visibility: props.isVerifying ? "hidden" : "visible" }}
        ></div>
      </Swiper>
      <div
        className={classes.swiperNext}
        style={{ visibility: props.isVerifying ? "hidden" : "visible" }}
      >
        <KeyboardArrowRightIcon style={{ fontSize: 48 }} />
      </div>
    </div>
  );
};

export default memo(Contents);
