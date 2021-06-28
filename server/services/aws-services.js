const aws = require("aws-sdk");
const { v4: uuid } = require("uuid");
const awsSecretKeyId = process.env.awsAccessKeyId;
const awsSecretAccessKey = process.env.Y1NmH5Gw4CuRY5RAbIWf4LupFnu8UhUmbyW2R5TZ;

// Aws bucker name
const employeeBucket = "employee-books-images";

aws.config.update({
    secretAccessKey: awsSecretAccessKey, 
    accessKeyId: awsSecretKeyId,
    region: 'ap-southeast-1'
})

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

  //uploading an image and getting a signed url which we can see our images;
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ error: err });
    }
    //if is being successfull, we get the url to view or images tada
    const returnData = {
      signedRequest: data,
      url: `https://${bucketName}.s3.amazonaws.com/${fileKey}`,
    };
    console.log('This is return data', returnData)
    //giving back client
    res.json({data: {returnData}})
  });
};

exports.employeeBucket = employeeBucket; 
exports.getSignedRequest = getSignedRequest;