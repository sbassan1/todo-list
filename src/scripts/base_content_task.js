import plusIcon from '../svg/plus.svg';

export class MainContentBase {

    render() {
        const mainContent = document.getElementsByClassName('main-content')[0];
        mainContent.innerHTML = "";

        const headerContent = document.createElement('div');
        headerContent.className = "header-content";

        const titlePage = document.createElement('h2');
        // titlePage.textContent = "SUBPAGE NAME";
        titlePage.id = "title-page";

        const priority = document.createElement('div');
        priority.className = "priority";
        priority.innerHTML = `                
                Priority Colors: 
                🟢 low
                🟡 medium
                🔴 high
                `;
        
        const addTaskBtn = document.createElement('img');
        addTaskBtn.src = plusIcon;
        addTaskBtn.alt = "Add Task";
        addTaskBtn.id = "btn-add-task";
        addTaskBtn.addEventListener("click", () => {
            document.getElementById("myForm").style.display = "block";
        });

        const tasksContent = document.createElement('div');
        tasksContent.className = "tasks-box";
                
        headerContent.appendChild(titlePage);
        headerContent.appendChild(priority);
        headerContent.appendChild(addTaskBtn);
        mainContent.appendChild(headerContent);
        mainContent.appendChild(tasksContent);
    }

}

