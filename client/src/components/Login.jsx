import axios from "axios";
import { useState } from "react"
import { UserContext } from "../UserContext";
import { useContext } from "react";

export const Login = () => {
  const[userEmail, setUserEmail] = useState("")
  const{userID, setUserID} = useContext(UserContext);
  const getUserId =  (email) => {
    axios.get('/users/login/success', {params:{email}})
    .then(res=>{setUserID(res.data[0].id)})

  }

  return(
    <div className="login">
      <input type="email" id="email" placeholder="email" onChange={(event)=>{setUserEmail(event.target.value)}}/>
      <input type="text" placeholder="password" />
      <button onClick={()=>{getUserId(userEmail)}}>Submit</button>
      <button onClick={()=>{console.log(userID)}}>Other</button>
    </div>
  )
}