import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TypeSelector } from "./TypeSelector";
import { UserContext } from "../UserContext";
import { EmoteSelector } from "./EmoteSelector";
import axios from "axios";
import classNames from "classnames";
import "../styles/letterItem.scss";
import "../styles/character-counter.scss"
import "../styles/litle-guy-gifs.scss"
import "../styles/form.scss"

// Material UI
import { Popover, Typography, Box, Modal, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { purple } from "@mui/material/colors";
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';

// TensorFlow Machine Learning Toxicity Detector Model
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
  const [isModal, setIsModal] = useState({ open: true, text: "" })
  const open = Boolean(pos)

  const [toxicity, setToxicity] = useState("");
  const threshold = 0.9;

  const checkToxicity = async (message, eventTarget) => {
    const model = await load(threshold)
    const predictions = await model.classify(message)
    const isToxic = predictions[6].results[0].match
    setToxicity(isToxic)
    return isToxic
  }

  useEffect(() => { }, [isModal])

  //  Check that message is not too long or blank
  const isMessageLengthValid = (message, eventTarget) => {
    if (message.length > 700) {
      setIsModal({ open: false, text: "" });
      setPos(eventTarget);
      setPopoverMsg("Letter needs to be 700 chararacters or less")
      return false;
    }
    else if ((message.length < 1) || (message[0] === ' ')) {
      setIsModal({ open: false, text: "" });
      setPos(eventTarget)
      setPopoverMsg("Letter needs to have characters")
      return false
    }
    return true
  };

  // Validate message for length and toxicty
  const isLetterValid = async (message, eventTarget) => {
    if (isMessageLengthValid(message, eventTarget)) {
      const toxicityResult = await checkToxicity(message)
      // If message is toxic
      if (toxicityResult) {
        setIsModal({ open: true, text: "⚠️ Did you mean to say that? ⚠️ Positive vibes only please. Give it another try! 😃" });
        return false
      }
      // If message IS NOT toxic
      return true
    }
  };

  // On submit the form for a new letter
  const submitMessage = async (message, letterType, senderID, emote, eventTarget) => {
    setPos(eventTarget);
    setIsModal({ open: true, text: "Saving message..." });
    const validateResult = await (isLetterValid(message, eventTarget))
    console.log("Save the message? ", validateResult)
    if (validateResult) {
      try {
        await axios.post(`/letters/new`, { message, letterType, senderID, emote })
        setIsModal({ open: true, text: "Message save success!" });
    
        setTimeout(() => {
          navigate("/letters/profile")
        }, 500)
      }
      catch (error) { console.log(error) }
    }
  };

  const submitResponse = async (message, letterID, responderID, eventTarget) => {
    setPos(eventTarget);
    setIsModal({ open: true, text: "Saving response..." });
    const validateResult = await (isLetterValid(message, eventTarget))
    console.log("Save the message? ", validateResult)
    if (validateResult) {
      try {
        await axios.post(`/responses/new`, { message, letterID, responderID })
        setIsModal({ open: true, text: "Response save success!" });
        setTimeout(() => {
          navigate("/letters/")
        }, 500)
      }
      catch (error) { console.log(error) }
    }
  };

  const colorCharacter = classNames({ "character-color-lesser": countCharacters < 0, "character-color-greater": countCharacters >= 0 });

  return (
    <div className="form-component">
      <h1 className="letterListHeader"> {props.headerText} </h1>
      {!props.isResponse &&
        <TypeSelector
          onChange={(event) => { setLetterType(event.target.value); }}>
        </TypeSelector>}

      {!props.isResponse && <EmoteSelector
        onChange={(event) => { setEmote(event.target.value) }}>
      </EmoteSelector>}

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

            {isModal.open ?
              <Modal
                open={open}
                onClose={() => setPos(null)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Thanks for writing! 💖
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {isModal.text}
                  </Typography>
                </Box>
              </Modal>
              :
              // Popover alert on submit when message is too short or too long
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