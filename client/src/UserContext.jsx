import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [userID, setUserID] = useState(null)// << CHANGE THIS VALUE TO 5 IN ORDER TO KEEP LOGGED IN AFTER REFRESH
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("link")

  return (
    <UserContext.Provider value={{ userID, setUserID, loggedInUserEmail, setLoggedInUserEmail }} >

      {children}

    </UserContext.Provider>
  )
}

