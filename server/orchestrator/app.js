const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')
const MovieController = require('./controllers/MovieController.js')
const SeriesController = require('./controllers/SeriesController.js')
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
type Movie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
}

type Series {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
}

type Query {
    movies: [Movie]
    tvSeries: [Series]
}
`

// const getMovies = 
//     axios({
//         url: `http://localhost:4001/movies`,
//         method: 'get'
//     })
//     .then(({data}) => {
//         return data
//     })
//     .catch(err => {
//         console.log(err)
//         return err
//     })

const getSeries = 
    axios({
        url: `http://localhost:4002/tvseries`,
        method: 'get'
    })
    .then(({data}) => {
        return data
    })
    .catch(err => {
        console.log(err)
        return err
    })

const resolvers = {
    Query: {
        movies() {
            return MovieController.findAllMovies()
        },
        tvSeries() {
            return SeriesController.findAllTvSeries()
        }
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Apollo server ready at ${url}`);
  });

