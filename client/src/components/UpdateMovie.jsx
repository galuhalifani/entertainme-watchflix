import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import Loader from "../fillers/Loader.jsx";
import Error from "../fillers/Error.jsx";
import { useAlert } from 'react-alert'
import swal from '@sweetalert/with-react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_MOVIE_BY_ID, UPDATE_MOVIE } from '../graphql/query'
import '../App.css';

export default function UpdateMovie(props) {
    const movieId = useParams().id
    const history = useHistory()

    const {loading, error, data, refetch} = useQuery(GET_MOVIE_BY_ID, {
        variables: {
            id: useParams().id
        }
    })

    const [editMovie, { loading: mutationLoading, error: mutationError, data: updatedMovie }] = useMutation(UPDATE_MOVIE, {
        onCompleted: (updatedMovie) => {
            swal({
                title: "Success!",
                text: `Movie ${updatedMovie.editedMovie.title} updated`,
                icon: "success",
                button: 'Back to Home'
            })
            .then((action) => {
                if (action) {
                    history.push(`/`)
                }        
            })
        }
    });

    function updateMovie(e) {
        e.preventDefault()

        editMovie({
            variables: {
                movie: {
                    "title": title,
                    "overview": overview,
                    "popularity": popularity,
                    "poster_path": poster,
                    "tags": tags
                },
                id: movieId
            },
            refetchQueries: [{
                query: GET_MOVIE_BY_ID, variables: {id: movieId}
            }]
        })
    }

    const [movieTitle, setMovieTitle] = useState('')
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster, setPoster] = useState('')
    const [tags, setTags] = useState('')
    const [popularity, setPopularity] = useState('')

    useEffect(() => {
        if (data) {
            setMovieTitle(data.movieById.title)
            setTitle(data.movieById.title)
            setOverview(data.movieById.overview)
            setPoster(data.movieById.poster_path)
            setTags(data.movieById.tags.join())
            setPopularity(data.movieById.popularity)
        }
    }, [data])

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

    return (
        <div className="addForm m-5">
            <h1>Update Movie <b style={{color:'gold'}}>{movieTitle}</b></h1>
        {
            loading 
            ? <Loader/> 
            : error 
            ? <Error/> 
            : 
            <form className='updateForm' onSubmit={updateMovie}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Movie Title</label>
                <input type="text" className="form-control" name="title" value={title} onChange={changeTitle}/>
            </div>
            <div className="mb-3">
                <label htmlFor="overview" className="form-label">Movie Overview</label>
                <textarea style={{height: '100px'}} className="form-control" name="overview" value={overview} onChange={changeDescription}/>
            </div>
            <div className="mb-3">
                <label htmlFor="poster_path" className="form-label">Movie Poster</label>
                <input type="text" className="form-control" name="poster_path" value={poster} onChange={changePoster}/>
            </div>
            <div className="mb-3">
                <label htmlFor="popularity" className="form-label">Popularity (Rating)</label>
                <input type="number" className="form-control" name="popularity" value={popularity} step=".1" onChange={changePopularity}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tags" className="form-label">Tags</label>
                <input type="text" className="form-control" name="tags" value={tags} onChange={changeTags}/>
            </div>
            <button type="submit" className="btn btn-primary" style={{marginTop: '20px'}}>Update Movie</button>
            </form>  
        }
            {mutationLoading && <p>Loading...</p>}
            {mutationError && <p>Error :( Please try again</p>}
      </div>
    )
}

