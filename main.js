document.addEventListener('DOMContentLoaded', () => {
  const tasksContainer = document.querySelector("#taskContainer");
  const addTaskForm = document.querySelector("#add-task");

  class TaskManager {
    constructor() {
      this.tasks = [];
      this.tasksContainer = document.querySelector("#taskContainer");
      this.addTaskForm = document.querySelector("#add-task");

      this.addTaskForm.addEventListener("submit", this.handleAddTask.bind(this));
      this.tasksContainer.addEventListener("click", this.handleTaskActions.bind(this));
      document.querySelector("#sort").addEventListener("change", this.sortTasks.bind(this));
    }

    handleAddTask(event) {
      event.preventDefault();
      const title = String(document.querySelector("#title").value);
      const priority = Number(document.querySelector("#priority").value);
      const task = new Task(title, priority);
      this.tasks.push(task);
      this.displayTask(task);
    }

    displayTask(task) {
      const li = document.createElement("li");
      const left = document.createElement("div");
      const right = document.createElement("div");
      const titleElem = document.createElement("h4");
      const info = document.createElement("span");
      const remove = document.createElement("button");
      const edit = document.createElement("button");
      const save = document.createElement("button");
      const editTitle = document.createElement("input");
      const editPriority = document.createElement("input");
      const status = document.createElement("span");
      const markDone = document.createElement("button");
      const markUndone = document.createElement("button");

      titleElem.classList.add("taskTitle");
      info.classList.add("taskinfo");
      remove.classList.add("btn-delete");
      edit.classList.add("btn-primary");
      editTitle.classList.add("input");
      editPriority.classList.add("input");
      save.classList.add("btn-primary");
      status.classList.add("taskStatus");
      markDone.classList.add("btn-primary");
      markUndone.classList.add("btn-primary");

      titleElem.innerText = task.title;
      info.innerText = `${task.date.toLocaleDateString()} ${task.date.toLocaleTimeString()} - Priority ${task.priority}`;
      remove.innerText = "Remove";
      edit.innerText = "Edit";
      save.innerText = "Save";
      status.innerText = task.status;
      markDone.innerText = "Done";
      markUndone.innerText = "Undone";
      editTitle.value = task.title;
      editPriority.value = task.priority;

      editTitle.style.display = "none";
      editPriority.style.display = "none";
      save.style.display = "none";

      left.appendChild(titleElem);
      left.appendChild(info);
      left.appendChild(editTitle);
      left.appendChild(editPriority);
      left.appendChild(status);

      right.appendChild(remove);
      right.appendChild(edit);
      right.appendChild(save);
      right.appendChild(markDone);
      right.appendChild(markUndone);

      li.appendChild(left);
      li.appendChild(right);

      this.tasksContainer.appendChild(li);

      remove.addEventListener("click", () => {
        li.remove();
        this.removeTask(task);
      });

      edit.addEventListener("click", () => {
        titleElem.style.display = "none";
        info.style.display = "none";
        editTitle.style.display = "block";
        editPriority.style.display = "block";
        save.style.display = "inline-block";
        edit.style.display = "none";
      });

      save.addEventListener("click", () => {
        task.title = editTitle.value;
        task.priority = Number(editPriority.value);
        titleElem.innerText = task.title;
        info.innerText = `${task.date.toLocaleDateString()} ${task.date.toLocaleTimeString()} - Priority ${task.priority}`;
        titleElem.style.display = "block";
        info.style.display = "block";
        editTitle.style.display = "none";
        editPriority.style.display = "none";
        save.style.display = "none";
        edit.style.display = "inline-block";
      });

      markDone.addEventListener("click", () => {
        task.status = "done";
        status.innerText = task.status;
        li.classList.add("done-task");
      });

      markUndone.addEventListener("click", () => {
        task.status = "undone";
        status.innerText = task.status;
        li.classList.remove("done-task");
      });
    }

    removeTask(task) {
      const taskIndex = this.tasks.indexOf(task);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
      }
    }

    getTaskByListItem(listItem) {
      const index = Array.from(listItem.parentNode.children).indexOf(listItem);
      return this.tasks[index];
    }

    handleTaskActions(event) {
      const target = event.target;
      if (target.classList.contains("btn-delete")) {
        const li = target.closest("li");
        const task = this.getTaskByListItem(li);
        li.remove();
        this.removeTask(task);
      } else if (target.classList.contains("btn-primary")) {
        const li = target.closest("li");
        const task = this.getTaskByListItem(li);
        this.saveTaskChanges(li, task);
      } else if (target.classList.contains("checkbox-input")) {
        const li = target.closest("li");
        if (target.checked) {
          li.classList.add("marked-for-deletion");
        } else {
          li.classList.remove("marked-for-deletion");
        }
      }
    }

    saveTaskChanges(listItem, task) {
      const titleElem = listItem.querySelector(".taskTitle");
      const infoElem = listItem.querySelector(".taskinfo");

      task.title = titleElem.innerText;
      const priorityMatch = infoElem.innerText.match(/Priority (\d+)/);
      if (priorityMatch) {
        task.priority = parseInt(priorityMatch[1]);
      }
    }

    sortTasks(event) {
      const sortCriteria = event.target.value;
      switch (sortCriteria) {
        case "priority":
          this.tasks.sort((a, b) => a.priority - b.priority);
          break;
        case "date":
          this.tasks.sort((a, b) => a.date - b.date);
          break;
        default:
          return;
      }
      this.displayTasks();
    }

    displayTasks() {
      this.tasksContainer.innerHTML = "";
      this.tasks.forEach((task) => {
        this.displayTask(task);
      });
    }
  }

  class Task {
    constructor(title, priority, done = false, date = new Date()) {
      this.title = title;
      this.date = date;
      this.priority = priority;
      this.done = done;
      this.status = "pending";
    }
  }

  const taskManager = new TaskManager();
});
// document.addEventListener('DOMContentLoaded', () => {
//   const tasksContainer = document.querySelector("#taskContainer");
//   const addTaskForm = document.querySelector("#add-task");


