import {For, Component, Template} from 'angular2/angular2';
import {List} from 'angular2/src/facade/collection';
import {TodoStore} from 'src/services/todo-store';

@Component({
  selector: 'todo-list'
})
@Template({
  url: 'src/components/todo-list.html',
  directives: [For]
})
export class TodoListComponent {
  todos: List;
  _todoStore: TodoStore;

  constructor(todoStore: TodoStore) {
    this._todoStore = todoStore;
    this.todos = todoStore.todos;
  }

  removeTodo(todo) {
    this._todoStore.removeTodo(todo);
  }

  completeTodo(todo) {
    this._todoStore.toggleTodo(todo);
  }

  clearCompletedTodos() {
    this._todoStore.clearCompletedTodos();
    this.todos = this._todoStore.todos;
  }
}