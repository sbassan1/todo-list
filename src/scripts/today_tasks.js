import {todaysTasks, TaskCardUI} from "./task_creation";



export class TodayPage {

    render() {
        const titlePage = document.getElementById('title-page');
        titlePage.textContent = "Today";
    
        const tasksBox = document.getElementsByClassName('tasks-box')[0]; 
        
        todaysTasks.forEach(task => {
            const elementTask = new TaskCardUI(task);
            tasksBox.appendChild(elementTask.render());
        });
    }    

}

    
