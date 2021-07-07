import React from "react";
import { useStyles } from "./styles";
import moment from "moment";
import {
  Paper,
  Avatar,
  Typography,
  Divider,
  Grid,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { editEmployee } from "../../../../actions/employees";

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

  console.log(employee);

  const onVerify = () => {
    const onMonthInMilliseconds = 2.628e9;
    dispatch(
      editEmployee(
        {
          ...employee,
          paidDate: +(employee.paidDate + onMonthInMilliseconds),
          imageUrl: employee.imageUrl,
        },
        employee._id,
        history
      )
    );
  };

  return (
    <Paper className={classes.root} elevation={2}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <div className={classes.avatarContainer}>
            <img
              src={employee.imageUrl.length ? employee.imageUrl : DEFAULT_IMAGE}
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
          <div className={classes.section}>
            <Typography variant="body2">
              You are going to pay the salary in{" "}
              {moment(employee.paidDate).format("YYYY MM DD")}
            </Typography>
          </div>

          <div className={classes.section}>
            <Typography variant="body2">
              Have you paid your employee? If so please verify by clicking the
              button below.
            </Typography>
            <Button
              color="secondary"
              className={classes.marginTop}
              variant="outlined"
              onClick={onVerify}
            >
              Verify
            </Button>
          </div>
          <div className={classes.section}>
            <Avatar
              className={classes.goBack}
              onClick={() => history.push("/dashboard")}
            >
              <KeyboardBackspaceIcon />
            </Avatar>
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
