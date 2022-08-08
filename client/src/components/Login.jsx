import axios from "axios";
import { useState } from "react"
import { UserContext } from "../UserContext";
import { useContext } from "react";

export const Login = () => {
  const[userEmail, setUserEmail] = useState("")
  const{userID, setUserID} = useContext(UserContext);
  const getUserId =  (email) => {
    axios.post('/users/login', {email})
    .then(res=>{setUserID(res.data[0].id)})
    .then(console.log(userID))


  }


  
  return(
    <div className="login">
      <input type="email" id="email" placeholder="email" onChange={(event)=>{setUserEmail(event.target.value)}}/>
      <input type="text" placeholder="password" />
      <button onClick={()=>{console.log(userEmail)}}>Other</button>
      <button onClick={()=>{getUserId(userEmail)}}>Submit</button>
    </div>
  )
}