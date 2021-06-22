import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { Avatar } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../../actions/users";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.info.light,
  },
}));

const StyledMenuItem = withStyles((theme) => ({}))(MenuItem);

export default function AuthButton({user}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <Avatar className={classes.avatar}>
          {" "}
          <PersonOutlineIcon />
        </Avatar>
      </Button>
      <StyledMenu
        id="customized-menu"  
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!user ? (
          [
            <StyledMenuItem onClick={() => history.push("/auth")} key={1}>
              <ListItemIcon>
                <SubdirectoryArrowRightIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </StyledMenuItem>

          ]
        ) : (
          <StyledMenuItem key={2}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Log Out"
              onClick={() => dispatch(logOut(history))}
            />
          </StyledMenuItem>
        )}
      </StyledMenu>
    </div>
  );
}
