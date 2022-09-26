import React, { ChangeEvent, ChangeEventHandler, useState, useEffect, FormEvent } from "react";
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

  useEffect(() => {
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
  }, [signupMode])

  /**
   * Matches password to regex
   * At least 8 characters long
   * At least one letter, one digit and one special character
   */
  function isValidPassword() {
    const regex : RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(form.password);
  }
  
  function isValidForm() {
    return form.username != "" && form.password != "" && isValidPassword();
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const apiURL : string = signupMode ? "/api/user/signup" : "/api/auth/login";

    const result = await fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: form.username,
          password: form.password
        }
      })
    })

    if(result.status == 200 && !signupMode) {
      console.log("Pushing to /user")
      router.push(new URL("/user", document.baseURI))
    } else {
      setError((await result.json()).error);
    }

    if (signupMode) setSignupMode(!signupMode);
  }

  function handleChange(event : ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function getCurrentModeName() : string {
    return signupMode ? "Sign up" : "Log in"
  }

  return (
    <Page>
      <form onSubmit={e => submitForm(e)}>
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
                { signupMode &&
                  <span className="text-sm">Password must be minimum 8 characters long, include one letter, special character and digit.</span>
                }
              </div>
              {isValidForm() ? 
                <button type="submit" className="cursor-pointer w-full p-2 rounded-full text-center bg-green-600 hover:bg-green-500 text-white">{getCurrentModeName()}</button>
                :
                <button type="submit" disabled className="cursor-pointer w-full p-2 rounded-full text-center bg-gray-400 text-black">{getCurrentModeName()}</button>
              }
              {error == "" ? <></> : <span className="text-red-500 text-sm">{error}</span>}
              <div className="text-center">{signupMode ? "Already a member? " : "Not a member? " }<a href="#" className="underline text-blue-600" onClick={() => setSignupMode(!signupMode)}>Click here</a>!</div>
            </div>
          </div>
        </div>
      </form>
    </Page>
  )

}