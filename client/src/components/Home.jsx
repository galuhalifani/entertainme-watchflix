import React, { useState, useEffect } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import Loader from "../fillers/Loader.jsx";
import Error from "../fillers/Error.jsx";
import NoData from "../fillers/NoData.jsx";
import swal from '@sweetalert/with-react'
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useQuery, useMutation } from '@apollo/client'
import { GET_HOME_DATA, DELETE_MOVIE } from '../graphql/query'
import '../App.css';

export default function Home(props) {
    const {loading, error, data} = useQuery(GET_HOME_DATA)
    const alert = useAlert()
    const history = useHistory()
    const activePage = props.changeActivePage

    const [deleteMov, {}] = useMutation(DELETE_MOVIE, {
        onError: (err) => {
            console.log(err)
            alert.error(`${err}`)
        }
    });

    useEffect(() => {
        let page = true
        if(page) {
            activePage('home')
        }
        return () => { page = false };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            alert.success(`${data.deletedMovie}`)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='main_content'>
        {
            loading 
            ? <Loader/> 
            : error 
            ? <Error/> 
            : 
            <div style={{marginTop: '2%'}}>
                <h2 style={{paddingLeft: '5%', paddingTop: '5px', paddingBottom: '5px', marginLeft: '1%', marginRight: '3%', backgroundColor: '#231c03', borderRadius: '5px'}}>Movies</h2>
                <Row className='movieCard' xs={2} md={3} lg={4} className="g-4" style={{paddingLeft:'5%', paddingRight: '5%', paddingBottom: '10px'}}>            
            {
                data.movies.map(movie => 
                    <Col className='movieCol' style={{marginBottom:'2%', marginTop: '2%', maxWidth: '100%', paddingRight: '10px'}}>
                    <Card className='cardCol d-flex' style={{backgroundColor: 'black', flexDirection: 'row', border: '2px solid #eae0aa', marginRight:'5px'}}>
                        <img className='cardImg' style={{height: '20rem', maxWidth: '210px', objectFit: 'cover'}} src={movie.poster_path} alt="Playlist Poster"/>
                        <Card.Body className='cardbody'> 

                            <div className="d-flex justify-content-between">
                                <Card.Title className='title overflow-ellipsis-title' style={{fontSize: '22px', width: '83%', marginRight: '15px'}}>{movie.title}
                                    <p className='tooltiptext'>{movie.title}</p>
                                </Card.Title>
                                    <a href="/">
                                        <i className={'far fa-bookmark'} style={{marginRight: '5px'}}></i>
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
            )} 
                </Row>
                <h2 style={{paddingLeft: '5%', paddingTop: '5px', paddingBottom: '5px', marginLeft: '1%', marginRight: '3%', backgroundColor: '#231c03', borderRadius: '5px'}}>TV Series</h2>
                <Row className='movieCard' xs={2} md={3} lg={4} className="g-4" style={{paddingLeft:'5%', paddingRight: '5%', paddingBottom: '10px'}}>            
            {
                data.tvSeries.map(series => 
                    <Col className='movieCol' style={{marginBottom:'2%', marginTop: '2%', maxWidth: '100%', paddingRight: '10px'}}>
                    <Card className='cardCol d-flex' style={{backgroundColor: 'black', flexDirection: 'row', border: '2px solid #eae0aa', marginRight:'5px'}}>
                        <img className='cardImg' style={{height: '20rem', maxWidth: '210px', objectFit: 'cover'}} src={series.poster_path} alt="Playlist Poster"/>
                        <Card.Body className='cardbody' style={{width: '200px'}}> 

                            <div className="d-flex justify-content-between">
                                <Card.Title className='title overflow-ellipsis-title' style={{fontSize: '22px'}}>{series.title}
                                    <p className='tooltiptext'>{series.title}</p>
                                </Card.Title>
                            </div>

                            <Card.Text className='mb-0 mt-0'><i className={'fas fa-star'} style={{marginRight: '8px', fontSize: '20px', color: 'yellow'}}></i><b style={{fontSize: '22px'}}>{series.popularity}</b>/10</Card.Text>
                            <div style={{marginTop: '15px'}} className='movieDescription'>{series.overview}</div><br />
                        </Card.Body>
                    </Card> 
                    </Col>
            )}
                </Row>
            </div>
          }
        </div>
    )
}