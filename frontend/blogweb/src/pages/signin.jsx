import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Animation from "../assets/Animation.json";
import Lottie from "react-lottie";
import { useMyContext } from "./context";
import { Lock, User2Icon } from "lucide-react";
import Logo from "../assets/logosticker.png"
function Signin() {
  const [loginusername, setloginusername] = useState("");
  const [loginpassword, setloginpassword] = useState("");
  const { islogin, setislogin } = useMyContext();
  const { user, setuser } = useMyContext();
  const navigateto = useNavigate();

  const login = (event) => {
    event.preventDefault();
    Axios.post("https://blog-website-3-1pha.onrender.com/signin", {
      loginusername: loginusername,
      loginpassword: loginpassword,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.message) {
          navigateto("/signin");
          alert("Invalid Username or Password");
        } else {
          setislogin(response.data.success);
          setuser(response.data.value);
          console.log(user);
          setTimeout(() => {
            navigateto("/");
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
      <div className="flex flex-col sm:w-80 min-h-3/6  bg-[#414141] p-8 rounded-md md:w-96">
        <h1 className="text-3xl font-bold  mb-10 text-center text-cyan-100">
          Sign In
        </h1>
        <form
          className="w-full h-full flex flex-col justify-center items-center"
          onSubmit={login}
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
                type="text"
                placeholder="Username"
                name="username"
                className="h-10 bg-[#414141] text-lg font-semibold w-full outline-none  text-slate-100"
                onChange={(event) => {
                  setloginusername(event.target.value);
                }}
                required
                autoComplete="off"
              ></input>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-100 mt-4"
            >
              Password :
            </label>
            <div className="flex flex-row items-center gap-x-2 border-b-2">
              <Lock className="stroke-none fill-slate-50" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="h-10 bg-[#414141] text-lg font-semibold  outline-none text-slate-100"
                onChange={(event) => {
                  setloginpassword(event.target.value);
                }}
                required
              ></input>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-sky-500 h-10 to-indigo-500 mt-3 p-1 text-white rounded-lg w-2/5 text-base font-semibold"
          >
            <p>Sign in</p>
          </button>
          {islogin ? (
            <Lottie options={defaultOptions} height={100} width={100} />
          ) : (
            ""
          )}
          <Link
            to={"/signup"}
            className="text-base text-slate-100 font-semibold text-center mt-2"
          >
            Sign up for free
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Signin;
