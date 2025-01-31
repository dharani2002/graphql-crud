import { gql } from "apollo-server-express";

export const typeDefs=gql`
    
  type Game{
      id:ID!
      title:String!
      platform:[String!]!
      reviews:[Review!]
      gameStats:GameStats
      deleted:Boolean!
      deletedAt:String
  }
  type Author{
      id:ID!
      name:String!
      verified:Boolean!
      reviews:[Review!]
      token:String
      isLoggedin:Boolean
  }
  type Review{
      id:ID!
      rating:Int!
      content:String!
      game:Game!
      author:Author!
      game_id: ID!
      author_id: ID!

  }
  type AddReview implements MutationResponse{
    code: Int!
    success: Boolean!
    message: String!
    review:Review
  }

  type GameStats {
      averageRating: Float!
      totalReviews: Int!
      ratings: [Int!]!
  }

    

  #Queries
  type Query{
      games(filters:GameFilters):[Game]
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
  addReview(review:AddReviewInput):AddReview
  deleteReview(id:ID!):[Review]
  updateReview(id:ID!,edits:EditReviewInput):Review
  addAuthor(name:String!):Author
  updateAuthor(id:ID!,name:String!):Author
  deleteAuthor(id:ID!):[Author]
  verifyAuthor(id:ID!):Author
  login(id:ID!):Author
  }
  input AddGameInput {
    title: String!,
    platform: [String!]!
  }
  input EditGameInput {
    title: String,
    platform: [String!]
  } 

  input AddReviewInput{
    rating:Int!,
    content:String!,
    game_id:ID!,
    author_id:ID!
  }

  input EditReviewInput{
    rating:Int,
    content:String
  }

  input GameFilters{
    platform: [String]
    minRating: Float
    maxRating: Float
    authorId: ID
  }

  interface MutationResponse {
  code: Int!
  success: Boolean!
  message: String!
}
`;
