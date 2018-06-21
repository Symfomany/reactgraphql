const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("schemas/schema.js");
const server = express();

server.use(
  "/hello",
  expressGraphQL({
    graphiql: true, // interface graphique GraphQL
    schema: schema
  })
); // launch Dashboard with config
server.listen(4000, () => {
  console.log("Server listen 4000");
});
