import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Typography, Icon, makeStyles } from '@material-ui/core';
import Buttons from './Button';

const useStyles = makeStyles({
  root: {
    fontSize: 40,
    color: 'whitesmoke',
    position: 'absolute',
    right: 50,
    top: 5,
  },
});

function NavBar() {
  const classes = useStyles();
  const { goBack } = useHistory();

  return (
    <div className='bar-container'>
      <Link className='top-links' to='/'>
        <Buttons text='Home' />
      </Link>
      <Link className='top-links' to='' onClick={goBack}>
        <Buttons text='Back' />
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
  );
}

export default NavBar;
