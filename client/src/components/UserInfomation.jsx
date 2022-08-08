import React from "react";
import { LetterListItem } from "./LetterListItem";
import { LetterList } from "./LetterList";
import { createContext } from "react";

export const UserInformation = () => {


  return (
    <div>
      <h1>Username: </h1>
      <h1>E-mail: </h1>

      <LetterList />

    </div>
  )
}