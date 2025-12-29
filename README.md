# Task Manager

A lightweight task list prototype built with plain HTML/JS and Bootstrap. Tasks are created, edited, deleted, and persisted in `localStorage` so they reappear on reload.

## Features
- Create tasks via the header button; each task card shows a title and subtitle.
- Inline edit: toggle to input fields, confirm to save; falls back to defaults if left empty.
- Delete tasks and auto-show the empty state when none remain.
- Persistence: tasks serialize to `localStorage` (`tasks` key) and load on page open.
- Minimal styling with Bootstrap 5 and Font Awesome icons.

## Project Structure
- `main.html` — entry page, navbar with create button, container for tasks, inline styles.
- `public/JS/tasks.js` — all client-side logic: create/edit/delete, persistence, empty-state handling.
- `public/CSS/` — (currently empty) placeholder for custom styles.
- `public/Uploads/Images/Task-Manager-Logo.png` — favicon.
- `App/`, `Auth/` — backend PHP scaffolding (controllers/services/db connector), not wired into the front-end flow yet.

## Running Locally
- Simple option: open `main.html` directly in a browser.
- Recommended: serve via a local web server (e.g., XAMPP at `http://localhost/Projects/Task_Manager/main.html`) so assets load predictably.

## Usage
1. Click **Create tasks** to add a card.
2. Click the bars icon to edit; the button toggles to **Confirm**. Update title/subtitle, then confirm to save and re-render text.
3. Click the trash icon to delete a card. The empty state appears when no tasks remain.
4. Refresh the page; tasks saved in `localStorage` will rehydrate automatically.

## Data & Persistence
- Storage key: `tasks` in `localStorage`.
- Saved fields per task: `title`, `subtitle` (both strings).
- Clearing browser storage removes saved tasks; next load will show the empty-state message.

## Dependencies
- Bootstrap 5.3.3 (CSS/JS CDN).
- Font Awesome 7.x (icons via CDN).
- No build step; plain ES2015+ in-browser JavaScript.

## Extending
- To add more fields: update `createTaskElement`, `serializeTasks`, and the edit/confirm block in `public/JS/tasks.js`.
- To style further: move inline styles from `main.html` into `public/CSS/` and include the stylesheet.
- To persist to a backend: replace `localStorage` calls with API requests and hydrate from server responses.
