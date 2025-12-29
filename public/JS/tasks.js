document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const main = document.querySelector('#main-container');
  const tasks = document.querySelectorAll('.task');
  loadNoTaskPopup();

  //allows for the creation of tasks
  nav.addEventListener('click', (event)=> {
    if(event.target.closest('.create-task-button')) {
      document.querySelector('.no-task-popup')?.remove();

      const card = document.createElement('div');
      card.className = 'task w-100 d-flex flex-column py-3 px-3 rounded-2 my-3'

      card.innerHTML = `
        <h5 class="title">title</h5>
        <p class="subtitle">What to do</p>
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
      `
      main.appendChild(card);
    }
  })

  //Details the tasks
  document.addEventListener('click', (event) => {
    if(event.target.closest('.detail-task-button'))
      {
        const title = event.target.closest('.task')?.querySelector('.title');

        if(!title) return;

        title.innerHTML = `<input type="text" class="form-control" placeholder="title">`
        event.target.closest('.detail-task-button').textContent = 'Confirm';

        if(title.querySelector('input')) return;
      };
  })


  //deletes the task
  main.addEventListener('click', (event) => {
    if(event.target.closest('.delete-task-button'))
      {
        event.target.closest('.task')?.remove();
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



