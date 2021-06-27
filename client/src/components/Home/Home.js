import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "../Navbar/Navbar";
import Employees from "../Employee/Empoyees";
import Form from "../Form/Form";
import ShowEmployee from "../Employee/ShowEmployee.js/ShowEmployee";
import { getEmployees } from "../../actions/employees";

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getEmployees());
    

  }, []);


  return (
    <>
      <Navbar />
      <Route
        exact
        path="/dashboard"
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
  );
};
export default Home;
