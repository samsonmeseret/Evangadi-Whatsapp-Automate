import React from "react";
import { useUserContext } from "../../context/userContext";
import { auth } from "../../utilities/firebase";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Header = () => {
  const [{ user }, dispatch] = useUserContext();
  //   console.log(user);
  return (
    <>
      <section className="flex items-center justify-between container mx-auto">
        <div className="text-center flex flex-col p-3  ">
          <Link to={"/"} className="font-bold text-4xl  text-orange-400">
            Evangadi
          </Link>
          <small>Automation center</small>
        </div>
        {user ? (
          <div className="inline-block rounded-full bg-gray-200 pr-5 h-10 line-height-username1">
            <img
              className="rounded-full float-left h-full"
              src={user?.photoURL}
            />{" "}
            <div className="flex flex-col items-center justify-center">
              <small className="ml-3  font-semibold">{user?.displayName}</small>

              <small
                onClick={() => auth.signOut()}
                className="px-2 mt-2 cursor-pointer bg-red-300 hover:bg-red-400 duration-300 rounded-full"
              >
                Sign Out
              </small>
            </div>
          </div>
        ) : (
          <div className="px-3 mr-5">Sign In</div>
          //   <SyncLoader className="px-3 mr-5" size={10} color="orange" />
        )}
      </section>
      <hr />
    </>
  );
};

export default Header;
