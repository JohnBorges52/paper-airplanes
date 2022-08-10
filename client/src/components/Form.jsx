import { useState } from "react"
// import { Button } from "./Button"
import { TypeSelector } from "./TypeSelector"
import { useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import "../styles/letterItem.scss";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';


// Mui Components //
import TextField from '@mui/material/TextField';

export const Form = (props) => {
  const {userID} = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [letterType, setLetterType] = useState("request");

  const submitMessage = (message, letterType, senderID) => {
    axios.post(`/letters/new`, {message, letterType, senderID})
    .then(alert(`Letter Saved!`))
    
    
  }
  const submitResponse = (message, letterID, responderID) => {
    axios.post(`/responses/new`, {message, letterID, responderID})
    .then(alert(`Response Sent!`))
    
    
  }

  return (
  <>
    <div className="text-area-component">
      {/* <h1>this is a form</h1> */}
      {/* <form onChange={(event)=>{setMessage(event.target.value)}} onSubmit={(event)=>{event.preventDefault()}}>
        <label>Message</label>
        <textarea name="message" id="message-id" cols="30" rows="10" placeholder="Type Here"></textarea>
      </form> */}

    

        <TextField  sx={{width: 1 }} style={{marginTop: "40px", marginBottom: "30px" }}
                  
                  id="filled-multiline-flexible"
                  label="Write here"
                  multiline
                  minRows={10}
                  value={message}
                  onChange={(e) => {setMessage(e.target.value); console.log(message)}}
                  variant="outlined"
                  />

    

    <div className="form-buttons">
      {!props.isResponse && <TypeSelector onChange={(event) => {setLetterType(event.target.value)}}></TypeSelector>}
      
     
      {!props.isResponse && 
      <>
        <Button size="small" variant="outlined" endIcon={<ClearIcon />} onClick={()=> {submitMessage(message, letterType, userID); }}>Clear</Button> 
        
        <Button style={{marginLeft: "10px"}} size="small" variant="contained" endIcon={<SendIcon />} onClick={()=> {submitMessage(message, letterType, userID); }}>Submit</Button>
      </>}
      
      
     
      {props.isResponse && 
      <>
        <Button size="small" variant="outlined" endIcon={<ClearIcon />} onClick={()=> {submitResponse(message, props.letterID, userID); }} >Clear</Button> 
      
        <Button style={{marginLeft: "10px"}} size="small" variant="contained" endIcon={<SendIcon />} onClick={()=> {submitResponse(message, props.letterID, userID);}}>Submit</Button>
      </>}
      

      </div>
    </div>
    </>
  )
}