import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import { Link, useHistory } from "react-router-dom";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../../actions/employees.js";
import EditIcon from "@material-ui/icons/Edit";

const DEFAULT_IMAGE =
  "https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png";

const Employee = ({ name, startDate, id, setCurrentId, imageUrl }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const deleteThePost = () => {
    dispatch(deleteEmployee(id, history));
  };

  const handleClick = () => {
    setCurrentId(id);
    history.push(`/showEmployee/${id}`);
  };

  return (
    <CssBaseline>
      <Card className={`${classes.root}`} elevation={2}>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            className={classes.media}
            image={!imageUrl ? DEFAULT_IMAGE : imageUrl}
            title={name}
          />
          <CardContent>
            <Typography
              className={"MuiTypography--heading"}
              vriant={"h6"}
              gutterBottom
            >
              {name}
            </Typography>
            <Typography
              className={"MuiTypography--subheading"}
              variant={"caption"}
            >
              {name} joined the company on {startDate}. Please click to view more
              about {name}.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Tooltip title="Delete the post?">
            <IconButton onClick={deleteThePost} className={classes.deleteIcon}>
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit the post?">
            <IconButton
              component={Link}
              to={`/editEmployee/${id}/edit`}
              className={classes.editIcon}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </CssBaseline>
  );
};

export default Employee;
