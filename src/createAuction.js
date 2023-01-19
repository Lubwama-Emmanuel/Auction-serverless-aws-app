"use strict";

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.createAuction = async (event) => {
  const { title } = JSON.parse(event.body);
  const now = new Date();

  const item = {
    id: v4(),
    title,
    status: "OPEN",
    createdAt: now.toDateString(),
  };

  dynamo.put(
    {
      TableName: "AuctionsTable",
      Item: item,
    },
    function (err, data) {
      if (err) {
        console.log("AN ERROR OCCURED", err);
        return err;
      } else {
        console.log("Here is teh data", data);
        return data;
      }
    }
  );
  // console.log("This is the info", Auction)

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Worked",
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
