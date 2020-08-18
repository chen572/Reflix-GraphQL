import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Icon, makeStyles } from '@material-ui/core';

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

  return (
    <div className='button-container'>
      <Link className='top-links' to='/'>
        <Button style={{ color: 'whitesmoke' }}>
          <Typography variant='h6'>Home</Typography>
        </Button>
      </Link>
      <Link className='top-links' to='/catalog'>
        <Button style={{ color: 'whitesmoke' }}>
          <Typography variant='h6'>Catalog</Typography>
        </Button>
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

export default NavBar