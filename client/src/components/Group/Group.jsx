import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Group = ({ name, id }) => {
  return (
    <Link
      to={`/whatsapp/groups/${id}`}
      className="hover:bg-green-50 flex flex-col p-3 bg-white shadow-md hover:shodow-lg rounded-2xl max-w-lg ml-10 my-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FaWhatsapp color="green" size={30} />
          <div className="flex flex-col ml-3">
            <div className="font-medium leading-none">{name}</div>
            {/* <p className="text-sm text-gray-600 leading-none mt-1">
                    By deleting your account you will lose your all data
                  </p> */}
          </div>
        </div>
        {/* <button className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">
                Delete
              </button> */}
      </div>
    </Link>
  );
};

export default Group;
