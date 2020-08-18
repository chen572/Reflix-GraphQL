import React, { Component, ComponentClass } from 'react';
import { graphql, Mutation } from 'react-apollo';
import flowRight from 'lodash.flowright';
// import { getAllMovies, getUserById, addMovieToUser } from '../queries/queries';

class Catalog extends Component {
  constructor() {
    super();
    this.state = { test: 'test' };
  }

  getUserById() {
    let user;
    if (this.props.getUserById) {
      user = this.props.getUserById({
        variables: { id: this.props.match.params.userId },
      });
    }

    if (user) {
      this.setState({ user }, () => console.log(this.state));
    }
  }

  render() {
    // const test = this.props.getUserById ? this.props.getUserById : null;
    // console.log(test);
    // console.log(this.props);
    return <div>{}</div>;
  }
}

export default flowRight(
  // graphql(getUserById, { name: 'getUserByIdQuery', options: {variables: } }),
  graphql(getAllMovies, { name: 'getAllMOviesQuery' }),
)(Catalog);
