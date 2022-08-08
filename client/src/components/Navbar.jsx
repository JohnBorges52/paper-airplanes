import { useNavigate } from "react-router-dom";

export const Navbar = () => {

  const navigate = useNavigate();
  return (
    <div>
      <ul className="nav-links">
        <li className="nav-link" onClick={() => { navigate("/letters") }}>All Letters</li>
        <li className="nav-link" onClick={() => { navigate("/letters/new") }}>New Letter</li>
        <li className="nav-link" onClick={() => { navigate("/letters/profile") }}>My Letters</li>
        <li className="nav-link" onClick={() => { navigate("/users/login") }}>Login</li>
      </ul>
    </div>
  )

}

