import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import Employee from "./Employee/Employee";

const Empoyees = ({ setCurrentId }) => {
  const classes = useStyles();
  const employees = useSelector((state) => state.employees);
  return (
    <Grid
      alignItems="stretch"
      className={`${classes.margin} ${classes.mainContainer}`}
      container
    >
      {employees.length
        ? employees.map((employee) => (
            <Grid
              key={employee._id}
              xs={12}
              sm={6}
              md={3}
              className={classes.cardMargin}
              item
            >
              <Employee
                setCurrentId={setCurrentId}
                name={employee.name}
                startDate={employee.startDate}
                addedDate={employee.addedDate}
                phoneNumber={employee.phoneNumber}
                salary={employee.salary}
                id={employee._id}
                key={employee._id}
              />
            </Grid>
          ))
        : "No Employees Right Now 👱‍♂️"}
    </Grid>
  );
};

export default Empoyees;
