import "./styles/main.css"
import "./styles/today.css"

import { MainContentBase } from "./scripts/base_content_task.js";
import {TodayPage} from "./scripts/today_tasks.js";
import { openForm , closeForm } from "./scripts/form_task.js";

const todayBtn = document.getElementsByClassName('today-button')[0];

const content = document.getElementsByClassName('main-content')[0];

const mainContent = new MainContentBase();
const todayContent = new TodayPage();


function renderContent(contentToRender) {
    content.innerHTML = "";
    mainContent.render();
    contentToRender.render()
}

todayBtn.addEventListener("click", () => {
    console.log("Today button clicked.");
    renderContent(todayContent);
});
