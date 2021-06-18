import React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./styles";
import  {Link} from 'react-router-dom' 
import AuthButton from "./Menu/AuthButton";


const Navbar = () => {
  const classes = useStyles();
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
        <Typography  component={Link} to="/"  variant="h6" className={classes.title}>
          Employee-book
        </Typography>
          <Button component={Link} to="/addEmployee"  color="inherit"> New Employee</Button>
          <AuthButton/>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
