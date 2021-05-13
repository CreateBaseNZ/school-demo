import SwiperCore, { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import classes from "./Contents.module.scss";

SwiperCore.use([Pagination, Navigation]);

const DUMMY_SLIDES = [
  {
    id: 1234,
    title: "Slide 1",
    type: "text",
    contents:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ex nunc, elementum ac felis et, rhoncus vestibulum sapien. Quisque erat mi, lobortis tincidunt semper vel, scelerisque non sapien. Mauris eget dignissim elit. Proin sed convallis mauris, ut porttitor metus. Maecenas convallis eleifend orci non ornare.",
  },
  {
    id: 1235,
    title: "Slide 2",
    type: "text",
    contents:
      "Vivamus sagittis diam quis tristique rutrum. Proin at magna risus. Vestibulum eu gravida massa. In viverra libero nec massa bibendum, ultricies faucibus dui consectetur. Curabitur luctus sem lorem, pulvinar facilisis neque faucibus et. Proin accumsan nulla tristique orci suscipit luctus. Phasellus ac elit ut arcu pellentesque pulvinar. Duis dapibus laoreet orci a vestibulum.",
  },
  {
    id: 1236,
    title: "Slide 3",
    type: "text",
    contents:
      "Mauris faucibus, odio vitae tincidunt euismod, odio lorem vehicula neque, in volutpat eros nisi sit amet tortor. Vivamus in ultricies metus. Donec cursus molestie tortor. Donec interdum dui at urna feugiat, et hendrerit magna semper. Ut libero nulla, tempor quis bibendum vitae, feugiat et augue.",
  },
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
      {DUMMY_SLIDES.map((slide) => (
        <SwiperSlide key={slide.id} className={classes.swiperSlide}>
          {slide.contents}
        </SwiperSlide>
      ))}
      <div className={classes.pagination}></div>
    </Swiper>
  );
};

export default Contents;
