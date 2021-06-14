import cookie from "cookie";
import axios from "axios";
if (process.env.NODE_ENV !== "production") require("dotenv").config();

export default async (req, res) => {
  let cookies = new Object();
  if (req.cookies.cookies) cookies = JSON.parse(req.cookies.cookies);
  if (req.method.toLowerCase() === "post" && !cookies._id) {
    // Create the object
    let object = { site: "alpha", deployment: process.env.NODE_ENV,
      date: { created: req.body.date } };
    // Create the session
    let data;
    try {
      data = (await axios.post("http://localhost/alpha/user-session/create", { object }))["data"];
    } catch (error) {
      data = { status: "error", content: error };
    }
    // Failed and error handler
    switch (data.status) {
      case "failed": return res.send(data);
      case "error": return res.send(data);
      default: break;
    }
    // Set the cookie
    cookies = data.content;
    res.setHeader("Set-Cookie", cookie.serialize("cookies", JSON.stringify(cookies),
      { httpOnly: true, sameSite: "strict", path: "/" }));
    // Success handler
    return res.send({ status: "succeeded", content: "User session has been created." });
  } else {
    if (cookies._id) return res.send({ status: "succeeded", content: "User session already exist." });
    if (req.method.toLowerCase() !== "post") return res.send({ status: "succeeded", content: "Invalid request." });
  }
};
