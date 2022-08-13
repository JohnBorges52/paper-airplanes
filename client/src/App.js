import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { LetterNew } from "./components/LetterNew";

import { LetterList } from "./components/LetterList";
import { LetterDetail } from "./components/LetterDetail";
import { Login } from "./components/Login";
import { LoginError } from "./components/LoginError";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";

// Material UI
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import Paper from "@mui/material/Paper";

// Material UI Icons
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import MarkunreadMailboxOutlinedIcon from "@mui/icons-material/MarkunreadMailboxOutlined";

function App() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("recents");
  const { userID, setUserID } = useContext(UserContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Paper
        className="nav-bar"
        sx={{ position: "fixed", bottom: 10, left: 0, right: 0 }}
        elevation={0}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
          sx={{
            // bgcolor: "purple",
            "& .Mui-selected": {
              "& .MuiBottomNavigationAction-label": {
                fontSize: (theme) => theme.typography.caption,
                transition: "none",
                fontWeight: "bold",
                lineHeight: "20px",
              },
              "& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label": {
                color: (theme) => theme.palette.secondary.main,
              },
            },
          }}
        >
          <BottomNavigationAction
            onClick={() => {
              navigate("/letters");
              setPage(1);
            }}
            label="All Letters"
            icon={<MailOutlineIcon fontSize="large" />}
          />

          <BottomNavigationAction
            onClick={() => {
              !userID
                ? navigate("/users/login/error")
                : navigate("/letters/profile");
              setPage(1);
            }}
            label="My Letters"
            icon={<MarkunreadMailboxOutlinedIcon fontSize="large" />}
          />
          <BottomNavigationAction
            onClick={() => {
              navigate("/letters/new");
              setPage(1);
            }}
            label="Write New"
            icon={<CreateOutlinedIcon fontSize="large" />}
          />
        </BottomNavigation>
      </Paper>
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
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/login/error" element={<LoginError />} />
      </Routes>
    </div>
  );
}

export default App;
