import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const collectData = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    let newObj = { ...userData };
    newObj[key] = value;
    setUserData(newObj);
    console.log(newObj);
  };

  const handleLogin = async () => {
    try {
      let myResponse = await axios.post(
        "http://localhost:2000/login",
        userData
      );
      console.log(myResponse.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-[#090B13] text-white">
      <div className="flex items-center justify-center  w-full h-full">
        <div className=" flex w-[80%] md:w-[60%]  lg:w-[37%] xl:w-[25%] items-center m-auto flex-col justify-around gap-4">
          <img
            className="object-cover mb-[5rem] w-[10rem]"
            src="/disneyHeaderLogo.svg"
            alt=""
          />
          <p className="self-start font-semibold">Sign in with your email</p>
          <>
            <input
              onChange={collectData}
              name="email"
              className="px-2 py-2 w-full outline-none rounded-md bg-gray-700"
              type="text"
              placeholder="Email"
            />
            <input
              onChange={collectData}
              className="px-2 py-2 w-full outline-none rounded-md bg-gray-700"
              type="password"
              name="password"
              placeholder="Password"
            />
            <button
              onClick={handleLogin}
              className="w-full rounded-md p-2 bg-[#037AEB]"
            >
              Login
            </button>
          </>
          <Link className="border-b" to="/register">
            {"Don't"} have an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
