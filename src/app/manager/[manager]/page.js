"use client";
import Manager from "./manager";
export default function Home({ params }) {
  return <Manager user={params.manager} setProfileVisible={() => {}} />;
}
