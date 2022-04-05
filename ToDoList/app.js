const tasks = []; //Array for saving information about tasks
//Initialization main variables
const form = document.querySelector('form');
const btnAddTask = form.querySelector('button');
const formInputTitle = form.elements['title'];
const formInputBody = form.elements['body'];
const listOfTasks = document.querySelector('ul');
const buttonDelete = listOfTasks.querySelector('.btn');
const buttonSave = document.querySelector('.btn-save');

//Function for getting last savings
function getLastChanges(currentArray) {
  if (currentArray.length === 0 && localStorage.tasks) {
      const lastArray = JSON.parse(localStorage.tasks);
    for (let i = 0; i < lastArray.length; i++){
        currentArray[i]= lastArray[i]; 
        creatingNewTaskInList();
      }
  }
}

getLastChanges(tasks);

form.addEventListener('submit', onFormSubmitHandler); //Handler for form's submit

//Main function for event handler
function onFormSubmitHandler(e) {
  e.preventDefault();
  const titleValue = formInputTitle.value;
  const bodyValue = formInputBody.value;
  form.reset();

  tasks.push(insertTaskToArray(titleValue, bodyValue));
  creatingNewTaskInList();
}

//Create needed dom nodes for a new task
function creatingNewTaskInList() {
  const span = document.createElement('span');
  const b = document.createElement('b');
  span.insertAdjacentElement('afterbegin', b);

  const btnDelete = document.createElement('button');
  btnDelete.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
  btnDelete.textContent = 'Delete';

  const p = document.createElement('p');
  p.classList.add('mt-2', 'w-100');

  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
  li.insertAdjacentElement('afterbegin', span);
  li.insertAdjacentElement('beforeend', btnDelete);
  li.insertAdjacentElement('beforeend', p);
  listOfTasks.insertAdjacentElement('afterbegin', li);

  insertTaskToList(li);
 }

 //Insert tasks' information from form to array
function insertTaskToArray(titleV, bodyV) {
  return {
    _id: `${Math.random()}`,
    completed: false,
    body: bodyV,
    title: titleV,
  }
}

//Get tasks' information from array
function getTaskFromArray(arrOfTasks) {
  const currentTask = arrOfTasks[arrOfTasks.length - 1];
  const currentTitle = currentTask.title;
  const currentBody = currentTask.body;
  const currentId = currentTask._id;

  return {title: currentTitle, body: currentBody, _id: currentId}
}

//Insert task from array to visible list
function insertTaskToList(li) {
  const neededTitle = getTaskFromArray(tasks).title;
  const neededBody = getTaskFromArray(tasks).body;
  const neededId = getTaskFromArray(tasks)._id;
  li.id = neededId;
  li.querySelector('span').querySelector('b').insertAdjacentHTML('afterbegin', neededTitle);
  li.querySelector('p').insertAdjacentHTML('afterbegin', neededBody);
}

//Delete task from visible list
listOfTasks.addEventListener('click', (e) => {
  if (e.target.className === 'btn btn-danger ml-auto delete-btn') {
    e.target.parentNode.remove();
    deleteTaskFromArray(e.target.parentNode);
  }
})

//Function for deleting needed task from array
function deleteTaskFromArray(neededTaskForDeleting) {
  const neededId = neededTaskForDeleting.id;
  let neededIndex;
  tasks.forEach((task, index) => { if (neededId === task._id) neededIndex = index;});
  tasks.splice(neededIndex, 1);
}

//For saving changes
buttonSave.addEventListener('click', saveChangesHandler);

function saveChangesHandler() {
  const arrayOfTasks = tasks;
  localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
  tasks.length = 0;
}
