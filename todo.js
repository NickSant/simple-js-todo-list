var todoList = {
  todos: [],

  displayTodos: function () {
    if (this.todos.length === 0) {
      console.log("There is no Todos");
    } else {
      console.log("My Todos:");
      for (var i = 0; i < this.todos.length; i++) {
        if (this.todos[i].completed) {
          console.log("(X)", this.todos[i].todoText);
        } else {
          console.log("( )", this.todos[i].todoText);
        }
      }
    }
  },
  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
    });
    this.displayTodos();
  },
  changeTodo: function (position, NewItem) {
    this.todos[position].todoText = NewItem;
    this.displayTodos();
  },
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  toggleCompleted: function (position) {
    var todo = this.todos[position];
    todo.completed = !this.todos[position].completed;
    this.displayTodos();
  },
  toggleAll: function () {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    var uncompletedTodos = 0;
    for (var i = 0; i < this.todos.length; i++) {
      if (this.todos[i].completed) {
        completedTodos++;
      } else uncompletedTodos++;
    }
    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i++) {
        var todo = this.todos[i];
        todo.completed = false;
      }
    } else {
      for (var i = 0; i < totalTodos; i++) {
        var todo = this.todos[i];
        todo.completed = true;
      }
    }
    this.displayTodos();
  },
};

var handlers ={
  displayTodos: function() {
    todoList.displayTodos();
  },
  toggleAll: function () {
    todoList.toggleAll();
  }
};