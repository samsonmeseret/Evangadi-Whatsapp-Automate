import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { FaWhatsapp } from "react-icons/fa";
import { Link, useNavigate, Outlet } from "react-router-dom";
import Group from "../../components/Group/Group";
import GroupDetail from "../GroupDetail/GroupDetail";

const Groups = ({ socket }) => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [oldGroups, setOldGroups] = useState([]);
  const [query, setQuery] = useState("");

  // const filterGroups = (e) => {
  //   setOldGroups(...groups);
  //   if (e.target.value) {
  //     const results = groups.filter((item) =>
  //       item.name.toLowerCase().includes(e.target.value.toLowerCase())
  //     );
  //     setGroups(results);
  //   } else {
  //     setGroups(...oldGroups);
  //   }
  // };

  useEffect(() => {
    socket.emit("getChats");

    socket.on("chats", (data) => {
      setGroups(data?.groups);
      setOldGroups(data?.groups);
      console.log(data?.groups);
      if (!groups) {
        navigate("/whatsapp", {
          state: { msg: "WhatsApp session expired, please connect again." },
        });
      }
    });
  }, []);

  useEffect(() => {
    if (query) {
      const results = groups.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setGroups(results);
    } else {
      setGroups(oldGroups);
    }
  }, [query]);

  return (
    <Layout>
      <section className="mt-10 ">
        <div className="flex flex-wrap justify-between items-center container mx-auto">
          <h1 className="p-3">Your Groups</h1>
          <div>
            <input
              className="border border-1 border-gray-400 px-5 py-1 rounded-full"
              type="text"
              placeholder="Search Groups"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <hr className="mb-5" />
        <div className="flex">
          {/* group list */}
          <div className="max-h-[50vh] overflow-y-scroll flex flex-col">
            {/* group */}
            {groups &&
              groups?.map((group) => (
                <Group key={group.name} name={group.name} id={group.name} />
              ))}
          </div>
          {/* group details */}
          <div className="max-w-md mx-auto">
            <GroupDetail groupData={groups} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Groups;
