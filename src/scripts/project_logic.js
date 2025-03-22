import { project } from "./project_logic";


class Project {
 
    static idCounter = 0;

    static generatedId(){
        return ++Project.idCounter;
    }

    constructor(proj_name, proj_description, proj_list = [], id = null) {
        
        if (!proj_name || typeof proj_name !== "string" || proj_name > 20) {
            throw new Error(
                "proj_name is required and must be a string less than 20 characters.",
            );
        }

        if (proj_description && (typeof proj_description !== "string" || proj_description.length > 50)) {
            throw new Error("proj_description must be less than 50 characters.");
        }

        if (proj_list && typeof proj_list !== "array") {
            throw new Error("project project lists must be of type project!!");
        }
     
        this.proj_name = proj_name;
        this.proj_description = proj_description;
        this.proj_list = [];
        this.id = id || project.generateId();
    
    }

}

/* 
    Manages instances of projects 
*/
class ProjectManager {

    constructor(user_projects) {
        this.user_projects = [];
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
    
}