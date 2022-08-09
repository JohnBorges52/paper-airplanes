import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Material UI
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse"
import { styled } from '@mui/material/styles';

// Material UI Icons
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
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
  const { letter, setCurrentLetter } = props

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: 275, margin: 1, padding: 1 }}
    //    onClick={() => setCurrentLetter(letter)}>
    // onClick={() => navigate(`/letters/${letter.id}`)}
    >
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Square+Peg&display=swap');
      </style>
      {/* <h5>Hello friend</h5> */}
      {!expanded && <p className="letterMessage">{props.letterMessage.substring(0, 10)}...</p>}
      <Collapse in={expanded} timeout="100" unmountOnExit>
        <p className="letterMessage">{props.letterMessage}</p>
      </Collapse>
      <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandCircleDownOutlinedIcon />
        </ExpandMore>
      </CardActions>


      <footer className="letterType">
        Type: {props.type}
      </footer>
    </Card>
  )
}