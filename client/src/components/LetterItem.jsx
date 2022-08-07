import React from "react"


export const LetterItem = (props) => {

  return(
    <div className="letterItem">
      <h1>Hello friend</h1>
      <p className="letterMessage">{props.letterMessage}</p>
      <footer className="letterType">
        Type:{props.type}
      </footer>
    </div>
  )
}