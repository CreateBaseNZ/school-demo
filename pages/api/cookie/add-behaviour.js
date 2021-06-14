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

export default async (req, res) => {
  if (req.method == "POST") {
    // Declare variables
    let data;
    // Retreive data
    if (!req.cookies.data) {
      data = createBase(req);
    } else if (req.cookies.data) {
      data = JSON.parse(req.cookies.data);
    }
    // Add behaviour
    if (req.body.behaviour) {
      data = addBehaviour(data, req.body.behaviour);
    } else {
      return res.send({ status: "failed", content: "No behaviour was sent." });
    }
    // Set cookie header
    /*res.setHeader(
      "Set-Cookie",
      cookie.serialize("data", JSON.stringify(data), {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      })
    );*/
    // Update backend cookie
    let resData;
    try {
      resData = (
        await axios.post("https://createbase.co.nz/alpha/cookie-save", data)
      )["data"];
    } catch (error) {
      resData = { status: "error", content: error };
    }
    // Handler
    switch (resData.status) {
      case "failed":
        return res.status(200).json(resData);
      case "error":
        return res.status(200).json(resData);
      default:
        return res
          .status(200)
          .json({ status: "succeeded", content: "Behaviour has been added." });
    }
  }
};
