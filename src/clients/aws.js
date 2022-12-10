import AWS from "aws-sdk";

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN } =
  process.env;

AWS.config.update({
  endpoint:"http://localhost.localstack.cloud:4566",
  region: "us-east-2",
});

const sqs = new AWS.SQS();
const ddb = new AWS.DynamoDB();

export { sqs, ddb };
