const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')
const MovieController = require('./controllers/MovieController.js')
const SeriesController = require('./controllers/SeriesController.js')
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
type Movie {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
}

type Series {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
}

input NewMovie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
}

input NewSeries {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
}

input EditedMovie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
}

input EditedSeries {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
}

type DeletedMovie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
}

type Query {
    movies: [Movie]
    movieById(id: ID!): Movie
    tvSeries: [Series]
    seriesById(id: ID!): Series
}

type Mutation {
    newMovie(newMovie: NewMovie): Movie
    newSeries(newSeries: NewSeries): Series
    editedMovie(editedMovie: EditedMovie, movieId: ID!): Movie
    editedSeries(editedSeries: EditedSeries, seriesId: ID!): Series
    deletedMovie(movieId: ID!): Movie
    deletedSeries(seriesId: ID!): Series
}
`

const resolvers = {
    Query: {
        movies() {
            return MovieController.findAllMovies()
        },
        movieById(_, args) {
            const {id} = args
            return MovieController.findOneMovie(id)
        },
        tvSeries() {
            return SeriesController.findAllTvSeries()
        },
        seriesById(_, args) {
            const {id} = args
            return SeriesController.findOneSeries(id)
        },

    },
    Mutation: {
        newMovie(_, args) {
            const {newMovie} = args
            return MovieController.addMovies(newMovie)
        },
        newSeries(_, args) {
            const {newSeries} = args
            return SeriesController.addSeries(newSeries)
        },
        editedMovie(_, args) {
            const {editedMovie, movieId} = args
            return MovieController.editMovie(editedMovie, movieId)
        },
        editedSeries(_, args) {
            const {editedSeries, seriesId} = args
            return SeriesController.editSeries(editedSeries, seriesId)
        },
        deletedMovie(_, args) {
            const {movieId} = args
            return MovieController.deleteMovie(movieId)
        },
        deletedSeries(_, args) {
            const {seriesId} = args
            return SeriesController.deleteSeries(seriesId)
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Apollo server ready at ${url}`);
  });

