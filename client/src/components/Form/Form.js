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
import UploadImage from "./UploadImage/UploadImage";
import axios from "axios";
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
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
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

    if (!param.id) {
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
    console.log("param id", param.id);
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
    selectedFile && handleFileUpload(selectedFile);
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (file) => {
    const fileParts = file.name.split(".");
    const fileName = fileParts[0];
    const fileType = fileParts[1];
    axios
      .post("http://localhost:8000/api/uploadEmployeeImages", {
        fileName,
        fileType,
      })
      .then((response) => {
        const returnData = response.data.data.returnData;
        const signedRequest = returnData.signedRequest;
        const url = returnData.url;
        console.log(signedRequest, url, "from client");

        const options = {
          headers: {
            "Content-Type": fileType,
            "x-amz-acl": "public-read",
          },
        };

        axios
          .put(signedRequest, file, options)
          .then(() => console.log("File uploaded successfully"))
          .catch((e) => console.log(e));
      })
      .catch((e) => {
        console.log("there is an error", e);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {!employee ? "Create a new Employee" : `Edit ${employee.name}`}
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
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
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <UploadImage
                setImageSrc={setImageSrc}
                setSelectedFile={setSelectedFile}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {imageSrc && <img alt="Employee" height="300px" src={imageSrc} />}
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
    </Container>
  );
}
