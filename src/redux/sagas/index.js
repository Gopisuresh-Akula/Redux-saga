// Import the redux-saga/effects
import {
  put,
  call,
  takeLatest,
  takeEvery
} from 'redux-saga/effects'
//1) put:- is for dispatching the reducer from the saga, put is accepting object inside it, 
// in our case, we using type and payload as the object

// ---------------------------------------------------------------------------

// 2)call, is used for calling a function, in this case, we call a function that interacts with the server. 
// call accepting a function in the first argument, and the second one it’s free,
//  in this case, is used for passing the payload to the function.

// takeEvery: takes every matching action and run the given saga (non-blocking)

// takeLatest: takes every matching action and run the given saga, 
// but cancels every previous saga that is still running (blocking)

// Import all actions and api's
import {
  SET_LOADING,
  GET_TODOS,
  GET_TODOS_REQUESTED,
  SET_TODO_TITLE,
  SET_TODO_TITLE_REQUESTED,
  CLEAR_TODO_TITLE,
  CREATE_TODO,
  CREATE_TODO_REQUESTED,
  DELETE_TODO,
  DELETE_TODO_REQUESTED
} from '../actions/actiontypes'

// Import all api's
import {
  getAllTodos,
  createNewTodo,
  deleteExistedTodo
} from '../../api/todo-api'

// Here's the unique part, generator function*, function with asterisk(*)

// Get Todos
function* getTodos() {
  yield put({ type: SET_LOADING })

  const todos = yield call(getAllTodos)

  yield put({ type: GET_TODOS, payload: todos })
}

// Set the title of todo
function* setTodoTitle({ payload }) {
  yield put({ type: SET_TODO_TITLE, payload })
}

// Create Todo
function* createTodo({ payload }) {
  yield put({ type: SET_LOADING })

  const newTodo = yield call(createNewTodo, payload)

  yield put({ type: CREATE_TODO, payload: newTodo })
  
  // Clear todo after creating
  yield put({ type: CLEAR_TODO_TITLE })
}

// Delete todo
export function* deleteTodo({ payload }) {
  yield put({ type: SET_LOADING })

  const todo = yield call(deleteExistedTodo, payload)

  yield put({ type: DELETE_TODO, payload: todo })
}

// Export the saga (todo-saga)
export default function* todoSaga() {
  yield takeEvery(GET_TODOS_REQUESTED, getTodos)
  yield takeEvery(SET_TODO_TITLE_REQUESTED, setTodoTitle)
  yield takeLatest(CREATE_TODO_REQUESTED, createTodo)
  yield takeEvery(DELETE_TODO_REQUESTED, deleteTodo)
}