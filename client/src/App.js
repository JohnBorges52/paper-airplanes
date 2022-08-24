import { Route, Routes } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import "./App.css";
import "./styles/musicwidget.scss";

// COMPONENTS//
import { LetterNew } from "./components/LetterNew";
import { Login } from "./components/Login";
import { LoginError } from "./components/LoginError";
import { Music } from "./components/Music";
import { BottomNav } from "./components/BottomNav";
import { LetterList } from "./components/LetterList";
import { LetterDetail } from "./components/LetterDetail";
import { TopNavBar } from "./components/TopNavBar";


function App() {

  const [page, setPage] = useState(1);
  return (
    <>
      <div className="App">
        <TopNavBar />
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
