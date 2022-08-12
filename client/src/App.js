import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
// import "./styles/letterItem.scss";
// import { Navbar } from "./components/Navbar";
// import { Form } from "./components/Form";
// import { UserInformation } from "./components/UserInfomation";
import { UserProvider } from "./UserContext";
import { LetterNew } from "./components/LetterNew";

import { LetterList } from "./components/LetterList";
import { LetterDetail } from "./components/LetterDetail";
import { Login } from "./components/Login";
import { useState } from "react";

// Material UI
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import Paper from "@mui/material/Paper";

// Material UI Icons
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import MarkunreadMailboxOutlinedIcon from "@mui/icons-material/MarkunreadMailboxOutlined";
import { HomePage } from "./components/HomePage";

function App(props) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  return (
    <div className="App">
      <UserProvider>
        <Paper
          className="nav-bar"
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={0}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              onClick={() => {
                navigate("/letters");
                setPage(1);
              }}
              label="All Letters"
              icon={<MailOutlineIcon />}
            />

            <BottomNavigationAction
              onClick={() => {
                navigate("/letters/profile");
                setPage(1)
              }}
              label="My Letters"
              icon={<MarkunreadMailboxOutlinedIcon />}
            />
            <BottomNavigationAction
              onClick={() => {
                navigate("/letters/new");
                setPage(1);
              }}
              label="Write New"
              icon={<CreateOutlinedIcon />}
            />
          </BottomNavigation>
        </Paper>
        <Routes>
          <Route path="/" element={<LetterList path={"/letters"} />} />
          <Route path="/letters" element={<LetterList page={page} setPage={setPage} path={"/letters"} />} />
          <Route path="/letters/new" element={<LetterNew />} />
          <Route
            path="/letters/profile"
            element={<LetterList path={"/letters/profile"} page={page} setPage={setPage} />}
          />
          <Route path="/letters/:id" element={<LetterDetail />} />
          <Route path="/users/login" element={<HomePage />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
