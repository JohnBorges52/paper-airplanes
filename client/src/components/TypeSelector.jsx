// import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const TypeSelector = (props) => {

  // const [letterType, setLetterType] = useState("request");

  // const handleChange = (event) => {
  //   setLetterType(event.target.value);
  // };

  return (
    // <div className="letter-type-selector">
    //   <label htmlFor="letterTypes"> Choose type of letter </label>
    //   <select name="letterTypes" id="letterTypes" onChange={(event) => { props.onChange(event) }}

    // /*onChange={() => {props.onChange()}}*/ >

    //     <option value="request" > Request </option>
    //     <option value="vent">Vent</option>
    //     <option value="encourage"> Encourage </option>
    //   </select>
    // </div>


    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Letter Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={letterType}
        label="Letter-Type"
        onChange={event => props.onChange(event)}
      >
        <MenuItem value={"request"}>Request</MenuItem>
        <MenuItem value={"vent"}>Vent</MenuItem>
        <MenuItem value={"encourage"}>Encourage</MenuItem>
      </Select>
    </FormControl>

  )
}