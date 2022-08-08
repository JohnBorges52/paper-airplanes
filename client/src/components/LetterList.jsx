import React from "react"
import { useEffect, useState } from "react"
import axios from 'axios'
import { LetterItem } from "./LetterItem"
import { UserContext } from "../UserContext";
import { useContext } from "react";


export const LetterList = () => {
  const{userID, setUserID} = useContext(UserContext);
  console.log(userID)
 
  const  [data, setData] = useState([])
    useEffect(()=> {
      if(userID === null) {

        axios.get(`/letters`)
        .then(res => setData(res.data)) 
      }
      else {
        axios.get(`/letters/profile/${userID}`)
        .then(res => setData(res.data)) 
        // axios.post(`/letters/profile`, {userID})
        // .then(res => setData(res.data)) 

      }
      }, [userID])
  
  return (
    <>
      <button onClick={() => {setUserID(userID === null ? 1 : null )}}>click here aaaa</button>

      {data.map((letter) => 
      <LetterItem 
      key={letter.id} 
      letterMessage={letter.letter_message}
      type={letter.type}
      />)}
    
    </>
  )

}