import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { SyncLoader } from "react-spinners";
const socket = io("http://localhost:4040");
import { useUserContext } from "../../context/userContext";

const Landing = ({ socket }) => {
  const [qrCodeValue, setQRCodeValue] = useState("");
  const [isWhatsAppClientReady, setIsWhatsAppClientReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [{ user }, dispatch] = useUserContext();

  const navigate = useNavigate();

  const userClientId = user?.email?.split("@")[0];
  const fetchQRCode = () => {
    // console.log("clicked");
    setIsLoading(true);
    socket.emit("createConnection", { id: userClientId });
  };

  // const getChats = () => {
  //   socket.emit("getChats");
  // };

  useEffect(() => {
    // socket.on("connect");

    socket.on("ready", () => {
      setIsLoading(false);
      setIsWhatsAppClientReady(true);
      navigate("/whatsapp/groups");
    });

    socket.on("cuptureQR", (data) => setQRCodeValue(data));

    // socket.on("getChats", (chats) => {
    //   console.log(chats);
    // });
  }, []);
  return (
    <Layout>
      <div>
        <div className="mt-[10vh] flex flex-col items-center justify-center">
          {!qrCodeValue && !isLoading && (
            <button
              className="bg-green-200 px-5 py-2 rounded-full hover:bg-green-400 duration-300"
              onClick={fetchQRCode}
            >
              Connect to WhatsApp (web)
            </button>
          )}
          {isLoading && (
            <SyncLoader className="px-3 mr-5" size={10} color="orange" />
          )}

          {qrCodeValue && !isWhatsAppClientReady && (
            <p className="p-3 text-gray-600">
              Please go to your WhatsApp and link our App
            </p>
          )}
          {qrCodeValue && !isWhatsAppClientReady && (
            <p className="p-3 text-gray-400">Scan the QR Code below</p>
          )}
          <div style={{ backgroundColor: "white" }}>
            {qrCodeValue && !isWhatsAppClientReady && (
              <QRCode value={qrCodeValue} />
            )}
          </div>
          {isWhatsAppClientReady && (
            <div>
              {/* <Link></Link> */}
              <p>WhatsApp Client is Ready!</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
