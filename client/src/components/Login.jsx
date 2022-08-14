import axios from "axios";
import { useState } from "react"
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { purple } from "@mui/material/colors";

export const Login = (props) => {

  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("")
  const { userID, setUserID } = useContext(UserContext);
  const getUserId = (email, specPath) => {
    axios.get('/users/login/success', { params: { email } })
      .then(res => { setUserID(res.data[0].id); })
      .then(()=>console.log(specPath))
      .then(()=>{navigate(specPath)})
  }

  return (

    <div className="homepage">
      <div className="login">

        <TextField
          style={{ margin: "20px auto 10px", width: "70vw", backgroundColor: "white" }}
          id="outlined-basic"
          label="email"
          onChange={(event) => { setUserEmail(event.target.value) }}
        />
        <TextField
          style={{ margin: "0 auto 10px", width: "70vw", backgroundColor: "white" }}
          id="outlined-basic"
          label="password"
        />

        <Button
          sx={{ backgroundColor: purple[500] }}
          style={{ margin: "10px auto 10px", width: "25vw" }}
          variant="contained"
          onClick={() => {
            getUserId(userEmail, props.redirectPath)
          }}>LOGIN
        </Button>

        <Button
          sx={{ backgroundColor: purple[500] }}
          style={{ margin: "0 auto 10px", width: "25vw" }}
          variant="contained"
          onClick={() => { console.log("A NEW USER HAS BEEN REGISTERED") }}>Register
        </Button>
      </div>
    </div>
  )
}