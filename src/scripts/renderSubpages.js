import {task_database} from "./task_form";
import {format, isThisWeek, parse} from "date-fns"
import {TaskCardUI, TaskCardController} from "./task_cards";

export class TodayPage {

    render() {
        const titlePage = document.getElementById('title-page');
        titlePage.textContent = "Today";
    
        const tasksBox = document.getElementsByClassName('tasks-box')[0]; 
        tasksBox.innerHTML = "";

        const today = format(new Date(), 'dd-MM-yyyy');

        task_database.user_tasks.forEach( (task) => {

            if(task.task_due_date === today){
                const taskCardElement = new TaskCardUI(task);
                tasksBox.appendChild(taskCardElement.render());
                new TaskCardController(task, taskCardElement);
            }
        });

        console.log(task_database.user_tasks);
    }
}

export class WeekPage {

    render() {
        const titlePage = document.getElementById('title-page');
        titlePage.textContent = "Weekly!";
    
        const tasksBox = document.getElementsByClassName('tasks-box')[0]; 
        tasksBox.innerHTML = "";

        task_database.user_tasks.forEach( (task) => {

            if(isThisWeek( parse(task.task_due_date, 'dd-MM-yyyy', new Date()) )  ){
                const taskCardElement = new TaskCardUI(task);
                tasksBox.appendChild(taskCardElement.render());
                new TaskCardController(task, taskCardElement);
            }
        });

        console.log(task_database.user_tasks);
    }
}

    
