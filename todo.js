let todoArray = [];
function renderTodo() {
  let todo = document.querySelector(".todo-list-container");
  let todoHtml = "";

  todoArray.forEach((todo, index) => {

    todoHtml += `
        
        
        <div class="todo-list" >
          <p>${index + 1} -  ${todo.todoVal} </p>
          </div> 
          <div class="todo-list-date">
            <p>
          ${todo.todoDate}</p>
          </div> 
      <!--     // giving class todo-button-${index} so that we can have access to button of 
      particular index -->
           <div class="todo-buttons todo-button-${index}">
             <button class="delete todo-button"
              onclick="deleteTodo(${index});">Delete Todo
              </button>
           <!--  data attributes use to attach info with html elements here it is storing index number 
              with each button help to get correct index button -->
           <button class="update todo-button js-todo-update-button" data-index="${index}"
            >
            Update Todo 
           </button>
            
           <input class="todo-update-input js-todo-update-input"  type="text" >
            <input class="todo-update-date js-todo-update-date " type="date">
            <span class="todo-save js-todo-save" data-index="${index}">Save</span>
           </div>
           `
    console.log("array current", todoArray);


  })
  todo.innerHTML = todoHtml;
  //aadding update inside rendor so each time the page load event listener also loads
  //selecting all todo buttons from which clicked updated button will work
  document.querySelectorAll(".js-todo-update-button").
    forEach((btn) => {
      btn.addEventListener('click', () => {
        console.log("Im a listener");
        // storing index number from the update button index number
        const btnIndex = btn.dataset.index;
        console.log(btnIndex);
        // created a container variable which will have button class with the selected index
        const updateContainer = document.querySelector(`.todo-button-${btnIndex}`);
        console.log(updateContainer);
        updateContainer.classList.add("show-update");
      });

    });
  // saving todo
  document.querySelectorAll(".js-todo-save").
    forEach((btn) => {
      btn.addEventListener('click', () => {
        const btnIndex = btn.dataset.index;
        const updateContainer = document.querySelector(`.todo-button-${btnIndex}`);
        console.log(updateContainer);

        updateContainer.classList.remove("show-update");
        console.log("save done");
        let updatedTodo = updateContainer.querySelector(".js-todo-update-input").value;
        let updatedDate = updateContainer.querySelector(".js-todo-update-date").value;
        console.log(updatedTodo);
        console.log(updatedDate);
        if (updatedTodo === "" && updatedDate === "") {
         todoArray[btnIndex].todoVal = todoArray[btnIndex].todoVal;
  todoArray[btnIndex].todoDate = todoArray[btnIndex].todoDate;
        }
        //only changing todo
        else if (updatedTodo !== "" && updatedDate === "") {
           todoArray[btnIndex].todoVal = updatedTodo;


       }
       //only changing date
        else if (updatedDate !== "" && updatedTodo==="") {
  todoArray[btnIndex].todoDate = updatedDate;

        }
// changing both
        else {
           todoArray[btnIndex].todoVal = updatedTodo;
  todoArray[btnIndex].todoDate = updatedDate;
        }
        saveTodo();
        renderTodo();
      });

    });
}

function addTodo() {

  let todoVal = document.getElementById("todo").value;

  let todoDate = document.getElementById("todoDate").value;
  if (todoVal == "" && todoDate == "") {
    document.querySelector(".todo-list-container").innerHTML = "<p>Enter a todo</p>";

  }
  else {

    todoArray.push({ todoVal, todoDate });
    document.getElementById("todo").value = "";
    document.getElementById("todoDate").value = "";
    saveTodo();
    renderTodo();
  }
}
function deleteTodo(index) {
  console.log("I am deleted todo ", index);

  todoArray.splice(index, 1);
  saveTodo();
  renderTodo();
}

function saveTodo() {
  localStorage.setItem('todo', JSON.stringify(todoArray));

}
function loadFromLocalStorage() {
  const storedTodos = JSON.parse(localStorage.getItem("todo"));

  if (storedTodos) {
    todoArray = storedTodos;
    renderTodo();
  }
}
loadFromLocalStorage();
