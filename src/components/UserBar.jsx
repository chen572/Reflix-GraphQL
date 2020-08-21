import React from 'react';
import { Typography } from '@material-ui/core';

function UserBar(props) {
  const { user } = props;

  return (
    <div className='bar-container'>
      <Typography style={{color: 'whitesmoke', margin: '15px'}} variant='h4'>{user.name}</Typography>
      <Typography style={{color: 'whitesmoke', margin: '15px'}} variant='h4'>Budget: ${user.budget}</Typography>
    </div>
  );
}

export default UserBar;
