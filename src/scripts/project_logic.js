import { Task, TaskManager } from "./task_logic.js";


function getAnyClass(obj) {
    if (typeof obj === "undefined") return "undefined";
    if (obj === null) return "null";
    return obj.constructor.name;
}

export class Project {
 
    static idCounter = 0;
    static generatedId(){
        return ++Project.idCounter;
    }

    constructor(proj_name, proj_description, id = null) {
        
        if (!proj_name || typeof proj_name !== "string" || proj_name > 20) {
            throw new Error(
                "proj_name is required and must be a string less than 20 characters.",
            );
        }

        if (proj_description && (typeof proj_description !== "string" || proj_description.length > 50)) {
            throw new Error("proj_description must be less than 50 characters.");
        }
     
        this.proj_name = proj_name;
        this.proj_description = proj_description;
        this.id = id || this.generateId();
        this.proj_tasks = new TaskManager(); // Each project has a task manager to manage the projects tasks!

    }

}

/* 
    Manages instances of projects, editing their 
*/
export class ProjectManager {

    constructor() {
        this.user_projects = []; // The list of users projects
    }

    findIndexById(projectId) {
        return this.user_projects.findIndex((project) => project.id === projectId);
    }
    
    editName(projectId, newName) {

        if (typeof newName !== "string" || newName.length > 20) {
            console.error("Project name must be a string less than 20 characters.");
            return;
        }
        const index = this.findIndexById(projectId);
        if (index === -1) {
            console.error("project not found.");
            return;
        }

        this.user_projects[index].project_name = newName;

        console.log("project name changed to:", newName);
    }

    editDescription(projectId, newDescription) {

        if (typeof newDescription !== "string" || newDescription.length > 40) {
            console.error("Project description must be a string less than 40 characters.");
            return;
        }
        const index = this.findIndexById(projectId);
        if (index === -1) {
            console.error("project not found.");
            return;
        }

        this.user_projects[index].proj_description = newDescription;
        console.log("project description changed!");

    }

    addProyect(project){

        if( getAnyClass(project) !== "Project") {
            console.error("The element must be an object of the class Project!");
            return;
        }
        this.user_projects.push(project);
    }

    deleteProyect(projectId) {
        const index = this.findTaskIndexById(projectId);
        if (index === -1) {
          console.error("Task not found.");
          return;
        }
        this.user_projects.splice(index, 1);
    }
}