// class TaskManager {
//   constructor() {
//     this.tasks = [];
//     this.tasksContainer = document.querySelector("#taskContainer");
//     this.addTaskForm = document.querySelector("#add-task");

//     this.addTaskForm.addEventListener("submit", this.handleAddTask.bind(this));
//     this.tasksContainer.addEventListener("click", this.handleTaskActions.bind(this));
//     document.querySelector("#sort").addEventListener("change", this.sortTasks.bind(this));
//   }

//   handleAddTask(event) {
//     event.preventDefault();
//     const title = String(document.querySelector("#title").value);
//     const priority = Number(document.querySelector("#priority").value);
//     const task = new Task(title, priority);
//     this.tasks.push(task);
//     this.displayTask(task);
//   }

//   displayTask(task) {

//     const status = document.createElement("span");
//   status.classList.add("taskStatus");
//   status.innerText = task.status;
//   left.appendChild(status);

//   const markDone = document.createElement("button");
//   markDone.classList.add("btn-primary");
//   markDone.innerText = "Done";
//   right.appendChild(markDone);

//   const markUndone = document.createElement("button");
//   markUndone.classList.add("btn-primary");
//   markUndone.innerText = "Undone";
//   right.appendChild(markUndone);

//   markDone.addEventListener("click", () => {
//     task.status = "done";
//     status.innerText = task.status;
//     li.classList.add("done-task");
//   });

//   markUndone.addEventListener("click", () => {
//     task.status = "undone";
//     status.innerText = task.status;
//     li.classList.remove("done-task");
//   });

// }
//     const li = document.createElement("li");
//     const left = document.createElement("div");
//     const right = document.createElement("div");
//     const titleElem = document.createElement("h4");
//     const info = document.createElement("span");
//     const remove = document.createElement("button");
//     const edit = document.createElement("button");
//     const save = document.createElement("button");
//     const editTitle = document.createElement("input");
//     const editPriority = document.createElement("input");

//     titleElem.classList.add("taskTitle");
//     info.classList.add("taskinfo");
//     remove.classList.add("btn-delete");
//     edit.classList.add("btn-primary");
//     editTitle.classList.add("input");
//     editPriority.classList.add("input");
//     save.classList.add("btn-primary");

