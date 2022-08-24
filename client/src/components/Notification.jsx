import { UserContext } from "../UserContext";
import { useContext } from "react";
import axios from "axios";
import { useState } from "react";

// MATERIAL UI //
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { purple } from "@mui/material/colors";

export const Notification = () => {
  const [notificationNumber, setNotifcationNumber] = useState(0)
  const { userID } = useContext(UserContext);
  axios.get('/responses/unread', {params:{userID}}).then((res)=>setNotifcationNumber(res.data[0].count))

  return(
    <>
    <NotificationsActiveOutlinedIcon sx={{ color: purple[700] }} />
    <span id="notification-counter" className="notification-counter">{notificationNumber}</span>
    </>
  )
}