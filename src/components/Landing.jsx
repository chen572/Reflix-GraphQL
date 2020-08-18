import React from 'react';
import './style/Landing.css';

function Landing(props) {

  function getRandomColor() {
    const colors = ['#ffddd2', '#92140c', 'lightblue', '#c2f261'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

    return (
      <div className='landing'>
      </div>
    );
}

export default Landing
