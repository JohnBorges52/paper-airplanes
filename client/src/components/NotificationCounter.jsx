import { UserContext } from "../UserContext";
import { useContext } from "react";

import axios from "axios";
import { useState } from "react";

export const NotificationCounter = () => {
  const [notificationNumber, setNotifcationNumber] = useState(0)
  const { userID } = useContext(UserContext);
  axios.get('/responses/unread', {params:{userID}}).then((res)=>setNotifcationNumber(res.data[0].count))

  return(
    <span id="notification-counter" className="notification-counter">{notificationNumber}</span>
  )
}