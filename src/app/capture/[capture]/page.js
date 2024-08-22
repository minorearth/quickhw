"use client";

import Camera from "../../camera.js";

export default function Home({ params }) {
  return <Camera session={params.capture} mode="TASK" />;
}
