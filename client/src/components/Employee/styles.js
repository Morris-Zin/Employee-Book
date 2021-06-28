import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(3, 2, 3), 
  },
  cardMargin: {
    margin: theme.spacing(0,0,3)
  }, 
  card: {
    width: '60%',
    height: '200px',
    display:'grid', 
    placeItems: 'center', 
    margin: 'auto'
  }

}));
