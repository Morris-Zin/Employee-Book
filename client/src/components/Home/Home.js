import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "../Navbar/Navbar";
import Employees from "../Employee/Empoyees";
import Form from "../Form/Form";
import ShowEmployee from "../Employee/ShowEmployee.js/ShowEmployee";
import { getEmployees } from "../../actions/employees";
import useStyles from "./styles";
import { Card, CardActions, CardHeader, Button } from "@material-ui/core";

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const history = useHistory(); 
  
  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  return (
    <>
      <Navbar />
      {user ? (
        <>
          <Route
            exact
            path="/dashboard"
            render={(props) => {
              return <Employees {...props} setCurrentId={setCurrentId} />;
            }}
          />
          <Route
            exact
            path="/dashboard/search"
            render={(props) => {
              return <Employees {...props} setCurrentId={setCurrentId} />;
            }}
          />
          <Route exact path="/addEmployee" component={Form} />
          <Route exact path="/editEmployee/:id/edit" component={Form} />

          <Route
            exact
            path="/showEmployee/:id"
            render={(props) => {
              return <ShowEmployee {...props} currentId={currentId} />;
            }}
          />
        </>
      ) : (
        <Card className={classes.card}>
          <CardHeader
            title="Please Sign into your workshop to create and see employees"
            titleTypographyProps={{ variant: "h6" }}
          />
          <CardActions>
            <Button
              onClick={() => history.push("/auth")}
              variant="outlined"
              color="secondary"
            >
              Register Now
            </Button>
          </CardActions>
        </Card>
      ) }
    </>
  );
};
export default Home;
