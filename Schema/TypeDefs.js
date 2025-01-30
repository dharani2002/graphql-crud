import { gql } from "apollo-server-express";

export const typeDefs=gql`
    type User {
        id:ID!
        name:String!
        age:Int!
        married:Boolean!
    }
    type Game{
        id:ID!
        title:String!
        platform:[String!]!
        reviews:[Review!]
    }
    type Author{
        id:ID!
        name:String!
        verified:Boolean!
        reviews:[Review!]
    }
    type Review{
        id:ID!
        rating:Int!
        content:String!
        game:Game!
        author:Author!

    }
    

    #Queries
    type Query{
        users:[User]
        games:[Game]
        game(id:ID!):Game
        reviews:[Review]
        review(id:ID!):Review
        authors:[Author]
        author(id:ID!):Author
    }
    #mutatons
    type Mutation {
    addGame(game: AddGameInput!): Game
    deleteGame(id: ID!): [Game]
    updateGame(id: ID!, edits: EditGameInput): Game
  }
  input AddGameInput {
    title: String!,
    platform: [String!]!
  }
  input EditGameInput {
    title: String,
    platform: [String!]
  }

    
    
`;
