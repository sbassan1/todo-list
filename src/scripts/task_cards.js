import {format, parseISO} from "date-fns";
import {task_database} from "./task_form.js";
import {todayContent, weekContent, getCurrentPage} from "../index.js"


export class TaskCardUI {

    constructor(task) {
      this.task = task;
      this.elements = {};
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

        this.elements = {
            taskContainer,
            taskTitle,
            taskDueDate,
            taskDescription,
            taskDeleteBtn,
            taskEditBtn,
            taskChecklist
        };
        
        return taskContainer;
    }
} 

export class TaskCardController {

    constructor(task, ui) {
        this.task = task;
        this.ui = ui; // ui is the elements in the TaskCardUI;
        this.setupEventListeners();
    }

    setupEventListeners() {

        const { taskContainer, taskTitle, taskDueDate, taskDescription, taskDeleteBtn } = this.ui.elements;

        taskDeleteBtn.addEventListener("click", () => {
            task_database.deleteTask(this.task.id);
            taskContainer.remove();
        });

        this.enableEditableText(taskTitle, (newText) => {
            task_database.editName(this.task.id, newText);
        });

        this.enableEditableText(taskDescription, (newText) => {
            task_database.editDescription(this.task.id, newText);
        });

        this.enableEditableDate(taskDueDate);
    }

    enableEditableText(element, onSave) {
        element.addEventListener("dblclick", () => {
            const input = document.createElement("input");
            input.type = "text";
            input.value = element.innerText;

            element.replaceWith(input);
            input.focus();

            input.addEventListener("blur", () => {
                element.innerText = input.value;
                input.replaceWith(element);
                onSave(input.value);
            });

            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    input.blur();
                }
            });
        });
    }

    enableEditableDate(element) {
        element.addEventListener("dblclick", () => {
            const input = document.createElement("input");
            input.type = "date";

            element.replaceWith(input);
            input.focus();

            input.addEventListener("blur", () => {
                const newDate = format(parseISO(input.value), 'dd-MM-yyyy');
                element.textContent = "Due date: " + newDate;

                input.replaceWith(element);
                task_database.editDueDate(this.task.id, newDate);

                getCurrentPage().render();
            });

            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    input.blur();
                }
            });
        });
    }


};