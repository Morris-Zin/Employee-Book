import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
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
    height: '100%'
  },
  chipInput: {
    margin: '20px 0px', 
    minHeight: '60px',
    maxHeight: 'auto'
  }
}));
