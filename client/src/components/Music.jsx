import React from "react";
import {Card, useThemeProps} from "@mui/material"
import {Button} from "@mui/material";
import { purple } from "@mui/material/colors";
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';

export const Music = (props) => {

  // const audio = new Audio(song1)
  // const [music, setMusic] = useState(audio)


  // const playFunc = (music) => {
  //   music.volume = 0.2
  //   music.play()
  // }

  // const pauseFunc = (music) => {
  //   music.pause()
  // }
  //Something
  
  return(

    <Card id="music-controls"
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 1, 
        padding: 1, 
        backgroundColor: purple[50], 
        marginBottom: "40px", 
        boxShadow: "3px 3px purple", 
        border: "1px solid", 
        borderColor: purple[600] }}
      >
        <p>Music</p>
        <PlayCircleOutlineOutlinedIcon
          className="music-control"  
          color="primary" 
          onClick={()=>{props.play(props.music)}}
        />
        <PauseCircleOutlineOutlinedIcon 
          className="music-control"
          color="primary" 
          onClick={()=>{props.pause(props.music)}} 
        />
    </Card>
  )
}