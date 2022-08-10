// import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const TypeSelector = (props) => {



  return (



    <FormControl fullWidth placeholder="Letter Type">
      {/* <InputLabel id="demo-simple-select-label">Letter Type</InputLabel> */}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Letter-Type"
        onChange={event => props.onChange(event)}
      >
        <MenuItem disabled value="">
          <em>Select a Letter Type</em>
        </MenuItem>
        <MenuItem value={"request"}>Request</MenuItem>
        <MenuItem value={"vent"}>Vent</MenuItem>
        <MenuItem value={"encourage"}>Encourage</MenuItem>
      </Select>
    </FormControl>

  )
}