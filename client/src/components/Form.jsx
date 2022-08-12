import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { TypeSelector } from "./TypeSelector"
import { useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import "../styles/letterItem.scss";

// Material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { purple } from "@mui/material/colors";


// Material Icons
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';


export const Form = (props) => {
  const navigate = useNavigate();

  const { userID } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [letterType, setLetterType] = useState("request");
  const [countCharacters, setCountCharacters] = useState(700)

  const submitMessage = (message, letterType, senderID) => {
    axios.post(`/letters/new`, { message, letterType, senderID })
      .then(alert(`Letter Saved!`))
  }
  const submitResponse = (message, letterID, responderID) => {
    axios.post(`/responses/new`, { message, letterID, responderID })
      .then(alert(`Response Sent!`))
  }

  return (
    <div className="form-component">
      {!props.isResponse &&
        <TypeSelector
          onChange={(event) => { setLetterType(event.target.value) }}>
        </TypeSelector>}

      <TextField sx={{ width: 1 }} style={{ marginTop: "25px", marginBottom: "15px" }}

        id="filled-multiline-flexible"
        label="What is on your mind?"
        multiline
        minRows={10}
        value={message}
        onChange={event => 
        {setMessage(event.target.value);
        setCountCharacters(700 - event.target.value.length)}}
        variant="outlined"
      />

      <div className="form-buttons">
        
        {/* Form for new letter submission */}
        {!props.isResponse &&
          <>
           <Button variant= "outlined">

           {countCharacters}

          </Button>
            <Button
              sx={{ color: purple[500], borderColor: purple[500] }}
              size="small"
              variant="outlined"
              // clear message text from text field
              endIcon={<ClearIcon />}
              onClick={() => { setMessage("") }}
            >
              Clear
            </Button>

            <Button
              sx={{ backgroundColor: purple[500] }}
              style={{ marginLeft: "10px" }}
              size="small"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => {
                submitMessage(message, letterType, userID);
                navigate("/letters/profile");
              }}
            >
              Submit
            </Button>
          </>
        }
        {/* Form for response submission */}
        {props.isResponse &&
          <>
           

            <Button
              sx={{ color: purple[500] }}
              size="small"
              variant="outlined"
              endIcon={<ClearIcon />}
              onClick={() => { setMessage("") }}
            >
              Clear
            </Button>
            <Button
              sx={{ backgroundColor: purple[500] }}
              style={{ marginLeft: "10px" }}
              size="small" variant="contained"
              endIcon={<SendIcon />} onClick={() => {
                submitResponse(message, props.letterID, userID);
                navigate("/letters");
              }}
            >
              Submit
            </Button>
          </>
        }
      </div>
    </div >
  )
}