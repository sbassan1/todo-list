
export class TodayPage {

    render() {

        const todayContent = document.createElement('div');

        const headerContent = document.createElement('div');
        headerContent.classList.add('header-content');
        
        const titlePage = document.createElement('h2');
        titlePage.id = 'title-page';
        titlePage.textContent = "Today";
        
        const priority = document.createElement('div');
        priority.classList.add('priority');
        priority.textContent = `Priority Colors: 
                        🟢 low
                        🟡 medium
                        🔴 high`;
        
        const createTaskImg = document.createElement('img');
        createTaskImg.src = './svg/plus.svg';
        createTaskImg.alt = 'Create Task';
        createTaskImg.id = 'create-task';
        
        headerContent.appendChild(titlePage);
        headerContent.appendChild(priority);
        headerContent.appendChild(createTaskImg);

        
        const tasksBox = document.createElement('div');
        tasksBox.classList.add = 'tasks-box';

        let todayTodayList = [];

        todayContent.appendChild(headerContent);
        todayContent.appendChild(tasksBox);


        return todayContent;
    
    }    

}

    
