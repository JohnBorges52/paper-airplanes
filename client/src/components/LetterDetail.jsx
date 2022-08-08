import React from "react"
import axios from "axios"
import { useEffect } from "react"
import { Button } from "./Button"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Form } from "./Form"

export const LetterDetail = (props) => {
  let { id } = useParams();
  // alert(id)

  const [data, setData] = useState("")
  useEffect(() => {
    axios.get(`/letters/${id}`)
      .then(res => setData(res.data[0]))
  }, [])

  return (
    <div className="letterDetail">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Square+Peg&display=swap');
      </style>
      <h5>Hello friend</h5>
      <p className="letterMessage">{data.letter_message}</p>
      <footer className="letterType">
        Type:{data.type}
        <Button>Flag</Button>
      </footer>
      {data.type === 'request' && <Form />}
    </div>
  )
}