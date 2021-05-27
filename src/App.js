import { useEffect, useState } from 'react';
import { Button, Typography, Grid, Box, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RenderTodos from './components/RenderTodos';
import MessageSnackbar from './components/MessageSnackbar';
import AddNewTodoModal from './components/AddNewTodoModal';

import { useDispatch, useSelector } from 'react-redux';
import { setMsg, getTodo } from './slices/todoSlice';
const useStyles = makeStyles(() => ({
  paper: {
    padding: 20,
    backgroundColor: 'gray',
  },
  container: {
    marginTop: 75,
    paddingBottom: 50,
    overflow: 'hidden',
  },
}));
function App() {
  const classes = useStyles();
  const msg = useSelector((state) => state.todo.message);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState(msg);
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof msg != 'undefined') {
      setMessage(msg);
      setSnackbar(true);
    }
  }, [msg]);

  const handleSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(false);
    dispatch(setMsg(undefined));
  };

  const handle = () => {
    setOpen(!open);
    dispatch(getTodo());
  };
  return (
    <Box overflow='hidden' width='100%' className={classes.container}>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
        spacing={3}
        overflow='hidden'
      >
        <Grid item>
          <Typography>
            <Link
              href='https://github.com/m1ggy'
              style={{ marginRight: '20px' }}
            >
              Github
            </Link>
            <Link href='https://github.com/m1ggy/todo-app-mern'>
              Repository
            </Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='h1'>Todo App using MERN Stack</Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            spacing={3}
          >
            <Grid item>
              <Button variant='contained' color='primary' onClick={handle}>
                Add new Todo
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <RenderTodos />
        </Grid>
      </Grid>
      <AddNewTodoModal handle={handle} open={open} />
      <MessageSnackbar
        handleClose={handleSnackbar}
        snackbar={snackbar}
        message={message}
      />
    </Box>
  );
}

export default App;
