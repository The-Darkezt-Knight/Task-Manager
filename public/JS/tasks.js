document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('#main-container');
  loadNoTaskPopup();

  main.addEventListener('click', (event) => {
    if (event.target.closest('.create-task-button')) {
      document.querySelector('.no-task-popup')?.remove();
      const card = document.createElement('div');
      card.className = 'task w-100 d-flex flex-column py-3 px-3 rounded-2 my-3';
      card.innerHTML = `
        <h5 class="title">Your first duty every morning</h5>
        <p class="subtitle">Fix the bed</p>
        <div class="options-popup d-flex justify-content-end">
          <span>
            <i class="icon fa-solid fa-bars"></i>
            <i class="icon fa-solid fa-trash text-danger delete-task-button"></i>
          </span>
        </div>`;
      main.appendChild(card);
    }

    if (event.target.closest('.delete-task-button')) {
      event.target.closest('.task')?.remove();
      loadNoTaskPopup();
    }
  });

  function loadNoTaskPopup() {
    const hasTask = main.querySelectorAll('.task').length > 0;
    if (!hasTask && !main.querySelector('.no-task-popup')) {
      const empty = document.createElement('div');
      empty.className = 'no-task-popup w-100 d-flex flex-column align-items-center justify-content-center my-3';
      empty.innerHTML = `
        <h5 class="title">No tasks created</h5>
        <button class="create-task-button subtitle btn btn-outline-success col-3">Create one now</button>`;
      main.appendChild(empty);
    }
  }
});

