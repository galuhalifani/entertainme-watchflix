import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert'
import { ADD_MOVIE, GET_HOME_DATA } from '../graphql/query'
import { useMutation } from '@apollo/client'
import swal from '@sweetalert/with-react'
import '../App.css';

export default function AddMovie(props) {
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster, setPoster] = useState('')
    const [tags, setTags] = useState('')
    const [popularity, setPopularity] = useState('')

    const [addMovie, { loading: mutationLoading, error: mutationError, data: addedMovie }] = useMutation(ADD_MOVIE, {
      errorPolicy: 'none',
      onError: (err) => {
        console.log(err)
        if (err == `Error: Response not successful: Received status code 400`) {
          swal({
            title: "Error",
            text: `Error adding movie. Please check your input fields`,
            icon: "error",
          })  
        } else {
          swal({
            title: "Error",
            text: `Failed adding movie: ${err}`,
            icon: "error",
          }) 
        }
      }
    });

    function changeTitle(e) {
        setTitle(e.target.value)
    }
    
    function changeDescription(e) {
        setOverview(e.target.value)
    }

    function changePoster(e) {
        setPoster(e.target.value)
    }

    function changeTags(e) {
        setTags(e.target.value)
    }

    function changePopularity(e) {
        setPopularity(e.target.value)
    }

    function addNewMovie(e) {
        e.preventDefault()
        let arrayTags = tags.split(',')

        if (overview.length > 500 || title.length > 70) {
          if (overview.length > 500) {
              alert.error(`Max. length for overview is 500 characters`)
          }
          if (title.length > 70) {
              alert.error(`Max. length for title is 70 characters`)
          }
        } else {
          addMovie({
            variables: {
                newMovie: {
                  "title": title,
                  "overview": overview,
                  "poster_path": poster, 
                  "popularity": +popularity,
                  "tags": tags.split(',')
              }
            },
            refetchQueries: [{
              query: GET_HOME_DATA
          }] 
          })
          .then(data => {
            let movie = data.data
            // console.log(movie)
            if (movie) {
              // console.log(movie, 'DATA')
              swal({
                title: "Success!",
                text: `Movie ${movie.newMovie.title} added`,
                icon: "success",
                button: 'Back to Home'
              })
              .then((action) => {
                  if (action) {
                      history.push(`/`)
                  }        
              })
            } 
            else {
              if (data.errors.networkError) {
                console.log(data.errors.networkError.result.errors[0].message, 'DATA')
              }  
            }
          })
          .catch(err => {
            console.log(err)
          })
        }
    }

    return (
        <div className="addForm m-5">
        <h1>Add a New Movie</h1>
        <form onSubmit={addNewMovie}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Movie Title</label>
            <input type="text" className="form-control" name="title" placeholder="e.g Titanic" onChange={changeTitle}/>
          </div>
          <div className="mb-3">
            <label htmlFor="overview" className="form-label">Movie Overview</label>
            <textarea className="form-control" name="overview" placeholder="movie synopsis" onChange={changeDescription}/>
          </div>
          <div className="mb-3">
            <label htmlFor="poster_path" className="form-label">Movie Poster</label>
            <input type="text" className="form-control" name="poster_path" placeholder="poster url" onChange={changePoster}/>
          </div>
          <div className="mb-3">
            <label htmlFor="popularity" className="form-label">Popularity (Rating)</label>
            <input type="number" className="form-control" name="popularity" placeholder='movie rating, e.g 7.6' step=".1" onChange={changePopularity}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">Tags</label>
            <input type="text" className="form-control" name="tags" placeholder="tags separated by comma" onChange={changeTags}/>
          </div>
          <button type="submit" className="btn btn-primary" style={{marginTop: '20px'}}>Add New Movie</button>
        </form>
      </div>
    )
}
