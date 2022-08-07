import React from "react"
import { useEffect, useState } from "react"
import axios from 'axios'


export const Letter_Card = () => {
  const  [data, setData] = useState(['steven', 'charles'])
  useEffect(()=>{
    axios.get('/letters')
      .then(res => setData(res.data)) //data =
      // .then(data_from_above => setData(data_from_above))
  }, [])
  return (
    <div>
      {data.map(letter => <p key="{letter.id}" >{letter.letter_message}</p>)}
    </div>
  )

}