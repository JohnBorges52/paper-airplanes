import logo from "./logo.svg";
import { Route, Link, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import "./styles/letterItem.scss";
import { Navbar } from "./components/Navbar";
import { Form } from "./components/Form";

import { LetterList } from "./components/LetterList";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
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
        <Route path="/letters/new" element={<Form/>} />
      </Routes>
    </div>
  );
}

export default App;
