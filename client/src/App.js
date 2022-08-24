import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import "./styles/musicwidget.scss";

import { LetterNew } from "./components/LetterNew";
import { Notification } from "./components/Notification";
import { Button } from "@mui/material";

import { LetterList } from "./components/LetterList";
import { LetterDetail } from "./components/LetterDetail";
import { Login } from "./components/Login";
import { LoginError } from "./components/LoginError";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { Music } from "./components/Music";
import { BottomNav } from "./components/BottomNav";


// Material UI
import { purple } from "@mui/material/colors";
import AccountMenu from "./components/AccountMenu";


function App() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { userID, setUserID } = useContext(UserContext);

  return (
    <>
      <div className="App">
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

        <Routes>
          <Route
            path="/"
            element={
              <LetterList page={page} setPage={setPage} path={"/letters"} />
            }
          />
          <Route
            path="/letters"
            element={
              <LetterList page={page} setPage={setPage} path={"/letters"} />
            }
          />
          <Route path="/letters/new" element={<LetterNew />} />
          <Route
            path="/letters/profile"
            element={
              <LetterList
                path={"/letters/profile"}
                page={page}
                setPage={setPage}
              />
            }
          />
          <Route path="/letters/:id" element={<LetterDetail />} />
          <Route
            path="/users/login"
            element={<Login redirectPath={"/letters/profile"} />}
          />
          <Route
            path="/users/login/error"
            element={<LoginError redirectPath={"/letters/profile"} />}
          />
          <Route path="/chill" element={<Music />} />
        </Routes>

        <Music />
      </div>
      <BottomNav />
    </>
  );
}

export default App;
