import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import ExcelUploader from "../../components/UploadExcelInput/ExcelUpload";

const Landing = ({ socket }) => {
  const [qrCodeValue, setQRCodeValue] = useState(null);
  const [isWhatsAppClientReady, setIsWhatsAppClientReady] = useState(false);

  const fetchQRCode = () => {
    console.log("clicked");
    socket.emit("createConnection", { id: "samson" });
  };

  const getChats = () => {
    socket.emit("getChats");
  };

  useEffect(() => {
    socket.on("connect");

    socket.on("ready", () => {
      setIsWhatsAppClientReady(true);
    });

    socket.on("cuptureQR", (data) => setQRCodeValue(data));

    socket.on("chats", (chats) => {
      console.log(chats);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <div>
        <ExcelUploader />
        {<button onClick={getChats}>Get Chats</button>}
        <button onClick={fetchQRCode}>Get QR Code</button>
        {!isWhatsAppClientReady && (
          <p>Please go to the browser console and authenticate</p>
        )}
        <div style={{ backgroundColor: "white" }}>
          {qrCodeValue && !isWhatsAppClientReady && (
            <QRCode value={qrCodeValue} />
          )}
        </div>
        {isWhatsAppClientReady && <p>WhatsApp Client is Ready!</p>}
      </div>
    </div>
  );
};

export default Landing;
