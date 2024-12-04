"use client";
import Drop from "./drop/drop";

export default function Home({ params }) {
  return (
    <Drop
      typeEncoded={params.dropzone[0]}
      surveyid={params.dropzone[1]}
      manager={params.dropzone[2]}
    />
  );
}
