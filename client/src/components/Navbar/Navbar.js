import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./styles";
import { Link, useLocation } from "react-router-dom";
import AuthButton from "./Menu/AuthButton";
import decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { logOut } from "../../actions/users";
import { useDispatch } from "react-redux";
import { getEmployees } from "../../actions/employees";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const userToken = user?.token;

    if (userToken) {
      const expireDate = decode(userToken).exp;
      expireDate * 1000 < new Date().getTime() && logout(history);
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch(logOut(history));
    setUser(null);
    history.push("/");
  };

  return (
    <AppBar position="static" className={classes.navBar}>
      <Toolbar>
        <Typography
          onClick={() => dispatch(getEmployees())}
          component={Link}
          to={`${user ? "/dashboard" : "/"}`}
          variant="h6"
          className={classes.title}
        >
          Employee-book
        </Typography>
        {user && (
          <Button component={Link} to="/addEmployee" color="inherit" className={classes.button}>
            {" "}
            New Employee
          </Button>
        )}
        <AuthButton user={user} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
