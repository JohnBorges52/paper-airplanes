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
    .then(setMessage(''))
    
    
  }
  const submitResponse = (message, letterID, responderID) => {
    axios.post(`/responses/new`, {message, letterID, responderID})
    .then(setMessage(''))
    
    
  }

  return (
    <div>
      <h1>this is a form</h1>
      <form onChange={(event)=>{setMessage(event.target.value)}} onSubmit={(event)=>{event.preventDefault()}}>
        <label>Message</label>
        <textarea name="message" id="message-id" cols="30" rows="10" placeholder="Type Here"></textarea>
      </form>
      {console.log(props.letterID)}
      {!props.isResponse && <TypeSelector onChange={(event) => {setLetterType(event.target.value)}}></TypeSelector>}
      {!props.isResponse && <Button onClick={()=> {submitMessage(message, letterType, userID); }}>Submit</Button>}
      {props.isResponse && <Button onClick={()=> {submitResponse(message, props.letterID, userID); }}>Submit</Button>}
    </div>
  )
}