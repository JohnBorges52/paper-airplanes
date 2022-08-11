import React from "react"
import axios from "axios"
import { useEffect } from "react"
// import { Button } from "./Button"
import { useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Form } from "./Form"
import { UserContext } from "../UserContext";
import { useContext } from "react";

// Material UI
import { Card } from "@mui/material"
import Button from '@mui/material/Button';
import { purple, red, deepPurple } from "@mui/material/colors"

// Material Icons
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';

export const LetterDetail = (props) => {
  const navigate = useNavigate();
  let { id } = useParams();
  // alert(id)
  const { userID } = useContext(UserContext);
  const [data, setData] = useState("")
  const [responses, setResponses] = useState([])
  const [flagCount, setFlagCount] = useState([])
  const [reported, setReported] = useState(false)
  // const expandedDiv = classNames("cardStyle",'letter-item-vh');
  useEffect(() => {
    axios.get(`/letters/${id}`)
      .then(res => setData(res.data[0]))
    axios.get(`/responses/${id}`)
      .then(res => setResponses(res.data))
  }, [flagCount])

  const updateFlagCount = () => {
    console.log("ID = ", id)
    axios.put(`/letters/${id}/flag`)
      .then((res) => setFlagCount([res.data]))
  }

  const updateLetterStatus = () => {
    console.log("ID = ", id)
    axios.put(`/letters/${id}/delete`)
      .then((res) => setFlagCount([res.data]))
  }

  const deleteLetter = () => {
    updateLetterStatus()
    alert("The letter has been deleted.")
    navigate("/letters/profile");
  }

  const report = () => {
    updateFlagCount()
    setReported(true)
    alert("The post have been reported")
  }

  return (
    <div className="letterDetail">

      <div className="letter-report-component">

        <Card className="cardStyle letter-item-vh"
          sx={{ margin: 1, padding: 1, backgroundColor: purple[100] }}
        >
          <div className='letter-wrapper-primary'>
            <div>
              <p>🎈</p>
            </div>
            <div className='letter-wrapper-secondary'>
              <div className='letter-text-area'>
                {<p className="letterMessage">{data.letter_message}</p>}
              </div>
            </div>
          </div>
        </Card>

        {userID !== data.sender_id ?
          /* Render delete button when it is NOT your letter */
          <div className="report-button">
            {userID && userID !== data.sender_id && !reported &&
              <Button
                color="error"
                size="small"
                variant="outlined"
                endIcon={<ReportGmailerrorredOutlinedIcon />}
                onClick={() => { report() }}
              >
                Flag
              </Button>
            }
          </div>
          :
          /* Render delete button when it is your letter */
          <div className="report-button">
            {
              <Button
                color="error"
                size="small"
                variant="outlined"
                endIcon={<ReportGmailerrorredOutlinedIcon />}
                onClick={() => { deleteLetter() }}
              >
                Delete
              </Button>
            }
          </div>}
      </div>

      {/* If user is not sender, show form */}
      {userID !== data.sender_id && <Form letterID={id} isResponse={true} />}

      {/* {userID === data.sender_id && responses.map(e=><p>{e.message}</p>)}  */}
      {/* If user is sender, show all responses */}
      {userID === data.sender_id && responses.map(e => <Card className="response-cardStyle letter-item-vh"
        sx={{ padding: 1, backgroundColor: deepPurple[100] }}
      >
        <div className='letter-wrapper-primary'>
          <div>
            <p>🎈</p>
          </div>
          <div className='letter-wrapper-secondary'>
            <div className='letter-text-area'>
              {<p className="letterMessage">{e.message}</p>}
            </div>
          </div>
        </div>
      </Card>)}


    </div>
  )
}