import config from "config";
import { ddb } from "../clients/aws.js";

const pullResults = async (reqId) => {
  const params = {
    ExpressionAttributeValues: {
      ":v1": {
        S: reqId,
      },
    },
    KeyConditionExpression: "reqId = :v1",
    ProjectionExpression: config.aws.ddb.sortKey,
    TableName: config.aws.ddb.tableName,
  };
  console.log(params);
  const res = await ddb.query(params).promise();
  return res;
};

export default pullResults;
