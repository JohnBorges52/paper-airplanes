import React from "react";
import {Card, useThemeProps} from "@mui/material"
import {Button} from "@mui/material";
import { purple } from "@mui/material/colors";
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";

import song_one from "../assests/music/song_one.mp3";
import song_two from "../assests/music/song_two.mp3";
import { useState, useContext } from "react";


export const Music = (props) => {
  
  const songs = [song_one, song_two];
  const audio = new Audio(songs[Math.floor(Math.random() * 2)]);
  const [displayMusicControls, setDisplayMusicControls] = useState(false);
  const [music] = useState(audio);

  const playFunc = (music) => {
    music.volume = 0.08;
    music.play();
  };

  const pauseFunc = (music) => {
    music.pause();
  };

  const openMusicControls = () => {
    setDisplayMusicControls(true);
  };
  const closeMusicControls = () => {
    setDisplayMusicControls(false);
  };


  
  return(
    <div id="music-widget">
          {!displayMusicControls && (
            <MusicNoteOutlinedIcon
              id="music-widget-show"
              onClick={() => {
                openMusicControls();
              }}
            />
          )}
          {displayMusicControls && (
            
          
       
    <Card id="music-controls"
      sx={{ 
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
          onClick={()=>{playFunc(music)}}
        />
        <PauseCircleOutlineOutlinedIcon 
          className="music-control"
          color="primary" 
          onClick={()=>{pauseFunc(music)}} 
        />
        <CancelOutlinedIcon 
          className="music-control"
          color="primary" 
          onClick={()=>{closeMusicControls()}}
        />
    </Card>
    )}
     </div>
  )
}