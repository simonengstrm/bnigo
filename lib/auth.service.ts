import {jwtVerify} from "jose";

export default async function verify(jwt : string) {
  try {
    const res = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));
    console.log("Verified jwt in auth service");
    return true;
  } catch(error) {
    console.log("JWT is invalid");
    return false;
  }
}