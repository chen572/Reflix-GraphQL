import React, { Component, ComponentClass } from 'react';
import { User } from '../../server/models/User';
import './style/Landing.css';
import { graphql } from 'react-apollo';
import { getAllUsers } from '../queries/queries';

interface LandingProps {
  data: any;
}

class Landing extends Component {
  getRandomColor = () => {
    const colors = ['#ffddd2', '#92140c', 'lightblue', '#c2f261'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  render() {
    const { users } = this.props.data;
    console.log(users);
    return (
      <div className='landing'>
        {users?.length &&
          users.map((u: User) => (
            <div key={u.id} style={{backgroundColor: this.getRandomColor()}} className='user-box'>
              {u.name}
            </div>
          ))}
      </div>
    );
  }
}

export default graphql(getAllUsers)(Landing);
