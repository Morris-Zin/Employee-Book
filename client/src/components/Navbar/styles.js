import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    navBar: {
      background: 'white',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textDecoration: 'none',
      color: 'black', 
      fontSize: 22, 
      [theme.breakpoints.down('sm')]: {
        fontSize: 15
      },
    },
    button: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 13
      },
      color: 'black',   
    }
  }));

export default useStyles;   