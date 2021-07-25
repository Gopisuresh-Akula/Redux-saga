import { DELETE_TODO_REQUESTED,GET_TODOS_REQUESTED ,CREATE_TODO_REQUESTED,SET_TODO_TITLE_REQUESTED} from "./actiontypes";


export const deletetodo_action=(id)=>({
    type: DELETE_TODO_REQUESTED,
    payload:id
})
export const fetchtodos=(id)=>({
    type: GET_TODOS_REQUESTED
})
export const  createTodo_action=(title)=>({
    type: CREATE_TODO_REQUESTED,
     payload: title
})
export const setTodoTitle_action=(title)=>({
    type: SET_TODO_TITLE_REQUESTED, 
    payload: title 
}) 
