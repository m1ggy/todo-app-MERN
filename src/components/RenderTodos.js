import { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  makeStyles,
  Button,
  CircularProgress,
  Typography,
  CardActions,
  CardContent,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, getTodo, updateTodo } from '../slices/todoSlice';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  button: {
    variant: 'danger',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function RenderTodos() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const todos = useSelector((state) => state.todo.value);
  const [data, setData] = useState(todos);

  useEffect(() => {
    dispatch(getTodo());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setData(todos);
  }, [todos]);

  const classes = useStyles();

  function handleDelete(id) {
    dispatch(deleteTodo(id));
  }
  function handleUpdate(id, done) {
    dispatch(updateTodo(id, done));
  }

  function Todos({ data }) {
    return data.map((todo) => {
      return (
        <Grid item key={todo._id}>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                {todo.title}
              </Typography>
              <Typography className={classes.pos} color='textSecondary'>
                {todo.done ? 'Done.' : 'Not yet done.'}
              </Typography>
              <Typography variant='body2' component='p'>
                <br />
                {todo.description}
              </Typography>
              <Typography>
                {new Date(todo.datePosted).toDateString()}
              </Typography>
            </CardContent>
            <CardActions>
              {!todo.done && (
                <Button
                  size='large'
                  color='primary'
                  onClick={() => handleUpdate(todo._id, true)}
                >
                  Mark as done
                </Button>
              )}
              <Button
                size='small'
                color='secondary'
                onClick={() => handleDelete(todo._id)}
              >
                Delete todo
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  }

  if (loading) {
    return <CircularProgress />;
  } else {
    if (data.length === 0) {
      return (
        <Typography>
          Database is empty. Add a new todo to populate it.
        </Typography>
      );
    }
  }

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      spacing={3}
    >
      <Todos data={data} />
    </Grid>
  );
}
