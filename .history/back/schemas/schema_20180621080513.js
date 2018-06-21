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
    age: { type: graphql.GraphQLInt }
  }
});

// Define the Query type
const rootQuery = new graphql.GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: { id: { type: graphql.GraphQLString } },
      resolve: (parentValue, args) => _.find(fakeDatabase, { id: args.id })
    }
  }
});

module.exports = new graphql.GraphQLSchema({ query: rootQuery });
