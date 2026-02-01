import AbstractView from "./AbstractView.js";
import { AuthService } from "../services/AuthService.js";
import { TaskService } from "../services/TaskService.js";


export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Task - PT Mega Kreasi Tech");
    }

    async getHtml() {
        const user = AuthService.getUser();
        const savedPhoto = localStorage.getItem('user_profile_photo') || null;

        return `
            <div class="header">
                 <div class="header-content">
                     <div class="logo-section">
                        <div class="logo-box">M</div>
                        <span class="company-name">PT Mega Kreasi Tech</span>
                    </div>
                     <div class="user-profile">
                        <div class="user-info">
                            <h4>${user.name}</h4>
                            <p>${user.role}</p>
                        </div>
                        <a href="/profile" data-link style="text-decoration: none; color: inherit; display: flex;">
                             ${savedPhoto
                ? `<img src="${savedPhoto}" class="avatar-img">`
                : `<span class="material-icons-round avatar">account_circle</span>`
            }
                        </a>
                    </div>
                 </div>
            </div>

            <div class="container" style="background: #F5F5F5; position: relative; min-height: calc(100vh - 80px);">
                 <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <a href="/home" class="nav-back" style="margin-bottom: 0px; margin-right: 15px; color: inherit; text-decoration: none;" data-link>
                        <span class="material-icons-round">arrow_back</span>
                    </a>
                    <h2 style="font-size: 1.3rem; margin: 0;">Task Management</h2>
                </div>

                <!-- Tabs -->
                <div class="task-tabs">
                    <div id="tab-new" class="task-tab active">Active Tasks</div>
                    <div id="tab-completed" class="task-tab">History</div>
                </div>

                <!-- Task Lists -->
                <div id="task-list-active" class="tab-content"></div>
                <div id="task-list-history" class="tab-content" style="display: none;"></div>

                <!-- Floating Action Button -->
                <button id="add-task-fab" class="fab">
                    <span class="material-icons-round">add</span>
                </button>

                <!-- Task Modal -->
                <div id="task-modal" class="modal-overlay">
                    <div class="modal-content" style="max-height: 90vh; overflow-y: auto;">
                        <div class="modal-header">
                            <h3 id="modal-title">Create New Task</h3>
                            <span id="close-modal" class="material-icons-round" style="cursor: pointer;">close</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Task Title</label>
                            <input type="text" id="task-title-input" class="form-input" placeholder="What needs to be done?">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Description (Optional)</label>
                            <textarea id="task-desc-input" class="form-input" style="height: 60px; resize: none;" placeholder="Details..."></textarea>
                        </div>
                        <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <label class="form-label">Start Date</label>
                                <input type="date" id="task-start-input" class="form-input">
                            </div>
                            <div>
                                <label class="form-label">Deadline</label>
                                <input type="date" id="task-deadline-input" class="form-input">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Execution Status</label>
                            <select id="task-status-input" class="status-select">
                                <option value="tag-todo">Plan</option>
                                <option value="tag-on-progress">In Progress</option>
                                <option value="tag-in-review">Need Review</option>
                                <option value="tag-approved">Done</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Attachments (Multiple)</label>
                            <input type="file" id="task-file-input" style="display: none;" multiple>
                            <div id="task-file-dropzone" style="border: 2px dashed #ddd; padding: 15px; text-align: center; border-radius: 8px; background: white; color: #888; cursor: pointer;">
                                <span class="material-icons-round" style="font-size: 1.5rem;">attach_file</span>
                                <div id="task-file-label">Tap to upload files</div>
                            </div>
                            <div id="task-file-list" style="margin-top: 10px; font-size: 0.75rem; color: #555; display: flex; flex-wrap: wrap; gap: 5px;"></div>
                        </div>
                        <div class="modal-footer">
                            <button id="cancel-task-btn" class="btn" style="border: none; color: #888;">Cancel</button>
                            <button id="save-task-btn" class="btn" style="background: #D32F2F; color: white; border: none;">Save Changes</button>
                        </div>
                    </div>
                </div>

                 <div class="footer">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }

    execute() {
        const fab = document.getElementById('add-task-fab');
        const modal = document.getElementById('task-modal');
        const closeBtn = document.getElementById('close-modal');
        const cancelBtn = document.getElementById('cancel-task-btn');
        const saveBtn = document.getElementById('save-task-btn');

        const titleInput = document.getElementById('task-title-input');
        const descInput = document.getElementById('task-desc-input');
        const statusInput = document.getElementById('task-status-input');
        const startInput = document.getElementById('task-start-input');
        const deadlineInput = document.getElementById('task-deadline-input');
        const fileInput = document.getElementById('task-file-input');
        const dropzone = document.getElementById('task-file-dropzone');
        const fileLabel = document.getElementById('task-file-label');
        const fileListContainer = document.getElementById('task-file-list');
        const modalTitle = document.getElementById('modal-title');

        const tabNew = document.getElementById('tab-new');
        const tabCompleted = document.getElementById('tab-completed');
        const listActive = document.getElementById('task-list-active');
        const listHistory = document.getElementById('task-list-history');

        let tasks = [];
        let editingTaskId = null;
        let selectedFiles = []; // To store Base64 strings of selected files

        const handleFileSelection = async (files) => {
            selectedFiles = [];
            fileListContainer.innerHTML = '';

            for (let file of files) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                await new Promise(resolve => {
                    reader.onload = () => {
                        selectedFiles.push({
                            name: file.name,
                            type: file.type,
                            data: reader.result
                        });

                        const item = document.createElement('span');
                        item.style.background = '#eee';
                        item.style.padding = '2px 8px';
                        item.style.borderRadius = '4px';
                        item.innerText = file.name;
                        fileListContainer.appendChild(item);
                        resolve();
                    };
                });
            }
            fileLabel.innerText = `${files.length} file(s) selected`;
            dropzone.style.borderColor = '#4CAF50';
        };

        if (dropzone && fileInput) {
            dropzone.onclick = () => fileInput.click();
            fileInput.onchange = (e) => handleFileSelection(e.target.files);
        }

        const loadTasks = async () => {
            tasks = await TaskService.getAll();
            // Sync with local storage for offline support
            localStorage.setItem('user_tasks_advanced', JSON.stringify(tasks));
            renderTasks();
        };

        const saveToLocal = () => localStorage.setItem('user_tasks_advanced', JSON.stringify(tasks));

        const renderTasks = () => {
            listActive.innerHTML = '';
            listHistory.innerHTML = '';

            const activeTasks = tasks.filter(t => !t.completed);
            const historyTasks = tasks.filter(t => t.completed);

            if (activeTasks.length === 0) {
                listActive.innerHTML = '<div style="text-align: center; color: #888; margin-top: 50px;">No active tasks. Tap + to add one!</div>';
            }

            activeTasks.forEach(task => {
                const card = document.createElement('div');
                card.className = 'task-card';
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <span class="task-tag ${task.statusClass}">${task.statusText}</span>
                        <div style="display: flex; gap: 8px;">
                             <span class="material-icons-round btn-edit" style="font-size: 1.2rem; color: #2196F3; cursor: pointer;">edit</span>
                             <span class="material-icons-round btn-delete" style="font-size: 1.2rem; color: #AAA; cursor: pointer;">delete</span>
                        </div>
                    </div>
                    <h4 style="margin: 10px 0 5px 0; font-size: 1rem;">${task.title}</h4>
                    <p style="font-size: 0.8rem; color: #555; margin-bottom: 15px;">${task.description || 'No description'}</p>
                    <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 15px;">
                        <div style="font-size: 0.75rem; color: #888; display: flex; align-items: center; gap: 5px;">
                            <span class="material-icons-round" style="font-size: 0.9rem;">play_arrow</span>
                            Started: ${task.startDate || '-'}
                        </div>
                        <div style="font-size: 0.75rem; color: #888; display: flex; align-items: center; gap: 5px;">
                            <span class="material-icons-round" style="font-size: 0.9rem;">calendar_today</span>
                            Deadline: ${task.deadline || '-'}
                        </div>
                    </div>
                    <div style="display: flex; justify-content: flex-end; align-items: center; gap: 10px;">
                        ${task.attachments && task.attachments.length > 0
                        ? `<div style="display: flex; align-items: center; gap: 3px; color: #888; font-size: 0.75rem;">
                                 <span class="material-icons-round" style="font-size: 1rem;">attach_file</span>
                                 ${task.attachments.length}
                               </div>`
                        : ''
                    }
                        <button class="btn-complete" style="background: #4CAF50; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                            DONE <span class="material-icons-round" style="font-size: 1rem;">check</span>
                        </button>
                    </div>
                `;

                // Event Listeners for buttons
                card.querySelector('.btn-delete').onclick = async () => {
                    if (confirm('Delete this task?')) {
                        const result = await TaskService.delete(task.id);
                        if (result.success || !result.success) { // Fallback if backend dev mode
                            tasks = tasks.filter(t => t.id !== task.id);
                            saveToLocal();
                            renderTasks();
                        }
                    }
                };

                card.querySelector('.btn-edit').onclick = () => {
                    editingTaskId = task.id;
                    modalTitle.innerText = 'Edit Task';
                    titleInput.value = task.title;
                    descInput.value = task.description;
                    statusInput.value = task.statusClass;
                    startInput.value = task.startDate || '';
                    deadlineInput.value = task.deadline || '';
                    selectedFiles = task.attachments || [];
                    fileListContainer.innerHTML = '';
                    selectedFiles.forEach(f => {
                        const item = document.createElement('span');
                        item.style.background = '#eee';
                        item.style.padding = '2px 8px';
                        item.style.borderRadius = '4px';
                        item.innerText = f.name;
                        fileListContainer.appendChild(item);
                    });
                    fileLabel.innerText = selectedFiles.length > 0 ? `${selectedFiles.length} file(s) attached` : 'Tap to upload files';
                    modal.style.display = 'flex';
                };

                card.querySelector('.btn-complete').onclick = async () => {
                    const updateData = { ...task, completed: true, statusClass: 'tag-approved', statusText: 'Done' };
                    await TaskService.update(task.id, updateData);

                    task.completed = true;
                    task.statusClass = 'tag-approved';
                    task.statusText = 'Done';
                    task.finishedDate = new Date().toLocaleDateString('en-GB');

                    saveToLocal();
                    renderTasks();
                };

                listActive.appendChild(card);
            });

            historyTasks.forEach(task => {
                const card = document.createElement('div');
                card.className = 'task-card';
                card.style.opacity = '0.7';
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between;">
                        <span class="task-tag tag-approved">Completed</span>
                        <!-- Delete button removed for history tasks to preserve data -->
                    </div>
                    <h4 style="margin: 10px 0 5px 0; font-size: 1rem; text-decoration: line-through;">${task.title}</h4>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                        <div style="font-size: 0.75rem; color: #4CAF50; display: flex; align-items: center; gap: 5px; font-weight: 500;">
                            <span class="material-icons-round" style="font-size: 1rem;">check_circle</span>
                            Finished: ${task.finishedDate}
                        </div>
                        <span class="btn-undo" style="font-size: 0.75rem; color: #D32F2F; cursor: pointer; text-decoration: underline;">Undo</span>
                    </div>
                `;

                card.querySelector('.btn-undo').onclick = async () => {
                    const updateData = { ...task, completed: false, statusClass: 'tag-on-progress', statusText: 'In Progress' };
                    await TaskService.update(task.id, updateData);

                    task.completed = false;
                    task.statusClass = 'tag-on-progress';
                    task.statusText = 'In Progress';

                    saveToLocal();
                    renderTasks();
                };

                listHistory.appendChild(card);
            });
        };

        // Initialize Render
        loadTasks();

        // Tabs Toggle
        tabNew.onclick = () => {
            tabNew.classList.add('active');
            tabCompleted.classList.remove('active');
            listActive.style.display = 'block';
            listHistory.style.display = 'none';
            fab.style.display = 'flex';
        };

        tabCompleted.onclick = () => {
            tabCompleted.classList.add('active');
            tabNew.classList.remove('active');
            listActive.style.display = 'none';
            listHistory.style.display = 'block';
            fab.style.display = 'none';
        };

        // Modal Logic
        fab.onclick = () => {
            editingTaskId = null;
            modalTitle.innerText = 'Create New Task';
            titleInput.value = '';
            descInput.value = '';
            statusInput.selectedIndex = 0;
            startInput.value = '';
            deadlineInput.value = '';
            selectedFiles = [];
            fileListContainer.innerHTML = '';
            fileLabel.innerText = 'Tap to upload files';
            dropzone.style.borderColor = '#ddd';
            modal.style.display = 'flex';
        };

        const closeModal = () => modal.style.display = 'none';
        closeBtn.onclick = closeModal;
        cancelBtn.onclick = closeModal;

        saveBtn.onclick = async () => {
            const title = titleInput.value.trim();
            if (!title) return alert('Please enter a title');

            const statusText = statusInput.options[statusInput.selectedIndex].text;
            const statusClass = statusInput.value;
            const isDone = statusText === 'Done';

            if (editingTaskId) {
                const task = tasks.find(t => t.id === editingTaskId);
                const updateData = {
                    title,
                    description: descInput.value,
                    statusClass: statusClass,
                    statusText,
                    startDate: startInput.value,
                    deadline: deadlineInput.value,
                    attachments: selectedFiles
                };

                await TaskService.update(editingTaskId, updateData);

                task.title = title;
                task.description = descInput.value;
                task.statusClass = statusClass;
                task.statusText = statusText;
                task.startDate = startInput.value;
                task.deadline = deadlineInput.value;
                task.attachments = selectedFiles;
                if (isDone) {
                    task.completed = true;
                    task.finishedDate = new Date().toLocaleDateString('en-GB');
                }
            } else {
                const newTaskData = {
                    title,
                    description: descInput.value,
                    statusClass: statusClass,
                    statusText,
                    startDate: startInput.value,
                    deadline: deadlineInput.value,
                    attachments: selectedFiles
                };

                const result = await TaskService.create(newTaskData);
                if (result.success) {
                    tasks.push(result.data);
                } else {
                    // Fallback to local push if backend fails
                    tasks.push({
                        id: Date.now(),
                        ...newTaskData,
                        completed: isDone,
                        finishedDate: isDone ? new Date().toLocaleDateString('en-GB') : null
                    });
                }
            }

            saveToLocal();
            renderTasks();
            closeModal();
        };
    }
}

