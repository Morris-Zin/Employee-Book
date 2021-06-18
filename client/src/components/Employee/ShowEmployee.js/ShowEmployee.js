import { Typography, Button } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import EmployeeContent from "./EmployeeContent/EmployeeContent";
import {Grid } from '@material-ui/core'

const ShowEmployee = ({ currentId }) => {
  const classes = useStyles();

  const employee = useSelector((state) => {
    return currentId
      ? state.employees.find((employee) => employee._id === currentId)
      : null;
  });

  return employee ? (
      <EmployeeContent employee={employee} />
  ) : (
    <div className={classes.root}>
      <Typography variant="h6" component="h1" align="center">
        There is no employee for that 👦
      </Typography>
      <Button
        variant="outlined"
        component={Link}
        to="/"
        className={classes.goBackButton}
        color="secondary"
      >
        Go Back
      </Button>
    </div>
  );
};

export default ShowEmployee;
