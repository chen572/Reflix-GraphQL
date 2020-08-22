import React from 'react';
import { Card, Typography, makeStyles, CardMedia } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_MOVIE_BY_ID } from '../queries/queries';
import Loading from './Loading';
import './style/MovieInfo.css';

const useStyles = makeStyles({
  root: {
    maxWidth: '20%',
    position: 'relative',
    zIndex: 4,
    marginLeft: '60vw',
    marginTop: '3%',
  },
  media: {
    height: 0,
    paddingTop: '135%',
  },
  content: {
    position: 'relative',
    marginTop: '25px',
    width: '30vw',
    color: 'white',
    marginLeft: '50vw',
    background: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '15px',
    padding: '25px',
    textAlign: 'center',
  },
});

function MovieInfo(props) {
  const classes = useStyles();
  const { match } = props;
  const { loading, data } = useQuery(GET_MOVIE_BY_ID, {
    variables: { id: match.params.movieId },
  });

  if (loading) {
    return <Loading />;
  }

  console.log(loading, data);
  return (
    <>
      <img
        className='background-img'
        src={`https://image.tmdb.org/t/p/original${data.movie.backgroundImg}`}
        alt='background'
      />
      <div className='img-shadow'></div>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${data.movie.img}`}
          title={data.movie.title}
        />
      </Card>
      <div className={classes.content}>
        <Typography variant='h5' component='h2'>
          {data.movie.title}
        </Typography>
        <Typography variant='body2' component='p'>
          {data.movie.descrShort}
        </Typography>
      </div>
    </>
  );
}

export default MovieInfo;
