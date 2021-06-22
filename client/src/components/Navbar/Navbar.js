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
import decode from 'jwt-decode';
import {useHistory } from "react-router-dom";
import { logOut } from "../../actions/users";
import { LOG_OUT } from "../../CONSTANTS/actionTypes";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useHistory();
  const dispatch = useDispatch(); 
  const location = useLocation();

  useEffect(() => {
    const userToken = user?.token; 
    
    if(userToken) {
      const expireDate = decode(userToken).exp; 
      expireDate * 1000 < new Date().getTime() && logout()
    } 
    setUser(JSON.parse(localStorage.getItem("profile")))

  }, [location]);


  const logout = () => {
    dispatch(logOut({type: LOG_OUT})); 
    setUser(null); 
    history.push('/');
  }


  return (
    <AppBar position="static" className={classes.navBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          className={classes.title}
        >
          Employee-book
        </Typography>
        {user && (
          <Button component={Link} to="/addEmployee" color="inherit">
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
