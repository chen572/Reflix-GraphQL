import React from 'react';
import {
  Card,
  CardActionArea,
  makeStyles,
  Grid,
  Typography,
} from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';

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
  },
});

function MovieCard(props) {
  const classes = useStylesCatalog();
  const { movie, onClickHandler, page } = props;
  const { goBack } = useHistory();

  if (page === 'info' && !movie) {
    return <Redirect to={goBack()} />;
  }

  return (
    <Grid item className={classes.root}>
      <Card>
        <CardActionArea
          onClick={() => onClickHandler(movie.id)}
          className={classes.actionArea}
        >
          <img className={classes.media} src={movie.img} alt={movie.id} />
        </CardActionArea>
        {page !== 'info' && (
          <CardActionArea className={classes.actionArea}>
            <Typography variant='h4'>More Info</Typography>
          </CardActionArea>
        )}
      </Card>
    </Grid>
  );
}

export default MovieCard;
