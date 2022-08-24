
import { Notification } from "./Notification";
import AccountMenu from "./AccountMenu";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

//MATERIAL UI //

import { purple } from "@mui/material/colors";
import { Button } from "@mui/material";






export const TopNavBar = () => {


  const navigate = useNavigate();
  const { userID } = useContext(UserContext);
  

return(
  <nav className="top-nav-bar">
    <div
      className="logo"
      onClick={() => {
        navigate("/letters");
      }}
    ></div>

    <div className="top-nav-bar-rightcontainer">
      {!userID ? (
        <li>
          <Button
            variant="outlined"
            sx={{ color: purple[800], border: "1px solid purple" }}
            onClick={() => {
              navigate("/users/login");
            }}
          >
            LOGIN
          </Button>
        </li>
      ) : (
        <>
          <li
            className="notification-bell"
            onClick={() => {
              navigate("/letters/profile");
            }}
          >
            <Notification />
          </li>
          <li>
            <AccountMenu />
          </li>
        </>
      )}
    </div>
</nav>
)

}