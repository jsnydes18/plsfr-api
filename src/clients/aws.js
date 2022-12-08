import AWS from "aws-sdk";

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN } =
  process.env;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  sessionToken: AWS_SESSION_TOKEN,
  region: "us-east-2",
});

const sqs = new AWS.SQS();

export default sqs;
