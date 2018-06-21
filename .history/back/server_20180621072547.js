const express = require("express");
const expressGraphQL = require("express-graphql");

const server = express();

server.listen(4000, () => {
  console.log("Server listen 4000");
});
