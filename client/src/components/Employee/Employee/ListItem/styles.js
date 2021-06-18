import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    sizeAvatar: {
      height: theme.spacing(4),
      width: theme.spacing(4),
    },
    iconSize: {
        height: theme.spacing(2), 
        width: theme.spacing(2)
    },
  }));
  
export default useStyles;