import {List, ListWrapper} from 'angular2/src/facade/collection';

export class TodoStore {
  todos: List;

  constructor() {
    this.todos = this._getCachedTodos() || ListWrapper.create();
  }

  addTodo(todo) {
    todo.id = this._getNextTodoId();
    todo.isComplete = false;
    this.todos.push(todo);

    this._setCachedTodos();
  }

  removeTodo(todoToRemove) {
    ListWrapper.remove(this.todos, todoToRemove);

    this._setCachedTodos();
  }

  toggleTodo(todo) {
    todo.isComplete = true;

    this._setCachedTodos();
  }

  clearCompletedTodos() {
    // TODO(matthewjh): we shouldn't reassign this.todos here, but this is an easy one-liner.
    this.todos = ListWrapper.filter(this.todos, (todo) => !todo.isComplete);

    this._setCachedTodos();
  }

  _getNextTodoId(): number {
    var lastTodo = ListWrapper.last(this.todos);

    if (lastTodo) {
      return lastTodo.id + 1;
    } else {
      return 0;
    }
  }

  _getCachedTodos(): List {
    return JSON.parse(localStorage.getItem('todos'));
  }

  _setCachedTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}