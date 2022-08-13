import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [userID, setUserID] = useState(2)//please change back to null

  return (
    <UserContext.Provider value={{ userID, setUserID }} >

      {children}

    </UserContext.Provider>
  )
}

