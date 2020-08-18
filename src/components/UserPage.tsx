import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getUserById } from '../queries/queries'

class UserPart extends Component {

  render() {
    
    return (
      <div></div>
    )
  }

}

export default graphql(getUserById)(UserPart)