import React, { useState } from 'react'
import { Switch, Route } from "react-router-dom";
import Home from './components/Home.jsx'
import AddMovie from './components/AddMovie.jsx'
import Favourites from './components/Favourites.jsx'
import Navigation from "./components/Navigation.jsx"
import UpdateMovie from "./components/UpdateMovie.jsx"
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('home')

  function changeActivePage(page) {
    setActivePage(page)
  }

  return (
    <div>
    <Navigation activePage={activePage} />

    <Switch>
      <Route exact path="/">
      <Home changeActivePage={changeActivePage}/>
      </Route>     

      <Route path="/add-movie">
      <AddMovie changeActivePage={changeActivePage}/>
      </Route>     

      <Route path="/movie-favourites">
      <Favourites changeActivePage={changeActivePage}/>
      </Route>

      <Route path="/update-movie/:id">
      <UpdateMovie changeActivePage={changeActivePage}/>
      </Route>     

      <Route path="*">
        <h1>Page Not Found</h1>
      </Route>

    </Switch>
  </div>
  );
}

export default App;
