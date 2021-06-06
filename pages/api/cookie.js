import cookie from "cookie";

if (process.env.NODE_ENV !== "production") require("dotenv").config();

export default (req, res) => {
  if (req.method == "POST") {
    res.setHeader("Set-Cookie", cookie.serialize("user", JSON.stringify(req.body), {
      httpOnly: true, maxAge: (60 * 60 * 24), sameSite: "strict", path: "/"
    }));
    res.status(200).json({ status: "succeeded", content: "Cookie Set" }); 
  } else {
    res.status(200).json({ status: "succeeded", content: JSON.parse(req.cookies.user) });
  }
  
}