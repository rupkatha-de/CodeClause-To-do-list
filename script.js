const addTaskButton = document.querySelector('#addTask');
const tasksList = document.querySelector('#tasks');

// Add a new task
addTaskButton.addEventListener('click', () => {
  const newTask = document.querySelector('#newTask').value;

  if (newTask) {
    const taskElement = document.createElement('li');
    taskElement.textContent = newTask;

    // Add a delete button to the task element
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      taskElement.remove();
    });

    taskElement.appendChild(deleteButton);

    tasksList.appendChild(taskElement);

    document.querySelector('#newTask').value = '';

    // Save the task list to local storage
    saveTaskListToLocalStorage();
  }
});

// Mark a task as completed
tasksList.addEventListener('click', (event) => {
  const taskElement = event.target;

  if (taskElement.classList.contains('completed')) {
    taskElement.classList.remove('completed');
  } else {
    taskElement.classList.add('completed');
  }

  // Save the task list to local storage
  saveTaskListToLocalStorage();
});

// Save the task list to local storage
function saveTaskListToLocalStorage() {
  const taskList = tasksList.querySelectorAll('li');
  const taskListArray = Array.from(taskList);
  const taskListString = JSON.stringify(taskListArray);

  localStorage.setItem('taskList', taskListString);
}

// Load the task list from local storage
function loadTaskListFromLocalStorage() {
  const taskListString = localStorage.getItem('taskList');
  const taskListArray = JSON.parse(taskListString);

  if (taskListArray) {
    taskListArray.forEach((task) => {
      const taskElement = document.createElement('li');
      taskElement.textContent = task;

      // Add a delete button to the task element
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        taskElement.remove();
      });

      taskElement.appendChild(deleteButton);

      tasksList.appendChild(taskElement);
    });
  }
}

// Load the task list from local storage when the page loads
loadTaskListFromLocalStorage();