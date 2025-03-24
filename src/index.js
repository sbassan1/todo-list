import "./styles/main.css";
import "./styles/today.css";
import "./styles/task_form.css";

import { MainContentBase } from "./scripts/base_content_task.js";
import { TodayPage, WeekPage, AllTasks } from "./scripts/renderSubpages.js";
import { TaskFormUI } from "./scripts/task_form.js";

const content = document.getElementsByClassName("main-content")[0];
const todayBtn = document.getElementsByClassName("today-button")[0];
const weekBtn = document.getElementsByClassName("week-button")[0];
const allBtn = document.getElementsByClassName("all-button")[0];

const mainContent = new MainContentBase(); // The base for the content of subpages
const taskForm = new TaskFormUI(); // The taskData is the inputs of the form submitted by the user.

export const todayContent = new TodayPage();
export const weekContent = new WeekPage();
export const allTasksContent = new AllTasks();

const pageIndex = [todayContent, weekContent, allTasksContent];
let current_page = pageIndex[0];

export function getCurrentPage() {
  return current_page;
}

// Render subpages
function renderContent(contentToRender) {

  content.classList.add('fade');

  setTimeout(() => {
    content.innerHTML = "";
    mainContent.render();
    content.appendChild(taskForm.createTaskForm()); // Render the form, visible
    contentToRender.render();

    content.classList.remove('fade');
  }, 170); 
}

todayBtn.addEventListener("click", () => {
  console.log("Today button clicked.");
  current_page = pageIndex[0];
  renderContent(todayContent);
});

weekBtn.addEventListener("click", () => {
  console.log("Week button clicked.");
  current_page = pageIndex[1];
  renderContent(weekContent);
});

allBtn.addEventListener("click", () => {
  console.log("All tasks clicked.");
  current_page = pageIndex[2];
  renderContent(allTasksContent);
});
