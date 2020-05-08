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

    view.modifyComponent(position);
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
};

var view = {
  displayTodos: function () {
    var todoUl = document.querySelector("ul");
    todoUl.innerHTML = "";

    todoList.todos.forEach((element, position) => {
      var todoLi = document.createElement("li");

      todoLi.id = position;
      todoLi.className = "list__task";
      todoText = element.todoText;

      const component = this.createComponent(todoText, position);
      todoLi.innerHTML = component;

      todoUl.appendChild(todoLi);
    });
  },
  setUpEventListeners: function () {
    var todosUl = document.querySelector("ul");

    todosUl.addEventListener("click", (event) => {
      var eventI = event.target;
      var deleteButton = eventI.parentNode;
      var listID = deleteButton.parentNode.parentNode.id;

      if (deleteButton.className === "deleteButton") {
        todoList.deleteTodo(listID);
      }
    });

    todosUl.addEventListener("click", (event) => {
      var eventI = event.target;
      var toggleButton = eventI.parentNode;
      var listID = toggleButton.parentNode.id;

      if (
        toggleButton.className === "list__task--check" ||
        "list__task--checked"
      ) {
        todoList.toggleCompleted(listID);
      }
    });
  },
  createComponent: function (todoText, position) {
    return `
                <button class="list__task--check"><i class="ion-ios-checkmark green"></i></button>
                <div id="div${position}" class="list__task--text">${todoText}</div>
                <div class="wrapper--left">
                  <button class="deleteButton"><i class="ion-android-delete"></i></button>
                </div>
          `;
  },
  modifyComponent: function (position) {
    var todoList = document.querySelectorAll(".list__task");

    todoList.forEach((element) => {
      if (position === element.id) {
        var textDiv = element.querySelector(".list__task--text");
        var toggleButton = element.querySelector(".list__task--check");

        textDiv.classList.toggle("list__task--text--checked");
        toggleButton.classList.toggle("list__task--checked");
      }
    });
  },
};

view.setUpEventListeners();
