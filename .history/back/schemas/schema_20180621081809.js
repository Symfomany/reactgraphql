const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql = require("graphql");
const _ = require("lodash");
const axios = require("axios");
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
const capitaleType = new graphql.GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: graphql.GraphQLInt },
    title: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    pop: { type: graphql.GraphQLInt }
  }
});

// Define the Query type
const rootQuery = new graphql.GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: capitaleType,
      // `args` describes the arguments that the `user` query accepts
      args: { id: { type: graphql.GraphQLString } },
      resolve: (parentValue, args) =>
        axios
          .get(`http://localhost:3000/datas/${args.id}`)
          .then(res => res.data) //_.find(fakeDatabase, { id: args.id })
    }
  }
});

module.exports = new graphql.GraphQLSchema({ query: rootQuery });
