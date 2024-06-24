//retrive tasks from local storage or initialize an empty array

let	tasks = JSON.parse(localStorage.getItem("task")) || [];

const	taskInput = document.getElementById("taskInput")

const	taskList = document.getElementById("taskList")

const	count = document.getElementById("taskCounter")

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
	tasks = [];
	saveToLocalStorage();
	displayTasks();
}

function	displayTasks() {
	taskList.innerHTML = "";
	tasks.forEach((item, index) => {
		const p = document.createElement("P");
		p.innerHTML = `
			<div class="taskContainer">
				<input type="checkBox" class="taskCheckBox
				id="input-${index}" ${item.disabled ? "checked" : ""}>
			<p id="task-${index}"
					class="${item.disabled ? "disabled" : ""}"
					onclick="editTask(${index})">${item.text}
			</p>
			</div>
		`
		p.querySelector(".taskCheckBox").addEventListener(
			"change", () => {
				toggleTask(index);
			});
		taskList.appendChild(p);
	})
	count.textContent = tasks.length;
}

function toggleTask(index) {
	tasks[index].disabled = !tasks[index].disabled;
	saveToLocalStorage();
	displayTasks();
}

function	saveToLocalStorage() {
	localStorage.setItem("task", JSON.stringify(tasks));
}

function	editTask(index) {
	const	taskItem = document.getElementById(`task-${index}`);
	const	currentText = tasks[index].text;
	const	newInput = document.createElement("input");

	newInput.value = currentText;
	taskItem.replaceWith(newInput);
	newInput.focus();

	newInput.addEventListener("blur", function () {
		const	updatedText = newInput.value.trim();
		if (updatedText) {
			tasks[index].text = updatedText;
			saveToLocalStorage();
		}
		displayTasks();
	})
}