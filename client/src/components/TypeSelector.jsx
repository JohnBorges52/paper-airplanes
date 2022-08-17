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
          <MenuItem value={"request"}>Looking for advice</MenuItem>
          <MenuItem value={"vent"}>Just venting</MenuItem>
          <MenuItem value={"encourage"}>Good vibes!</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}