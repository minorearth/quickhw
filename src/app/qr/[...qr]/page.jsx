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
        value={`${process.env.NEXT_PUBLIC_DOMAIN}/${params.qr[0]}/${params.qr[1]}`}
      />
    </div>
  );
}
