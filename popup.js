

const todoListElement = document.querySelector("#myUL");
let todos = [];

function addToLocalStorage(todos) {
  // conver the array to string then store it.
  localStorage.setItem('todos', JSON.stringify(todos));
  // render them to screen
}

// function helps to get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    todos = JSON.parse(reference);
displayTodos()
  }
}

// initially get everything from localStorage
getFromLocalStorage();


document.querySelector("#add_button").addEventListener("click", addTodo);
document.querySelector("#myInput").addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    addTodo()
  }
});

//-------GETTING VALUES FROM INPUT TO ARRAY OF OBJECTS-------
function addTodo() {
  const todoText = document.querySelector("#myInput").value;

  if (todoText == "") {
        const todoObject = {
      id: todos.length,
      todoText: "todo cannot be empty",
      isDone: false,
    };
    todos.unshift(todoObject);
    displayTodos();
addToLocalStorage(todos)
  } else {
    const todoObject = {
      id: todos.length,
      todoText: todoText,
      isDone: false,
    };
    //---WITH UNSHIFT WE ADD THE NEW ELEMENT TO THE BEGINNING OF THE ARRAY
    //--SO THAT THE NEW ITEMS SHOW UP ON TOP
    todos.unshift(todoObject);
    displayTodos();
addToLocalStorage(todos)
  }
}

//------CHANGING THE isDone VALUE TO TRUE WHEN THE ELEMENT IS CLICKED
//------OR TO FALSE IF IT WAS TRUE BEFORE
function doneTodo(todoId) {
  const selectedTodoIndex = todos.findIndex((item) => item.id == todoId);

  todos[selectedTodoIndex].isDone
    ? (todos[selectedTodoIndex].isDone = false)
    : (todos[selectedTodoIndex].isDone = true);
addToLocalStorage(todos)
  displayTodos();
}

//----TO DELETE AN ITEM; FROM THE LIST
function deleteItem(x) {
  todos.splice(
    todos.findIndex((item) => item.id == x),
    1
  );
  displayTodos();

addToLocalStorage(todos)
}

//---------DISPLAYING THE ENTERED ITEMS ON THE SCREEN------
function displayTodos() {
  todoListElement.innerHTML = "";
  document.querySelector("#myInput").value = "";

  todos.forEach((item) => {
    const listElement = document.createElement("li");
    const delBtn = document.createElement("span");

    listElement.innerHTML = item.todoText;
    listElement.setAttribute("data-id", item.id);

    delBtn.setAttribute("data-id", item.id);
    delBtn.innerText = "✕"
    delBtn.classList.add("far")
    delBtn.setAttribute("data-id", item.id);

    if (item.isDone) {
      listElement.classList.add("checked");
    }

    listElement.addEventListener("click", function (e) {
      const selectedId = e.target.getAttribute("data-id");
      doneTodo(selectedId);
    });

    delBtn.addEventListener("click", function (e) {
      const delId = e.target.getAttribute("data-id");
      deleteItem(delId);
    });

    todoListElement.appendChild(listElement);
    listElement.appendChild(delBtn);
  });
}

// toggle the value to completed and not completed
function toggle(id) {
  todos.forEach(function(item) {
    // use == not ===, because here types are different. One is number and other is string
    if (item.id == id) {
      // toggle the value
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
  // filters out the <li> with the id and updates the todos array
  todos = todos.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(todos);
}