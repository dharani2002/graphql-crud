# GraphQL CRUD implementations

## data explaination

fake data has been generated and saved in a js file. for games, reviews, and authors
games contain id, title and platform, it also has a one to many relation to all the reviews
reviews has an id, rating, content and authoris and game id which acts as a foreign key
author has id, name and verified fields and also has a ine to many relationship with reviews

## typedefs
types: Game, Auhtor, Review, Query, Mutation
Query: games(fetches all games), game(fetches game that matches passed ID)
Mutation: add, delete and update game
Subscription: input for addgame and deletegame 
