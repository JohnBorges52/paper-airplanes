import { useState } from "react"
import { Button } from "./Button"
import { TypeSelector } from "./TypeSelector"

export const Form = (props) => {
  const [message, setMessage] = useState("")
  const [letterType, setLetterType] = useState("request")

  return (
    <div>
      <h1>this is a form</h1>
      <form onChange={(event)=>{setMessage(event.target.value)}} onSubmit={(event)=>{event.preventDefault()}}>
        <label>Message</label>
        <textarea name="message" id="message-id" cols="30" rows="10" placeholder="Type Here"></textarea>
      </form>
      <TypeSelector onChange={(event) => {setLetterType(event.target.value)}}></TypeSelector>
      <Button onClick={()=>{console.log(letterType, message)}}>Submit</Button>
      <Button onClick={()=>{console.log("Cancel")}}>Cancel</Button>
    </div>
  )
}