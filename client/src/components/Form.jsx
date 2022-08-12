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

  const [pos, setPos] = useState(null);
  const something = Boolean(pos)


  const validateMessage = (message, eventTarget) => {
    if (message.length > 700) {
      //  {alert("Message need to be 700 chararacters or less")}//Replace with popover
      setPos(eventTarget);
      return false;
    }
  };

  const submitMessage = (message, letterType, senderID, eventTarget) => {
    if (validateMessage(message, eventTarget) === false) {
      return;
    }

    axios.post(`/letters/new`, { message, letterType, senderID })
      .then(alert(`Letter Saved!`))
      .then(navigate("/letters/profile"));

  };
  const submitResponse = (message, letterID, responderID) => {
    axios.post(`/responses/new`, { message, letterID, responderID })
      .then(alert(`Response Sent!`));
  };

  const colorCharacter = classNames({ "character-color-lesser": countCharacters < 0, "character-color-greater": countCharacters >= 0 });





  return (
    <div className="form-component">
      {!props.isResponse &&
        <TypeSelector
          onChange={(event) => { setLetterType(event.target.value); }}>
        </TypeSelector>}

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
      <div className={colorCharacter} >
        remaining: {countCharacters}
      </div>
      <div className="form-buttons">

        {/* Form for new letter submission */}
        {!props.isResponse &&
          <>
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

            <Button
              sx={{ backgroundColor: purple[500] }}
              style={{ marginLeft: "10px" }}
              size="small"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={(event) => {
                submitMessage(message, letterType, userID, event.currentTarget);
               

              }}
            >
              Submit
              </Button>
              <Popover
                open={something}
                anchorEl={pos}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                onClose={() => { setPos(null);}}
          

              > <Typography>Letters can only contain 700 characters</Typography></Popover>
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
              onClick={() => { setMessage(""); }}
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
  );
};