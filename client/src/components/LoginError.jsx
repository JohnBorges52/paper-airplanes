import axios from "axios";
import { useState } from "react"
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { Login } from "./Login"

// Material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { purple } from "@mui/material/colors";

export const LoginError = () => {

  const [userEmail, setUserEmail] = useState("")
  const { userID, setUserID } = useContext(UserContext);
  const getUserId = (email) => {
    axios.get('/users/login/success', { params: { email } })
      .then(res => { setUserID(res.data[0].id) })
  }

  const notLoggedIn = "You are not logged in, please log in."

  return (
    <>
      <Login />
      <h1 className="login-error">
        {notLoggedIn}
      </h1>
    </>
  )
}