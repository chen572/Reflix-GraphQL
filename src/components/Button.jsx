import React from 'react';
import { Button, Typography } from '@material-ui/core';

function Buttons(props) {
  const { text } = props;

  return (
    <Button style={{ color: 'whitesmoke' }}>
      <Typography variant='h6'>{text}</Typography>
    </Button>
  );
}

export default Buttons;
