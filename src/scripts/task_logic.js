

export class Task { // The validation logic is moved to the Task class instead of the manager of the tasks

    static idCounter = 0;
  
    static generateId() {
      return ++Task.idCounter;
    }
  
    constructor(task_name, task_due_date, task_description = "", task_priority = "low", checklist = [], id = null) {
      
      if (!task_name || typeof task_name !== "string" || task_name.length > 20) {
        throw new Error("task_name is required and must be a string less than 20 characters.");
      }
  
      if (task_description && (typeof task_description !== "string" || task_description.length > 50)) {
        throw new Error("task_description must be less than 50 characters.");
      }
  
      if (!Task.isValidDate(task_due_date)) {
        throw new Error("task_due_date must be in format DD-MM-YYYY.");
      }
  
      const validPriorities = ["low", "medium", "high"];
      if (!validPriorities.includes(task_priority)) {
        throw new Error("task_priority must be 'low', 'medium', or 'high'.");
      }
  
      if (!Array.isArray(checklist) || !checklist.every(item => typeof item === "string")) {
        throw new Error("checklist must be an array of strings.");
      }
  
      this.id = id || Task.generateId();
      this.task_name = task_name;
      this.task_description = task_description;
      this.task_due_date = task_due_date;
      this.task_priority = task_priority;
      this.task_status = "incomplete";
      this.checklist = checklist;
    }
  
    static isValidDate(dateStr) {
      const regex = /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-\d{4}$/;
      return regex.test(dateStr);
    }
  
    updateChecklist(newChecklist) {
      if (!Array.isArray(newChecklist) || !newChecklist.every(item => typeof item === "string")) {
        throw new Error("newChecklist must be an array of strings.");
      }
      this.checklist = newChecklist;
    }
}
  
export class TaskManager {
    constructor() {
      this.user_tasks = [];
    }
  
    findTaskIndexById(taskId) {
      return this.user_tasks.findIndex(task => task.id === taskId);
    }
  
    addTask(task) {
      // Accept only valid Task instances
      if (!(task instanceof Task)) {
        console.error("Invalid task object.");
        return;
      }
      this.user_tasks.push(task);
      console.log("Task added.");
    }
  
    deleteTask(taskId) {
      const index = this.findTaskIndexById(taskId);
      if (index === -1) {
        console.error("Task not found.");
        return;
      }
      this.user_tasks.splice(index, 1);
      console.log("Task deleted.");
    }
  
    toggleCompletion(taskId) {
      const index = this.findTaskIndexById(taskId);
      if (index === -1) {
        console.error("Task not found.");
        return;
      }
      const task = this.user_tasks[index];
      task.task_status = task.task_status === "complete" ? "incomplete" : "complete";
      console.log("Task status changed to:", task.task_status);
    }
  
    editName(taskId, newName) {
      if (typeof newName !== "string" || newName.length > 20) {
        console.error("Task name must be a string less than 20 characters.");
        return;
      }
      const index = this.findTaskIndexById(taskId);
      if (index === -1) {
        console.error("Task not found.");
        return;
      }
      this.user_tasks[index].task_name = newName;
      console.log("Task name changed to:", newName);
    }
  
    editDescription(taskId, newDescription) {
      if (typeof newDescription !== "string" || newDescription.length > 50) {
        console.error("Task description must be a string less than 50 characters.");
        return;
      }
      const index = this.findTaskIndexById(taskId);
      if (index === -1) {
        console.error("Task not found.");
        return;
      }
      this.user_tasks[index].task_description = newDescription;
      console.log("Task description changed to:", newDescription);
    }
  
    editDueDate(taskId, newDate) {
      if (!Task.isValidDate(newDate)) {
        console.error("New date must be in format DD-MM-YYYY.");
        return;
      }
      const index = this.findTaskIndexById(taskId);
      if (index === -1) {
        console.error("Task not found.");
        return;
      }
      this.user_tasks[index].task_due_date = newDate;
      console.log("Task due date changed to:", newDate);
    }
  
    editPriority(taskId, newPriority) {
      const validPriorities = ["low", "medium", "high"];
      if (!validPriorities.includes(newPriority)) {
        console.error("Task priority must be 'low', 'medium', or 'high'.");
        return;
      }
      const index = this.findTaskIndexById(taskId);
      if (index === -1) {
        console.error("Task not found.");
        return;
      }
      this.user_tasks[index].task_priority = newPriority;
      console.log("Task priority changed to:", newPriority);
    }
  
    editChecklist(taskId, newChecklist) {
      const index = this.findTaskIndexById(taskId);
      if (index === -1) {
        console.error("Task not found.");
        return;
      }
      try {
        this.user_tasks[index].updateChecklist(newChecklist);
        console.log("Task checklist updated.");
      } catch (error) {
        console.error(error.message);
      }
    }
}

class TaskCardUI {

  constructor(task) {
    this.task = task;
  }

  render(){
    const taskContainer = document.createElement('div');
    taskContainer.className = "task";

    const taskTitle = document.createElement('div');
    taskTitle.id = "task-title";
    taskTitle.textContent = this.task.task_name;

    const taskDueDate = document.createElement('span');
    taskDueDate.id = "due-date";
    taskDueDate.textContent = "Due date: " + this.task.task_due_date;

    const taskDescription = document.createElement('p');
    taskDescription.id = "task-description"; 
    taskDescription.textContent = this.task.task_description;

    const taskOptions = document.createElement('div');
    taskOptions.className = "task-options";

    const taskDeleteBtn = document.createElement('button');
    taskDeleteBtn.className = "delete-task"
    const taskEditBtn = document.createElement('button');
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
    submitNewElementList.id = "add-element-btn";

    taskChecklist.appendChild(newElementList , submitNewElementList);

    taskOptions.appendChild(taskDeleteBtn, taskEditBtn);

    taskContainer.appendChild(taskTitle,taskDescription,taskOptions,taskChecklist);

    return taskContainer;
  }

}
