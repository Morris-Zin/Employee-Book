import React from "react";
import { useStyles } from "./styles";
import moment from "moment";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../../../actions/employees";
import { useHistory } from "react-router";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import calculateWhenToPay from "../../../utils/calculateWhenToPay";

export default function EmployeeContent({ employee }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteThePost = () => {
    console.log("hi");
    dispatch(deleteEmployee(employee._id, history));
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {employee.name[0]}
          </Avatar>
        }
        action={
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={deleteThePost}>
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        }
        title={employee.name}
        subheader={moment(employee.startDate).format("MMM Do YYYY")}
      />
      <CardMedia
        className={classes.media}
        image="https://images.unsplash.com/photo-1551434678-e076c223a692?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGVtcGxveWVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          <span className={classes.focus}>{employee.name} </span>joined{" "}
          <span className={classes.focus}>Khit Mee</span> on{" "}
          <span>{moment(employee.startDate).format("MMM Do YYYY")}</span> and
          the employee gain a salary of{" "}
          <span className={classes.focus}> {employee.salary} per month</span>.
          You are paying {employee.name} in
          <span className={classes.focus}>
            {" "}
            {calculateWhenToPay(employee.startDate)} days{" "}
          </span>
          .The employee phone number is {""}
          <span className={classes.focus}>{""}+95{employee.phoneNumber}</span> {""}
          {employee.address
            ? `and the employee live in ${employee.address}.`
            : null}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title={`Make a phone call to ${employee.name}`}>
          <IconButton aria-label="Make Phone Call">
            <a href={`tel:+95${employee.phoneNumber}`} className={classes.link}>
              <PhoneIcon />
            </a>
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit the Post">
          <IconButton
            aria-label="Edit the Post"
            component={Link}
            to={`/editEmployee/${employee._id}/edit`}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Back to home page" className={classes.marginLeft}>
          <IconButton aria-label="Back" component={Link} to="/">
            <KeyboardBackspaceIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
