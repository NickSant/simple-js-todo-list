var todoList = {
  todos: [],

  displayTodos: function () {
    view.displayTodos();
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

    console.log("The Todo has been deleted!");
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

var handlers = {
  toggleAll: function () {
    todoList.toggleAll();
  },
  addTodo: function () {
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
  },
  changeTodo: function () {
    var changeTodoTextInput = document.getElementById("changeTodoTextInput");
    var changeTodoPositionInput = document.getElementById(
      "changeTodoPositionInput"
    );

    todoList.changeTodo(
      changeTodoPositionInput.value,
      changeTodoTextInput.value
    );
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
  },
  deleteTodo: function () {
    var deleteTodoPositionInput = document.getElementById(
      "deleteTodoPositionInput"
    );

    todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    deleteTodoPositionInput.value = '';
  },
  toggleTodo: function () {
    var toggleTodoPositionInput = document.getElementById(
      "toggleTodoPositionInput"
    );

    todoList.toggleCompleted(toggleTodoPositionInput.value);
    toggleTodoPositionInput.value = '';
  }
};

var view = {
  displayTodos: function(){
    var todoUl= document.querySelector('ul');
    todoUl.innerHTML = '';
    
    for (let i = 0; i < todoList.todos.length; i++ ){
      var todoLi = document.createElement('li');
      var todos = todoList.todos[i]; 
      
      
      var todoTextWithCompletion = '';
      if(todoList.todos[i].completed === true){
        todoTextWithCompletion = '(X) ' + todos.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todos.todoText;
      }
      todoLi.textContent = todoTextWithCompletion;
      todoUl.appendChild(todoLi);
    }
  }
}
