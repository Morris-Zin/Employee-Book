import React from "react";
import { List, Avatar, ListItemAvatar, ListItemText } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import useStyles from './styles'; 

const Listitem = ({ Icon, primaryText, secondaryText }) => {
    const classes = useStyles(); 
  return (
    <>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.sizeAvatar}>
              <Icon className={classes.iconSize}  fontSize="small"/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={primaryText} secondary={secondaryText} />
        </ListItem>
      </List>
    </>
  );
};

export default Listitem;
