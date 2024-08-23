"use client";

import QRCode from "react-qr-code";

export default function Home({ params }) {
  return (
    <div
      style={{
        height: "100vh",
        margin: "0 auto",
        width: "100%",
        // backgroundColor: "yellow",
      }}
    >
      <QRCode
        style={{
          height: "auto",
          maxHeight: "100%",
          maxWidth: "100%",
          width: "100%",
        }}
        value={`https://192.168.1.64:3001/capture/${params.qr}`}
      />
    </div>
  );
}
