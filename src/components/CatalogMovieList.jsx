import React from 'react';
import { Grid, Typography, makeStyles, Button } from '@material-ui/core';
import MovieCard from './MovieCard';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    margin: 0,
  },
});

function CatalogMovieList(props) {
  const classes = useStyles();
  const { text, movieList, onClickHandler, pagination } = props;

  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
      justify='center'
      alignItems='center'
    >
      {text === 'Rented' ? (
        <>
          <Grid item style={{ width: '100vw', textAlign: 'center' }}>
            <Typography variant='h4' style={{ color: 'whitesmoke' }}>
              {text}:
            </Typography>
          </Grid>
          {movieList.map((m) => (
            <MovieCard
              key={m.movieId}
              onClickHandler={onClickHandler}
              movie={m}
            />
          ))}
        </>
      ) : (
        <>
          <Grid item style={{ width: '100vw', textAlign: 'center' }}>
            <Button onClick={pagination.prev} style={{ color: 'whitesmoke' }}>
              <Typography variant='h5'>Back</Typography>
            </Button>
            <Button onClick={pagination.next} style={{ color: 'whitesmoke' }}>
              <Typography variant='h5'>Next</Typography>
            </Button>
            <Typography variant='h4' style={{ color: 'whitesmoke' }}>
              Catalog:
            </Typography>
          </Grid>
          {movieList.map((m) => (
            <MovieCard
              onClickHandler={onClickHandler}
              key={m.movieId}
              movie={m}
            />
          ))}
        </>
      )}
    </Grid>
  );
}

export default CatalogMovieList;
