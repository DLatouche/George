import React, { useCallback, useRef, useState } from 'react';
import { addTodoAction } from "../../../redux/actions/todo.action"
import { useDispatch } from 'react-redux';

export const AddTodoForm = ({ onAdd }) => {
    const input = useRef(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {

            await onAdd({ title: input.current.value })
            setLoading(false)

            input.current.value = ''
            input.current.focus()
        } catch (e) {
            setLoading(false)
            console.log("%cAddTodoForm.jsx -> 18 ERROR: ", 'background: #FF0000; color:#FFFFFF',e)
        }
    }

    return (

        <form onSubmit={onSubmit}>
            <input ref={input} type="text" placeholder="Tâche" />
            <button disabled={loading} >Ajouter</button>
            {loading && 'Chargement...'}
        </form>
    )

}

export const AddTodoFormStore = () => {

    const dispatch = useDispatch()
    const onAdd = useCallback((todo) => {
        return dispatch(addTodoAction(todo))
    }, [])

    return <AddTodoForm onAdd={onAdd} />
}