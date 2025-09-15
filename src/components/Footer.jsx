import React from "react";

const Footer = () => {
  return (
    <div
      className=" bg-[#090B13] font-mono
    text-sm text-white py-[2rem]"
    >
      <div className="flex flex-col gap-[2rem] items-center justify-center">
        <img
          className="w-[9rem] mt-[2rem] object-cover"
          src="/disneyHeaderLogo.svg"
          alt=""
        />
        <div className="flex flex-col md:flex-row items-center justify-between gap-7 mt-[1rem]">
          <p>Privacy Policy</p>
          <p>Subscription agreement</p>
          <p>Aid</p>
          <p>Compatible devices</p>
          <p>About Disney+</p>
          <p>Personalized advertising</p>
        </div>

        <p className=" max-w-[70%] md:max-w-[40%] xl:max-w-[30%] text-center">
          Disney+ is a paid subscription service; content is subject to
          availability. The Disney+ service is marketed by Disney DTC LATAM,
          availability. The Disney+ service is marketed by Disney DTC LATAM,
          Inc., 2400 W Alameda Ave., Burbank, CA 91521.
        </p>

        <p className="">© Disney. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
