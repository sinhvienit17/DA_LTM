import React, { useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import SearchIcon from '@material-ui/icons/Search'
// import Paper from '../Paper'
import {
  Box,
  List,
  Typography,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  Link
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%'
    }
  },
  show: {
    margin: '20px'
  },
  iconSearch: {
    color: 'gray',
    fontSize: '40px',
    cursor: 'pointer',
    '&:hover': {
      color: '#AEDE41'
    }
  },
  boxSearch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '40px'
  },
  pdf: {
    cursor: 'pointer'
  }
}))

export default function Home () {
  const dispatch = useDispatch()
  const data = useSelector(state => state.query.data)
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)
  const [p, setP] = useState('')
  const classes = useStyles()
  const typingTimeoutRef = useRef(null)
  console.log('data', data)
  const handleClick = () => {
    console.log('clicked')
    if (value === '') {
      setP('Please fill a search field.')
    } else {
      setP('')
      dispatch({ type: 'GET_QUERY', q: value })
      setShow(true)
    }
  }

  const handleChange = e => {
    const q = e.target.value
    setValue(q)

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      setValue(q)
      console.log(q)
    }, 500)
  }

  return (
    <Box className={!show ? classes.root : classes.show}>
      {!show && (
        <Box>
          <img src='Google_Scholar.png' alt='gs' />
        </Box>
      )}
      <Box>
        <Typography>{p}</Typography>
      </Box>
      <Box className={classes.boxSearch}>
        <TextField
          style={{ maxWidth: '400px', width: '100%' }}
          type='search'
          variant='outlined'
          value={value}
          onChange={handleChange}
        />
        <SearchIcon className={classes.iconSearch} onClick={handleClick} />
      </Box>
      <Box className={classes.showList}>
        <List className={classes.listRoot}>
          {data &&
            data.map((paper, index) => {
              return (
                <Box key={index}>
                  <ListItem>
                    <ListItemText
                      primary={paper.title}
                      secondary={
                        <>
                          <Typography component='span' variant='body2'>
                            {paper.description.slice(0, -2).concat('...')}
                          </Typography>
                          <br />
                          <Typography component='span' variant='body2'>
                            {paper.authors.join(' - ').slice(0, -1)}
                          </Typography>
                          <br />
                          <Typography
                            component='span'
                            variant='body2'
                            style={{ color: '#AEDE41' }}
                          >
                            Read more ...
                          </Typography>
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      {paper.pdf !== undefined ? (
                        <Link
                          href={paper.pdf}
                          onClick={console.log('pdf', paper.pdf)}
                        >
                          <PictureAsPdfIcon className={classes.pdf} />
                        </Link>
                      ) : (
                        ''
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>

                  <Divider variant='inset' component='li' />
                </Box>
              )
            })}
        </List>
      </Box>
    </Box>
  )
}
