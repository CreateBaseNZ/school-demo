import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";

import classes from "./Feedback.module.scss";

const Finished = (props) => {
  return (
    <div className={classes.finishedWrapper} style={props.style}>
      <p>
        <span>Thank you</span> for providing your feedback. We want to build
        something that everyone will love, which is why your input is essential.
      </p>
      <p>
        If you know a person or a school that would be interested in getting
        involved with what we are doing, please tell them to send us a message
        through any of our social media channels or email us at
        <a href="mailto:admin@createbase.com">admin@createbase.co.nz</a>.
        Additionally, we would really appreciate you sharing a link to this
        website with at least one person you know. Every extra piece of feedback
        really helps.
      </p>
      <p>
        This demo marks the first step of many. To keep up with our journey,
        make sure that you follow us on our social media. Feel free to return to
        this website at a later date to check out the new updates that we will
        be releasing.
      </p>
      <p>Let's dream, learn, apply and create together.</p>
      <p>
        <span>💜 Team CreateBase</span>
      </p>
      <div className={classes.buttonContainer}>
        <Link href="/">
          <button>
            <HomeIcon /> Home
          </button>
        </Link>
        <a href="https://createbase.co.nz/" target="_blank">
          <LanguageIcon />
          Visit Us
        </a>
        <div className={classes.boxes}>
          <Image
            src="/boxes.png"
            alt="Crates"
            layout="responsive"
            width={769}
            height={604}
            objectPosition="bottom right"
          />
        </div>
      </div>
    </div>
  );
};

export default Finished;
