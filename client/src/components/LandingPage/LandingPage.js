import React from "react";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import LandingImage from "../../images/landingImage.jfif";
import useStyles from "./styles";

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img className={classes.img} src={LandingImage} alt="Landing Content" />
      </div>
      <div className={classes.content}>
        <Typography variant="h4" className={classes.title}>
          Welcome to Employee Book✨
        </Typography>
        <Typography variant="body1" className={classes.body}>
          Having troubles managing your employees' data? Don't worry about that
          anymore! Employee-Book will manage your employee data better than
          anyone else.
        </Typography>
        <Button
          className={classes.button}
          component={Link}
          variant="contained"
          to="/dashboard"
        >
          Explore Now
        </Button>
        <div className={classes.footer}>
          <span className={classes.CopyRight}>CopyRight © {new Date().getFullYear()}</span>
        @Morris-Zin
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
