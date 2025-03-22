// THIS FILE CONTAINS THE CLASSES FOR LOGIC OF TASKS AND EDITING TASKS IN CONSOLE

// Task class with constructor
export class Task {
  static idCounter = 0;

  static generateId() {
    return ++Task.idCounter;
  }

  constructor(
    task_name,
    task_due_date,
    task_description = "No Description...",
    task_priority = "low",
    checklist = [],
    id = null,
  ) {
    if (!task_name || typeof task_name !== "string" || task_name.length > 20) {
      throw new Error(
        "task_name is required and must be a string less than 20 characters.",
      );
    }

    if (
      !task_description &&
      (typeof task_description !== "string" || task_description.length > 50)
    ) {
      throw new Error("task_description must be less than 50 characters.");
    }

    if (!Task.isValidDate(task_due_date)) {
      throw new Error("task_due_date must be in format DD-MM-YYYY.");
    }

    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(task_priority)) {
      throw new Error("task_priority must be 'low', 'medium', or 'high'.");
    }

    if (!Array.isArray(checklist)) {
      throw new Error("checklist must be an array.");
    }

    this.checklist = checklist.map((item) =>
      typeof item === "string" ? { text: item, completed: false } : item,
    );

    this.id = id || Task.generateId();
    this.task_name = task_name;
    this.task_description = task_description;
    this.task_due_date = task_due_date;
    this.task_priority = task_priority;
    this.task_status = "incomplete";
  }

  static isValidDate(dateStr) {
    const regex = /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-\d{4}$/;
    return regex.test(dateStr);
  }

  updateChecklist(newChecklist) {
    if (
      !Array.isArray(newChecklist) ||
      !newChecklist.every(
        (item) =>
          typeof item.text === "string" && typeof item.completed === "boolean",
      )
    ) {
      throw new Error(
        "newChecklist must be an array of objects { text, completed }.",
      );
    }
    this.checklist = newChecklist;
  }
}

export class TaskManager {
  constructor() {
    this.user_tasks = this.loadTasks(); // Load tasks from localStorage
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.user_tasks));
  }

  loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      return JSON.parse(storedTasks).map(
        (taskData) =>
          new Task(
            taskData.task_name,
            taskData.task_due_date,
            taskData.task_description,
            taskData.task_priority,
            taskData.checklist,
            taskData.id,
          ),
      );
    }
    return [];
  }

  findTaskIndexById(taskId) {
    return this.user_tasks.findIndex((task) => task.id === taskId);
  }

  addTask(task) {
    if (!(task instanceof Task)) {
      console.error("Invalid task object.");
      return;
    }
    this.user_tasks.push(task);
    this.saveTasks(); // Save to localStorage after modification
    console.log("Task added.");
  }

  deleteTask(taskId) {
    const index = this.findTaskIndexById(taskId);
    if (index === -1) {
      console.error("Task not found.");
      return;
    }
    this.user_tasks.splice(index, 1);
    this.saveTasks(); // Save after deletion
    console.log("Task deleted.");
  }

  toggleCompletion(taskId) {
    const index = this.findTaskIndexById(taskId);
    if (index === -1) {
      console.error("Task not found.");
      return;
    }
    const task = this.user_tasks[index];
    task.task_status =
      task.task_status === "complete" ? "incomplete" : "complete";
    this.saveTasks(); // Save updated status
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
    this.saveTasks(); // Save after edit
    console.log("Task name changed to:", newName);
  }

  editDescription(taskId, newDescription) {
    if (typeof newDescription !== "string" || newDescription.length > 50) {
      console.error(
        "Task description must be a string less than 50 characters.",
      );
      return;
    }
    const index = this.findTaskIndexById(taskId);
    if (index === -1) {
      console.error("Task not found.");
      return;
    }
    this.user_tasks[index].task_description = newDescription;
    this.saveTasks();
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
    this.saveTasks();
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
    this.saveTasks();
    console.log("Task priority changed to:", newPriority);
  }

  editChecklist(taskId, newChecklist) {
    const index = this.findTaskIndexById(taskId);
    if (index === -1) {
      console.error("Task not found.");
      return;
    }
    try {
      const formattedChecklist = newChecklist.map((item) =>
        typeof item === "string" ? { text: item, completed: false } : item,
      );
      this.user_tasks[index].updateChecklist(formattedChecklist);
      this.saveTasks();
      console.log("Task checklist updated.");
    } catch (error) {
      console.error(error.message);
    }
  }
}
