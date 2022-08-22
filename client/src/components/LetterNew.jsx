import React from "react"
import { Form } from "./Form"
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { LoginError } from "./LoginError";
import { useEffect } from "react";

export const LetterNew = () => {
  const { userID } = useContext(UserContext);
  useEffect(() => { }, [userID])

  return (
    <>
      {/* If not logged in, render Login component with error */}
      {!userID && <LoginError redirectPath='/letters/new' />}
      {/* If logged in, render new letter form */}
      <div className="letterDetail">
        {userID && <Form headerText={"New Letter"} />}
      </div >
    </>
  )
}