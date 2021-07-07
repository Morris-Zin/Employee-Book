import React from "react";
import { useStyles } from "./styles";
import moment from "moment";
import {
  Card,
  Paper,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  Grid,
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

const DEFAULT_IMAGE =
  "https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png";

export default function EmployeeContent({ employee }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const calculateTimeDifference = () => {
    return moment(employee.startDate)
      .fromNow()
      .split(" ")
      .splice(0, 2)
      .map((item, index) => (index === 1 ? ` ${item}` : item));
  };

  const deleteThePost = () => {
    dispatch(deleteEmployee(employee._id, history));
  };
  return (
    <Paper className={classes.root} elevation={2}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <div className={classes.avatarContainer}>
            <img
              src={employee.imageUrl ? employee.imageUrl : DEFAULT_IMAGE}
              className={classes.avatarImage}
              alt="name"
            />
            <Typography variant="subtitle1" className={classes.title}>
              {employee.name}
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="body1">
              {employee.name}'s salary: {employee.salary.amount}{" "}
              {employee.salary.currency} per month
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="body1">
              {employee.name}'s started working data: {employee.startDate}
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="body1">
              {employee.name}'s phone number:{" "}
              <a href={`tel:${employee.phoneNumber}`} className={classes.aTag}>
                {employee.phoneNumber}
              </a>
            </Typography>
          </div>
          {employee.address && (
            <div className={classes.section}>
              <Typography variant="body1">
                {employee.name}'s address: {employee.address}
              </Typography>
            </div>
          )}
          <Divider className={classes.divider} />
          <div className={classes.section}>
            <Typography variant="subtitle1">Additional Information:</Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="body2">
              {employee.name} is working at your company for{" "}
              {calculateTimeDifference()}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            alt="employee"
            className={classes.media}
            src={employee.imageUrl ? employee.imageUrl : DEFAULT_IMAGE}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
