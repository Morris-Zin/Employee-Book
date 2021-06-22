import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Paper,
  Grid,
  Tooltip,
  Typography,
  IconButton,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router";
import CopyRight from "../utils/CopyRight";
import {useDispatch} from 'react-redux'
import {signup, logIn} from '../../actions/users'

const INITIAL_VALUES = {
  name: '', 
  email: '', 
  password: '',
}

function AuthFrom() {
  const classes = useStyles();
  const history = useHistory();
  const [signUp, setSignUp] = useState(true);
  const [formValues, setFormValues] = useState(INITIAL_VALUES); 
  const dispatch = useDispatch();
 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    if (signUp) {
      dispatch(signup(formValues, history)); 
    } else {
      dispatch(logIn(formValues, history)); 
    }
  }

  const handleChange = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }
 
  const handleSwitch = () =>  {
   setSignUp((prevValue) => !prevValue); 
   setFormValues(INITIAL_VALUES);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {signUp ? "Sign Up" : "Login"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            {signUp && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="User Name"
                name="name"
                autoFocus
                required
                onChange={handleChange}
                value={formValues.name}
              />
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              required
              value={formValues.email}
              onChange={handleChange}

            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              value={formValues.password}
              onChange={handleChange}

            />

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Tooltip title="Go back to home page">
                  <IconButton
                    className={classes.goback}
                    onClick={() => history.push("/")}
                  >
                    <KeyboardBackspaceIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Link
                  onClick={handleSwitch}
                >
                  {signUp
                    ? "One of us? Login In"
                    : "Don't have an account? Create One"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <CopyRight />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default AuthFrom;
