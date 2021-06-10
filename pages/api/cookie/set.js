import cookie from "cookie";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const createBase = (req) => {
  // Declare variables
  const id = uuidv4();
  const type = process.env.NODE_ENV;
  const date = req.body.date;
  return new Object({ id, type, date });
};

const addBehaviour = (data, behaviour) => {
  // Declare variables
  let behaviours;
  // Assign values
  if (data.behaviours) {
    behaviours = data.behaviours;
  } else {
    behaviours = [];
  }
  // Add behaviour
  behaviours.push(behaviour);
  // Update data
  data.behaviours = behaviours;
  // Success handler
  return data;
};

export default (req, res) => {
  if (req.method == "POST") {
    // Initialise and declare variables
    let data;
    // Preset cookie values
    if (!req.cookies.data) {
      data = createBase(req);
    } else if (req.cookies.data) {
      data = JSON.parse(req.cookies.data);
    }
    if (req.body.behaviours) {
      if (Array.isArray(req.body.behaviours)) {
        if (req.body.behaviours.length) {
          data.behaviours = data.behaviours.concat(req.body.behaviours);
        }
      } else if (typeof req.body.behaviours === "object") {
        data.behaviours.push(req.body.behaviours);
      }
    }
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("data", JSON.stringify(data), {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      })
    );
    // Save to backend
    axios
      .post("https://createbase.co.nz/alpha/cookie-save", data)
      .then((response) => {
        const data = response.data;
        if (data.status === "error" || data.status === "failed")
          console.log(data);
        return;
      })
      .catch((error) => console.log({ status: "error", content: error }));
    // Success handler
    res.status(200).json({ status: "succeeded", content: "Cookie Set" });
  }
};
