import config from "config";
import { sqs } from "../clients/aws.js";

const submitRequest = async (msg) => {
  const params = {
    MessageBody: msg,
    QueueUrl: config.aws.sqs.queueUrl
  };
  
  const res = await sqs.sendMessage(params).promise();
  return res.MessageId;
};

export default submitRequest;
