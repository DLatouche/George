import { combineReducers, createStore, applyMiddleware  } from 'redux'
import { todosReducer } from '../reducers/todo.reducer'
import { filterReducer } from '../reducers/filter.reducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(
    combineReducers({
        todos: todosReducer,
        filter: filterReducer,
    }), composeWithDevTools(
        applyMiddleware(thunk),
    )
)

export default store