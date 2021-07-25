import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
// bring connect from react-redux, it's the bridge for connecting component to redux
import { useDispatch, useSelector } from 'react-redux'

// bring the actions, just bring that have REQUESTED in the suffix
// If you dispatching that doesn't have REQUESTED, it will not work
import {
  GET_TODOS_REQUESTED,
  DELETE_TODO_REQUESTED
} from '../redux/actions/actiontypes'

// Components
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import { deletetodo_action ,fetchtodos} from '../redux/actions'


const Todo = () => {
  const dispatch = useDispatch()
  const {loading, todos} = useSelector(state => state.todo);
  useEffect(() => {
    dispatch(fetchtodos())
    // eslint-disable-next-line
  }, [])
const deleteTodo=(id) => {
  dispatch(deletetodo_action(id))
}
  return (
    <>
      <TodoForm />
      {loading && 'Loading...'}
      {todos && todos.map((todo, index) => (
        <TodoItem todo={todo} key={index} deleteTodo={deleteTodo} />
      ))}
    </>
  )
}

Todo.propTypes = {
  loading: PropTypes.bool,
  todos: PropTypes.array,
  getTodos: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}




// To make those two function works register it using connect
export default Todo