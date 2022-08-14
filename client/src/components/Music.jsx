import React from "react";
import {Card} from "@mui/material"
import {Button} from "@mui/material";
import { purple } from "@mui/material/colors";

import song1 from "../assests/test2.mp3"
import song2 from "../assests/test.mp4"

export const Music = () => {

  const audio = new Audio(song2)

  const playFunc = () => {
    audio.volume = 0.2
    audio.play()
  }

  const pauseFunc = () => {
    audio.pause()
  }
  
  
  return(

    <Card id="music-controls"
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 1, 
        padding: 1, 
        backgroundColor: purple[100], 
        marginBottom: "40px", 
        boxShadow: "7px 7px purple", 
        border: "1px solid", 
        borderColor: purple[600] }}
      >
        <h1 className="letterListHeader">Music</h1>
      <Button 
        variant="outlined"
        sx={{ width: 0.8 ,color: purple[800], border: "1px solid purple" }} 
        onClick={()=>{playFunc()}}
        >
          Play
      </Button>
      <Button 
        variant="outlined"
        sx={{ width: 0.8 ,color: purple[800], border: "1px solid purple" }} 
        onClick={()=>{pauseFunc()}}
        >
          Pause
      </Button>
    </Card>
  )
}