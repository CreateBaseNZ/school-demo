import { useState, createRef, memo, useEffect, useCallback } from "react";
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
      id: "sub1-page0",
      title: "Slide 0",
      type: "text",
      contents:
        'In this subsystem, you will learn how to use the <span style="font-weight: 700;">Gravity Switch</span> code block to control the gravity wand attachment for the H.E.R.&#216; robotic arm. 🤖',
    },
    {
      id: "sub1-page1",
      title: "Slide 1",
      type: "text",
      contents:
        "You can see in the simulation on the right that the gravity wand is activated and is holding a valuable gem! 💎 To complete this subsystem, you will need to safely drop the gem into the collection bin by deactivating the gravity wand when it moves into position. Be careful though, the bin won’t stay in the same place for long! 🙀",
    },
    {
      id: "sub1-page2",
      title: "Slide 2",
      type: "text",
      contents:
        'The arm will automatically move into the correct position above the bin at the start of each simulation. You need to deactivate the gravity wand by dragging a <span style="font-weight: 700;">Gravity Switch</span> block into the workspace and selecting the correct option. ☑',
    },
    {
      id: "sub1-page3",
      title: "Slide 3",
      type: "text",
      contents:
        'To run your code, you will need to make sure that all of your blocks are connected together with a single track, including the <span style="font-weight: 700; color: #18dbac;">start</span> and <span style="font-weight: 700; color: #fa6f6f;">end</span> blocks. Connecting blocks together is as simple as dragging from the output handle (filled in dot) of one block to the input handle (hollow dot) of another.   ◼ ➡ ◻',
    },
    {
      id: "sub1-page4",
      title: "Slide 4",
      type: "text",
      contents:
        "If a block is connected with multiple tracks, you may get unexpected behaviour when you run your code. To delete a track, select it by clicking on the arrow head and then press the backspace key on your keyboard. 🔙",
    },
    {
      id: "sub1-page5",
      title: "Slide 5",
      type: "text",
      contents:
        'If you want to test some code without having your answer checked, then press the <span style="font-weight: 700; color: #18dbac;">Play</span> button in the bottom right corner of your screen to upload your current code to H.E.R.&#216;.',
    },
    {
      id: "sub1-page6",
      title: "Slide 6",
      type: "text",
      contents:
        'When you have connected each of your blocks together and think that you have a correct solution, then press <span style="font-weight: 700; color: #9063f1;">Verify my code!</span> on the next slide to check your code answer. If successful, this will complete the task! 🚀',
    },
  ],

  [
    {
      id: "sub1-page1",
      title: "Slide 1",
      type: "text",
      contents:
        'In this subsystem, you will learn how to use the <span style="font-weight: 700;">Move Arm</span> code block to move the end of the H.E.R.&#216; robotic arm to specific x, y, z coordinates.',
    },
    {
      id: "sub1-page2",
      title: "Slide 2",
      type: "text",
      contents:
        "To complete this subsystem, you will need to collect the floating gem by touching it with the gravity wand. 🧙‍♂️",
    },
    {
      id: "sub1-page3",
      title: "Slide 3",
      type: "text",
      contents:
        'Place your cursor over each gem to reveal the location of the centre of that gem. The first number is the x coordinate (distance along the <span style="font-weight: 700; color: #ff2f00;">x-axis</span>), followed by the y coordinate (distance along the <span style="font-weight: 700; color: #00dc00;">y-axis</span>). The last number is the z coordinate (distance along the <span style="font-weight: 700; color: #007eff;">z-axis</span>).',
    },
    {
      id: "sub1-page4",
      title: "Slide 4",
      type: "text",
      contents:
        'For reference, the base of the robotic arm is at the coordinates (0, 0, 0). When the camera is rotated so that the arm is facing the right: <span style="font-weight: 700; color: #ff2f00;">positive x</span> is right and <span style="font-weight: 700; color: #ff2f00;">negative x</span> is left, <span style="font-weight: 700; color: #00dc00;">positive y</span> is up and <span style="font-weight: 700; color: #00dc00;">negative y</span> is down, <span style="font-weight: 700; color: #007eff;">positive z</span> is into the screen, <span style="font-weight: 700; color: #007eff;">negative z</span> is out of the screen.',
    },
    {
      id: "sub1-page5",
      title: "Slide 5",
      type: "text",
      contents:
        "For example, lets imagine an item at the coordinates (-1, 2, 3). Using the same camera orientation in the previous slide, that object is 1 metre to the left, 2 metres up and 3 metres into the screen compared to the base of the arm at (0,0,0)",
    },
    {
      id: "sub1-page6",
      title: "Slide 6",
      type: "text",
      contents:
        'You can program the robotic arm to move to a specific location by dragging a <span style="font-weight: 700;">Move Arm</span> 🦾 block into the workspace and entering the target coordinates.',
    },
    {
      id: "sub1-page7",
      title: "Slide 7",
      type: "text",
      contents:
        'When using the <span style="font-weight: 700;">Move Arm</span> block, the coordinates that you enter will be the location of the centre of the gravity wand when the arm has finished moving. 🏃‍♂️',
    },
    {
      id: "sub1-page8",
      title: "Slide 8",
      type: "text",
      contents:
        'Once all of your blocks in the workspace are connected via a single track (don’t forget to connect to the <span style="font-weight: 700; color: #18dbac;">start</span> and <span style="font-weight: 700; color: #fa6f6f;">end</span> blocks), press the <span style="font-weight: 700; color: #18dbac;">Play</span> button to reset the simulation and test your current code. 🧪',
    },
    {
      id: "sub1-page9",
      title: "Slide 9",
      type: "text",
      contents:
        'When you think that you have the correct code, press the <span style="font-weight: 700; color: #9063f1;">Verify my code!</span> button on the next slide to confirm your answer and complete the task! 🎓',
    },
  ],

  [
    {
      id: "sub1-page0",
      title: "Slide 0",
      type: "text",
      contents:
        "In this final system, you will need to use a combination of the blocks that you learnt in the first two subsystems to figure out a solution to our original problem! 🧰👩‍🔧",
    },
    {
      id: "sub1-page1",
      title: "Slide 1",
      type: "text",
      contents:
        "The aim is to pick up a rubbish bag with the gravity wand, carry it to the rubbish bin, and then drop it inside. You will need to repeat this process for each item of rubbish until they have all been collected. 🚮",
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
        'To make the end of the robotic arm travel to multiple locations, you will need to place a sequence of <span style="font-weight: 700;">Move Arm</span> blocks into the workspace and connect them together in your desired order. 🦾➡🦾➡🦾',
    },
    {
      id: "sub1-page4",
      title: "Slide 4",
      type: "text",
      contents:
        'Trying to move the arm directly between the items of rubbish and the bin may result in the arm crashing into objects that you don’t intend to hit! 💥 You will need to split each motion into multiple movements (by using multiple <span style="font-weight: 700;">Move Arm</span> blocks).',
    },
    {
      id: "sub1-page5",
      title: "Slide 5",
      type: "text",
      contents:
        "For example, you may have to lift each rubbish bag vertically ⬆ before moving it to the rubbish bin ➡🗑 to make sure that you do not hit the side of the bin.",
    },
    {
      id: "sub1-page6",
      title: "Slide 6",
      type: "text",
      contents:
        'To keep it simple, try writing code to deposit a single rubbish bag into the bin, then use the <span style="font-weight: 700; color: #18dbac;">Play</span> button to test your code. If successful, keep adding more blocks until you can deposit every bag in one run. 🧱👷‍♀️',
    },
    {
      id: "sub1-page7",
      title: "Slide 7",
      type: "text",
      contents:
        'When you think that you can deposit every bag in one run, press <span style="font-weight: 700; color: #9063f1;">Verify my code!</span> on the next slide to check if your final solution solves our problem! 👩‍🎓🙌👨‍🎓',
    },
  ],

  [
    {
      id: "sb-page1",
      title: "Slide 1",
      type: "text",
      contents: "This is a sandbox",
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
  const [swiper, setSwiper] = useState({});
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkOverflow = useCallback(() => {
    const el = document.querySelectorAll(".swiper-slide")[swiper.realIndex + 1];
    if (el) {
      if (el.scrollHeight > el.clientHeight) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    }
  }, [swiper]);

  useEffect(() => {
    checkOverflow();
  }, [props.height]);

  const slideChangeHandler = () => {
    checkOverflow();
  };

  return (
    <div
      className={`${classes.contentsWrapper} ${
        props.isVerifying && classes.verifying
      }`}
    >
      <div
        className={classes.swiperPrev}
        style={{ visibility: props.isVerifying ? "hidden" : "visible" }}
      >
        <KeyboardArrowLeftIcon style={{ fontSize: 48, padding: 0 }} />
      </div>
      <Swiper
        {...swiperOptions}
        className={`${classes.swiperContainer} swiper-slide`}
        onSwiper={(swiper) => setSwiper(swiper)}
        onTransitionEnd={slideChangeHandler}
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
          className={classes.swiperSlide}
          style={{
            padding: 0,
            overflow: "visible",
            display: props.subsystemIndex === 3 && "none",
          }}
        ></SwiperSlide>
        <div
          className={classes.pagination}
          style={{ visibility: props.isVerifying ? "hidden" : "visible" }}
        ></div>
        {isOverflowing && (
          <>
            <div
              className={`${classes.overflowArrow} ${classes.overflowArrowOne}`}
            ></div>
            <div
              className={`${classes.overflowArrow} ${classes.overflowArrowTwo}`}
            ></div>
          </>
        )}
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
