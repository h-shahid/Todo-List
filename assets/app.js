//wait for page to "load"  listener
window.addEventListener("load", () => {
  document.title = "Cool TODO List";
  const todoList = [];
  let isDone = false;

  //add eventlistener on button click
  let submitButton = document.querySelector(".btn-primary");
  submitButton.addEventListener("click", (e) => {
    e.preventDefault(); //stops form from submitting & refreshing pg

    const todoListInput = document.querySelector("#todo_input");

    //Make sure input element isn't empty
    if (todoListInput.value !== "") {
      document.querySelector("#todo_list").innerHTML = ""; //empty string to start list over
      pushTodo(todoListInput.value);
      showArrInHTml(todoList);
      clearInput(todoListInput); //clears values so we don't get the same data twice
    }
  });
  // grab input value and push to todo list arr
  function pushTodo(todo) {
    todoList.push(todo); //creates an objece in memory for new list & clears old list
    return todoList;
  }
  function clearInput(input) {
    input.value = "";
  }
  //create divs for list items and render them
  function showArrInHTml(arr) {
    arr.map((todo) => {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo_div");
      //Set div data attribute to equal the value of the list item
      todoItem.setAttribute("data-todo_id", todo);

      //Now we will create html formatting for what todo's will look like

      todoItem.innerHTML = `
    <button class="btn btn-outline-success p-0"><i class="far fa-check-square"></i></button>
    <p class="p-3" id="todo_item">${todo}</p>
    <button class="btn btn-outline-danger p-0"><i class="far fa-trash-alt"></i></button>
    `;
      document.querySelector("#todo_list").append(todoItem);
    });
  }

  $("#todo_list").on("click", ".btn-outline-danger", (e) => {
    e.target.parentElement.parentElement.remove();
    const todoId = e.target.parentElement.parentElement.getAttribute(
      "data-todo_id"
    );
    todoList.splice(todoList.indexOf(todoId), 1);
  });
  // Toggle the done class

  $("#todo_list").on("click", ".btn-outline-success", (e) => {
    if (!isDone) {
      const todo_text = e.target.parentElement.nextElementSibling;
      todo_text.classList.add('done');
      e.target.parentElement.parentElement.classList.add("done-div"); //safest way to ensure ppl are clicking on what you want them to click o
      isDone = true;
    } else {
      const todo_text = e.target.parentElement.nextElementSibling;
      todo_text.classList.remove('done');
      e.target.parentElement.parentElement.classList.remove("done-div"); //safest way to ensure ppl are clicking on what you want them to click o
      isDone = false;
    }
  });
});
