//retrive tasks from local storage or initialize an empty array

let	tasks = JSON.parse(localStorage.getItem("task")) || [];

const	taskInput = document.getElementById("taskInput")

const	taskList = document.getElementById("taskList")

const	count = document.getElementById("counter")

const	addButton = document.querySelector(".clickBox")

const	deleteButton = document.getElementById("deleteButton")

//initialize

document.addEventListener("DOMContentLoaded",
	function () {
		addButton.addEventListener("click", addTask);
		taskInput.addEventListener('keydown', function(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				addTask();
			}
		});
		deleteButton.addEventListener("click", eraseList);
		displayTasks();
})

function	addTask() {
	const newTask = taskInput.value.trim();
	if (newTask !== "")
		tasks.push({
			text: newTask,
			disabled: false,
		});
	saveToLocalStorage();
	taskInput.value = "";
	displayTasks();
}

function eraseList() {
	console.log("test");
}

function	displayTasks() {
	
}

function	saveToLocalStorage() {
	localStorage.setItem("task", JSON.stringify(tasks));
}