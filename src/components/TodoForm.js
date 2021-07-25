import React from 'react'
import PropTypes from 'prop-types'

// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect,useDispatch,useSelector } from 'react-redux'
import { createTodo_action, setTodoTitle_action } from '../redux/actions'

// bring the actions, just bring that have REQUESTED in the suffix
// If you dispatching that doesn't have REQUESTED, it will not work

const TodoForm = () => {
  const dispatch = useDispatch()

  const title = useSelector(state => state.todo.title)
  const onChange = (e) => {
    dispatch(setTodoTitle_action(e.target.value))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTodo_action(title))
  }

  return (
    <form onSubmit={onSubmit}>
      <input 
	type="text" 
	placeholder="What needs to be done..." 
	onChange={onChange}
	value={title}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

TodoForm.propTypes = {
  title: PropTypes.string,
  setTodoTitle: PropTypes.func.isRequired,
  createTodo: PropTypes.func.isRequired
}


// Get dispatch / function to props


export default (TodoForm)