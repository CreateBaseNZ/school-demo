import { Fragment as div } from "react";
import Image from "next/image";

import classes from "./HeaderButtons.module.scss";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import SettingsIcon from "@material-ui/icons/Settings";
import MarkunreadMailboxOutlinedIcon from "@material-ui/icons/MarkunreadMailboxOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";

const HeaderButtons = () => {
  return (
    <div className={classes.container}>
      <button>
        <FullscreenIcon style={{ fontSize: 22 }} />
      </button>
      <button>
        <SettingsIcon fontSize="small" />
      </button>
      <button>
        <MarkunreadMailboxOutlinedIcon style={{ fontSize: 18 }} />
      </button>
      <button>
        <HelpOutlineOutlinedIcon fontSize="small" />
      </button>
      <a target="_blank" href="https://createbase.co.nz/">
        <Image
          src="/header-logo.png"
          width="138"
          height="25"
          alt="CreateBase"
        />
      </a>
    </div>
  );
};

export default HeaderButtons;
