import SwiperCore, { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import classes from "./Contents.module.scss";

SwiperCore.use([Pagination, Navigation]);

const renderBullet = (index, className) => {
  return `<span class="${className}"></span>`;
};

console.log(classes.bullet);

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
    <div className={`${props.className} ${classes.contents}`}>
      <Swiper {...swiperOptions} className={classes.swiperContainer}>
        <div className={classes.swiperPrev}>
          <KeyboardArrowLeftIcon style={{ fontSize: 48, padding: 0 }} />
        </div>
        <div className={classes.swiperNext}>
          <KeyboardArrowRightIcon style={{ fontSize: 48 }} />
        </div>
        <SwiperSlide className={classes.swiperSlide}>Slide 1</SwiperSlide>
        <SwiperSlide className={classes.swiperSlide}>Slide 2</SwiperSlide>
        <SwiperSlide className={classes.swiperSlide}>Slide 3</SwiperSlide>
        <SwiperSlide className={classes.swiperSlide}>Slide 4</SwiperSlide>
        <div className={classes.pagination}></div>
      </Swiper>
    </div>
  );
};

export default Contents;
