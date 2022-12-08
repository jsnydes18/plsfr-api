import config from "config";
import sqs from "../clients/aws";

const enqueue = async (msg, reqId) => {
  const params = {
    MessageBody: msg,
    QueueUrl: config.aws.sqs.queuUrl,
    MessageAttributes: {
      reqId: {
        DataType: "String",
        StringValue: reqId,
      },
    },
  };

  const res = await sqs.sendMessage(params).promise();
};
