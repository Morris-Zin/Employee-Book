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

const Employee = ({
  name,
  startDate,
  addedDate,
  phoneNumber,
  salary,
  id,
  setCurrentId,
  imageUrl,
}) => {
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
      <Card className={`${classes.root}`}>
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
              {name} joined Khit Mee on {startDate}.
              Please click to view more about {name}.
            </Typography>
            {/* <Listitem
              key={1}
              Icon={PhoneIcon}
              primaryText="Phone Number"
              secondaryText={phoneNumber}
              className={classes.listItemText}
            />
            <Listitem
              key={2}
              Icon={PaymentIcon}
              primaryText="Salary"
              secondaryText={salary}
              className={`${classes.listItemText}`}
            />
            <Listitem
              key={3}
              Icon={WorkIcon}
              primaryText="Date Started Working"
              secondaryText={moment(startDate).format("YYYY MM DD")}
              className={classes.listItemText}
            /> */}
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
