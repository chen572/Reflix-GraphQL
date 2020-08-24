import React from 'react';
import './style/Landing.css';
import Loading from './Loading';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../queries/queries';
import { Link } from 'react-router-dom';

function Landing() {
  const { loading, data } = useQuery(GET_ALL_USERS);

  function getRandomColor() {
    const colors = ['#ffddd2', '#92140c', 'lightblue', '#c2f261'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <div className='landing'>
      {loading && <Loading />}
      {data &&
        data.users.map((u) => (
          <Link
            style={{ textDecoration: 'none', background: getRandomColor() }}
            className='user-box'
            key={u.id}
            to={`/catalog/${u.id}`}
          >
            {u.name}
          </Link>
        ))}
    </div>
  );
}

export default Landing;
