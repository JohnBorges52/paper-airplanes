import { useState } from "react"
import { Button } from "./Button"
import { TypeSelector } from "./TypeSelector"
import { useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

export const Form = (props) => {
  const {userID} = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [letterType, setLetterType] = useState("request");

  const submitMessage = (message, letterType, senderID) => {
    axios.post(`/letters/new`, {message, letterType, senderID})
    
  }


  return (
    <div>
      <h1>this is a form</h1>
      <form onChange={(event)=>{setMessage(event.target.value)}} onSubmit={(event)=>{event.preventDefault()}}>
        <label>Message</label>
        <textarea name="message" id="message-id" cols="30" rows="10" placeholder="Type Here"></textarea>
      </form>
      <TypeSelector onChange={(event) => {setLetterType(event.target.value)}}></TypeSelector>
      <Button onClick={()=>{console.log(letterType, message)}}>Submit</Button>
      <Button onClick={()=> {submitMessage(message, letterType, userID)}}>Cancel</Button>
    </div>
  )
}