import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    margin: "20px auto 0px",
    display: "grid",
    placeItems: "center",
    width: "100%",
    height: "auto",

  },
}));

export default useStyles;
