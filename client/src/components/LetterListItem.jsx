import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import {selectEmote} from "../helper/emoteManager"

// Material UI
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import { styled } from '@mui/material/styles';
import { purple } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import axios from "axios";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const LetterListItem = (props) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const { userID } = useContext(UserContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const disabled = classNames({ "Mui-disabled": props.letterMessage.length < 60 });
  const expandedDiv = classNames("cardStyle", { 'letterItem': !expanded }, { 'letter-item-vh': expanded });

  const longLetter = (message) => {
    if (message.length > 60) {
      return true;
    }
    else {
      return false;
    }
  };

  const markRead = (letterId) => {
    axios.put(`/responses/${letterId}/read`)
  }


  return (
    <Card className={expandedDiv}
      sx={{ margin: 1, padding: 1, backgroundColor: purple[100], marginBottom: "40px", boxShadow: "7px 7px purple", border: "1px solid", borderColor: purple[600] }}
    
    >
      <div className='letter-wrapper-primary'>
        <div>
          <p>{selectEmote(props.emote)}</p>
        </div>
        <div className='letter-wrapper-secondary'>
          
          
          <div className='letter-text-area'>

            {!expanded && <p className="letterMessage">{props.letterMessage.substring(0, 54)}{longLetter(props.letterMessage) && <span>...</span>}</p>}
            <Collapse in={expanded} timeout={100} unmountOnExit>
              <p className="letterMessage">{props.letterMessage}</p>
            </Collapse>
          </div>
          
          <footer className="letter-footer">
            <div className="letter-userID"> 
              <div className="letterMessage">

              {props.type === "request" && <span className="lettertype-indicator"> Looking for advice </span>}
              {props.type === "vent" && <span className="lettertype-indicator"> Just venting </span>}
              {props.type === "encourage" && <span className="lettertype-indicator"> Good vibes! </span>}
              
              </div>
            </div>

            <CardActions className="letter-actions" >
              {/* If logged in */}
              {userID ?
                // If user is not the author of the letter
                (userID !== props.senderID ?
                  // If letter type is request show letter detail button
                  (<DriveFileRenameOutlineOutlinedIcon
                    style={{cursor: "pointer"}}
                    color="action"
                    onClick={() => navigate(`/letters/${props.id}`)}
                  />)
                  :
                  // Show letter detail button, regardless of type
                  (<ChatOutlinedIcon
                    style={{cursor: "pointer"}}
                    color="action"
                    onClick={() => { markRead(props.id); navigate(`/letters/${props.id}`) }}
                  />))
                :
                // Hide letter detail
                (<DriveFileRenameOutlineOutlinedIcon
                  color="action"
                  onClick={() => navigate(`/users/login/error`)}
                />)}

              <ExpandMore
                className={disabled}
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
                <ExpandCircleDownOutlinedIcon />
              </ExpandMore>
            </CardActions>
          </footer>
        </div>
      </div>
    </Card>
  );
};