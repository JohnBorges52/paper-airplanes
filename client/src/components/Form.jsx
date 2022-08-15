import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TypeSelector } from "./TypeSelector";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import "../styles/letterItem.scss";
import classNames from "classnames";
import { EmoteSelector } from "./EmoteSelector";

// Material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { purple, red } from "@mui/material/colors";
import { Popover, Typography, Box, Modal } from "@mui/material";

// Material Icons
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from "react";

import { load } from "@tensorflow-models/toxicity";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const Form = (props) => {
  const navigate = useNavigate();

  const { userID } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [letterType, setLetterType] = useState("request");
  const [emote, setEmote] = useState(1);
  const [countCharacters, setCountCharacters] = useState(700);

  const [popoverMsg, setPopoverMsg] = useState("")
  const [pos, setPos] = useState(null);
  const [isModal, setIsModal] = useState(true)
  const open = Boolean(pos)

  const threshold = 0.9;
  const [toxicity, setToxicity] = useState("");

  const checkToxic = (message, eventTarget) => {
    load(threshold)
      .then((model) => {
        console.log("Model loaded...");
        model.classify(message)
          .then((predictions) => {
            const isToxic = predictions[6].results[0].match;
            console.log(predictions)
            if (isToxic) {
              setToxicity(true);
            } else {
              setToxicity(false)
            }
          })
      });
    console.log(toxicity);
    setPos(eventTarget);
    setPopoverMsg("Too toxic!")
    return toxicity
  }

  const validateMessage = (message, eventTarget) => {
    if (message.length > 700) {
      setIsModal(false);
      setPos(eventTarget);
      setPopoverMsg("Letter needs to be 700 chararacters or less")
      return false;
    }
    else if (message.length < 1) {
      setIsModal(false);
      setPos(eventTarget)
      setPopoverMsg("Letter needs to have characters")
      return false
    }
    setPos(eventTarget)
    setIsModal(true);
    return true
  };

  useEffect(() => { }, [isModal])

  const submitMessage = (message, letterType, senderID, eventTarget) => {

    if (validateMessage(message, eventTarget) && !checkToxic(message)) {
      axios.post(`/letters/new`, { message, letterType, senderID })
        .then(setTimeout(() => {
          navigate("/letters/profile")
        }, 2200))

    }
  };

  const submitResponse = (message, letterID, responderID, eventTarget) => {
    if (validateMessage(message, eventTarget)) {
      axios.post(`/responses/new`, { message, letterID, responderID })
        .then(setTimeout(() => {
          navigate("/letters/")
        }, 2200))
    }
  };

  const colorCharacter = classNames({ "character-color-lesser": countCharacters < 0, "character-color-greater": countCharacters >= 0 });

  return (
    <div className="form-component">
      <h1 className="letterListHeader"> {props.headerText} </h1>
      {!props.isResponse &&
        <TypeSelector
          value={"request"} onChange={(event) => { setLetterType(event.target.value); }}>
        </TypeSelector>}

      {/* <EmoteSelector
        value={'1'} onChange={(event) => { setEmote(event.target.value) }}>
      </EmoteSelector> */}


      {/* Text field for form */}
      <div className='inputSelector'>
        <TextField sx={{ width: 1 }} style={{ marginTop: "25px", width: "100%", maxWidth: "1024px", minWidth: "200px" }}
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
      </div>

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

        {
          <>
            {/* Submit button for both new letter and response forms */}
            <Button
              sx={{ backgroundColor: purple[500] }}
              style={{ marginLeft: "10px" }}
              size="small"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={(event) => {
                !props.isResponse ?
                  // Submit new message form
                  submitMessage(message, letterType, userID, emote, event.currentTarget)
                  :
                  // Submit reponse form
                  submitResponse(message, props.letterID, userID, event.currentTarget)
              }}
            >
              Submit
            </Button>

            {isModal ?
              <Modal
                open={open}
                onClose={() => setPos(null)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Message Saved!💖
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Redirecting...
                  </Typography>
                </Box>
              </Modal>
              :
              //* Popover alert on submit when message is too short or too long *
              <Popover
                open={open}
                anchorEl={pos}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                onClose={() => { setPos(null); }}
              > <Typography sx={{ p: 1 }}>{popoverMsg}</Typography></Popover>
            }
          </>
        }
      </div>

      {!props.isResponse &&

        <div className="guy-heart-container">
          <div className="guy-heart"> </div>
        </div>
      }
    </div >
  );
};