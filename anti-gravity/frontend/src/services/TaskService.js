const API_BASE_URL = 'http://10.20.0.57:5000/api/v1/tasks';
import { NotificationService } from "./NotificationService.js";

export const TaskService = {
    async getAll() {
        try {
            const response = await fetch(API_BASE_URL);
            const result = await response.json();
            return result.data || [];
        } catch (error) {
            console.error('[TaskService] Error fetching tasks:', error);
            // Fallback to local storage if backend is unavailable
            return JSON.parse(localStorage.getItem('user_tasks_advanced') || '[]');
        }
    },

    async create(taskData) {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
            const result = await response.json();
            if (result.success) {
                NotificationService.notify();
            }
            return result;
        } catch (error) {
            console.error('[TaskService] Error creating task:', error);
            return { success: false, error };
        }
    },

    async update(id, taskData) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
            const result = await response.json();
            if (result.success) {
                NotificationService.notify();
            }
            return result;
        } catch (error) {
            console.error('[TaskService] Error updating task:', error);
            return { success: false, error };
        }
    },

    async delete(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.error('[TaskService] Error deleting task:', error);
            return { success: false, error };
        }
    }
};
