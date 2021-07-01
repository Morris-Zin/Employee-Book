import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import useStyles from "./styles";

function UploadImage({setImageSrc, setSelectedFile}) {
  const classes = useStyles();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader(); 
    fileReader.onloadend = () => {
      setImageSrc(fileReader.result)
    }
    fileReader.readAsDataURL(e.target.files[0]); 
    setSelectedFile(file); 
  };

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" className={classes.uploadImage} color="warning" component="span">
          Upload Image
        </Button>
      </label>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="icon-button-file">
        <IconButton
        className={classes.uploadImage}
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
}
export default UploadImage;
