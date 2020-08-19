import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_USER_BY_ID,
  GET_ALL_MOVIES,
  ADD_MOVIE_TO_USER,
} from '../queries/queries';
import Loading from './Loading';
import MovieCard from './MovieCard';
import { Grid, makeStyles, Typography } from '@material-ui/core';
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
  const getMovies = useQuery(GET_ALL_MOVIES);
  let loading = getMovies.loading && getUserById.loading;
  const [addMovieToUser, { data }] = useMutation(ADD_MOVIE_TO_USER);

  function onClickHandler(movieId) {
    addMovieToUser({
      variables: { userId: getUserById.data.user.id, movieId: movieId },
    });
  }

  if (data) {
    getUserById.refetch({ variables: { id: match.params.userId } });
  }

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
          <Grid item style={{ width: '100vw', textAlign: 'center' }}>
            <Typography variant='h4' style={{ color: 'whitesmoke' }}>
              Rented:
            </Typography>
          </Grid>
          {getUserById.data.user.rentedMovies.map((m) => (
            <MovieCard
              key={Math.random()}
              onClickHandler={onClickHandler}
              movie={m}
            />
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
        <Grid item style={{marginTop: '50px', width: '100vw', textAlign: 'center' }}>
          <Typography variant='h4' style={{ color: 'whitesmoke' }}>
            Catalog:
          </Typography>
        </Grid>
        {loading && <Loading />}
        {getMovies.data &&
          getMovies.data.movies.map((m) => (
            <MovieCard onClickHandler={onClickHandler} key={m.id} movie={m} />
          ))}
      </Grid>
    </>
  );
}

export default Catalog;
