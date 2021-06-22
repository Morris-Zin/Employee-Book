import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  CardHeader,
} from "@material-ui/core";
import React from "react";
import Listitem from "./ListItem/Listitem.js";
import useStyles from "./styles";
import PhoneIcon from "@material-ui/icons/Phone";
import PaymentIcon from "@material-ui/icons/Payment";
import WorkIcon from "@material-ui/icons/Work";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../../actions/employees.js";

const DEFAULT_IMAGE =
  "https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png";

const Employee = ({
  name,
  startDate,
  addedDate,
  phoneNumber,
  salary,
  id,
  setCurrentId,
}) => {

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const deleteThePost = () => {
    dispatch(deleteEmployee(id, history));
  };

  const handleClick = () => {
    setCurrentId(id); 
    history.push(`/showEmployee/${id}`)
  }

  return (
    <CssBaseline>
      <Card className={`${classes.root}`}>
        <CardHeader
          className={classes.header}
          action={
            <IconButton aria-label="settings" onClick={deleteThePost}>
              <DeleteOutlineIcon className={classes.deleteIcon} />
            </IconButton>
          }
          title={name}
          subheader={  moment(addedDate).fromNow()}
          titleTypographyProps={{ variant: "h6" }}
          subheaderTypographyProps={{ variant: "caption" }}
        />

        <CardActionArea onClick={handleClick}>
          <CardMedia
            className={classes.media}
            image={DEFAULT_IMAGE}
            title={name}
          />
          <CardContent>
            <Listitem
              key={Math.random()}
              Icon={PhoneIcon}
              primaryText="Phone Number"
              secondaryText={phoneNumber}
              className={classes.listItemText}
            />
            <Listitem
              key={Math.random()}
              Icon={PaymentIcon}
              primaryText="Salary"
              secondaryText={salary}
              className={`${classes.listItemText}`}
            />
            <Listitem
              key={Math.random()}
              Icon={WorkIcon}
              primaryText="Date Started Working"
              secondaryText={moment(startDate).format("YYYY MM DD")}
              className={classes.listItemText}
            />
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            className={classes.exploreMore}
            size="small"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Explore more
          </Button>
          <Button
            className={classes.editButton}
            variant="outlined"
            size="small"
            color="primary"
            component={Link}
            to={`/editEmployee/${id}/edit`}
          >
            Edit the employee
          </Button>
        </CardActions>
      </Card>
    </CssBaseline>
  );
};

export default Employee;
