import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import io from "socket.io-client";
import axios from "axios";
import "./App.css";

const App = () => {
  const [qrCodeValue, setQRCodeValue] = useState(null);
  const [isWhatsAppClientReady, setIsWhatsAppClientReady] = useState(false);

  const fetchQRCode = async () => {
    try {
      const response = await axios.get("http://localhost:4040/connect");
      console.log(response.data);
      setQRCodeValue(response.data);
    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:4040");
    socket.on("whatsappClientReady", () => {
      setIsWhatsAppClientReady(true);
      // Perform any actions you want when WhatsApp client is ready
    });
    socket.on("cuptureQR", (data) => setQRCodeValue(data));

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <button onClick={fetchQRCode}>Get QR Code</button>
      {!isWhatsAppClientReady && (
        <p>Please go to the browser console and authenticate</p>
      )}
      {qrCodeValue && <QRCode value={qrCodeValue} />}
      {isWhatsAppClientReady && <p>WhatsApp Client is Ready!</p>}
    </div>
  );
};

export default App;
