import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID, GET_ALL_MOVIES } from '../queries/queries';
import Loading from './Loading';
import MovieCard from './MovieCard';
import { Grid, makeStyles } from '@material-ui/core';
import UserBar from './UserBar';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    margin: 0,
  },
});

function Catalog(props) {
  const classes = useStyles();
  const { match } = props;
  const getUserById = useQuery(GET_USER_BY_ID, {
    variables: { id: match.params.userId },
  });
  console.log(getUserById.data);
  const getMovies = useQuery(GET_ALL_MOVIES);
  const loading = getMovies.loading && getUserById.loading;
  return (
    <>
      <UserBar user={!getUserById.loading && getUserById.data.user} />
      {getUserById.data && getUserById.data.user.rentedMovies.length && (
        <Grid
          container
          className={classes.root}
          spacing={2}
          justify='center'
          alignItems='center'
        >
          {getUserById.data.user.rentedMovies.map((m) => (
            <MovieCard key={Math.random()} movie={m} />
          ))}
        </Grid>
      )}
      <Grid
        container
        className={classes.root}
        spacing={2}
        justify='center'
        alignItems='center'
      >
        {loading && <Loading />}
        {getMovies.data &&
          getMovies.data.movies.map((m) => <MovieCard key={m.id} movie={m} />)}
      </Grid>
    </>
  );
}

export default Catalog;
