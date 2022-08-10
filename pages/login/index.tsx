import { stringify } from "querystring";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import Page from "../../src/components/Page";
import { useRouter } from "next/router";

export default function Login() {

  const router = useRouter();
  const [form, setForm] = useState({
    username : "",
    password : ""
  });
  const [error, setError] = useState("");
  const [signupMode, setSignupMode] = useState(false);

  function isValidForm() {
    return !(form.username == "" || form.password == "");
  }

  async function submitForm() {

    const apiURL : string = signupMode ? "/api/user/signup" : "/api/auth/login";

    const result = await fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: form.username,
          password: form.password
        }
      })
    });

    if(result.status == 200) {
      router.push(new URL("/user", document.baseURI))
    } else {
      setError((await result.json()).error);
    }
  }

  function handleChange(event : ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  return (
    <Page>
      <div className="flex w-full justify-center">
        <div className="flex w-1/2 bg-white p-4 rounded-xl shadow-lg ">
          <div className="flex space-y-4 flex-col w-full place-items-center">
            <span className="text-3xl font-bold">{signupMode ? "Sign up" : "Log in"}</span>
            <div className="flex flex-col w-full">
              <span className="text-sm">Username</span>
              <input type="text" name="username" value={form.username} onChange={handleChange} className="h-8 rounded-md grow border"/>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-sm">Password</span>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="h-8 rounded-md grow border"/>
            </div>
            {isValidForm() ? 
              <button onClick={submitForm} className="cursor-pointer w-full p-2 rounded-full text-center bg-green-600 hover:bg-green-500 text-white">Login</button>
              :
              <button disabled onClick={submitForm} className="cursor-pointer w-full p-2 rounded-full text-center bg-gray-400 text-black">Login</button>
            }
            {error == "" ? <></> : <span className="text-red-500 text-sm">{error}</span>}
            <div className="text-center">Not a member? <a href="#" onClick={() => setSignupMode(!signupMode)}>Click here</a>!</div>
          </div>
        </div>
      </div>
    </Page>
  )

}