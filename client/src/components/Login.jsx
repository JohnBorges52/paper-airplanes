import axios from "axios";
import { useState } from "react"
import { UserContext } from "../UserContext";
import { useContext } from "react";

export const Login = () => {
  const{userID, setUserID} = useContext(UserContext);
  const getUserId =  (email) => {
    axios.post('/users/login', {email})
    .then(res=>{setUserID(res.data[0].id)})
    .then(console.log(userID))


  }


  
  return(
    <div className="login">
      <input type="text" placeholder="username"/>
      <input type="text" placeholder="password" />
      <button onClick={()=>{getUserId('link@yahoo.com')}}>Submit</button>
    </div>
  )
}