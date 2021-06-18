import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '500px',
      margin: 'auto',
      marginTop: theme.spacing(3)
  
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: theme.palette.error.dark,
    },
    focus: {
        fontWeight: 'bold', 
        fontColor: 'black'  
    },
    marginLeft: {
      marginLeft: 'auto'
    },
    link: {
      textDecoration: 'none', 
      color: 'black'
    }
  }));
  