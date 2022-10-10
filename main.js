const createTaskButton = document.querySelector("#create-task-button");
const taskTitleInput = document.querySelector("#task-title-input");
const tasksList = document.querySelector(".tasks-inputs");
let startingTime = document.querySelector("#starting-time");
let endingTime = document.querySelector("#ending-time");

let tasks = [];
let notes = [];

const taskProperties = {
  id: "",
  title: "",
  checkbox: "null",
  textDecoration: "null",
  time: {
    startTime: null,
    endTime: null,
  }
};

const notesProperties = {
  id: "",
  title: "",
  content: ""
}

const noteEditing = (button) => {
  const notesFromLocalStorage = JSON.parse(
    localStorage.getItem("notes") || "[]"
  );
  notes = notesFromLocalStorage;
  const saveNoteButtons = document.querySelectorAll(".save-note");
    for (const saveButton of saveNoteButtons) {
      saveButton.addEventListener("click", () => {
        const noteID = saveButton.parentElement.parentElement.id;
        const notesFromLocalStorage = JSON.parse(
          localStorage.getItem("notes") || "[]"
        );
        notes = notesFromLocalStorage;

        const noteTitle = saveButton.parentElement.parentElement.children[0].children[0];
        const noteContent = saveButton.parentElement.parentElement.children[1];

        const index = notes.findIndex(note => note.id == noteID);
        if (index > -1) {
          notes[index].id = noteID;
          notes[index].title = noteTitle.value;
          notes[index].content = noteContent.value;

          window.localStorage.setItem("notes", JSON.stringify(notes));
          return;
        }
          notesProperties.id = button.parentElement.children[0].id;
          notesProperties.title = noteTitle.value;
          notesProperties.content = noteContent.value;

          notes.push(notesProperties);
          window.localStorage.setItem("notes", JSON.stringify(notes));
      })
    }
}

const saveNotesToLocalStorage = () => {
  const notesFromLocalStorage = JSON.parse(
    localStorage.getItem("notes") || "[]"
  );
  notes = notesFromLocalStorage;
  notes.push(notesProperties);
  window.localStorage.setItem("notes", JSON.stringify(notes));
}

const removeNotesFromLocalStorage = (button) => {
  const noteId = button.parentElement.children[0].id;
  const notesFromLocalStorage = JSON.parse(
    localStorage.getItem("notes") || "[]"
  );
  notes = notesFromLocalStorage;
  for(let i = 0; i < notes.length; i++) {
    if(notes[i].id == noteId) {
        index = i;
        notes.splice(index, 1);
        break;
    }
  }
  window.localStorage.setItem("notes", JSON.stringify(notes));
}

const getNotesFromLocalStorage = () => {
  const notesFromLocalStorage = JSON.parse(
    localStorage.getItem("notes") || "[]"
  );
  notes = notesFromLocalStorage;

  const notesContainer = document.querySelectorAll(".note-container");
    for (let i = 0; i < notesContainer.length; i++) {
      notes.map((note) => {
        if (note.id == i) {
        notesContainer[i].innerHTML = `
                <div class="note" id=${i}>
                  <div class="title-and-save">
                    <input maxlength="25" class="title" type="text" placeholder="note title" value="${note.title}"<input>
                    <button class="save-note">S</button>
                  </div>
                  <textarea  placeholder="note content">${note.content}</textarea>;
                </div>
                <button style="font-size: 2rem; background-color: #ca5656" class="add-note">X</button>`
                notesContainer[i].style.border = "2px solid grey"
        }
      }).join("");
    }
}
getNotesFromLocalStorage();
noteEditing()


const removeTaskFromLocalStorage = (tasks) => {
  const deleteTask = document.querySelectorAll(".delete");
  deleteTask.forEach((delTask) => {
    delTask.addEventListener("click", (e) => {
      const keyId = (e.target.parentElement.className);

      const tasksFromLocalStorage = JSON.parse(
        localStorage.getItem("tasks") || "[]"
      );
      tasks = tasksFromLocalStorage;
      const taskToDelete = tasks.findIndex(taskToDelete => taskToDelete.id == keyId)
      tasks.splice(taskToDelete, 1)
      window.localStorage.setItem("tasks", JSON.stringify(tasks));
      delTask.parentElement.remove();
    })
  })
}
removeTaskFromLocalStorage();

const checkIfTaskDone = () => {
  const checkboxes = document.querySelectorAll(".tasks-inputs input");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      const tasksFromLocalStorage = JSON.parse(
        localStorage.getItem("tasks") || "[]"
      );
      tasks = tasksFromLocalStorage;
      const keyId = (this.parentElement.parentElement.parentElement.className);
      const taskToEdit = tasks.findIndex(taskToEdit => taskToEdit.id == keyId);
      if (checkbox.checked === true) {
        this.parentElement.style.textDecoration = "line-through";
        tasks[taskToEdit].textDecoration = "line-through"
        tasks[taskToEdit].checkbox = "checked";
      } else {
        this.parentElement.style.textDecoration = "none";
        tasks[taskToEdit].textDecoration = "none";
        tasks[taskToEdit].checkbox = "";
      }
      window.localStorage.setItem("tasks", JSON.stringify(tasks));
    });
  });
};


