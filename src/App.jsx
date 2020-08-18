import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Catalog from './components/Catalog.jsx';
import NavBar from './components/NavBar';

function App() {
  function renderList() {
    if (this.state.movies.length) {
      return this.state.movies.map((m) => <div key={m.id}>{m.title}</div>);
    }
  }

  return (
    <Router>
      <div className='App'>
        <NavBar />
        <Route exact path='/' render={() => <Landing />} />
        <Route
          exact
          path='/catalog/:userId'
          render={({ match }) => <Catalog match={match} />}
        />
      </div>
    </Router>
  );
}

export default App;
