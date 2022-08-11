import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { LetterListItem } from "./LetterListItem";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import '../styles/letterItem.scss'

export const LetterList = (props) => {
  const navigate = useNavigate();
  const { userID, setUserID } = useContext(UserContext);
  console.log(userID);

  const [data, setData] = useState([]);
  const [currentLetter, setCurrentLetter] = useState({});

  useEffect(() => {
    axios.get(`${props.path}`, { params: { userID } })
      .then(res => setData(res.data))
      .then(console.log(props.path));

  }, [props.path]);

  return (
    <>
       {data.length !== 0 ?
      <>
      {data.map((letter) =>
        <LetterListItem className = "letterItem"
          key={letter.id}
          id={letter.id}
          letterMessage={letter.letter_message}
     //     letter={letter}
          senderID = {letter.sender_id}
          setCurrentLetter={setCurrentLetter}
          type={letter.type}
        // onClick={() => {
        //   console.log('hello');
        //   navigate("/letters/detail", { state: { id: letter.id } });
        // }}
        />)}
        </>
        :
      <div>NOTHING HERE</div>
      }
    </>
  );

};