import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    maxWidth: "100vw",
    postion: "relative",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
  },
  imageContainer: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    zIndex: -3,
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: "0.5",
  },
  content: {
    color: "white",
    maxWidth: "700px",
    textAlign: 'center'
  },
  title: {
    marginBottom: "20px",
  },
  button: {
    marginTop: "23px",
    background: "orange",
    color: 'white', 
    fontSize: '0.9rem', 
    '&:hover': {
     background: '#ff8c00'
    },
  },
  footer: {
    display: 'flex',
    justifyContent: 'center', 
    position: "absolute",
    bottom: '15px',
    left: '50%', 
    transform: 'translate(-50%,-50%)', 
    opacity: '0.5'
  },
  CopyRight: {
    display: 'inline-block', 
    marginRight: '16px'  
  }
}));
export default useStyles;
