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
    let cookies = JSON.parse(req.cookies.cookies);
    if (!cookies || typeof(cookies) !== "object") cookies = new Object();
    if (!cookies._id) {
      // Create the session
      try {
        cookies._id = await createSession();
      } catch (data) {
        return res.send(data);
      }
    }
    // Process new settings
    let settings = req.body.settings;
    let object = new Object();
    let save = false;
    if (settings) {
      if (!cookies.settings) {
        save = true;
      } else {
        for (const property in settings) {
          if (settings[property] !== cookies.settings[property]) {
            object[property] = settings[property];
            save = true;
          }
        }
      }
    }
    if (!save) return res.send({ status: "failed", content: "There no new settings to store" });
    // Save the new settings
    const session = { _id: cookies._id };
    let data;
    try {
      data = (await axios.post("https://createbase.co.nz/alpha/user-session/update-saves", { session, object }))["data"];
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
    Object.assign(cookies.settings, data.content);
    res.setHeader("Set-Cookie", cookie.serialize("cookies", JSON.stringify(cookies),
      { httpOnly: true, sameSite: "strict", path: "/" }));
    // Success handler
    return res.send({ status: "succeeded", content: "Settings have been saved successfully." });
  }
}