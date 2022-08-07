import React from "react"
import { Button } from "./Button"

export const LetterItem = (props) => {

  return(
    <div className="letterItem">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Square+Peg&display=swap');
      </style>
      <h5>Hello friend</h5>
      <p className="letterMessage">{props.letterMessage}</p>
      <footer className="letterType">
        Type:{props.type}
        <Button>Flag</Button>
      </footer>
    </div>
  )
}