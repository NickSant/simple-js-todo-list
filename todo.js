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

    this.displayTodos();
  },
  toggleCompleted: function (position) {
    var todo = this.todos[position];
    todo.completed = !this.todos[position].completed;
    this.displayTodos();
  },
  toggleAll: function () {
    var todos = this.todos;
    var completedTodos = 0;

    todos.forEach((element) => {
      if (element.completed === true) {
        completedTodos++;
      }
    });

    todos.forEach((element) => {
      if (completedTodos === todos.length) {
        element.completed = false;
      } else {
        element.completed = true;
      }
    });

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
  deleteTodo: function (position) {
    todoList.deleteTodo(position);
  },
  toggleTodo: function () {
    var toggleTodoPositionInput = document.getElementById(
      "toggleTodoPositionInput"
    );

    todoList.toggleCompleted(toggleTodoPositionInput.value);
    toggleTodoPositionInput.value = "";
  },
};

var view = {
  displayTodos: function () {
    var todoUl = document.querySelector("ul");
    todoUl.innerHTML = "";

    todoList.todos.forEach((element, position) => {
      var todoLi = document.createElement("li");

      var todoTextWithCompletion = "";
      if (element.completed === true) {
        todoTextWithCompletion = "(X) " + element.todoText;
      } else {
        todoTextWithCompletion = "( ) " + element.todoText;
      }
      

      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoUl.appendChild(todoLi);
    });
  },
  createDeleteButton: function () {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  setUpEventListeners: function () {
    var todosUl = document.querySelector("ul");
    todosUl.addEventListener("click", (event) => {
      var eventElement = event.target;

      if (eventElement.className === "deleteButton") {
        handlers.deleteTodo(event.target.parentNode.id);
      }
    });
  },
};

view.setUpEventListeners();

//Next features:
//change from ul to divs, to make little cards.
