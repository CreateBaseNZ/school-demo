import cookie from "cookie";
import axios from "axios";
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const createSession = () => {
  return new Promise(async (resolve, reject) => {
    // Create the object
    let object = { site: "alpha", deployment: process.env.NODE_ENV,
      date: { created: req.body.date } };
    // Create the session
    let data;
    try {
      data = (await axios.post("https://createbase.co.nz/alpha/user-session/create", { object }))["data"];
    } catch (error) {
      data = { status: "error", content: error };
    }
    // Failed and error handler
    switch (data.status) {
      case "failed": return reject(data);
      case "error": return reject(data);
      default: break;
    }
    // Success handler
    return resolve(data.content);
  });
};

export default async (req, res) => {
  if (req.method.toLowerCase() === "post") {
    // Fetch the session id
    let cookies = JSON.parse(req.cookies.cookies);
    if (!cookies || typeof(cookies) !== "object") cookies = new Object();
    if (!cookies._id) {
      // Create the session
      try {
        cookies = await createSession();
      } catch (data) {
        return res.send(data);
      }
    }
    // Declare the variables
    const session = { _id: cookies._id };
    const object = req.body;
    // Send the request to add the behaviour
    let data;
    try {
      data = (await axios.post("https://createbase.co.nz/alpha/behaviour/add", { session, object }))["data"];
    } catch (error) {
      data = { status: "error", content: error };
    }
    // Failed and error handler
    switch (data.status) {
      case "failed": return res.send(data);
      case "error": return res.send(data);
      default: break;
    }
    // Set Cookies
    // Object.assign(cookies, data.content);
    res.setHeader("Set-Cookie", cookie.serialize("cookies", JSON.stringify(cookies),
      { httpOnly: true, sameSite: "strict", path: "/" }));
    // Success handler
    return res.send({ status: "succeeded", content: "A behaviour has been added." });
  }
};
