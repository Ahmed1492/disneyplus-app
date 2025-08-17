import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Register = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const collectData = (e) => {
    setError("");

    let key = e.target.name;
    let value = e.target.value;
    let newObj = { ...userData };
    newObj[key] = value;
    setUserData(newObj);
    console.log(newObj);
  };

  const handleRegister = async () => {
    try {
      setError("");

      let myResponse = await axios.post(
        "http://localhost:2000/register",
        userData
      );
      console.log(myResponse.data);
    } catch (error) {
      if (error?.response?.data?.message)
        setError(error?.response?.data?.message);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-[#090B13] text-white">
      <p className="text-red-700 font-semibold text-lg absolute left-[45%]  bottom-[5%]">
        {error && error}
      </p>
      <div className="flex items-center justify-center  w-full h-full">
        <div className=" flex w-[80%] md:w-[60%]  lg:w-[37%] xl:w-[25%] items-center m-auto flex-col gap-4">
          <img
            className="object-cover mb-[5rem]  w-[10rem]"
            src="/disneyHeaderLogo.svg"
            alt=""
          />
          <p className="self-start font-semibold">Create an Email </p>
          <>
            {/* FULL NAME */}
            <input
              onChange={collectData}
              className="px-2 py-2 w-full outline-none rounded-md bg-gray-700"
              type="text"
              placeholder="Full name"
              name="fullName"
            />
            {/* EMAIL */}
            <input
              onChange={collectData}
              className="px-2 py-2 w-full outline-none rounded-md bg-gray-700"
              type="email"
              placeholder="Email"
              name="email"
            />
            {/* MOBILE */}
            <input
              onChange={collectData}
              className="px-2 py-2 w-full outline-none rounded-md bg-gray-700"
              type="number"
              placeholder="Mobile"
              name="mobile"
            />
            {/* PASSWORD */}

            <input
              onChange={collectData}
              className="px-2 py-2 w-full outline-none rounded-md bg-gray-700"
              type="password"
              placeholder="Password"
              name="password"
            />
            <button
              onClick={handleRegister}
              className="w-full rounded-md p-2 bg-[#037AEB]"
            >
              Create
            </button>
          </>
          <Link className="border-b" to="/login">
            have an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
