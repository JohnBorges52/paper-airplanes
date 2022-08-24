import {useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";


// MATERIAL UI //
import { BottomNavigation, BottomNavigationAction} from "@mui/material";
import { grey } from "@mui/material/colors";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import MarkunreadMailboxOutlinedIcon from "@mui/icons-material/MarkunreadMailboxOutlined";


export const BottomNav = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("recents");
  const { userID, setUserID } = useContext(UserContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navToMyLetters = () => {
    navigate("/letters/profile");
    setPage(1);
  };

  return(
  <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{
          bgcolor: grey[100],
          "& .Mui-selected": {
            "& .MuiBottomNavigationAction-label": {
              fontSize: (theme) => theme.typography.caption,
              transition: "none",
              fontWeight: "bold",
            },
            "& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label": {
              color: (theme) => theme.palette.secondary.main,
            },
          },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "76px",
          marginTop: "50px"
        }}
      >
        <BottomNavigationAction
          onClick={() => {
            navigate("/letters");
            setPage(1);
          }}
          label="All Planes"
          icon={<MailOutlineIcon fontSize="large" />}
        />

        <BottomNavigationAction
          onClick={() => {
            !userID ? navigate("/users/login/error") : navToMyLetters();
          }}
          label="My Planes"
          icon={<MarkunreadMailboxOutlinedIcon fontSize="large" />}
        />
        <BottomNavigationAction
          onClick={() => {
            navigate("/letters/new");
          }}
          label="Write New"
          icon={<CreateOutlinedIcon fontSize="large" />}
        />
      </BottomNavigation>

  )



}