var todoList = {
  todos: [],
  displayTodos: function () {
    view.displayTodos();
  },
  addTodo: function (todoText) {
    const component = view.createComponent(todoText);
    let todoLi = document.createElement("li");
    todoLi.innerHTML = component;

    todoLi.className = "list__task";

    this.todos.push({
      todoText: todoText,
      completed: false,
      component: todoLi,
    });

    todoList.todos.forEach((element, position) => {
      todoLi.id = position;
    });
  
    var todoUl = document.querySelector("ul");
    todoUl.appendChild(todoLi);
  },
  deleteTodo: function (position) {
    this.todos.splice(position, 1);

    let li = document.getElementById(position);
    li.parentNode.removeChild(li);
  },
  toggleCompleted: function (position) {
    var todo = this.todos[position];
    todo.completed = !this.todos[position].completed;

    view.singleToggleCompleted(position);
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
  setUpEventListeners: function () {
    var todosUl = document.querySelector("ul");
    var headerBottom = document.querySelector(".todolist__header--bottom");

    headerBottom.addEventListener("click", (event) => {
      var eventI = event.target;
      var toggleAllButton = eventI.parentNode;

      if (toggleAllButton.className === "toggleAllButton") {
        handlers.toggleAll();
      }
    });

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

      if (toggleButton.id === "toggleCompleted") {
        todoList.toggleCompleted(listID);
      }
    });

    document.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        handlers.addTodo();
      }
    });
  },
  createComponent: function (todoText) {
    return `
                <button id="toggleCompleted" class="list__task--check"><i class="ion-ios-checkmark green"></i></button>
                <div class="list__task--text">${todoText}</div>
                <div class="wrapper--left">
                  <button class="deleteButton"><i class="ion-android-delete"></i></button>
                </div>
          `;
  },
  singleToggleCompleted: function (position) {
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
  dateConfig: function () {
    var data = new Date();

    var day = data.getDate();
    var month = data.getMonth();
    var year = data.getFullYear();

    var monthsArray = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outrubro",
      "Novembro",
      "Dezembro",
    ];

    var daySpan = document.querySelector(".date--day");
    var monthSpan = document.querySelector(".date--month");
    var yearSpan = document.querySelector(".date--year");

    setTimeout(() => {
      daySpan.textContent = day;
      monthSpan.textContent = monthsArray[month];
      yearSpan.textContent = year;
    }, 1);
  },
};

view.dateConfig();
view.setUpEventListeners();
