import "./styles/main.css"
import "./styles/today.css"


let user_tasks = []; // Stores ALL tasks of the user, including completed ones.

class task { // The checklist should be [] when created.

    constructor(task_name, task_description = "", task_due_date, task_priority = "low", checklist =[]) {

        if (!task_name || typeof task_name !== "string" || task_name.length >= 20) {
            throw new Error("task_name is required and must be less than 20 characters.");
        }

        if (task_description && (typeof task_description !== "string" || task_description.length >= 50)) {
            throw new Error("task_description must be less than 50 characters.");
        }

        const validPriorities = ["low", "medium", "high"];
        if (!validPriorities.includes(task_priority)) {
            throw new Error("task_priority must be 'low', 'medium', or 'high'.");
        }

        if (!Array.isArray(checklist) || !checklist.every(item => typeof item === "string")) {
            throw new Error("checklist must be an array of strings.");
        }
        

        this.task_name = task_name;                 // Required, less than 20 characters, tasks should have unique names.
        this.task_description = task_description;   // Optional, less than 50 characters. Empty string by default.
        this.task_due_date = task_due_date;         // Format: "YYYY-MM-DD"
        this.task_priority = task_priority;         // "low", "medium", "high". Set to "low" by default.
        this.task_status = "incomplete";            // "incomplete" or "complete"
        this.checklist = checklist;                 // Array of strings to be checked off. Set to [] by dafault
    }

}

/* 
Make sure that we use a more clever way to get and set dates. also, a way to check if all the tasks parameters are valid
before creating a new task. The only required parameter is the task_name, and due date. All others are optional.
*/

class task_manager {

    constructor() {
        this.user_tasks = [];
    }

    add_task(task) {

        if (this.user_tasks.find(t => t.task_name === task.task_name) ) { // If we find a task with the same name
            console.error("Task with the same name already exists.");
            return;
        }
    
        if (task.task_name.length > 20) {
            console.error("Task name must be less than 20 characters.");
            return;
        }
    
        if (task.task_description.length > 50) {
            console.error("Task description must be less than 50 characters.");
            return;
        }


    
        this.user_tasks.push(task);
        console.log("Task added.");
    }

    delete_task(task_name){

        const taskIndex = this.user_tasks.findIndex(t => t.task_name === task_name);

        if (taskIndex === -1) {
            console.error("Task not found.");
            return;
        }

        this.user_tasks.splice(taskIndex, 1);
        console.log("Task deleted.");
    }

    set_completion(task_name){

        const taskIndex = this.user_tasks.findIndex(t => t.task_name === task_name);

        if (taskIndex === -1) {
            console.error("Task not found.");
            return;
        }

        user_tasks[taskIndex].task_status = "complete"? "incomplete" : "complete";
        console.log("Task status changed to :", user_tasks[taskIndex].task_status);
    }

    edit_name(task_name, new_name) {

        if (new_name.length > 20) {
            console.error("Task name must be less than 20 characters.");
            return;
        }
    
        const taskIndex = this.user_tasks.findIndex(t => t.task_name === task_name);

        if (taskIndex === -1) {
            console.error("Task not found.");
            return;
        }

        user_tasks[taskIndex].task_name = new_name;
        console.log("Task name changed to :", user_tasks[taskIndex].task_name);
    }

    edit_description(task_name, new_description) {

        if (new_description.length > 50) {
            console.error("Task description must be less than 50 characters.");
            return;
        }

        const taskIndex = this.user_tasks.findIndex(t => t.task_name === task_name);

        if (taskIndex === -1) {
            console.error("Task not found.");
            return;
        }

        user_tasks[taskIndex].task_description = new_description;
        console.log("Task description changed to :", user_tasks[taskIndex].task_description);
    }

    edit_due_date(task_name, new_date) {

        const taskIndex = this.user_tasks.findIndex(t => t.task_name === task_name);

        if (taskIndex === -1) {
            console.error("Task not found.");
            return;
        }

        user_tasks[taskIndex].task_due_date = new_date;
        console.log("Task due date changed to :", user_tasks[taskIndex].task_due_date);

    }

    edit_priority(task_name, new_priority) {

        const taskIndex = this.user_tasks.findIndex(t => t.task_name === task_name);

        if (taskIndex === -1) {
            console.error("Task not found.");
            return;
        }

        user_tasks[taskIndex].task_priority = new_priority;
        console.log("Task priority changed to :", user_tasks[taskIndex].task_priority);

    }

}