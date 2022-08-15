import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const EmoteSelector = (props) => {

  

  return (
    <div className='inputSelector'>
      <FormControl size="small" style={{ marginTop: "10px", width: "25vw", maxWidth: "168px", minWidth: "145px" }}>
        <InputLabel id="letter-type-label" style={{ backgroundColor: "white" }}>I am feeling... &nbsp;</InputLabel>
        <Select
          label="Emoji-Type"
          onChange={event => props.onChange(event)}
        >
          <MenuItem value={"1"}>🙂</MenuItem>
          <MenuItem value={"2"}>😃</MenuItem>
          <MenuItem value={"3"}>🙃</MenuItem>
          <MenuItem value={"4"}>🥰</MenuItem>
          <MenuItem value={"5"}>😍</MenuItem>
          <MenuItem value={"6"}>😐</MenuItem>
          <MenuItem value={"7"}>😔</MenuItem>
          <MenuItem value={"8"}>😕</MenuItem>
          <MenuItem value={"9"}>😭</MenuItem>
          <MenuItem value={"10"}>😢</MenuItem>
          <MenuItem value={"11"}>😩</MenuItem>
          <MenuItem value={"12"}>😠</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}