document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'tasks';
  const nav = document.querySelector('nav');
  const main = document.querySelector('#main-container');

  loadTasksFromLocalStorage();
  loadNoTaskPopup();

  function createTaskElement({ title = 'title', subtitle = 'What to do' } = {}) {
    const card = document.createElement('div');
    card.className = 'task w-100 d-flex flex-column py-3 px-3 rounded-2 my-3';

    card.innerHTML = `
        <h5 class="title">${title || 'Untitled'}</h5>
        <p class="subtitle">${subtitle || 'no description'}</p>
        <div class="options-popup d-flex justify-content-end">
          <span>
            <button class='btn btn-outline-success detail-task-button'>
              <i class="icon fa-solid fa-bars rounded-2"></i>
            </button>
            <button class='btn btn-outline-danger delete-task-button'>
              <i class="icon fa-solid fa-trash rounded-2"></i>
            </button>
          </span>
        </div>
      `;
    return card;
  }

  function serializeTasks() {
    return Array.from(document.querySelectorAll('.task')).map((task) => {
      const title = task.querySelector('.title')?.textContent.trim() || '';
      const subtitle = task.querySelector('.subtitle')?.textContent.trim() || '';
      return { title, subtitle };
    });
  }

  function saveTasksToLocalStorage() {
    const payload = serializeTasks();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }

  function loadTasksFromLocalStorage() {
    main.innerHTML = '';
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) : [];

      if (!Array.isArray(stored) || stored.length === 0) {
        return;
      }

      stored.forEach((task) => {
        const card = createTaskElement({
          title: task.title,
          subtitle: task.subtitle,
        });
        main.appendChild(card);
      });
    } catch (error) {
      console.error('Failed to load tasks from localStorage', error);
    }
  }

  //allows for the creation of tasks
  nav.addEventListener('click', (event)=> {
    if(event.target.closest('.create-task-button')) {
      document.querySelector('.no-task-popup')?.remove();

      const card = createTaskElement();
      main.appendChild(card);
      saveTasksToLocalStorage();
    }
  })

  //Details the tasks
  document.addEventListener('click', (event) => {
  const confirmBtn = event.target.closest('.detail-task-button');
  if (!confirmBtn) return;

  const task = confirmBtn.closest('.task');
  if (!task) return;

  const title = task.querySelector('.title');
  const subtitle = task.querySelector('.subtitle');
  if (!title && !subtitle) return;

  // Prevent recreating input
  if (!title.querySelector('input')) {
    const currentTitle = title.textContent.trim();
    const currentSubtitle = subtitle.textContent.trim();

    title.innerHTML = `
      <input type="text" class="form-control" value="${currentTitle}">
    `;
    subtitle.innerHTML = `
      <input type="text" class="form-control" value="${currentSubtitle}">
    `
    confirmBtn.textContent = 'Confirm';
    return;
  }

  // CONFIRM MODE
  const titleInput = title.querySelector('input');
  const newTitle = titleInput.value.trim();
  const subTitleInput = subtitle.querySelector('input');
  const newSubTitle = subTitleInput.value.trim();

  title.textContent = newTitle || 'Untitled';
  subtitle.textContent = newSubTitle || 'no description';
  confirmBtn.textContent = 'Edit';

  saveTasksToLocalStorage();
});



  //deletes the task
  main.addEventListener('click', (event) => {
    if(event.target.closest('.delete-task-button'))
      {
        event.target.closest('.task')?.remove();
        saveTasksToLocalStorage();
        loadNoTaskPopup();
      }
  })

  //loads the create task group if no tasks are found
  function loadNoTaskPopup()
  {
    const hasTask = document.querySelectorAll('.task').length > 0;

    if(!hasTask && !main.querySelector('.no-task-popup'))
      {
        const empty = document.createElement('div');
        empty.className = 'no-task-popup w-100 d-flex flex-column align-items-center justify-content-center my-3';
        empty.innerHTML = `
          <h5 class="title">No tasks created</h5>
        `

        main.appendChild(empty);
      }
  }
})



