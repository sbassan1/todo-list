import {format, parseISO} from "date-fns";
import {task_database} from "./task_form.js";
import {getCurrentPage} from "../index.js"


export class TaskCardUI {

    constructor(task) {
      this.task = task;
      this.elements = {};
    }
  
    // Render task card UI
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

        const taskChecklist = document.createElement('div');
        taskChecklist.className = "task-checklist";

        const checklistAdd = document.createElement('ul');
        checklistAdd.className = "task-checklist-div";

        const newElementList = document.createElement('input');
        newElementList.type = "text";
        newElementList.id = "new-element";
        newElementList.placeholder = "Add a new task! ";

        const submitNewElementBtn = document.createElement('button');
        submitNewElementBtn.textContent = "ADD TO CHECKLIST"
        submitNewElementBtn.id = "add-element-btn";

        taskChecklist.append(newElementList , submitNewElementBtn, checklistAdd);  
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
            checklistAdd,
            taskChecklist,
            newElementList,
            submitNewElementBtn
        };
        
        this.renderChecklist();  

        return taskContainer;
    }

    // render the checklist on task UI, checking elements completion
    renderChecklist() {
        const checklistUI = this.elements.checklistAdd;
        checklistUI.innerHTML = "";
    
        this.task.checklist.forEach((elementItem, index) => {
            const elementLi = document.createElement("li");
            elementLi.textContent = elementItem.text;
    
            if (elementItem.completed) {
                elementLi.style.textDecoration = "line-through";
            }
    
            elementLi.addEventListener("click", () => {
                elementItem.completed = !elementItem.completed;
                task_database.editChecklist(this.task.id, this.task.checklist);
                this.renderChecklist();
            });
    
            checklistUI.appendChild(elementLi);
        });
    }
} 

export class TaskCardController {

    constructor(task, ui) {
        this.task = task;
        this.ui = ui; // ui is the elements in the TaskCardUI;
        this.setupEventListeners();
    }

    // set all functions to control task card elements
    setupEventListeners() {

        const { taskContainer, taskTitle, taskDueDate, taskDescription, taskDeleteBtn, checklistAdd, taskChecklist, newElementList, submitNewElementBtn} = this.ui.elements;

        // delete task from database and UI
        taskDeleteBtn.addEventListener("click", () => {
            task_database.deleteTask(this.task.id);
            taskContainer.remove();
        });

        // add a new element to checklist of task, render checklist UI again
        submitNewElementBtn.addEventListener("click", () => {
            if (newElementList.value.trim() !== "") {
                this.task.checklist.push(newElementList.value.trim());
                task_database.editChecklist(this.task.id, this.task.checklist);
                this.ui.renderChecklist(); 
                newElementList.value = "";
            }
        });
        
        // Edit task title and desc with double click 
        this.enableEditableText(taskTitle, (newText) => {
            task_database.editName(this.task.id, newText);
        });
        this.enableEditableText(taskDescription, (newText) => {
            task_database.editDescription(this.task.id, newText);
        });

        // Edit due-date of task in database
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