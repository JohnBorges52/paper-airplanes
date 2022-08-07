import React from "react"
import { useEffect, useState } from "react"
import axios from 'axios'
import { LetterItem } from "./LetterItem"

export const LetterList = () => {
  const  [data, setData] = useState([])
  useEffect(()=> {
    axios.get('/letters')
      .then(res => setData(res.data)) 
  }, [])
  
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