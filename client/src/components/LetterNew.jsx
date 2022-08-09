import React from "react"
import { Form } from "./Form"
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { Login } from "./Login"

export const LetterNew = () => {
  const { userID } = useContext(UserContext);
  const notLoggedIn = "You are not logged in, please log in."

  return (
    <div className="letterDetail">
           
        { userID && <Form />}
        {!userID && <h1>{notLoggedIn}</h1>} 
        {!userID && <Login />}
      </div>
  )
}