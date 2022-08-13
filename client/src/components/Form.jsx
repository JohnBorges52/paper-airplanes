import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TypeSelector } from "./TypeSelector";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import "../styles/letterItem.scss";
import classNames from "classnames";

// Material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { purple } from "@mui/material/colors";
import { Popover, Typography } from "@mui/material";


// Material Icons
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';


export const Form = (props) => {
  const navigate = useNavigate();

  const { userID } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [letterType, setLetterType] = useState("request");
  const [countCharacters, setCountCharacters] = useState(700);

  const [popoverMsg, setPopoverMsg] = useState("")
  const [pos, setPos] = useState(null);
  const open = Boolean(pos)

  const validateMessage = (message, eventTarget) => {
    if (message.length > 700) {
      setPos(eventTarget);
      setPopoverMsg("Letter needs to be 700 chararacters or less")
      return false;
    }
    else if (message.length < 1) {
      setPos(eventTarget)
      setPopoverMsg("Letter needs to have characters")
      return false
    }
    setPos(eventTarget)
    setPopoverMsg("Letter saved!")
    return true
  };

  const submitMessage = (message, letterType, senderID, eventTarget) => {
    if (validateMessage(message, eventTarget)) {
      axios.post(`/letters/new`, { message, letterType, senderID })
        .then(setTimeout(() => {
          navigate("/letters/profile")
        }, 1000))
    }
  };

  const submitResponse = (message, letterID, responderID, eventTarget) => {
    if (validateMessage(message, eventTarget)) {
      axios.post(`/responses/new`, { message, letterID, responderID })
        .then(setTimeout(() => {
          navigate("/letters/")
        }, 1000))
    }
  };

  const colorCharacter = classNames({ "character-color-lesser": countCharacters < 0, "character-color-greater": countCharacters >= 0 });

  return (
    <div className="form-component">
      {!props.isResponse &&
        <TypeSelector
          onChange={(event) => { setLetterType(event.target.value); }}>
        </TypeSelector>}

      {/* Text field for form */}
      <TextField sx={{ width: 1 }} style={{ marginTop: "25px" }}
        id="filled-multiline-flexible"
        label="What is on your mind?"
        multiline
        minRows={10}
        value={message}
        onChange={event => {
          setMessage(event.target.value);
          setCountCharacters(700 - event.target.value.length);
        }}
        variant="outlined"
      />

      {/* Character counter for message form */}
      <div className={colorCharacter} >
        remaining: {countCharacters}
      </div>

      <div className="form-buttons">

        {/* Clear button for both new letter and response forms */}
        <Button
          sx={{ color: purple[500], borderColor: purple[500] }}
          size="small"
          variant="outlined"
          // clear message text from text field
          endIcon={<ClearIcon />}
          onClick={() => { setMessage(""); setCountCharacters(700) }}
        >
          Clear
        </Button>

        {/* Submit button for both new letter and response forms */}
        {
          <>
            <Button
              sx={{ backgroundColor: purple[500] }}
              style={{ marginLeft: "10px" }}
              size="small"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={(event) => {
                !props.isResponse ?
                  // Submit new message form
                  submitMessage(message, letterType, userID, event.currentTarget)
                  :
                  // Submit reponse form
                  submitResponse(message, props.letterID, userID, event.currentTarget)
              }}
            >
              Submit
            </Button>

            {/* Popover alert on submit when message is too short or too long */}
            <Popover
              open={open}
              anchorEl={pos}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              onClose={() => { setPos(null); }}
            > <Typography sx={{ p: 1 }}>{popoverMsg}</Typography></Popover>
          </>
        }
      </div>
    </div >
  );
};