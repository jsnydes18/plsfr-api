import config from "config";
import { ddb } from "../clients/aws.js";

const pullResults = async (reqId) => {
  // const params = {
  //   ExpressionAttributeValues: {
  //     ":v1": {
  //       S: reqId,
  //     },
  //   },
  //   KeyConditionExpression: "reqId = :v1",
  //   ProjectionExpression: config.aws.ddb.sortKey,
  //   TableName: config.aws.ddb.tableName,
  // };
  // console.log(params);
  // const res = await ddb.query(params).promise();
  // return res;

  const pages = [];
  const numPages = Math.ceil(Math.random() * 10);
  for (let x = 0; x <= numPages; x += 1) {
    const playlists = [];
    for (let y = 0; y <= Math.ceil(Math.random() * 25); y += 1) {
      playlists.push({
        name: "test",
        followers: Math.ceil(Math.random() * 10000),
        tracks: Math.ceil(Math.random() * 200),
        popularity: Math.random() * 100,
        lastModified: `${Math.ceil(Math.random() * 365)} days ago`,
        ownerDetails: {
          spotify: "1234567890",
          instagram: "@testinsta",
          twitter: "@testtwit",
          email: "testemail@testurl.com",
        },
      });
    }
    pages.push({
      pageNum: x,
      playlists,
    });
  }

  return {
    pages,
  };
};

export default pullResults;
