import React from 'react';
import {
  Card,
  CardActionArea,
  makeStyles,
  Grid,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStylesCatalog = makeStyles({
  root: {
    maxWidth: 300,
    maxHeight: 400,
  },
  media: {
    height: 350,
    width: '100%',
  },
  actionArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    textDecoration: 'none',
  },
});

function MovieCard(props) {
  const classes = useStylesCatalog();
  const { movie, onClickHandler } = props;

  return (
    <Grid item className={classes.root}>
      <Card>
        <CardActionArea
          onClick={() => onClickHandler(movie.movieId)}
          className={classes.actionArea}
        >
          <img
            className={classes.media}
            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${movie.img}`}
            alt={movie.movieId}
          />
        </CardActionArea>
        <CardActionArea className={classes.actionArea}>
          <Link
            style={{ textDecoration: 'none', color: 'whitesmoke' }}
            to={`/movie/info/${movie.movieId}`}
          >
            <Typography variant='h4'>More Info</Typography>
          </Link>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default MovieCard;
