import {makeAutoObservable} from "mobx";

export default class Todo {
    constructor() {
        this._todos = [];
        makeAutoObservable(this)
    }

    setTodos(todos) {
        this._todos = todos;
    }

    addTodo(todo) {
        this._todos.push(todo);
    }

    deleteTodo(id) {
        this._todos = this._todos.filter(todo => todo.id !== id);
    }

    get todos() {
        return this._todos;
    }
}