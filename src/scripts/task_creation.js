import { Task , TaskManager } from "./task_logic.js";
import {format, parseISO} from "date-fns";
import {todayContent} from "../index.js"

export let task_database = new TaskManager(); // Class with the tasks created

export let todaysTasks = [];
export let weekTask = [];

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

        const lowPriorityOp = document.createElement('option');
        lowPriorityOp.textContent = "🟢 low";
        lowPriorityOp.value = "low";

        const mediumPriorityOp = document.createElement('option');
        mediumPriorityOp.textContent = "🟡 medium";
        mediumPriorityOp.value = "medium";

        const highPriorityOp = document.createElement('option');
        highPriorityOp.textContent = "🔴 high";
        highPriorityOp.value = "high"

        prioritySelector.append (lowPriorityOp, mediumPriorityOp , highPriorityOp);
        priorityDiv.appendChild(prioritySelector);

        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.classList.add("btn");
        submitButton.textContent = "Create Task";

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.classList.add("btn", "cancel");
        closeButton.textContent = "Close";
        closeButton.onclick = function () { formPopup.style.display = "none"; };

        formContainer.append(
            title, nameLabel, nameInput,
            descLabel, descInput,
            dateLabel, dateInput,
            priorityDiv, submitButton,
            closeButton
        );

        formPopup.appendChild(formContainer);

        // Submitting the form into the database
        formContainer.addEventListener("submit", (event) => {
            event.preventDefault();

            const dateSelected = parseISO(dateInput.value);

            const formData = {
                name: nameInput.value.trim(),
                description: descInput.value.trim(),
                dueDate: format(dateSelected, 'dd-MM-yyyy'), // default format for date input is YYYY-MM-dd
                priority: prioritySelector.value || "low"
            };

            this.onSubmit?.(formData);

            const task = new Task(formData.name, formData.dueDate, formData.description, formData.priority, []);

            // task added to the general database
            task_database.addTask(task);

            // NOW WE NEED TO SHOVE THE TASKS TO EACH ARRAY, today and Weekly
            
            todaysTasks = task_database.user_tasks.filter((i) => {  // To do find a way to store them right away instead of filtering to optimize
                return i.task_due_date === format(new Date(), 'dd-MM-yyyy');;
            });

            console.log(todaysTasks);

            todayContent.render();
            // weekly tasks render();
            // all tasks render();

            console.log(task_database);

            formPopup.style.display = "none";
        });

        return formPopup;
    }
}

export class TaskCardUI {

    constructor(task) {
      this.task = task;
    }
  
    render(){

        const taskContainer = document.createElement('div');
        taskContainer.className = "task";

        const taskTitle = document.createElement('h4');
        taskTitle.id = "task-title";
        taskTitle.textContent = this.task.task_name;

        const taskDueDate = document.createElement('span');
        taskDueDate.id = "due-date";
        taskDueDate.textContent = "Due date: " + String(this.task.task_due_date);

        const taskDescription = document.createElement('p');
        taskDescription.id = "task-description"; 
        taskDescription.textContent = this.task.task_description;

        const taskOptions = document.createElement('div');
        
        taskOptions.className = "task-options";

        const taskDeleteBtn = document.createElement('button');
        taskDeleteBtn.textContent = "Delete";
        taskDeleteBtn.className = "delete-task"

        const taskEditBtn = document.createElement('button');
        taskEditBtn.textContent = "Edit";
        taskEditBtn.className = "edit-task";


        const taskChecklist = document.createElement('ul');
        taskChecklist.className = "task-checklist";

        const checklistAdd = document.createElement('div');
        checklistAdd.className = "task-checklist-div";

        const newElementList = document.createElement('input');
        newElementList.type = "text";
        newElementList.id = "new-element";
        newElementList.placeholder = "Add a new task! ";

        const submitNewElementList = document.createElement('button');
        submitNewElementList.textContent = "ADD TO CHECKLIST"
        submitNewElementList.id = "add-element-btn";

        taskChecklist.append(newElementList , submitNewElementList);  
        taskOptions.append(taskDeleteBtn, taskEditBtn);
        taskContainer.append(taskTitle,taskDescription,taskDueDate,taskOptions,taskChecklist);

        const priorityColors = {
            low: "rgb(0 255 129)",
            medium: "#fcd53f",
            high: "#f8312f"
        };

        if (priorityColors[this.task.task_priority]) {
            taskContainer.style.background = `linear-gradient(to left, ${priorityColors[this.task.task_priority]}, white)`;
        }

        // BUTTONS AND EDITING

        // Make it finished


        // Delete task 
        taskDeleteBtn.addEventListener("click", () => {
            task_database.deleteTask(this.task.id);
            taskContainer.remove();
        });

        // Editing name
        taskTitle.addEventListener("dblclick", () => {
            const input = document.createElement("input");
            input.type = "text";
            input.value = taskTitle.innerText;
            
            taskTitle.replaceWith(input);
            input.focus();

            input.addEventListener("blur", () => {
                taskTitle.innerText = input.value;
                input.replaceWith(taskTitle);
            });

            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    input.blur();
                    task_database.editName(this.task.id, taskTitle.innerText);
                }
            });
        });

        // Editing desc
        taskDescription.addEventListener("dblclick", () => {
            const input = document.createElement("input");
            input.type = "text";
            input.value = taskDescription.innerText;
            
            taskDescription.replaceWith(input);
            input.focus();

            input.addEventListener("blur", () => {
                taskDescription.innerText = input.value;
                input.replaceWith(taskDescription);
            });

            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    input.blur();
                    task_database.editDescription(this.task.id, taskDescription.innerText);
                }
            });
        });

        // Edit due_date
        taskDueDate.addEventListener("dblclick", () => {
            const input = document.createElement("input");
            input.type = "date";
            
            taskDueDate.replaceWith(input);
            input.focus();

            input.addEventListener("blur", () => {
                taskDueDate.textContent = "Due date: " + String(format(parseISO(input.value), 'dd-MM-yyyy'));
                input.replaceWith(taskDueDate);
            });

            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    input.blur();
                    task_database.editDueDate(this.task.id, format(parseISO(input.value), 'dd-MM-yyyy'));
                    
                    todaysTasks = task_database.user_tasks.filter((i) => {
                        return i.task_due_date === format(new Date(), 'dd-MM-yyyy');;
                    });
                
                    todayContent.render();
                }
            });
        });


        // Edit checklists

        
        return taskContainer;
    }
} 