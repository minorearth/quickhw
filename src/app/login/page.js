"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import authenticationForm from "@/store/authentication";
import { observer } from "mobx-react-lite";
import SignIn from "./signin";
import SignUp from "./signup";
import PswRest from "./pswreset";

const Page = observer(() => {
  return (
    <>
      {authenticationForm.signIn && <SignIn />}
      {authenticationForm.signUp && <SignUp />}
      {authenticationForm.pswReset && <PswRest />}
    </>
  );
});

export default Page;