const getTasksFromLocalStorage = (tasks) => {
  const tasksFromLocalStorage = JSON.parse(
    localStorage.getItem("tasks") || "[]"
  );
  tasks = tasksFromLocalStorage;
  tasksList.innerHTML = tasks.map((task) => {
    return `<li class=${task.id}>
    <div class="full-width">
        <div class="checkbox-and-title" style="text-decoration:${task.textDecoration}">
            <input type="checkbox" ${task.checkbox}/>
            <p>${task.title}</p>
        </div>
        <div class="time">${task.time.startTime} - ${task.time.endTime}</div>
    </div>
    <img class="delete" src="/img/delete.svg"/>
    </li>`;
  }).join("");
  checkIfTaskDone();
  removeTaskFromLocalStorage();
};
getTasksFromLocalStorage(tasks);

const saveTaskToLocalStorage = (taskProperties, tasks) => {
  const tasksFromLocalStorage = JSON.parse(
    localStorage.getItem("tasks") || "[]"
  );
  tasks = tasksFromLocalStorage;
  tasks.push(taskProperties);
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
};

const createTask = (taskProperties, tasks) => {
  createTaskButton.addEventListener("click", (e) => {
    const li = document.createElement("li");
    const taskTitle = taskTitleInput.value;
    e.preventDefault();

    if (taskTitleInput.value === "" || startingTime.value >= endingTime.value) {
      alert("Please set task title and time");
      return;
    }
    tasksList.appendChild(li);
    li.innerHTML = `<div class="full-width">
                            <div class="checkbox-and-title">
                                <input type="checkbox">
                                <p>${taskTitle}</p>
                            </div>
                            <div class="time">${startingTime.value} - ${endingTime.value}</div>
                        </div>
                        <img class="delete" src="/img/delete.svg"/>`;
    taskProperties.id = Math.floor(Math.random() * 100);
    li.className = taskProperties.id;
    taskProperties.title = taskTitle;
    taskProperties.time.startTime = startingTime.value;
    taskProperties.time.endTime = endingTime.value;
    saveTaskToLocalStorage(taskProperties, tasks);
    resetDefaultTaskTitleAndTimeSettings();
    checkIfTaskDone();
    deleteTask();
  });
};
createTask(taskProperties, tasks);

const resetDefaultTaskTitleAndTimeSettings = () => {
  taskTitleInput.value = "";
  startingTime.value = "";
  endingTime.value = "";

  startingTime.style.backgroundColor = "white";
  startingTime.style.color = "black";
  startingTime.style.border = "2px solid #DDD7D7";

  endingTime.style.backgroundColor = "white";
  endingTime.style.color = "black";
  endingTime.style.border = "2px solid #DDD7D7";
};

const deleteTask = () => {
  const deleteTask = document.querySelectorAll(".delete");
  deleteTask.forEach((button) => {
    button.addEventListener("click", function (e) {
        const keyId = (e.target.parentElement.className)
        const tasksFromLocalStorage = JSON.parse(
          localStorage.getItem("tasks") || "[]"
        );
        tasks = tasksFromLocalStorage;
        const taskToDelete = tasks.findIndex(taskToDelete => taskToDelete.id == keyId)
        tasks.splice(taskToDelete, 1)
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
        button.parentElement.remove();
        console.log("usunąłem TASKA z localstorage dynamicznie")
    });
  });
};

const timeInputs = document.querySelectorAll(".hour-to-do input");
timeInputs.forEach((input) => {
  input.addEventListener("click", function () {
    input.style.backgroundColor = "#2D8E62";
    input.style.color = "white";
    input.style.border = "none";
  });
});

const toggleNote = () => {
  const toggleNoteButton = document.querySelectorAll(".add-note");
  toggleNoteButton.forEach((button) => {
    button.addEventListener("click", function (e) {
      const note = e.target.parentElement.children[0];
      if (!note.children.length) {
        note.innerHTML = `<div class="title-and-save">
                            <input maxlength="25" class="title" type="text" placeholder="note title"</input>
                            <button class="save-note">S</button>
                          </div>
                          <textarea placeholder="note content"></textarea>`;
        button.textContent = "X";
        button.style.fontSize = "2rem";
        button.style.backgroundColor = "#ca5656";
        note.parentElement.style.border = "2px solid grey";
        noteEditing(button);
      } else {
        removeNotesFromLocalStorage(button);
        note.innerHTML = "";
        button.textContent = "+";
        button.style.fontSize = "3rem";
        button.style.backgroundColor = "transparent";
        note.parentElement.style.border = "3px dashed #D7D7D7";
      }
    });
  });
};
toggleNote();

const currentTime = () => {
  const time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  let newHour = new Date();
  plusOneHour = new Date(newHour.setHours(newHour.getHours() + 1));
  onlyHours = plusOneHour.getHours();

  if (onlyHours < 10) {
    onlyHours = `0${onlyHours}`;
  }
  startingTime.value = `${hours}:${minutes}`;
  endingTime.value = `${onlyHours}:${minutes}`;
};
currentTime();