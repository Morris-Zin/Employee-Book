import React, { useState } from "react";
import { Typography, Paper, Button, TextField } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { queryAndGetEmployees } from "../../actions/employees";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import useStyles from "./styles";

const Search = () => {
  const classes = useStyles();

  const [searchQuery, setSearchQuery] = useState("");
  const [salaryTags, setsalaryTags] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

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
  );
};

export default Search;
