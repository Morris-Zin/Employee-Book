const aws = require("aws-sdk");
const AmazonS3Uri = require("amazon-s3-uri");
const { v4: uuid } = require("uuid");
require("dotenv").config();
const awsSecretKeyId = process.env.awsAccessKeyId;
const awsSecretAccessKey = process.env.awsSecretAccessKey;


// Aws bucker name
const EMPLOYEE_BUCKET = "employee-book-images";
aws.config.update({
  apiVersion: "2006-03-01",
  secretAccessKey: awsSecretAccessKey,
  accessKeyId: awsSecretKeyId,
  region: "ap-southeast-1",
});

//Get signed request function to upload our images
const getSignedRequest = async (req, res, bucketName) => {
  //Creating an instance of s3 object
  const s3 = new aws.S3();
  //Making a file unique in the bucket , so the file names won't be duplicate
  const fileKey = uuid();
  //Getting the file type of the image or the thing that we are uploading;
  const fileType = req.body.fileType;
  //Specifying aws params
  const s3Params = {
    Bucket: bucketName,
    Key: fileKey,
    Expires: 500,
    // Saying aws what we are going to upload
    ContentType: fileType,
    //ACL: 'public-read' give access everyone to see the pics
    ACL: "public-read",
  };

  //uploading an image and getting a signed url which we can upload our images;
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ error: err });
    }
    //if is being successfull, we get the url to upload our image and the url becomes the image url that we 
    // can view images
    const returnData = {
      signedRequest: data,
      url: `https://${bucketName}.s3.amazonaws.com/${fileKey}`,
    };
    console.log("This is return data", returnData);
    //giving back client
    res.json({ data: { returnData } });
  });
};

const deleteS3Image = (currentPhoto) => {
  const s3 = new aws.S3();
  try {
    const { region, bucket, key } = AmazonS3Uri(currentPhoto);

    console.log(
      "those are returned object from amazons3uri",
      region,
      bucket,
      key
    );
    const EMPLOYEE_BUCKET = "employee-book-images";

    const deleteParams = {
      Bucket: EMPLOYEE_BUCKET,
      Key: key,
    };

    s3.deleteObject(deleteParams, (err, data) => {
      if (err) console.log(err);
      else console.log("deleted successfully");
    });
  } catch (error) {
    console.warn(`${currentPhoto} cannot be deleted in deleteS3Image function`);
  }
};

exports.EMPLOYEE_BUCKET = EMPLOYEE_BUCKET;
exports.getSignedRequest = getSignedRequest;
exports.deleteS3Image = deleteS3Image;
