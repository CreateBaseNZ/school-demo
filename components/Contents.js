import SwiperCore, { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import classes from "./Contents.module.scss";

SwiperCore.use([Pagination, Navigation]);

const swiperOptions = {
  observer: true,
  observeParents: true,
  navigation: {
    nextEl: ".swiper-next-button",
    prevEl: ".swiper-prev-button",
    disabledClass: classes.swiperDisabled,
  },
  pagination: {
    clickable: true,
  },
};

const Contents = (props) => {
  return (
    <div className={`${props.className} ${classes.contents}`}>
      <Swiper {...swiperOptions} className={classes.swiperContainer}>
        <div className={`swiper-prev-button ${classes.swiperPrev}`}>
          <KeyboardArrowLeftIcon style={{ fontSize: 48, padding: 0 }} />
        </div>
        <div className={`swiper-next-button ${classes.swiperNext}`}>
          <KeyboardArrowRightIcon style={{ fontSize: 48 }} />
        </div>
        <SwiperSlide className={classes.swiperSlide}>Slide 1</SwiperSlide>
        <SwiperSlide className={classes.swiperSlide}>Slide 2</SwiperSlide>
        <SwiperSlide className={classes.swiperSlide}>Slide 3</SwiperSlide>
        <SwiperSlide className={classes.swiperSlide}>Slide 4</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Contents;
