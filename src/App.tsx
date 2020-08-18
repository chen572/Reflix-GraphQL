import React, { Component } from 'react';
import './App.css';
import { getAllMovies, getAllUsers } from './queries/queries';
import { Movie } from '../server/models/Movie';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Catalog from './components/Catalog.jsx';
import { User } from '../server/models/User';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

interface AppState {
  movies: [Movie];
  users: [User];
}

class App extends Component {
  state = {
    movies: [],
    users: [],
  };

  // componentDidMount() {
  //   Promise.all([getAllMovies(), getAllUsers()]).then((value): void => {
  //     const [movies, users] = value;
  //     this.setState({ movies: movies.data.movies, users: users.data.users });
  //   });
  // }

  onButtonClick = () => {};

  renderList = () => {
    if (this.state.movies.length) {
      return this.state.movies.map<JSX.Element>((m: Movie) => (
        <div key={m.id}>{m.title}</div>
      ));
    }
  };

  render(): JSX.Element {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className='App'>
            <div className='button-container'>
              <Link to='/'>Home</Link>
              <Link to='/catalog'>Catalog</Link>
            </div>
            <Route exact path='/' render={() => <Landing />} />
            <Route
              exact
              path='/catalog/:userId'
              render={({ match }) => <Catalog />}
            />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
