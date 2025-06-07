// Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    updateTaskList();
  }
});

let tasks = [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const taskText = document.getElementById("taskText");

  const text = taskText.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    taskText.value = "";
    updateTaskList();
    // updateStats();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  //   updateStats();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  //   updateStats();
};

const editTask = (index) => {
  document.getElementById("taskText").focus();

  const input = document.getElementById("taskText");
  input.value = tasks[index].text;

  deleteTask(index);
  updateTaskList();
  //   updateStats();
};

const updateStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  const progress = (completedTasks / totalTasks) * 100;
  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;

  document.getElementById(
    "numbers"
  ).innerText = `${completedTasks} / ${totalTasks}`;
};

const updateTaskList = () => {
  const list = document.getElementById("task-list");

  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const item = document.createElement("li");

    item.innerHTML = `
     <div class="taskItem">
      <div class="task ${task.completed ? "completed" : ""}">
        <input type="checkbox" class="checkbox" ${
          task.completed ? "checked" : ""
        }/>
        <p>${task.text}</p>
      </div>
      <div class="icons">
        <img src="./img/edit.png" onClick="editTask(${index})"/>
        <img src="./img/delete.png" onClick="deleteTask(${index})"/>
      </div>
    </div>
    `;

    item.addEventListener("change", () => toggleTaskComplete(index));

    // Add event listener specifically to the checkbox
    // const checkbox = item.querySelector(".checkbox");
    // checkbox.addEventListener("change", () => toggleTaskComplete(index));

    list.appendChild(item);
  });

  // updateStats();
  saveTasks();
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault(); // prevent default behavior of page reloading

  addTask();
});
