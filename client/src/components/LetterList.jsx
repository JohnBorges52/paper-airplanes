import React from "react"
import { useEffect, useState } from "react"
import axios from 'axios'


export const LetterList = () => {
  const  [data, setData] = useState([])
  useEffect(()=>{
    axios.get('/letters')
      .then(res => setData(res.data)) //data =
      // .then(data_from_above => setData(data_from_above))
  }, [])
  return (
    <>
      {data.map((letter) => <p key={letter.id}>{letter.letter_message}</p>)}
    </>
  )

}