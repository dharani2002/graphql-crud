import db from "../FakeData.js"


export const resolvers = {
    Query: {
      games() {
        return db.games
      },
      game(_, args) {
        return db.games.find((game) => game.id === args.id)
      },
      authors() {
        return db.authors
      },
      author(_, args) {
        return db.authors.find((author) => author.id === args.id)
      },
      reviews() {
        return db.reviews
      },
      review(_, args) {
        return db.reviews.find((review) => review.id === args.id)
      },
    },
    Game: {
      reviews(parent) {
        return db.reviews.filter((r) => r.game_id === parent.id)
      },

      gameStats(parent){
        const reviews=db.reviews.filter((r)=>r.game_id===parent.id)
        if (reviews.length === 0) {
          return {
              averageRating: 0,
              totalReviews: 0,
              ratings: []
          };
        }

        const ratings = reviews.map(review => review.rating);
        const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

        return {
            averageRating: Number(averageRating.toFixed(2)),
            totalReviews: reviews.length,
            ratings: ratings
        };
        }
    },
    Review: {
      author(parent) {
        return db.authors.find((a) => a.id === parent.author_id)
      },
      game(parent) {
        return db.games.find((g) => g.id === parent.game_id)
      }
    },
    Author: {
      reviews(parent) {
        return db.reviews.filter((r) => r.author_id === parent.id)
      }
    },
    Mutation: {
      addGame(_, args) {
        let game = {
          ...args.game, 
          id: Math.floor(Math.random() * 10000).toString()
        }
        db.games.push(game)
  
        return game
      },
      deleteGame(_, args) {
        db.games = db.games.filter((g) => g.id !== args.id)
  
        return db.games
      },
      updateGame(_, args) {
        db.games = db.games.map((g) => {
          if (g.id === args.id) {
            return {...g, ...args.edits}
          }
  
          return g
        })
  
        return db.games.find((g) => g.id === args.id)
      },
      addReview(_,args,context){
        //console.log('Received args:', args);
        console.log('Received context ip:', context.ip);
        const ip_address = context.ip
        const game= db.games.find((g) => g.id === args.review.game_id)
        if(!game){
          return {code:404,success:false,message:"game not found",review:null}
        }
        const author= db.authors.find((a) => a.id === args.review.author_id) 
        if(!author){
          return {code:404,success:false,message:"author not found",review:null}
        }
        if(!author.verified){
          return {code:403,success:false,message:"author not verified",review:null}
        }
        const existingReview = db.reviews.find(
          r => r.author_id === args.review.author_id && r.game_id === args.review.game_id
        )
        
        if (existingReview) {
            return {
                code: 400,
                success: false,
                message: "You have already reviewed this game",
                review: null
            }
        }
        let review={
          ...args.review,
          id: Math.floor(Math.random() * 10000).toString()
        }
        db.reviews.push(review)
        return {code:200,success:true,review,message:"review added successfully"}
      },
      updateReview(_, args) {
        db.reviews = db.reviews.map((g) => {
          if (g.id === args.id) {
            return {...g, ...args.edits}
          }
  
          return g
        })
  
        return db.reviews.find((g) => g.id === args.id)
      },
      deleteReview(_, args) {
        db.reviews = db.reviews.filter((g) => g.id !== args.id)
  
        return db.reviews
      },
      addAuthor(_,args){
        let author = {
          ...args.author, 
          id: Math.floor(Math.random() * 10000).toString(),
          verified:false
        }
        db.authors.push(author)
  
        return author
      },
      updateAuthor(_,args){
        db.authors = db.authors.map((g) => {
          if (g.id === args.id) {
            return {...g, ...args.edits}
          }
  
          return g
        })
  
        return db.authors.find((g) => g.id === args.id)

      },
      deleteAuthor(_,args){
        db.authors = db.authors.filter((g) => g.id !== args.id)
  
        return db.authors
      },
      verifyAuthor(_,args){
        db.authors = db.authors.map((g) => {
          if (g.id === args.id && !g.verified) {
            g.verified=true
          }
  
          return g
        })
  
        return db.authors.find((g) => g.id === args.id)

      }     
    }
  }
  