import React from "react";
import {Card} from "@mui/material"
import {Button} from "@mui/material";

import song1 from "../assests/test2.mp3"
import song2 from "../assests/test.mp4"

export const Music = () => {

  const audio = new Audio(song2)
  
  
  return(
    
    <Card>
      <Button onClick={()=>{audio.play()}}>Play</Button>
      <Button onClick={()=>{audio.pause()}}>Pause</Button>
    </Card>
  )
}