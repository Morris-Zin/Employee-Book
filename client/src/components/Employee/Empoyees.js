import React from "react";
import { Grid, Card, CardHeader } from "@material-ui/core";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import Employee from "./Employee/Employee";

const Empoyees = ({ setCurrentId }) => {
  const classes = useStyles();
  const employees = useSelector((state) => state.employees);
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Grid alignItems="stretch" className={classes.mainContainer} container>
      {user ? (
        employees.length && employees && typeof employees !== "string" ? (
          employees.map((employee) => (
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
                imageUrl={employee.imageUrl}
                id={employee._id}
                key={employee._id}
              />
            </Grid>
          ))
        ) : (
          "There aren't any employee in your workshop right now 👀"
        )
      ) : (
        <Card className={classes.card}>
          <CardHeader
            title="Please Sign into your workshop to create and see employees"
            titleTypographyProps={{ variant: "h6" }}
          />
        </Card>
      )}
    </Grid>
  );
};

export default Empoyees;
