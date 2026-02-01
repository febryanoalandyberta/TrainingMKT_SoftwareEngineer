import { NotificationService } from "./NotificationService.js";

// Helper to determine backend URL dynamically
import { AppConfig } from "../config.js";

const getBackendBaseUrl = () => {
    return `${AppConfig.API_BASE_URL}/attendance`;
};

export const AttendanceAPI = {
    async submit(type, data) {
        console.log(`[API] Sending ${type} to backend:`, data);

        try {
            const baseUrl = getBackendBaseUrl();
            const url = `${baseUrl}/submit`;

            console.log(`[API] Fetching: ${url}`);

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, data })
            });

            if (!response.ok) {
                const txt = await response.text();
                throw new Error(`Server Error (${response.status}): ${txt}`);
            }

            const result = await response.json();

            // Local Notification
            const notif = {
                id: Date.now(),
                title: `Berhasil ${type}`,
                message: `Waktu: ${data.timestamp} - Lokasi: ${data.location}`,
                time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                date: 'Today',
                icon: type.includes('Absen') ? 'meeting_room' : 'free_breakfast'
            };

            const currentNotifs = JSON.parse(localStorage.getItem('user_notifications') || '[]');
            currentNotifs.unshift(notif);
            localStorage.setItem('user_notifications', JSON.stringify(currentNotifs.slice(0, 10)));

            NotificationService.notify();
            return { success: true, data: result.data };
        } catch (error) {
            console.error('[AttendanceAPI] Submission failed:', error);
            // Return detailed error for debugging
            return { success: false, error: `${error.message} (Target: ${getBackendBaseUrl()})` };
        }
    },

    async submitPermission(permissionData) {
        const baseUrl = getBackendBaseUrl();
        const url = `${baseUrl}/permission`;

        console.log(`[AttendanceAPI] Sending to ${url}:`, permissionData);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(permissionData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server returned ${response.status}: ${errorText}`);
            }

            const result = await response.json();

            if (result.success && result.data) {
                const locals = JSON.parse(localStorage.getItem('local_permissions') || '[]');
                locals.push(result.data);
                localStorage.setItem('local_permissions', JSON.stringify(locals));
                NotificationService.notify();
            }

            return result;
        } catch (error) {
            console.error('[AttendanceAPI] FETCH ERROR:', error);
            return { success: false, error: error.message };
        }
    },

    async getHistory() {
        const baseUrl = getBackendBaseUrl();
        const url = `${baseUrl}/history?t=${Date.now()}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('[AttendanceAPI] Error fetching history:', error);
            return { success: false, data: [] };
        }
    }
};
