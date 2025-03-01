import {WeekTasks, TaskCardUI} from "./task_creation";


export class WeekPage {

    render() {
        const titlePage = document.getElementById('title-page');
        titlePage.textContent = "This Week!";
    
        const tasksBox = document.getElementsByClassName('tasks-box')[0]; 
        
        tasksBox.innerHTML = "";

        // IN CONSTRUCTION!!
    }

}