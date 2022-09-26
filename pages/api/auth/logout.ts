import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
/**
 * Function that, upon receiving a POST request, logs the user out by deleting the cookie.
 */

export default function logout(req : NextApiRequest, res : NextApiResponse) {
  if(req.method == "POST") {
    const cookies = new Cookies(req, res);
    cookies.set("bnigoLoggedIn", "false", {
      path: "/",
      sameSite: "strict",
      maxAge: -1,
      httpOnly: true,
    });

    res.status(200).json({ message: "Logged out" });

  } else {
    res.status(405).json({ error: "Method not allowed. You used "+req.method+" instead of POST" });
  }
}