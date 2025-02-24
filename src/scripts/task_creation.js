import { Task , TaskManager } from "./task_logic.js";
import {format} from "date-fns";


export let user_tasks = new TaskManager(); // All the tasks that the user created at the moment

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
        descInput.placeholder = "Enter Description (Optional)";
        descInput.name = "description";

        const dateLabel = document.createElement("label");
        dateLabel.htmlFor = "due-date";
        dateLabel.innerHTML = "<b>Due Date</b>";

        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.name = "due-date";

        const fieldset = document.createElement("fieldset");
        const legend = document.createElement("legend");
        legend.textContent = "Priority:";
        fieldset.appendChild(legend);

        const priorities = [
            { value: "low", label: "🟢 Low" },
            { value: "medium", label: "🟡 Medium" },
            { value: "high", label: "🔴 High" }
        ];

        priorities.forEach(priority => {
            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "priority";
            radio.value = priority.value;
            label.appendChild(radio);
            label.append(` ${priority.label}`);
            fieldset.appendChild(label);
        });

        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.classList.add("btn");
        submitButton.textContent = "Create Task";

        const resetButton = document.createElement("input");
        resetButton.type = "reset";
        resetButton.value = "Reset";

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.classList.add("btn", "cancel");
        closeButton.textContent = "Close";
        closeButton.onclick = function () { formPopup.style.display = "none"; };

        formContainer.append(
            title, nameLabel, nameInput,
            descLabel, descInput,
            dateLabel, dateInput,
            fieldset, submitButton,
            resetButton, closeButton
        );

        formPopup.appendChild(formContainer);

        formContainer.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = {
                name: nameInput.value.trim(),
                description: descInput.value.trim(),
                dueDate: format(dateInput.value, 'dd-MM-yyyy'),
                priority: [...fieldset.querySelectorAll("input[name='priority']")]
                    .find(input => input.checked)?.value || "low"
            };

            this.onSubmit?.(formData);

            console.log(formData);

            const task = new Task(formData.name, formData.dueDate, formData.description, formData.priority, []);

            user_tasks.addTask(task);

            console.log(user_tasks);

            formPopup.style.display = "none";
        });

        return formPopup;
    }
}

