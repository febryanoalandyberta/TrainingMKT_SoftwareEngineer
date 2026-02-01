const tasks = []; // Temporary in-memory storage until DB is connected

const taskController = {
    getAllTasks: (req, res) => {
        // In a real app, query the DB: SELECT * FROM task_trx_todo WHERE user_id = ...
        res.json({
            success: true,
            data: tasks
        });
    },

    createTask: (req, res) => {
        const { title, description, statusClass, statusText, startDate, deadline, attachments } = req.body;

        const newTask = {
            id: Date.now(),
            title,
            description,
            statusClass,
            statusText,
            startDate,
            deadline,
            attachments: attachments || [], // Store multiple Base64 attachments
            completed: statusText === 'Done',
            finishedDate: statusText === 'Done' ? new Date().toLocaleDateString('en-GB') : null,
            createdAt: new Date()
        };

        tasks.push(newTask);

        console.log('[BACKEND] New task received:', newTask);

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: newTask
        });
    },

    updateTask: (req, res) => {
        const { id } = req.params;
        const index = tasks.findIndex(t => t.id == id);

        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...req.body };

            // Auto complete if status is Done
            if (req.body.statusText === 'Done') {
                tasks[index].completed = true;
                tasks[index].finishedDate = new Date().toLocaleDateString('en-GB');
            }

            res.json({
                success: true,
                message: 'Task updated successfully',
                data: tasks[index]
            });
        } else {
            res.status(404).json({ success: false, message: 'Task not found' });
        }
    },

    deleteTask: (req, res) => {
        const { id } = req.params;
        const index = tasks.findIndex(t => t.id == id);

        if (index !== -1) {
            tasks.splice(index, 1);
            res.json({ success: true, message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Task not found' });
        }
    }
};

module.exports = taskController;
