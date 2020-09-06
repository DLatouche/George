import { UPDATE_TODO_ACTION, DELETE_TODO_ACTION, ADD_TODO_ACTION } from "../reducers/todo.reducer";
import wait from "../../utilities/wait";
export const toggleTodoAction = (todo) => ({ type: UPDATE_TODO_ACTION, payload: { ...todo, completed: !todo.completed } })

export const deleteTodoAction = (todo) => ({
    type: DELETE_TODO_ACTION, payload: todo.id
})

export const addTodoAction = (todo) => async (dispatch) => {
    await wait({ duration: 2000 })
    dispatch({
        type: ADD_TODO_ACTION, payload: todo

    })
}