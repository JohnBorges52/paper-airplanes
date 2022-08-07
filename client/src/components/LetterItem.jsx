import React from "react"


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
      </footer>
    </div>
  )
}