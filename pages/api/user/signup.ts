import { NextApiRequest, NextApiResponse } from "next";
import DatabaseService from "../../../lib/db.service";
import { User } from "../../../lib/types";

export default async function signup(req : NextApiRequest, res : NextApiResponse) {
  if(req.method == "POST") {
    const body = JSON.parse(req.body);
    const userToSignUp  : User = body.user;

    const db = new DatabaseService();
    const result = await db.createUser(userToSignUp);

    res.status(200).json({ message: "Signup successful" });
  } else {
    res.status(405).json({ error: "Method not allowed. You used "+req.method+" instead of POST" });
  }
}   