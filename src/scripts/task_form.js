import { Task, TaskManager } from "./task_logic.js";
import { format, parseISO } from "date-fns";
import { getCurrentPage } from "../index.js";

export let task_database = new TaskManager(); // Class with the tasks created

export class TaskFormUI {
  constructor(onSubmit) {
    this.onSubmit = onSubmit; // Store the callback function
  }

  createTaskForm() {
    const formPopup = document.createElement("div");
    formPopup.classList.add("form-popup");
    formPopup.id = "myForm";

    const formContainer = document.createElement("form");
    formContainer.classList.add("form-container");

    const title = document.createElement("h1");
    title.textContent = "New Task";

    const nameLabel = document.createElement("label");
    nameLabel.htmlFor = "name";
    nameLabel.innerHTML = "<b>Task Name: </b>";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Enter name";
    nameInput.name = "name";
    nameInput.required = true;

    const descLabel = document.createElement("label");
    descLabel.htmlFor = "description";
    descLabel.innerHTML = "<b>Description</b>";

    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.value = "No Description...";
    descInput.placeholder = "Enter Description (Optional)";
    descInput.name = "description";

    const dateLabel = document.createElement("label");
    dateLabel.htmlFor = "due-date";
    dateLabel.innerHTML = "<b>Due Date</b>";

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.name = "due-date";

    const priorityDiv = document.createElement("div");

    const priorityLabel = document.createElement("label");
    priorityLabel.for = "priority-select";
    priorityLabel.textContent = "Priority:";

    const prioritySelector = document.createElement("select");
    prioritySelector.name = "priority";
    prioritySelector.id = "priority-select";

    const lowPriorityOp = document.createElement("option");
    lowPriorityOp.textContent = "🟢 low";
    lowPriorityOp.value = "low";

    const mediumPriorityOp = document.createElement("option");
    mediumPriorityOp.textContent = "🟡 medium";
    mediumPriorityOp.value = "medium";

    const highPriorityOp = document.createElement("option");
    highPriorityOp.textContent = "🔴 high";
    highPriorityOp.value = "high";

    prioritySelector.append(lowPriorityOp, mediumPriorityOp, highPriorityOp);
    priorityDiv.appendChild(prioritySelector);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.classList.add("btn");
    submitButton.textContent = "Create Task";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.classList.add("btn", "cancel");
    closeButton.textContent = "Close";
    closeButton.onclick = function () {
      formPopup.style.display = "none";
    };

    formContainer.append(
      title,
      nameLabel,
      nameInput,
      descLabel,
      descInput,
      dateLabel,
      dateInput,
      priorityDiv,
      submitButton,
      closeButton,
    );

    formPopup.appendChild(formContainer);

    // Submitting the form into the database
    formContainer.addEventListener("submit", (event) => {
      event.preventDefault();

      const dateSelected = parseISO(dateInput.value);
      const formData = {
        name: nameInput.value.trim(),
        description: descInput.value.trim(),
        dueDate: format(dateSelected, "dd-MM-yyyy"), // default format for html input "date" is YYYY-MM-dd
        priority: prioritySelector.value || "low",
      };
      this.onSubmit?.(formData);

      const task = new Task(
        formData.name,
        formData.dueDate,
        formData.description,
        formData.priority,
        [],
      );

      task_database.addTask(task);

      // save the new task list to local storage
      task_database.saveTasks();

      // Render the effects on the current page
      getCurrentPage().render();

      formPopup.style.display = "none"; // Close display after submitting!
    });

    return formPopup;
  }
}
