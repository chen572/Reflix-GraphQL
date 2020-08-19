import React from 'react';
import {
  Card,
  CardActionArea,
  makeStyles,
  Grid,
  Button,
} from '@material-ui/core';
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
  const { movie } = props;

  return (
    <Grid item className={classes.root}>
      <Card>
        <CardActionArea className={classes.actionArea}>
          <img
            className={classes.media}
            src={movie.img}
            alt={movie.title}
            title={movie.title}
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
