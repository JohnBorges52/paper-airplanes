import logo from "./logo.svg";
import { Route, Link, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import "./styles/letterItem.scss";
import { Navbar } from "./components/Navbar";
import { Form } from "./components/Form";
import { UserInformation } from "./components/UserInfomation"
import { UserProvider } from "./UserContext";

import { LetterList } from "./components/LetterList";
import { Login } from "./components/Login";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <UserProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <button
                onClick={() => {
                  navigate("/letters");
                }}
              >
                All Letters{" "}
              </button>
            }
          />
          <Route path="/letters" element={<LetterList />} />
          <Route path="/letters/new" element={<Form />} />
          <Route path="/letters/profile" element={<LetterList />} />
          <Route path="/users/login" element={<Login />} />

        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
