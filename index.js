import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs } from "./Schema/TypeDefs.js";
import { resolvers } from "./Schema/Resolvers.js";

const app=express();

const server=new ApolloServer({typeDefs,resolvers})

async function startServer() {
  await server.start(); // Ensure the server is started
  server.applyMiddleware({ app }); // Then apply the middleware

  app.listen({ port: 8000 }, () => {
    console.log("Server running at port 8000");
  });
}

startServer();