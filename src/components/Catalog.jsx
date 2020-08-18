import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER_BY_ID } from '../queries/queries'

function Catalog(props) {
  const { match } = props
  console.log(match.params.userId)
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: match.params.userId },
  })
  console.log(data)
  return <div>{}</div>
}

export default Catalog
