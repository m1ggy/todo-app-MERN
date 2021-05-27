import { createSlice } from '@reduxjs/toolkit';
import { post, get } from '../utils/actions';
export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    value: [],
    message: undefined,
  },
  reducers: {
    setTodo: (state, { payload }) => {
      state.value = payload;
    },
    setMsg: (state, { payload }) => {
      state.message = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTodo, setMsg } = todoSlice.actions;

export const addNewTodo = (todo) => (dispatch) => {
  post('https://fierce-refuge-86786.herokuapp.com/api/add-new-todo', todo).then(
    (res) => {
      if (res.status === 200) {
        getTodo();
        dispatch(setMsg('Successfully created todo'));
      } else {
        dispatch(setMsg('Failed to create Todo.'));
      }
    }
  );
};
export const deleteTodo = (id) => (dispatch) => {
  post('https://fierce-refuge-86786.herokuapp.com/api/delete-todo', { id: id })
    .then((res) => {
      if (res.status === 200) {
        dispatch(getTodo());
        dispatch(setMsg('successfully deleted todo'));
      } else {
        dispatch(setMsg('failed to delete todo'));
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const updateTodo = (id, done) => (dispatch) => {
  post('https://fierce-refuge-86786.herokuapp.com/api/update-todo', {
    id,
    done,
  })
    .then((res) => {
      if (res.status === 200) {
        dispatch(getTodo());
      } else {
        return console.log(res);
      }
    })
    .catch((e) => {
      console.log(e.response.data.message);
    });
};

export const getTodo = () => (dispatch) => {
  get('https://fierce-refuge-86786.herokuapp.com/api/').then((res) => {
    dispatch(setTodo(res.data));
  });
};

export default todoSlice.reducer;
