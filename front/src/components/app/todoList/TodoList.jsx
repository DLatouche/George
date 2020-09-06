import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { todosSelector, filteredTodosSelector } from "../../../redux/selectors/todos.selector"
import { toggleTodoAction, deleteTodoAction } from "../../../redux/actions/todo.action"

const TodoItem = ({ todo, onToggle, onDelete }) => {
    return <li>
        <label>
            <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo)} />
            {todo.title}
            <button onClick={() => { onDelete(todo) }}>x</button>
        </label>
    </li>
}

export const TodoList = ({ todos, onToggle, onDelete }) => {

    return <ul>
        {todos.map(todo => <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />)}
    </ul>
}

export const TodoListStore = () => {
    const todos = useSelector(filteredTodosSelector)
    const dispatch = useDispatch()
    const onToggle = useCallback((todo) => {
        dispatch(toggleTodoAction(todo))
    }, [])
    const onDelete = useCallback((todo) => {
        dispatch(deleteTodoAction(todo))
    }, [])
    return <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />
}

// export const TodoListStore = connect(
//     (state) => ({ todos: todosSelector(state) }),
//     (dispatch) => ({ onToggle: todo => dispatch(toggleTodoAction(todo)) })
// )(TodoList)