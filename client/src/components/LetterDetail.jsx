import React from "react"
import axios from "axios"
import { useEffect } from "react"
import { Button } from "./Button"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Form } from "./Form"
import { UserContext } from "../UserContext";
import { useContext } from "react";

export const LetterDetail = (props) => {
  let { id } = useParams();
  // alert(id)
  const { userID, setUserID } = useContext(UserContext);
  const [data, setData] = useState("")
  const [responses, setResponses] = useState([])
  const [flagCount, setFlagCount] = useState([])
  const [reported, setReported] = useState(false)

  useEffect(() => {
    axios.get(`/letters/${id}`)
      .then(res => setData(res.data[0]))
    axios.get(`/responses/${id}`)
        .then(res=>setResponses(res.data))
  }, [flagCount])

  const updateFlagCount = () => {
    console.log("ID = ", id)
    axios.put(`/letters/${id}`)
    .then((res) => setFlagCount([res.data]))
  }

  const report = () => {
    updateFlagCount()
    setReported(true)
    alert("The post have been reported")
  }


  return (
    <div className="letterDetail">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Square+Peg&display=swap');
      </style>
      <h5>Hello friend</h5>
      <p className="letterMessage">{data.letter_message}</p>
      {<p className="letterMessage">FLAG_COUNT: {data.flag_count}</p>}
      <footer className="letterType">
        Type:{data.type}
      </footer>

      {<Form letterID={id} isResponse={true}/>}
      {userID === data.sender_id && responses.map(e=><p>{e.message}</p>)}
      {userID && userID !== data.sender_id && !reported && <Button onClick={() =>{ report()}}> Flag</Button>}
      
    </div>
  )
}