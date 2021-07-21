import React, { useMemo, useEffect } from 'react'
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
// import debounce from 'lodash.debounce';

export default function Navigation(props) {
    const appTitle = 'WatchFlix'

    // useEffect(() => {
    //     dispatch(fetchPlaylists())
    // }, [])

    // const debouncedChangeHandler = useMemo(
    //     () => debounce(searchBarChange, 300)
    // , []);

    return (
        <Navbar id='navbar' className='navbar-dark' expand='sm'>
            <Navbar.Brand className="navbar-brand" href="/">{appTitle}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" style={{marginLeft: '3%'}}>
                    <NavLink className='nav-link' exact to="/" style={{marginRight: '20px'}} activeStyle={{fontWeight: "bold", color: "gold"}}>Home</NavLink>
                    <NavLink className='nav-link' to="/movie-favourites" style={{marginRight: '20px'}} activeStyle={{fontWeight: "bold", color: "gold"}}>My Favourite Movies</NavLink>
                    {/* <NavLink className='nav-link' to="/searchArtist" style={{marginRight: '20px'}} activeStyle={{fontWeight: "bold", color: "gold"}}>Browse Composer Albums</NavLink> */}
                </Nav>

                <Nav className='d-flex' style={{fontSize: '1rem', color: 'grey', marginRight: '20px'}}>
                    <i style={{margin: 'auto', fontSize: '130%'}} className='fas fa-folder-plus text-gray-600' data-bs-toggle="tooltip" data-bs-placement="bottom"
                    title="Add a Movie"></i>
                    <NavLink className='nav-link' to="/add-movie" style={{marginRight: '50px'}} activeStyle={{fontWeight: "bold", color: "gold"}}>Add New Movie</NavLink>
                {/* <Form onSubmit={(e) => {searchPlaylist(e)}} style={{marginRight: '50px', marginLeft: '10px'}}>
                <FormControl type="text" placeholder="Search Title (e.g piano)" name='search' className="mr-sm-2" onChange={debouncedChangeHandler}/>
                </Form> */}
                </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}