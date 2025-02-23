

export function openForm() {
    document.getElementById("myForm").style.display = "block";
}

export function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

export function createTaskForm() { // Creates the form to add a new task.

    const formPopup = document.createElement("div");
    formPopup.classList.add("form-popup");
    formPopup.id = "myForm";

    const formContainer = document.createElement("form");
    formContainer.classList.add("form-container");

    const title = document.createElement("h1");
    title.textContent = "New Task";

    const nameLabel = document.createElement("label");
    nameLabel.htmlFor = "name";
    nameLabel.innerHTML = "<b>Task Name: </b>";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Enter name";
    nameInput.name = "name";
    nameInput.required = true;

    const descLabel = document.createElement("label");
    descLabel.htmlFor = "description";
    descLabel.innerHTML = "<b>Description</b>";

    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.placeholder = "Enter Description (Optional)";
    descInput.name = "description";

    const dateLabel = document.createElement("label");
    dateLabel.htmlFor = "due-date";
    dateLabel.innerHTML = "<b>Due Date</b>";

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.name = "due-date";

    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = "Priority:";
    fieldset.appendChild(legend);

    const priorities = [
        { value: "low", label: "🟢 Low" },
        { value: "medium", label: "🟡 Medium" },
        { value: "high", label: "🔴 High" }
    ];

    priorities.forEach(priority => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "priority";
        radio.value = priority.value;
        label.appendChild(radio);
        label.append(` ${priority.label}`);
        fieldset.appendChild(label);
    });

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.classList.add("btn");
    submitButton.textContent = "Create Task";

    const resetButton = document.createElement("input");
    resetButton.type = "reset";
    resetButton.value = "Reset";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.classList.add("btn", "cancel");
    closeButton.textContent = "Close";
    closeButton.onclick = function () { formPopup.style.display = "none"; };

    formContainer.append(
        title, nameLabel, nameInput,
        descLabel, descInput,
        dateLabel, dateInput,
        fieldset, submitButton,
        resetButton, closeButton
    );
    formPopup.appendChild(formContainer);
    document.body.appendChild(formPopup);

}    

/* 
<div class="form-popup" id="myForm">
    <form class="form-container">
        <h1>New Task</h1>

        <label for="name"><b>Task Name: </b></label>
        <input type="text" placeholder="Enter name" name="name" required>

        <label for="description"><b>Description</b></label>
        <input type="text" placeholder="Enter Description (Optional)" name="description">

        <label for="due-date"><b>Due Date</b></label>
        <input type="date" name="due-date">

        <fieldset>
            <legend>Priority:</legend>

            <label>
                <input type="radio" name="priority" value="low">
                🟢 Low
            </label>

            <label>
                <input type="radio" name="priority" value="medium">
                🟡 Medium
            </label>

            <label>
                <input type="radio" name="priority" value="high">
                🔴 High
            </label>
        </fieldset>

        <button type="submit" class="btn">Create Task</button>
        <input type="reset" value="Reset">
        <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
    </form>
</div> 

*/

/* 
            <div class="task">

                <div class="task-head">
                    <h4 id="task-title">Task Title that summarices it <span id="due-date">Due date: 29/2/2025</span>  </h4>  
                    <p id="task-description">Brief description of the tasks at hand</p>     
                </div>

                <div class="task-options">
                    <button id="delete-task">Delete</button>
                    <button id="edit">Edit</button>
                </div>

                <div class="checklist">
                    <ul>
                        <li>
                        </li>
                    </ul>
                </div>

            </div>
*/