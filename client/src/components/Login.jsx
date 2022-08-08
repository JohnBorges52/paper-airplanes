import axios from "axios";
import { useState } from "react"

export const Login = () => {

  const getUserId =  (email) => {
    axios.post('/users/login', {email})
    .then(res=>{console.log(res.data[0].id)})

  }


  
  return(
    <div className="login">
      <input type="text" placeholder="username"/>
      <input type="text" placeholder="password" />
      <button onClick={()=>{getUserId('link@yahoo.com')}}>Submit</button>
    </div>
  )
}