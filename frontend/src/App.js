import {useEffect, useState} from 'react'
import {Delete, Edit} from '@mui/icons-material'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  ButtonGroup,
  IconButton,
  Checkbox,
  TextField,
  Button,
  Divider,
} from '@mui/material'

import Card from 'components/Card'
import useFetch from 'hooks/useFetch'
// import {data} from 'mock'

const App = () => {
  const [input, setInput] = useState()
  const [updateField, setUpdateField] = useState()
  const [refectTodo, data] = useFetch('http://localhost:8000/todo', 'get')
  const [createTodo] = useFetch('http://localhost:8000/todo/create', 'post')
  const [updateTodo] = useFetch('http://localhost:8000/todo/update/', 'put')
  const [deleteTodo] = useFetch('http://localhost:8000/todo/delete/', 'delete')

  return (
    <Box>
      <Typography
        component='h1'
        textAlign='center'
        fontSize='2rem'
        fontWeight={600}
        mt='20px'
      >
        Django React Todo
      </Typography>
      <Card>
        <Box display='flex' columnGap={2}>
          <TextField
            label='What you want to do ?'
            fullWidth
            size='small'
            onChange={({target}) => setInput(target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={() => {
              createTodo({name: input}).then(refectTodo)
              setInput()
            }}
          >
            Add
          </Button>
        </Box>
        <List>
          {data &&
            data.map(({id, name, status, created_at}) =>
              id === updateField ? (
                <Box display='flex' columnGap={2} mt='10px' key={id}>
                  <TextField
                    label='Update your Todo '
                    fullWidth
                    size='small'
                    defaultValue={name}
                    onChange={({target}) => setInput(target.value)}
                  />
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    onClick={() => {
                      updateTodo({name: input}, id).then(refectTodo)
                      setInput()
                      setUpdateField()
                    }}
                  >
                    update
                  </Button>
                </Box>
              ) : (
                <Box key={id}>
                  <ListItem
                    secondaryAction={
                      <ButtonGroup>
                        <IconButton onClick={() => setUpdateField(id)}>
                          <Edit sx={{color: 'primary.main'}} />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteTodo(null, id).then(refectTodo)}
                        >
                          <Delete sx={{color: 'error.main'}} />
                        </IconButton>
                      </ButtonGroup>
                    }
                  >
                    <Checkbox
                      checked={status}
                      onChange={() =>
                        updateTodo({name: name, status: !status}, id).then(
                          refectTodo
                        )
                      }
                    />
                    <ListItemText
                      primary={name}
                      secondary={new Date(created_at).toLocaleString()}
                    />
                  </ListItem>
                  <Divider />
                </Box>
              )
            )}
        </List>
      </Card>
    </Box>
  )
}

export default App
