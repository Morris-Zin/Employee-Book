import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  MenuItem,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createEmployee, editEmployee } from "../../actions/employees";
import UploadImage from "./UploadImage/UploadImage";
import axios from "axios";
import { IMAGE_UPLOAD } from "../../api";
import { LOADING_STARTED } from "../../CONSTANTS/actionTypes";

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
  amount: "",
  address: "",
  phoneNumber: "",
  currency: "MMK",
};

export default function Form() {
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { isLoading } = useSelector((state) => state.employees);
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const param = useParams();

  const employee = useSelector((state) => {
    return param && typeof state.employees.employees !== "string"
      ? state.employees.employees.find((employee) => employee._id === param.id)
      : null;
  });

  useEffect(() => {
    if (employee) {
      const amount = employee.salary.amount;
      const currency = employee.salary.currency;
      setFormValues({ ...INITIAL_VALUES, ...employee, amount, currency });
    } else {
      setFormValues(INITIAL_VALUES);
    }
  }, [employee]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let url;
    dispatch({type: LOADING_STARTED}); 

    if (selectedFile) {
      const fileParts = selectedFile.name.split(".");
      const fileName = fileParts[0];
      const fileType = fileParts[1];
      const response = await IMAGE_UPLOAD(fileName, fileType);

      const returnData = response.data.data.returnData;
      const signedRequest = returnData.signedRequest;
      url = returnData.url;

      const options = {
        headers: {
          "Content-Type": fileType,
          "x-amz-acl": "public-read",
        },
      };

      await axios.put(signedRequest, selectedFile, options);
    }

    if (!param.id) {
      dispatch(
        createEmployee(
          {
            ...formValues,
            salary: {
              amount: formValues.amount,
              currency: formValues.currency,
            },
            active: true,
            addedDate: new Date().toISOString(),
            imageUrl: url || "",
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
            salary: {
              amount: formValues.amount,
              currency: formValues.currency,
            },
            active: true,
            imageUrl: url || "",
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
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {isLoading ? (
        // <CircularProgress />
        <>
        <Backdrop className={classes.backdrop} open={isLoading} >
        <CircularProgress color="inherit" />
        <Typography variant="subtitle1" className={classes.subTitle} component="h4">Please wait ...</Typography>
      </Backdrop>
      </>
      ) : (
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
                {imageSrc && (
                  <>
                    <Typography variant="caption" component="h6">
                      Selected Photo - {selectedFile.name}
                    </Typography>
                    <img alt="Employee" height="300px" src={imageSrc} />
                  </>
                )}
                <Grid item xs={12} sm={12}>
                  {formValues.imageUrl && !imageSrc ? (
                    <>
                      <Typography variant="subtitle1" component="h6">
                        Current Employee's Photo
                      </Typography>
                      <img
                        alt="Employee"
                        height="300px"
                        src={formValues.imageUrl}
                      />
                    </>
                  ) : null}
                </Grid>
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
                  id="amount"
                  label="Salary Amount"
                  name="amount"
                  type="number"
                  onChange={handleChange}
                  value={formValues.amount}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
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
      )}
    </Container>
  );
}
