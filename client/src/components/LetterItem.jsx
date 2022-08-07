import React from "react"


export const LetterItem = (props) => {

  return(
    <div className="letterItem">
      <h1>Hello friend</h1>
      <p>{props.letterMessage}</p>
      <footer>
        Type:{props.type}
      </footer>
    </div>
  )
}