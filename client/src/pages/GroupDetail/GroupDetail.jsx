import React from "react";
import { useOutlet, useParams } from "react-router-dom";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";

const GroupDetail = ({ groupData }) => {
  // const data = useOutlet();
  // console.log(data);
  // console.log(groupData);
  const id = useParams("groupId");
  let groupSelected = groupData?.find((gr) => gr.name == id.groupId);
  // console.log(groupSelected);
  // console.log(id);

  return (
    <>
      {groupSelected ? (
        <div>
          <div className="flex  justify-between text-sm sticky top-0">
            <button className="bg-green-700 px-4 py-1 rounded-full text-white">
              Add Participants
            </button>
            <button className="bg-green-700 px-4 py-1 rounded-full text-white">
              Send Message{" "}
            </button>
            <button className="bg-orange-500 px-4 py-1 rounded-full text-white">
              Automate Message
            </button>
          </div>
          <div className="">
            <div className="flex p-3 flex-col justify-between">
              <div className="flex">
                <p>Owner : </p>
                <span> {groupSelected?.groupMetadata?.owner?.user}</span>
              </div>
            </div>
            <div className="p-3">
              <p>Description</p>
              <div className=" text-sm w-full">
                {groupSelected?.groupMetadata?.desc}
              </div>
            </div>
            <div className=" p-3">
              <span>Participant: </span>
              <div>
                <ul className="grid grid-cols-3 overflow-y-scroll">
                  {groupSelected?.groupMetadata?.participants?.map((item) => (
                    <li
                      key={item.id.user}
                      className="text-sm p-2 flex gap-2 items-center"
                    >
                      <HiOutlineDevicePhoneMobile />

                      <span>{item.id.user}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-3">
              <p>Last Message</p>
              <span>{groupSelected?.lastMessage?.body}</span>
            </div>
          </div>
        </div>
      ) : (
        <div>Group Details</div>
      )}
    </>
  );
};

export default GroupDetail;
