import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '95%',
      margin: '10px auto',
      padding: '40px',
      borderRadius: '10px',
      marginTop: theme.spacing(3),      
    },
    media: {
      width: '100%', 
      height: '500px',
      maxHeight: '100%', 
      borderRadius: '10px',
      objectFit: 'cover',
      
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
    avatarContainer: {
      display: 'flex', 
      alignItems: 'center', 
      textAlign: 'center', 
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
    },
    avatarImage: {
      width: '30px', 
      height: '30px', 
      objectFit: 'cover', 
      borderRadius: '50%',
      margin: '0px 10px 5px 0px'
    },
    title: {
      fontSize: '1.4rem',
    },
    section: {
      marginTop: '20px'
    }, 
    aTag: {
      textDecoration: 'none',
      color: 'orange', 
      fontWeight: 'bold'
    },
    divider: {
      width: '90%', 
      margin: '15px 0px'
    }
  }));
  