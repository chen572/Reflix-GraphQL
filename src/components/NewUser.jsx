import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../queries/queries'
import {
  Paper,
  makeStyles,
  useMediaQuery,
  TextField,
  Typography,
  Grid,
  Button,
} from '@material-ui/core'
import Loading from './Loading'

const useStyles = makeStyles({
  root: {
    height: '55%',
    width: '30%',
    backgroundColor: '#141414',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileRoot: {
    height: '85%',
    width: '80%',
    backgroundColor: '#141414',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#333533',
    color: 'whitesmoke',
    border: '#fca311',
    fontSize: '1rem',
    fontWeight: 'bolder',
  },
  button: {
    width: '100%',
    color: 'whitesmoke',
  },
})

function NewUser(props) {
  const { getUsers, setShowFrom } = props
  const [AddUser, { loading, data, error }] = useMutation(ADD_USER, {
    onCompleted: () => {
      getUsers()
      setShowFrom(false)
    },
  })
  const [input, setInput] = useState('')
  const [inputError, setInputError] = useState('')
  const classes = useStyles()
  const matches = useMediaQuery('(min-width:600px)')

  const handleChange = ({ target }) => {
    if (input.length > 2) {
      setInputError('')
    }
    setInput(target.value)
  }

  const handleClick = () => {
    if (input.length < 2) {
      return setInputError('Name must be more than 2 letters')
    }
    AddUser({
      variables: { name: input },
    })
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Paper
          className={matches ? classes.root : classes.mobileRoot}
          elevation={10}
        >
          <Grid
            container
            style={{ width: '100%' }}
            direction='column'
            spacing={6}
            alignItems='center'
          >
            <Grid item>
              <Typography variant='h4' style={{ color: 'whitesmoke' }}>
                Enter Name:
              </Typography>
            </Grid>
            <Grid item style={{ width: '95%' }}>
              <TextField
                className={classes.input}
                style={{ color: 'whitesmoke' }}
                value={input}
                onChange={handleChange}
                variant='outlined'
                fullWidth={true}
                error={inputError}
              />
            </Grid>
            {inputError && (
              <Typography variant='subtitle1' style={{ color: 'red' }}>
                {inputError}
              </Typography>
            )}
            <Grid item style={{ width: '75%' }}>
              <Button className={classes.button} onClick={handleClick}>
                <Typography variant='h6'>ENTER</Typography>
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  )
}

export default NewUser
