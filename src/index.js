import "./styles/main.css"
import "./styles/today.css"

import {TodayPage} from "./scripts/today_tasks.js";


const todayBtn = document.getElementsByClassName('today-button');

const todayContent = new TodayPage();

function renderContent(contentToRender) {
    mainContent.innerHTML = "";
    mainContent.appendChild(contentToRender.render());
}

todayBtn.addEventListener("click", () => {
    renderContent(homeContent);
});
  
