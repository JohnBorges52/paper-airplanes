import React from "react";

export const TypeSelector = (props) => {


return (
  <>
  <label htmlFor="letterTypes"> Choose a Type </label>
  <select name="letterTypes" id="letterTypes" onChange ={(event) => {props.onChange(event)}}/*onChange={() => {props.onChange()}}*/ >
    <option value="request" > Request </option>
    <option value="vent">Vent</option>
    <option value="encourage"> Encourage </option>
  </select>

  </>
)}