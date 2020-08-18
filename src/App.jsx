import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Catalog from './components/Catalog.jsx'
import { Button, Icon, makeStyles, Typography } from '@material-ui/core'
import { gql, useQuery } from '@apollo/client'
import { GET_ALL_USERS } from './queries/queries'

const useStyles = makeStyles({
  root: {
    fontSize: 40,
    color: 'whitesmoke',
    position: 'absolute',
    right: 50,
    top: 5,
  },
})

function App() {
  const classes = useStyles()
  const [users, setUsers] = useState([])
  const [movies, setMovies] = useState([])
  const { loading, error, data } = useQuery(GET_ALL_USERS)

  function renderList() {
    if (this.state.movies.length) {
      return this.state.movies.map((m) => <div key={m.id}>{m.title}</div>)
    }
  }

  return (
    <Router>
      <div className='App'>
        <div className='button-container'>
          <Link style={{ textDecoration: 'none' }} to='/'>
            <Button style={{ color: 'whitesmoke' }}>
              <Typography variant='h6'>Home</Typography>
            </Button>
          </Link>
          <Link style={{ textDecoration: 'none' }} to='/catalog'>
            <Button style={{ color: 'whitesmoke' }}>
              <Typography variant='h6'>Catalog</Typography>
            </Button>
          </Link>
          <Typography variant='h4' className={classes.root}>
            <Icon
              style={{
                fontSize: 40,
                position: 'absolute',
                right: 110,
                top: 4,
              }}
              className='fas fa-film'
            />
            Reflix
          </Typography>
        </div>
        <Route exact path='/' render={() => <Landing />} />
        <Route
          exact
          path='/catalog/:userId'
          render={({ match }) => <Catalog />}
        />
      </div>
    </Router>
  )
}

export default App
