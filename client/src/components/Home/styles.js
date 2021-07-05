import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
 cardMargin: {
    margin: theme.spacing(0, 0, 3),
  },
  card: {
    width: "60%",
    height: "200px",
    display: "grid",
    placeItems: "center",
    margin: "40px auto",
  },
}));
