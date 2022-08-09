import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
// Material UI
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import { styled } from '@mui/material/styles';

// Material UI Icons
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

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
  const { letter, setCurrentLetter } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const disabled = classNames({ "Mui-disabled": props.letterMessage.length < 60 });

  const longLetter = (message) => {
    if (message.length > 60) {
      return true;
    }
    else {
      return false;
    }
  };

  const cardStyle = {
    height: "30vh",
    width: "85vw",
    margin: "20px",
    display: "flex",
    "flex-direction": "row"
  };


  return (
    <Card className="letterItem"
      sx={{ width: 275, margin: 1, padding: 1 }}
      style={cardStyle}
    //    onClick={() => setCurrentLetter(letter)}>
    // onClick={() => navigate(`/letters/${letter.id}`)}
    >
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Square+Peg&display=swap');
      </style>
      {/* <h5>Hello friend</h5> */}
      <div className='toomany' style={{  display: "flex",
  "flex-direction": "column",
  "justify-content": "space-between",
  width: "100%"}}>
        <div className='john' style={{display: 'flex', "flex-direction":"row", width: "100%", "justify-content": "space-between" }}>


          <div>
            <p>🎈</p>

          </div>
          <div style={{width: "90%"}}>


            {!expanded && <p className="letterMessage">{props.letterMessage.substring(0, 60)}{longLetter(props.letterMessage) && <span>...</span>}</p>}
          </div>
          <Collapse in={expanded} timeout="100" unmountOnExit>
            <p className="letterMessage">{props.letterMessage}</p>
          </Collapse>
        </div>
          <footer>
            <div>

              Type: {props.type}
            </div>
            <CardActions>
              <ExpandMore className={disabled}
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandCircleDownOutlinedIcon />
              </ExpandMore>
            </CardActions>
          </footer>
      </div>







    </Card>
  );
};