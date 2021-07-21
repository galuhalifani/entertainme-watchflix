import React, { useState, useEffect } from 'react'
import { Card, Col } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useMutation } from '@apollo/client'
import { GET_HOME_DATA, DELETE_MOVIE } from '../graphql/query'
import { favouriteVar } from '../graphql/vars.js';
import { useReactiveVar } from '@apollo/client';
import '../App.css';

export default function MovieCard({movie}) {
    const alert = useAlert()
    const history = useHistory()
    const favourites = useReactiveVar(favouriteVar)
    const [bookmarked, setBookmarked] = useState(false)
    
    const [deleteMov, {}] = useMutation(DELETE_MOVIE, {
        onError: (err) => {
            console.log(err, 'ERR')
            alert.error(`${err}`)
        }
    });

    useEffect(() => {
        for (let i = 0; i < favourites.length; i++) {
            if (favourites[i].id == movie._id) {
                setBookmarked(true)
            }
        }
    }, [bookmarked])

    function addToFavourite(e) {
        e.preventDefault()

        const previousFav = favouriteVar()

        if (previousFav.length == 0) {
            const newFav = {
                id: movie._id,
                title: movie.title,
                overview: movie.overview,
                poster_path: movie.poster_path,
                popularity: movie.popularity,
                tags: movie.tags
            }
    
            favouriteVar([...previousFav, newFav])
            setBookmarked(true)
            alert.success(`Success: ${movie.title} added to favourites`)
        } else {
            if (bookmarked) {
                alert.error(`Error: ${movie.title} has already been bookmarked`)
            } else {
                    const newFav = {
                        id: movie._id,
                        title: movie.title,
                        overview: movie.overview,
                        poster_path: movie.poster_path,
                        popularity: movie.popularity,
                        tags: movie.tags
                    }
            
                    favouriteVar([...previousFav, newFav])
                    setBookmarked(true)
                    alert.success(`Success: ${movie.title} added to favourites`)
                }
            } 
        }

    function editMovie(e, id, title) {
        e.preventDefault()
        history.push(`/update-movie/${id}`)
    }

    function deleteMovie(e, id, title) {
        e.preventDefault()

        deleteMov({
            variables: {
                id: `${id}`
            },
            refetchQueries: [{
                query: GET_HOME_DATA
            }] 
        })
        .then(({data}) => {
            // delete favourite data
            const previousFav = favouriteVar()

            for (let i = 0; i < previousFav.length; i++) {
                if (previousFav[i].id == id) {
                    previousFav.splice(i, 1)
                    favouriteVar([...previousFav])
                }
            }
            alert.success(`${data.deletedMovie}`)
        })
        .catch(err => {
            console.log(err, 'ERR')
        })
    }

    return (
        <Col style={{marginBottom:'2%', marginTop: '2%', maxWidth: '100%', paddingRight: '10px'}}>
        <Card className='cardCol d-flex' style={{backgroundColor: 'black', flexDirection: 'row', border: '2px solid #eae0aa', marginRight:'5px'}}>
            <img className='cardImg' style={{height: '20rem', maxWidth: '210px', objectFit: 'cover'}} src={movie.poster_path} alt="Playlist Poster"/>
            <Card.Body className='cardbody'> 

                <div className="d-flex justify-content-between">
                    <Card.Title className='title overflow-ellipsis-title' style={{fontSize: '22px', width: '83%', marginRight: '15px'}}>{movie.title}
                        <p className='tooltiptext'>{movie.title}</p>
                    </Card.Title>
                        <a href="/">
                            <i className={bookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'} style={{marginRight: '5px'}} onClick={(e) => addToFavourite(e)}></i>
                        </a>
                </div>

                <Card.Text className='mb-0 mt-0'><i className={'fas fa-star'} style={{marginRight: '8px', fontSize: '20px', color: 'yellow'}}></i><b style={{fontSize: '22px'}}>{movie.popularity}</b>/10</Card.Text>
                <div style={{marginTop: '15px'}} className='movieDescription'>{movie.overview}</div><br />

                <div className='editDelete d-flex' style={{alignItems: 'flex-end'}}>
                <Card.Link className="editMovie btn btn-primary" style={{width: '80%', marginRight: '20px', marginTop: '15px'}} onClick={(e) => editMovie(e, movie._id, movie.title)}>Edit Movie</Card.Link>
                <a href="/">
                    <i className={'fas fa-trash-alt'} style={{color: 'darkred', width: '20%'}} onClick={(e) => deleteMovie(e, movie._id, movie.title)}/>
                </a>
                </div>
            </Card.Body>
        </Card> 
        </Col> 
    )
}