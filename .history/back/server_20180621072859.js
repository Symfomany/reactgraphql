const express = require("express");
const expressGraphQL = require("express-graphql");

const server = express();

server.use(
  "/hello",
  expressGraphQL({
    graphiql: true // interface graphique GraphQL
  })
); // launch Dashboard with config
server.listen(4000, () => {
  console.log("Server listen 4000");
});
