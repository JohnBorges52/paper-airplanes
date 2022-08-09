
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import "./styles/letterItem.scss";
import { Navbar } from "./components/Navbar";
import { Form } from "./components/Form";
import { UserInformation } from "./components/UserInfomation";
import { UserProvider } from "./UserContext";
import { LetterNew } from "./components/LetterNew";

import { LetterList } from "./components/LetterList";
import { LetterDetail } from "./components/LetterDetail";
import { Login } from "./components/Login";

function App(props) {
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
          <Route path="/letters" element={<LetterList path={"/letters"} />} />
          <Route path="/letters/new" element={<LetterNew />} />
          <Route
            path="/letters/profile"
            element={<LetterList path={"/letters/profile"} />}
          />
          <Route path="/letters/:id" element={<LetterDetail />} />
          <Route path="/users/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
