import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 320,
  },
  media: {
    height: 200,
    objectFit: 'cover', 
    backgroundPosition: 'center'
  },
  buttonColor: {
    color: theme.palette.info.light
  },
  margin: {
    margin: theme.spacing(0,1,0)
  }, 
  editIcon: {
    color: theme.palette.warning.contrastText,
    '&:hover': {
      color: 'orange'
    }
  }, 
  deleteIcon: {
    color: theme.palette.getContrastText(theme.palette.warning.main), 
    '&:hover': {
      color: theme.palette.error.main
    }
  }, 
  header: {
    fontSize: '12px',
  },
  listItemText:{
    fontSize:'0.7rem',//Insert your required size
    background: 'red'
  },
  divider: {
      margin: `${theme.spacing.y * 2}px 0`
  }
}));

export default useStyles;
