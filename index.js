import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs } from "./Schema/TypeDefs.js";
import { resolvers } from "./Schema/Resolvers.js";
import { authContext,ipContext } from "./auth.js";

const app=express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    ...await authContext({ req }),
    ...ipContext({ req })
  }),
});

async function startServer() {
  await server.start(); // Ensure the server is started
  server.applyMiddleware({ app }); // Then apply the middleware

  app.listen({ port: 8000 }, () => {
    console.log("Server running at port 8000");
  });
}

startServer();