import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [userID, setUserID] = useState(3)//please change back to null
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("link@yahoo.com")

  return (
    <UserContext.Provider value={{ userID, setUserID, loggedInUserEmail, setLoggedInUserEmail }} >

      {children}

    </UserContext.Provider>
  )
}

