import React from "react"
import { Form } from "./Form"
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { LoginError } from "./LoginError";

export const LetterNew = () => {
  const { userID } = useContext(UserContext);

  return (
    <>
      {/* If not logged in, render Login component with error */}
      {!userID && <LoginError />}
      {/* If logged in, render new letter form */}
      <div className="letterDetail">
        {userID && <h1>New Letter</h1>}
        {userID && <Form />}
      </div >
    </>
  )
}