import React, { useEffect, useState } from "react";
import PostAddIcon from "@material-ui/icons/PostAdd";
import useStyles from "./styles";
import CopyRight from "../utils/CopyRight";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  MenuItem,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createEmployee, editEmployee } from "../../actions/employees";

  // const decideIsValid = (formValues) => {
  //   let decidentArray = [];

  //   let { name, startDate, salary, address, phoneNumber } = formValues;
  //   const neededValues = { name, startDate, salary, address, phoneNumber };

  //   for (let i in neededValues) {
  //     if (formValues[i]) {
  //       decidentArray.push(true);
  //     } else {
  //       decidentArray.push(false);
  //     }
  //   }
  //   let finalDecison;
  //   decidentArray.forEach((el) => {
  //     if (el) {
  //       finalDecison = el;
  //     } else {
  //       finalDecison = el;
  //     }
  //   });
  //   return finalDecison;
  // };

const currencies = [
  {
    value: "MMK",
    label: "MMK",
  },
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
];

const INITIAL_VALUES = {
  name: "",
  active: false,
  startDate: "",
  addedDate: "",
  salary: "",
  address: "",
  phoneNumber: "",
  currency: "MMK",
};

export default function Form() {
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const param = useParams();

  const employee = useSelector((state) => {
    return param && typeof state.employees !== "string"
      ? state.employees.find((employee) => employee._id === param.id)
      : null;
  });
  useEffect(() => {
    if (employee) {
      const salary = employee.salary.split(" ")[0];
      setFormValues({ ...INITIAL_VALUES, ...employee, salary });
    } else {
      setFormValues(INITIAL_VALUES);
    }
  }, [employee]);


  const onSubmit = (e) => {
    e.preventDefault();

    if ( !param.id) {
      dispatch(
        createEmployee(
          {
            ...formValues,
            salary: `${formValues.salary} ${formValues.currency}`,
            active: true,
            addedDate: new Date().toISOString(),
          },
          history
        )
      );
    }
    if (param.id) {
      dispatch(
        editEmployee(
          {
            ...formValues,
            salary: `${formValues.salary} ${formValues.currency}`,
            active: true,
          },
          param.id,
          history
        )
      );
    }
    // console.log({
    //   ...formValues,
    //   active: true,
    //   addedDate: new Date().toISOString,
    // });
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    // decideIsValid(formValues);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PostAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {!employee ? 'Create a new Employee' : `Edit ${employee.name}`} 
        </Typography>
        <Typography component="h4" variant="h6"></Typography>
        <form className={classes.form} onSubmit={onSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name of the Employee"
                onChange={handleChange}
                value={formValues.name}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="date"
                id="Started Working Date"
                name="startDate"
                onChange={handleChange}
                helperText="Started Working Date"
                value={formValues.startDate}
                required
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                id="standard-select-currency"
                select
                label="Select"
                value={formValues.currency}
                name="currency"
                onChange={handleChange}
                helperText="Please select your currency"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="salary"
                label="Salary"
                name="salary"
                type="number"
                onChange={handleChange}
                value={formValues.salary}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                // type="number"
                id="phoneNumber"
                helperText="Include your country phone number suffix"
                onChange={handleChange}
                value={formValues.phoneNumber}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Address"
                id="address"
                onChange={handleChange}
                value={formValues.address}
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            required
          >
            Add Now
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <CopyRight />
      </Box>
    </Container>
  );
}
