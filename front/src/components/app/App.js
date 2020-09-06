import React from 'react';
import './App.scss'
import store from '../../redux/store';
import { Provider } from 'react-redux'
import { TodoListStore } from './todoList/TodoList';
import { TodoFilterStore } from './todoList/TodoFilter';
import { AddTodoFormStore } from './todoList/AddTodoForm';

const App = () => {

    return (
        <Provider store={store}>
            <div>
                <TodoFilterStore />
                <TodoListStore />
                <AddTodoFormStore />
            </div>
        </Provider>
    )
}

export default App;