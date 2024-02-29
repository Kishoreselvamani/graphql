import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import {games,authors,reviews} from './_db.js'



const resolvers = {
    Query:{
        games(){
            return games
        },
        authors(){
            return authors
        },
        reviews(){
            return reviews
        },
        review(_,args){
            return reviews.find((review) => review.id===args.id)
        },
        game(_,args){
            return games.find((game) => game.id===args.id )
        },
        author(_,args){
            return authors.find((author) => author.id===args.id)
        }


    },
    Game:{
        reviews(parent){
            return reviews.filter((r) => r.game_id === parent.id)
        },
    },
    Author:{
        reviews(parent){
            return reviews.filter((r) => r.author_id=== parent.id)
        }
    } ,
    Review:{
        author(parent){
            return authors.find((r) => r.id === parent.author_id)
        },
        game    (parent) { 
            return games.find((r) => r.id === parent.author_id )
        }
    } ,
    Mutation:{
        deletegame(_,args){
            games = games.filter((g) => g.id !== args.id)
            return games
        }
    }

    }

//server setup
const server = new ApolloServer({
 typeDefs,
 resolvers
})
const {url} = await startStandaloneServer(server,{
    listen:{port:4000}
})

console.log("server is ready at" ,4000);