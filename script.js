const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
    const pendingTasks = tasks.filter(task => !task.completed);
    taskCount.textContent = pendingTasks.length;
}

function renderTask(task, index) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remover";

    if (task.completed) {
        span.classList.add("completed");
        removeBtn.classList.add("danger");
    }

    span.addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed;

        span.classList.toggle("completed");
        removeBtn.classList.toggle("danger");

        saveTasks();
        updateCounter();
    });

    removeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        tasks.splice(index, 1);
        saveTasks();
        loadTasks();
    });

    li.appendChild(span);
    li.appendChild(removeBtn);

    taskList.appendChild(li);
}

function loadTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        renderTask(task, index);
    });

    updateCounter();
}

addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    loadTasks();

    taskInput.value = "";
    taskInput.focus();
});

clearBtn.addEventListener("click", () => {
    tasks = [];
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
    updateCounter();
});

taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addBtn.click();
    }
});

loadTasks();