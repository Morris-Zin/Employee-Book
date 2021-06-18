import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Employees from "./Employee/Empoyees";
import { CssBaseline, Link } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getEmployees } from "../actions/employees";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Form from "./Form/Form";
import ShowEmployee from "./Employee/ShowEmployee.js/ShowEmployee";
const App = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <CssBaseline>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
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
          </Switch>
        </CssBaseline>
      </BrowserRouter>
    </div>
  );
};

export default App;
