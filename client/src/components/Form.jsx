import { useState } from "react"
import { Button } from "./Button"
export const Form = (props) => {
  const [message, setMessage] = useState("")
  return (
    <div>
      <h1>this is a form</h1>
      <form onChange={(event)=>{setMessage(event.target.value)}} onSubmit={(event)=>{event.preventDefault()}}>
        <label>Message</label>
        <textarea name="message" id="message-id" cols="30" rows="10" placeholder="Type Here"></textarea>
      </form>
      <Button onClick={()=>{props.onSubmit()}}>Submit</Button>
      <Button onClick={()=>{props.cancel()}}>Cancel</Button>
    </div>
  )
}