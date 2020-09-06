import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterAction } from "../../../redux/actions/filter.action"
import { filterSelector } from "../../../redux/selectors/filter.selector"

export const TodoFilter = ({ onChange, value }) => {
    return <div>
        <button disabled={value === null} onClick={() => { onChange(null) }}>Aucun filtre</button>
        <button disabled={value === true} onClick={() => { onChange(true) }}>Complétée</button>
        <button disabled={value === false} onClick={() => { onChange(false) }}>A faire</button>
    </div>

}

export const TodoFilterStore = () => {
    const value = useSelector(filterSelector)

    const dispatch = useDispatch()
    const onChange = useCallback((value) => {
        dispatch(setFilterAction(value))
    }, [])

    return <TodoFilter onChange={onChange} value={value} />
}