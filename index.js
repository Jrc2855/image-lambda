const AWS = require('aws-sdk');
const S3 = new AWS.S3();

exports.handler = async (event) => {

  try {
    if (!event || !event.Records || !event.Records[0]) {
      throw new Error('Invalid Event.');
    }
    let Bucket = event.Records[0].s3.bucket.name;
    let Key = event.Records[0].s3.object.key;

    let imageJson = await S3.getObject({ Bucket, Key }).promise();
    let strImageJson = imageJson.Body.toString();
    let parsedImageJson = JSON.parse(strImageJson);

    console.warn(parsedImageJson);

    const response = {
      statusCode: 200,
      body: JSON.stringify('Success'),
    };
    return response;

  } catch (e) {
    console.error(e);
    const response = {
      statusCode: 500,
      body: JSON.stringify('Error'),
    };
    return response;
  }
};
