import React from 'react';
import { Card, CardActionArea, makeStyles, Grid } from '@material-ui/core';
import Buttons from './Button';

const useStyles = makeStyles({
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
  },
});

function MovieCard(props) {
  const classes = useStyles();
  const { movie, onClickHandler } = props;
  console.log(` this is the movie id ${movie.id}`)
  return (
    <Grid item className={classes.root}>
      <Card>
        <CardActionArea
          onClick={() => onClickHandler(movie.id)}
          className={classes.actionArea}
        >
          <img
            className={classes.media}
            src={movie.img}
            alt={movie.id}
          />
        </CardActionArea>
        <CardActionArea className={classes.actionArea}>
          <Buttons text='ADD' />
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default MovieCard;
