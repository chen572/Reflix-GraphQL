import React, { useState, useEffect } from 'react'
import './style/Landing.css'
import Loading from './Loading'
import NewUser from './NewUser'
import { useQuery } from '@apollo/client'
import { GET_ALL_USERS } from '../queries/queries'
import { Link } from 'react-router-dom'
import { Button, Typography, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  gridRoot: {
    width: '100%',
    height: '100%',
  },
  gridItem: {
    width: '100%',
  },
  innerGridItem: {
    width: '15%',
    height: '40%',
    minWidth: '125px',
  }
})

function Landing() {
  const { loading, data, refetch } = useQuery(GET_ALL_USERS)
  const [showForm, setShowForm] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    if (data && !data.users.length) {
      setShowForm(true)
    } else {
      setShowForm(false)
    }
  }, [data])

  function getRandomColor() {
    const colors = ['#ffddd2', '#92140c', 'lightblue', '#c2f261']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const handleClick = () => {
    if (data && data.users.length >= 4) {
      alert('You can only have 4 users at once')
      return
    }
    setShowForm(true)
  }

  return (
    <div className='landing'>
      {showForm ? (
        <NewUser getUsers={refetch} setShowForm={setShowForm} />
      ) : (
        <>
          {loading && <Loading />}
          {data && (
            <Grid
              container
              className={classes.gridRoot}
              direction='column'
              alignItems='center'
              justify='center'
            >
              <Grid item className={classes.gridItem} style={{ height: '75%' }}>
                <Grid
                  container
                  justify='center'
                  alignItems='center'
                  style={{ width: '100%', height: '100%' }}
                  spacing={4}
                >
                  {data.users.map((u) => (
                    <Grid item className={classes.innerGridItem}>
                      <Link
                        style={{
                          textDecoration: 'none',
                          background: getRandomColor(),
                        }}
                        className='user-box'
                        key={u.id}
                        to={`/catalog/${u.id}`}
                      >
                        {u.name}
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid
                item
                justify='center'
                alignItems='center'
                style={{ height: '25%' }}
              >
                <Button style={{ color: 'whitesmoke' }} onClick={handleClick}>
                  <Typography variant='h6'>Add User</Typography>
                </Button>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </div>
  )
}

export default Landing
