"use client";
import Drop from "./drop/drop";
import Congrat from "./drop/congrat";
import { useState } from "react";

export default function Home({ params }) {
  const [congratVisible, setCongratVisible] = useState(false);
  return (
    <>
      {!congratVisible && (
        <Drop
          typeEncoded={params.dropzone[0]}
          surveyid={params.dropzone[1]}
          manager={params.dropzone[2]}
          setCongratVisible={setCongratVisible}
        />
      )}
      {congratVisible && <Congrat setCongratVisible={setCongratVisible} />}
    </>
  );
}
