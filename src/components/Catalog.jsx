import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER_BY_ID, GET_ALL_MOVIES } from '../queries/queries'

function Catalog(props) {
  const { match } = props
  console.log(match.params.userId)
  const getUserById = useQuery(GET_USER_BY_ID, {
    variables: { id: match.params.userId },
  })
  const getMovies = useQuery(GET_ALL_MOVIES)
  console.log(getUserById.data, getMovies.data)
  return <div></div>
}

export default Catalog
