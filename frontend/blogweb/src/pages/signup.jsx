import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Animation from "../assets/Animation.json";
import Lottie from "react-lottie";
import { Lock, Mail, User2Icon } from "lucide-react";
import Logo from "../assets/logosticker.png"

function Signup() {
  const [username, setuser] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [issignup, setissignup] = useState(false);

  const navigate = useNavigate();
  function settinguser(event) {
    setuser(event.target.value);
  }
  function settingemail(event) {
    setemail(event.target.value);
  }
  function settingpassword(event) {
    setpassword(event.target.value);
  }
  const handlesubmit = (event) => {
    event.preventDefault();
    Axios.post("https://blog-website-3-1pha.onrender.com/signup", {
      email: email,
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.data.message) {
          console.log("error");
          alert("email already exist");
          setissignup(false);
        } else {
          console.log("user-id has been created");
          setissignup(true);
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className=" w-screen h-screen bg-[#313131] flex flex-col justify-center items-center">
      <img src={Logo} alt="logo" className="h-20" />
      <h2 className="text-lg text-amber-300 font-bold">Thought Stream</h2>
      <p className="text-slate-100 font-semibold mb-2">let's share our thoughts!</p>
      <div className="flex flex-col w-80 min-h-3/6 bg-[#414141] p-8 rounded-md md:w-96">
        <h1 className="text-3xl font-bold text-white mb-10 text-center ">
          Sign Up
        </h1>
        <form
          className="w-full h-full flex flex-col justify-center items-center"
          onSubmit={handlesubmit}
        >
          <div className="flex flex-col w-full gap-2">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-slate-100"
            >
              Username :
            </label>
            <div className="flex flex-row items-center gap-x-2 h-fit border-b-2 border-b-slate-200">
              <User2Icon className="fill-slate-100 stroke-none" />
              <input
                placeholder="Username"
                name="username"
                type="text"
                className="h-10 bg-[#414141] text-lg font-semibold w-full outline-none  text-slate-100"
                onChange={settinguser}
                required autoComplete="off"
              ></input>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <label
              htmlFor="email"
              className="text-sm mt-4 font-semibold text-slate-100"
            >
              Email :
            </label>
            <div className="flex flex-row items-center border-b-2 gap-x-2">
              <Mail className="stroke-slate-700 fill-slate-50" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="h-10 bg-[#414141] text-lg font-semibold w-full outline-none  text-slate-100"
                onChange={settingemail}
                required autoComplete="off"
              ></input>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <label
              htmlFor="password"
              className="text-sm mt-4 font-semibold text-slate-100 "
            >
              Password :
            </label>
            <div className="flex flex-row  items-center gap-x-2 border-b-2">
              <Lock className="stroke-none fill-slate-50" />
              <input
              minLength="8"
              maxLength="10"
                type="password"
                placeholder="Password"
                name="password"
                className="h-10 bg-[#414141]  text-lg font-semibold w-full outline-none text-slate-100 "
                onChange={settingpassword}
                required 
              ></input>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-sky-500 h-10 to-indigo-500 mt-3 p-1 text-white rounded-lg w-2/5 text-base font-semibold"
          >
            {" "}
            <p>Sign up</p>
          </button>
          {issignup ? (
            <Lottie options={defaultOptions} height={100} width={100} />
          ) : (
            ""
          )}
          <Link
            to={"/signin"}
            className="text-base text-slate-100 font-semibold text-center mt-2"
          >
            <p>already has an account ? signin</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Signup;
