import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  Typography,
  Paper,
  Divider,
  Button,
  TextField,
  CardActions,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import Employee from "./Employee/Employee";
import ChipInput from "material-ui-chip-input";
import { getEmployees, queryAndGetEmployees } from "../../actions/employees";
import { useHistory, useLocation } from "react-router-dom";
import Paginate from "../Pagination/Paginate";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Empoyees = ({ setCurrentId }) => {
  const query = useQuery();
  const [salaryTags, setsalaryTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const classes = useStyles();

  const employees = useSelector((state) => {
    return state.employees.employees;
  });

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const page = query.get("page");
  const searchByName = query.get("searchByName");

  const handleAddChip = (chip) => {
    setsalaryTags([...salaryTags, chip]);
  };

  const handleDeleteChip = (chip) => {
    setsalaryTags(salaryTags.filter((tag) => tag !== chip));
  };

  const handlePress = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (salaryTags.length || searchQuery.trim()) {
      dispatch(queryAndGetEmployees({ searchQuery, salaryTags }));
      return history.push(
        `/dashboard/search?searchByName=${
          searchQuery || "none"
        }&salaryTags=${salaryTags.join(",")}`
      );
    }
    history.push("/dashboard/search");
  };

  return (
    <>
      {user && (
        <Paper className={classes.search} elevation={2}>
          <Typography
            align="center"
            variant="subtitle1"
            className={classes.searchTitle}
          >
            Search Employees
          </Typography>
          <div className={classes.searchPortion}>
            <TextField
              label="Search By Name"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onKeyPress={handlePress}
              name="search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ChipInput
              fullWidth
              className={classes.chipInput}
              value={salaryTags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
              label="Search By Salary"
              variant="outlined"
            />
            <Button
              onClick={handleSearch}
              fullWidth
              variant="outlined"
              color="secondary"
            >
              Search
            </Button>
          </div>
        </Paper>
      )}
      <Divider />

      <Grid alignItems="stretch" className={classes.mainContainer} container>
        {user ? (
          employees.length && typeof employees !== "string" ? (
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
        )}
        {!searchByName && !salaryTags.length && <Paginate page={page || 1} />}
      </Grid>
    </>
  );
};

export default Empoyees;
