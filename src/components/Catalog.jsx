import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_USER_BY_ID,
  GET_ALL_MOVIES,
  ADD_MOVIE_TO_USER,
  REMOVE_MOVIE_FROM_USER,
} from '../queries/queries';
import Loading from './Loading';
import UserBar from './UserBar';
import CatalogMovieList from './CatalogMovieList';

function Catalog(props) {
  const { match } = props;
  const [page, setPage] = useState(1);

  const getUserById = useQuery(GET_USER_BY_ID, {
    variables: { id: match.params.userId },
  });
  const getMovies = useQuery(GET_ALL_MOVIES, {
    variables: { page },
  });
  let loading =
    getMovies.loading &&
    getUserById.loading &&
    getMovies.data &&
    getMovies.data.movies;

  const [AddMovieToUser, addMovieObj] = useMutation(ADD_MOVIE_TO_USER);
  const [RemoveMovieFromUser, removeMovieObj] = useMutation(
    REMOVE_MOVIE_FROM_USER
  );

  function addMovie(movieId) {
    if (getUserById.data.user.budget - 3 < 0) {
      return;
    }
    AddMovieToUser({
      variables: { userId: getUserById.data.user.id, movieId: movieId },
    });
  }

  function removeMovie(movieId) {
    RemoveMovieFromUser({
      variables: { userId: getUserById.data.user.id, movieId: movieId },
    });
  }

  function next() {
    setPage(page + 1);
  }

  function prev() {
    if (page !== 1) {
      setPage(page - 1);
    }
  }

  if (addMovieObj.data || removeMovieObj.data) {
    getUserById.refetch({ variables: { id: match.params.userId } });
  }

  return (
    <>
      {loading && <Loading />}
      <UserBar user={!getUserById.loading && getUserById.data.user} />
      {getUserById.data && getUserById.data.user.rentedMovies.length && (
        <CatalogMovieList
          movieList={getUserById.data.user.rentedMovies}
          text='Rented'
          onClickHandler={removeMovie}
        />
      )}
      {getMovies.data && getUserById.data && (
        <CatalogMovieList
          movieList={getMovies.data.movies.filter(
            (m) =>
              m &&
              !getUserById.data.user.rentedMovies.find(
                (t) => t.movieId === m.movieId
              )
          )}
          onClickHandler={addMovie}
          text='Catalog'
          pagination={{ next, prev }}
        />
      )}
    </>
  );
}

export default Catalog;
