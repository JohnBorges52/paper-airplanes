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
import { makeStyles, responsiveFontSizes } from "@mui/material"
import { Link } from "react-router-dom";
import {selectEmote} from "../helper/emoteManager"
import io from 'socket.io-client'; 

// Material UI
import { Card } from "@mui/material"
import Button from '@mui/material/Button';
import { purple, red, deepPurple } from "@mui/material/colors"
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {Modal, Box, Typography } from "@mui/material"


// Material Icons
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';


export const ChildModal= (props) => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(true)

  

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 380,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return(        
    
    <Modal
    open={open}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
      Deleting {props.message}...
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>

      The {props.message} has been deleted!
      </Typography>
    </Box>
  </Modal> 

  )}


export const LetterDetail = (props) => {
  const navigate = useNavigate();
  let { id } = useParams();
  // alert(id)
  const { userID } = useContext(UserContext);
  const [data, setData] = useState("")
  const [responses, setResponses] = useState([])
  const [letterStatus, setLetterStatus] = useState([])
  const [reported, setReported] = useState(false)
  // const expandedDiv = classNames("cardStyle",'letter-item-vh');
  useEffect(() => {
    axios.get(`/letters/${id}`)
      .then(res => setData(res.data[0]))

    axios.get(`/responses/${id}`)
      .then(res => setResponses(res.data))
  }, [letterStatus, id])

  const updateFlagCount = () => {
    axios.put(`/letters/${id}/flag`)
      .then((res) => setLetterStatus([res.data]))
  }

  const updateLetterStatus = () => {
    axios.put(`/letters/${id}/delete`)
      .then((res) => setLetterStatus([res.data]))
  }

  const updateResponseStatus = (responseId) => {

    axios.put(`/responses/${responseId}/delete`)
      .then((res) => setLetterStatus([res.data]))
  }

  const deleteLetter = () => {
    updateLetterStatus()
    
    
  }

  const deleteResponse = (responseId) => {
    updateResponseStatus(responseId)
    

  }


  const report = () => {
    updateFlagCount()
    setReported(true)
    
  }


  const [open, setOpen] = useState(false)
  const [responseOpen, setResponseOpen] = useState(false)
  const [flagOpen, setFlagOpen] = useState(false)


  const [letterChildModal, letterSetChildModal] = useState(false)
  const [responseChildModal, responseSetChildModal] = useState(false)
  const [responseToDeleteId, setResponseToDeleteId] = useState(0)

 // useEffect=(() => {}, [responseOpen])
  
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


  return (
    <div className="letterDetail">
      <div className="letter-report-component">
        <Card className="cardStyle letter-item-vh"
          sx={{ backgroundColor: purple[100], marginBotton: "50px" }}
          >
          <div className='letter-wrapper-primary'>
            <div>
              <p>{selectEmote(data.emote)}</p> {/*CHANGE TO EMOTE AFTER*/}
              
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
                onClick={() => { setFlagOpen(true) }}
              >
                Flag
              </Button>
            }
          </div>
          :
          /* Render delete button when it is your letter */
          <div className="report-button">
            {<Button
              style={{cursor:"pointer"}}
              color="error"
              size="small"
              variant="outlined"
              endIcon={<DeleteForeverOutlinedIcon />}
              onClick={() => {setOpen(true) }}
            >
              Delete
            </Button>
            }
              <Modal  ////// modal letter
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                  ⚠️ Warning ⚠️
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Do you want to delete this letter?
                  </Typography>

                  <Button
                  onClick={() => { 
                    deleteLetter()
                    letterSetChildModal(true)
                    setTimeout(() => {setOpen(false); 
                    navigate("/letters/profile")}, 2200);                  
                  }}
                  > CONFIRM
                  </Button>

                  <Button
                    onClick={() => setOpen(false) }
                  >
                     CANCEL 
                     </Button>
                     {letterChildModal && <ChildModal message={"letter"} path={"/letters/profile"} />}
                     
                </Box>
              </Modal>  


          </div>
          }
        </div>
      <br />
      <hr className="hr-divider"/>
      <br />
      {/* If user is not sender, show form */}
      {(userID !== data.sender_id && (data.type === 'encourage' || data.type === 'request')) && <Form letterID={id} headerText={'New Response'}isResponse={true} />}

      {/* {userID === data.sender_id && responses.map(e=><p>{e.message}</p>)}  */}
      {/* If user is sender, show all responses */}

      {userID === data.sender_id && responses.map(response =>
        <Card className="response-cardStyle letter-item-vh"
          sx={{ padding: 1, backgroundColor: deepPurple[100] }}
        >

          <div className='letter-wrapper-primary'>
            <div>
               {/*CHANGE TO EMOTE AFTER*/}
              
            </div>
            <div className='letter-wrapper-secondary'>
              <div className='letter-text-area'>
                {<p className="letterMessage">{response.message}</p>}
              </div>
            </div>
            <DeleteForeverOutlinedIcon sx={{ color: red[600], alignSelf: "end", cursor:"pointer" }}
              onClick={() => { 
                responseSetChildModal(false)
                setResponseToDeleteId(response.id)
                setResponseOpen(true)
                
              }}
            />
               
             
          </div>
        </Card>)}
        
        <Modal    /// modal response
        open={responseOpen}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          ⚠️ Warning ⚠️
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you want to delete this response?
          </Typography>

          <Button
          onClick={() => { 
            deleteResponse(responseToDeleteId);
            responseSetChildModal(true);                   
            setTimeout(() => {setResponseOpen(false)}, 2200);                   
          }}
          > CONFIRM
          </Button>
          <Button
            onClick={() => {setResponseOpen(false); setResponseToDeleteId(0)}}
          >
            CANCEL 
            </Button>
            {responseChildModal && <ChildModal message={"response"} id={id} path={`/letters/profile`}/> }
        </Box>
      </Modal> 




      <Modal    /// modal flag
        open={flagOpen}
        onClose={() => setFlagOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          ⚠️ Warning ⚠️
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you want to flag this letter?
          </Typography>

          <Button
          onClick={() => { 
            report()            
            setFlagOpen(false)                   
          }}
          > CONFIRM
          </Button>
          <Button
            onClick={() => {setFlagOpen(false)}}
          >
            CANCEL 
            </Button>
        </Box>
      </Modal> 





    </div>
  )
}