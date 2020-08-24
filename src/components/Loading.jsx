import React from 'react';
import Loader from 'react-loader-spinner';

function Loading() {
  return (
    <div
      style={{ position: 'absolute', width: '20vw', left: '45vw', top: '50vh' }}
    >
      <Loader type='BallTriangle' color='white' height={80} width={80} />;
    </div>
  );
}

export default Loading;
