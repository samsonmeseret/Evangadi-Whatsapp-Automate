import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoZoom } from "react-icons/bi";
import { FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-[20vh]">
      <h2 className="text-lg">Services</h2>
      <div className="flex justify-between w-full max-w-lg flex-col md:flex-row gap-5 items-center mt-5">
        <Link
          to={"/whatsapp"}
          className="p-5 hover:bg-gray-100 bg-gray-50 rounded-lg"
        >
          <FaWhatsapp color="green" size={100} />
        </Link>
        <Link
          to={"/zoom"}
          className="p-5 hover:bg-gray-100 bg-gray-50 rounded-lg"
        >
          <BiLogoZoom color="#206DFC" size={100} />
        </Link>
        <Link
          to={"telegram"}
          className="p-5 hover:bg-gray-100 bg-gray-50 rounded-lg"
        >
          <FaTelegram size={100} color="#33A8D9" />
        </Link>
      </div>
    </div>
  );
};

export default Services;
