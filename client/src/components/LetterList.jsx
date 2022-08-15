import React from "react";
import axios from 'axios';
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LetterListItem } from "./LetterListItem";
import { UserContext } from "../UserContext";
import '../styles/letterItem.scss'
import '../styles/letterlist.scss'
import { Button } from "@mui/material";
import { purple } from "@mui/material/colors";

export const LetterList = (props) => {
  //STATES

  const { userID, setUserID } = useContext(UserContext);
  console.log("userID", userID);

  const [data, setData] = useState([]);
  const [currentLetter, setCurrentLetter] = useState({});
  const [letterEmpty, setLetterEmpty] = useState(false)

  useEffect(() => {
    axios.get(`${props.path}`, { params: { userID } })
      .then((res) => {
        setData(res.data);
        if (res.data.length === 0) { setLetterEmpty(true) }
        else { setLetterEmpty(false) }
      })
      .catch(() => setData([]));
  }, [props.path, userID]);

  const navigate = useNavigate();

  console.log("Letter Empty", letterEmpty)

  return (
    <>
      {props.path === "/letters" ? <h1 className="letterListHeader">All Letters</h1> : (<h1 className="letterListHeader">My Letters</h1>)}
      {!letterEmpty ?
        <div>
          {(data.map((letter) =>
            <LetterListItem className="letterItem"
              key={letter.letter_id}
              id={letter.letter_id}
              letterMessage={letter.letter_message}
              senderID={letter.sender_id}
              setCurrentLetter={setCurrentLetter}
              senderUserName={letter.username}
              type={letter.type} 
              emote={letter.emote}
              />
              
          )).slice(0, (3 * props.page))}

          {((3 * props.page) < data.length) && <Button sx={{ color: purple[400], marginLeft: "10px" }} onClick={() => { props.setPage(props.page + 1) }}>See more Letters</Button>}
        </div>
        :
        <div className="login-error">
          <p>You do not have any letters. </p>
          <div className="empty-letter-img"></div>
          <Button
            variant="contained"
            sx={{ backgroundColor: purple[500], marginTop: "20px" }}
            onClick={() => navigate("/letters/new")}
          >
            New Letter
          </Button>
        </div>
      }
    </>
  );

};