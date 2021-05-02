import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import classes from "./Contents.module.scss";

SwiperCore.use([Pagination]);

const Contents = (props) => {
  return (
    <div className={`${props.className} ${classes.contents}`}>
      <Swiper pagination={true}>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Contents;
