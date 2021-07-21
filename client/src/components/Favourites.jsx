import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { favouriteVar } from '../graphql/vars';
import { useReactiveVar } from '@apollo/client';
import '../App.css';

export default function Favourites(props) {
    const favourites = useReactiveVar(favouriteVar)

    return (
        <div className='main_content'>
            <div style={{marginTop: '2%'}}>
                <h2 style={{paddingLeft: '5%', paddingTop: '5px', paddingBottom: '5px', marginLeft: '1%', marginRight: '3%', borderRadius: '5px'}}>Bookmarked Movies</h2>
                <Row className='movieCard' xs={2} md={2} lg={4} className="g-4" style={{paddingLeft:'5%', paddingRight: '5%', paddingBottom: '10px'}}>            
                    {
                        favourites.map(movie => 
                            <Col className='movieCol' style={{marginBottom:'2%', marginTop: '2%'}}>
                            <Card className='cardCol d-flex' style={{height:'100%', backgroundColor: 'black', border: '2px solid #eae0aa', marginRight:'5px'}}>
                                <img className='cardImgFav' src={movie.poster_path} alt="Playlist Poster"/>
                                <Card.Body>
    
                                    <div className="d-flex justify-content-between">
                                        <Card.Title className='title overflow-ellipsis-title'>{movie.title}</Card.Title>
                                    </div>
    
                                    <Card.Text className='mb-0 mt-0'><i className={'fas fa-star'} style={{marginRight: '8px', fontSize: '20px', color: 'yellow'}}></i><b style={{fontSize: '22px'}}>{movie.popularity}</b>/10</Card.Text>
                                    <div className='movieFavDescription'>{movie.overview}</div><br />
                                </Card.Body>
                            </Card> 
                        </Col>    
                    )}
                </Row>
            </div>
        </div>
    )
}

