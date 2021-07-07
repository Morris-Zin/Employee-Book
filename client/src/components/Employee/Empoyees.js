import React, { useState } from "react";
import { Grid, Divider, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import Employee from "./Employee/Employee";
import { useLocation } from "react-router-dom";
import Paginate from "../Pagination/Paginate";
import Skeleton from "@material-ui/lab/Skeleton";
import Search from "../Search/Search";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Empoyees = ({ setCurrentId }) => {
  const query = useQuery();
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem("profile"));

  const { employees, isLoading } = useSelector((state) => state.employees);
  const page = query.get("page");
  const searchByName = query.get("searchByName");
  const salaryTags = query.get("salaryTags");
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {user && showSearch && <Search />}
      <Button
        color="secondary"
        className={classes.searchButton}
        onClick={() => setShowSearch((prevState) => !prevState)}
        variant="outlined"
      >
        {showSearch ? "Close Search Form" : "Show Search Form"}
      </Button>
      <Divider />

      <Grid alignItems="stretch" className={classes.mainContainer} container>
        {!isLoading
          ? employees.length && typeof employees !== "string"
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
                    phoneNumber={employee.phoneNumber}
                    salary={employee.salary}
                    imageUrl={employee.imageUrl}
                    id={employee._id}
                    key={employee._id}
                  />
                </Grid>
              ))
            : "There aren't any employee in your workshop right now 👀"
          : Array.from(new Array(8)).map((item, index) => (
              <Grid
                key={index}
                xs={12}
                sm={6}
                md={3}
                className={classes.cardMargin}
                item
              >
                <Skeleton variant="text" />
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="rect" width={210} height={118} />
              </Grid>
            ))}
        {!searchByName && !salaryTags && employees.length > 8 &&  <Paginate page={page || 1} />}
      </Grid>
    </>
  );
};

export default Empoyees;
