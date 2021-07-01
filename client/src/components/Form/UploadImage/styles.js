import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  uploadImage: {
    background: theme.palette.warning.main, 
    color: 'white', 
    '&:hover': {
      background: 'orange'
    }
  }
}));

export default useStyles;