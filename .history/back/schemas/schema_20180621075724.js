const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql = require("graphql");
const _ = require("lodash");
// Maps id to User object
const fakeDatabase = [
  {
    id: "a",
    firstname: "Julien",
    age: 23
  },
  {
    id: "b",
    firstname: "Romain",
    age: 20
  },
  {
    id: "c",
    firstname: "Yann",
    age: 26
  }
];

// Define the User type
const userType = new graphql.GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: graphql.GraphQLString },
    firstname: { type: graphql.GraphQLString },
    age: { type: GraphQLInt }
  }
});

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (parentValue, args) => _find(fakeDatabase[id], { id: args.id }) // resultat
    }
  }
});

const schema = new graphql.GraphQLSchema({ query: queryType });

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(5000);
console.log("Running a GraphQL API server at localhost:5000/graphql");