//     titleElem.innerText = task.title;
//     info.innerText = `${task.date.toLocaleDateString()} ${task.date.toLocaleTimeString()} - Priority ${task.priority}`;
//     remove.innerText = "Remove";
//     edit.innerText = "Edit";
//     save.innerText = "Save";
//     editTitle.value = task.title;
//     editPriority.value = task.priority;

//     editTitle.style.display = "none";
//     editPriority.style.display = "none";
//     save.style.display = "none";

//     left.appendChild(titleElem);
//     left.appendChild(info);
//     left.appendChild(editTitle);
//     left.appendChild(editPriority);

//     right.appendChild(remove);
//     right.appendChild(edit);
//     right.appendChild(save);

//     li.appendChild(left);
//     li.appendChild(right);

//     this.tasksContainer.appendChild(li);

//     remove.addEventListener("click", () => {
//       li.remove();
//       this.removeTask(task);
//     });

//     edit.addEventListener("click", () => {
//       titleElem.style.display = "none";
//       info.style.display = "none";
//       editTitle.style.display = "block";
//       editPriority.style.display = "block";
//       save.style.display = "inline-block";
//       edit.style.display = "none";
//     });

//     save.addEventListener("click", () => {
//       task.title = editTitle.value;
//       task.priority = Number(editPriority.value);
//       titleElem.innerText = task.title;
//       info.innerText = `${task.date.toLocaleDateString()} ${task.date.toLocaleTimeString()} - Priority ${task.priority}`;
//       titleElem.style.display = "block";
//       info.style.display = "block";
//       editTitle.style.display = "none";
//       editPriority.style.display = "none";
//       save.style.display = "none";
//       edit.style.display = "inline-block";
//     });
//   }

//   displayTasks() {
//     this.tasksContainer.innerHTML = "";
//     this.tasks.forEach((task) => {
//       this.displayTask(task);
//     });
//   }

//   removeTask(task) {
//     const taskIndex = this.tasks.indexOf(task);
//     if (taskIndex !== -1) {
//       this.tasks.splice(taskIndex, 1);
//     }
//   }

//   handleTaskActions(event) {
//     const target = event.target;
//     if (target.classList.contains("btn-delete")) {
//       const li = target.closest("li");
//       const task = this.getTaskByListItem(li);
//       li.remove();
//       this.removeTask(task);
//     } else if (target.classList.contains("btn-primary")) {
//       const li = target.closest("li");
//       const task = this.getTaskByListItem(li);
//       this.saveTaskChanges(li, task);
//     }
//   }

//   getTaskByListItem(li) {
//     const titleElem = li.querySelector(".taskTitle");
//     const title = titleElem.innerText;
//     return this.tasks.find((task) => task.title === title);
//   }

//   saveTaskChanges(li, task) {
//     const titleElem = li.querySelector(".taskTitle");
//     const info = li.querySelector(".taskinfo");
//     const editTitle = li.querySelector(".input");
//     const editPriority = li.querySelectorAll(".input")[1];

//     task.title = editTitle.value;
//     task.priority = Number(editPriority.value);
//     titleElem.innerText = task.title;
//     info.innerText = `${task.date.toLocaleDateString()} ${task.date.toLocaleTimeString()} - Priority ${task.priority}`;

//     titleElem.style.display = "block";
//     info.style.display = "block";
//     editTitle.style.display = "none";
//     editPriority.style.display = "none";
//     li.querySelector(".btn-primary").style.display = "inline-block";
//   }

//   sortTasks(event) {
//     const value = event.target.value;
//     if (value === "priority") {
//       this.tasks.sort((a, b) => a.priority - b.priority);
//     } else if (value === "date") {
//       this.tasks.sort((a, b) => a.date - b.date);
//     } else if (value === "title") {
//       this.tasks.sort((a, b) => a.title.localeCompare(b.title));
//     } else {
//       console.log("Invalid value");
//     }
//     this.displayTasks();
//   }
// }

// class Task {
//   constructor(title, priority, done = false, date = new Date()) {
//     this.title = title;
//     this.date = date;
//     this.priority = priority;
//     this.done = done;
//     this.status = "pending";
//   }
// }

// // class Task {
// //   constructor(title, priority, done = false, date = new Date()) {
// //     this.title = title;
// //     this.date = date;
// //     this.priority = priority;
// //     this.done = done;
// //   }
// // }

// const taskManager = new TaskManager();

// });


