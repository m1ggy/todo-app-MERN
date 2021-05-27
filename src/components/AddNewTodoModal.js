import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {
  Checkbox,
  FormControl,
  Button,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  Typography,
  TextField,
  Card,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addNewTodo, getTodo } from '../slices/todoSlice';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: 50,
  },
}));

export default function AddNewTodoModal({ handle, open }) {
  const [title, setTitle] = useState('');
  const [done, setDone] = useState(false);
  const [description, setDescription] = useState('');
  const classes = useStyles();

  const dispatch = useDispatch();

  function handleSubmit() {
    const date = new Date().toDateString();
    const todo = {
      title,
      done,
      description,
      datePosted: date,
    };
    console.log(date);
    dispatch(addNewTodo(todo));
    dispatch(getTodo());
    setDescription('');
    setTitle('');
    setDone(false);
    handle();
  }
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card style={{ padding: 50 }}>
            <CardContent>
              <Grid
                container
                direction='column'
                justify='space-between'
                alignItems='center'
                spacing={3}
              >
                <Grid item>
                  <h2 id='transition-modal-title'>
                    <Typography variant='h3' gutterBottom>
                      Add a new todo.
                    </Typography>
                  </h2>
                </Grid>

                <Grid item>
                  <FormControl>
                    <InputLabel htmlFor='title'>Title</InputLabel>
                    <Input
                      id='title'
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    label='Description'
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item>
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='done'
                          value={done}
                          onChange={(e) => {
                            setDone(e.target.checked);
                          }}
                        />
                      }
                      label='Is your todo done?'
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                color='primary'
                variant='contained'
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}
