// import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const TypeSelector = (props) => {

  return (
    <div className='inputSelector'>
      <FormControl size="small" style={{ width: "84vw", maxWidth: "1024px", minWidth: "200px" }}>
        <InputLabel id="letter-type-label" size="small" style={{ backgroundColor: "white" }}>Choose a Letter Type&nbsp;</InputLabel>
        <Select
          label="Letter-Type"

          onChange={event => props.onChange(event)}
        >
          <MenuItem value={"request"}>Request</MenuItem>
          <MenuItem value={"vent"}>Vent</MenuItem>
          <MenuItem value={"encourage"}>Encourage</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}