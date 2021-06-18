import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  buttonColor: {
    color: theme.palette.info.light
  },
  margin: {
    margin: theme.spacing(0,1,0)
  }, 
  editButton: {
    textDecoration: 'none', 
    '&:focus': {
      background: theme.palette.info.main, 
      color: 'white'
    }
  }, 
  exploreMore: {
    
    background:theme.palette.info.main , 
    '&:hover': {
      background: theme.palette.primary.light
    }
  }, 
  header: {
    fontSize: '12px',
  },
  listItemText:{
    fontSize:'0.7rem',//Insert your required size
    background: 'red'
  },
  deleteIcon: {
    color: theme.palette.error.main
  }

}));

export default useStyles;
