import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(3, 2, 3),
  },
  cardMargin: {
    margin: theme.spacing(0, 0, 3),
  },
  card: {
    width: "60%",
    height: "200px",
    display: "grid",
    placeItems: "center",
    margin: "auto",
  },
  search: {
    width: "50%",
    height: "auto",
    margin: "30px auto",
  },
  searchTitle: {
    marginTop: "10px",
  },
  searchPortion: {
    padding: "20px",
    width: "50%",
    margin: "10px auto",
    display: "flex",
    flexDirection: 'column', 
    alignItems: "center",
    justifyContent: "center",
  },
  chipInput: {
    margin: '20px 0px', 
    height: '60px'
  }
}));
