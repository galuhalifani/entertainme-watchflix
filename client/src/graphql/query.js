import { gql } from '@apollo/client'

export const GET_HOME_DATA = gql `
query getAll {
    movies {
      _id
      title
      overview
      poster_path
      popularity
    }
    tvSeries {
      _id
      title
      overview
      poster_path
      popularity
    }
}
`

export const GET_MOVIE_BY_ID = gql `
query getMovieById($id: ID!) {
    movieById(id: $id) {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
  }
`

export const ADD_MOVIE = gql `
mutation addMovie($newMovie: NewMovie!) {
  newMovie(input: $newMovie) {
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const UPDATE_MOVIE = gql `
mutation editMovie ($movie: EditedMovie!, $id: ID!) {
  editedMovie(input: $movie, movieId: $id) {
    title
  }
}
`

export const DELETE_MOVIE = gql `
mutation deleteMovie($id: ID!) {
  deletedMovie(movieId: $id)
}
`