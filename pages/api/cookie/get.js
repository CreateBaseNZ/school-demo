import cookie from "cookie";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
if (process.env.NODE_ENV !== "production") require("dotenv").config();

export default (req, res) => {
  // Initialise and declare variables
  let id = uuidv4();
  let type = process.env.NODE_ENV;
  let behaviours = [];
  let data = new Object();
  // Preset cookie values
  if (!req.cookies.data) {
    data.id = id;
    data.type = type;
    data.behaviours = behaviours;
    // Set Cookies
    res.setHeader("Set-Cookie", cookie.serialize("data", JSON.stringify(data),
    { httpOnly: true, sameSite: "strict", path: "/", }));
    // Save Cookies
    axios.post("https://createbase.co.nz/alpha/cookie-save", data)
      .then((response) => { const data = response.data;
        if (data.status === "error" || data.status === "failed") console.log(data);
        return; }).catch((error) => console.log({ status: "error", content: error }));
  } else if (req.cookies.data) {
    data = JSON.parse(req.cookies.data);
  }
  res.status(200).json({ status: "succeeded", content: data });
};
