"use client";
import Drop from "./drop/drop";
import { useEffect } from "react";

export default function Home({ params }) {
  useEffect(() => {
    console.log(params);
  }, []);
  return (
    <Drop
      typeEncoded={params.dropzone[0]}
      surveyid={params.dropzone[1]}
      manager={params.dropzone[2]}
    />
  );
}
