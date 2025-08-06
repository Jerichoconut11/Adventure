const addTask = document.querySelector(".add-task");
const taskContainer = document.querySelector(".task-container");

let tasks = [];

const getItem = JSON.parse(localStorage.getItem("objectives"));
tasks = getItem || [];
renderedToDoList();

function renderedToDoList() {
  document.querySelector(".task-container").innerHTML = tasks
    .map(
      (task, index) =>
        `<div onclick="completeToggle(${index})" class="done ${
          task.completed ? "completed" : ""
        }"
      style="cursor: pointer">${task.name}</div>
        <div>${task.date}</div>
        <button class="edit-btn"onclick="editTask(${index})">Edit </button>
        <button class="delete-btn"onclick="removeTask(${index})">Delete</button>
        `
    )
    .join("");
}

function completeToggle(index) {
  if (tasks[index].completed === true) {
    tasks[index].completed = false;
  } else {
    tasks[index].completed = true;
  }
  renderedToDoList();
  localStorage.setItem("objectives", JSON.stringify(tasks));
}

function editTask(index) {
  let userEdit = prompt("Enter a new Task", tasks[index].name);
  let userDateEdit = prompt("Enter a new date", tasks[index].date);
  if (userEdit.trim() && userDateEdit.trim() !== null) {
    tasks[index].name = userEdit;
    tasks[index].date = userDateEdit;
  } else {
    alert("Canceled or Empty");
  }
  renderedToDoList();
  localStorage.setItem("objectives", JSON.stringify(tasks));
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderedToDoList();
  localStorage.setItem("objectives", JSON.stringify(tasks));
}

addTask.addEventListener("click", () => {
  const taskinput = document.querySelector(".input");
  const dateInput = document.querySelector(".date");

  const taskValue = taskinput.value;
  const dateValue = dateInput.value;

  if (taskValue && dateValue !== "") {
    tasks.push({ name: taskValue, date: dateValue, completed: false });
    renderedToDoList();
    taskinput.value = "";
    dateInput.value = "";
    localStorage.setItem("objectives", JSON.stringify(tasks));
  }
});
