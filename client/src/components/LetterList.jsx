import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { LetterListItem } from "./LetterListItem";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import '../styles/letterItem.scss'
import { Button } from "@mui/material";
import { purple } from "@mui/material/colors";


export const LetterList = (props) => {
 
  const { userID, setUserID } = useContext(UserContext);
  console.log(userID);

  const [data, setData] = useState([]);
  const [currentLetter, setCurrentLetter] = useState({});

  useEffect(() => {
    axios.get(`${props.path}`, { params: { userID } })
      .then(res => setData(res.data))
      .then(data=>console.log(data));

  }, [props.path]);

  const navigate = useNavigate();

  return (
    <>
    {props.path === "/letters" ? <h1>All Letters</h1> : <h1>My Letters</h1>}
       {data.length !== 0 ?
      <div>
      {(data.map((letter) =>
        <LetterListItem className = "letterItem"
          key={letter.id}
          id={letter.id}
          letterMessage={letter.letter_message}
          senderID = {letter.sender_id}
          setCurrentLetter={setCurrentLetter}
          senderUserName = {letter.username}
          type={letter.type}/>
          )).slice(0,(3*props.page))}
          <Button onClick={()=>{props.setPage(props.page + 1)}}>See more Letters</Button>
        </div>
        :
        <div className="login-error">
        <p>You do not have any letters. </p>
        <div className="empty-letter-img"></div>
        {/* <p>Write a  here!</p> */}
        <Button
        variant="contained"
        sx={{ backgroundColor: purple[500], marginTop: "20px" }}
        onClick={() => navigate("/letters/new")}
        >new Letter
        </Button>
       
      </div>
      }

    </>
  );

};