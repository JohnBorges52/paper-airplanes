import React from "react"
import { useEffect, useState } from "react"
import axios from 'axios'
import { LetterItem } from "./LetterItem"
import { UserContext } from "../UserContext";
import { useContext } from "react";


export const LetterList = (props) => {
  const{userID, setUserID} = useContext(UserContext);
  console.log(userID)
 
  const  [data, setData] = useState([])
    useEffect(()=> {
          axios.get(`${props.path}`, {params:{userID}})
          .then(res => setData(res.data))
          .then(console.log(props.path)) 
                    
      }, [props.path])
  
  return (
    <>
      {data.map((letter) => 
      <LetterItem 
      key={letter.id} 
      letterMessage={letter.letter_message}
      type={letter.type}
      />)}
    
    </>
  )

}