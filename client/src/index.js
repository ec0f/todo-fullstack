import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserTodo from "./todo/UserTodo";
import Todo from "./todo/Todo";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserTodo(),
        todos: new Todo(),
    }}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Context.Provider>
);

