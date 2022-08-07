import React from "react"
export const Form = () => {
  return (
    <div>
      <h1>this is a form</h1>
      <form>
        <label>Message</label>
        <textarea name="message" id="message-id" cols="30" rows="10" placeholder="Type Here"></textarea>
      </form>
    </div>
  )
}