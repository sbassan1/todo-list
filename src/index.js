import "./styles/main.css"
import "./styles/today.css"
import {MainContentBase} from "./scripts/base_content_task.js";
import {TodayPage} from "./scripts/today_tasks.js";
import {TaskFormUI, user_tasks} from "./scripts/task_creation.js";

const content = document.getElementsByClassName('main-content')[0];
const todayBtn = document.getElementsByClassName('today-button')[0];


const mainContent = new MainContentBase();
const todayContent = new TodayPage();


const taskForm = new TaskFormUI(); // The taskData is the inputs of the form submitted by the user.

// Render subpages
function renderContent(contentToRender) {
    content.innerHTML = ""; // Reset content of the page
    mainContent.render();
    content.appendChild(taskForm.createTaskForm()); // Render the form, visible
    contentToRender.render()
}

todayBtn.addEventListener("click", () => {
    console.log("Today button clicked.");
    renderContent(todayContent);
});


