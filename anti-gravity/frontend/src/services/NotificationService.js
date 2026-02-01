import { ReminderService } from "./ReminderService.js";

export const NotificationService = {
    listeners: [],
    intervalId: null,

    subscribe(callback) {
        // Remove existing listener for this callback to prevent duplicates
        this.listeners = this.listeners.filter(l => l !== callback);
        this.listeners.push(callback);
        // Always run an immediate check for the new subscriber
        this.check();

        if (!this.intervalId) {
            this.startPolling();
        }
    },

    unsubscribe(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    },

    async startPolling() {
        console.log('[NotificationService] Starting real-time sync...');
        // Poll every 10 seconds for demo (real-time enough)
        this.intervalId = setInterval(() => this.check(), 10000);
    },

    stopPolling() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    },

    async check() {
        let localNotifs = [];
        let backendData = [];
        let overrides = {};

        try {
            // 1. Get local notifications
            localNotifs = JSON.parse(localStorage.getItem('user_notifications') || '[]');

            // 2. Get backend permissions
            const histUrl = `http://10.20.0.57:5000/api/v1/attendance/history?t=${Date.now()}`;
            const histRes = await fetch(histUrl).catch(() => null);
            if (histRes && histRes.ok) {
                const res = await histRes.json();
                backendData = res.success ? res.data : [];
            }

            // 3. Get schedule overrides (Atasan change schedule)
            const overUrl = `http://10.20.0.57:5000/api/v1/schedule/overrides?t=${Date.now()}`;
            const overRes = await fetch(overUrl).catch(() => null);
            if (overRes && overRes.ok) {
                const res = await overRes.json();
                overrides = res.success ? res.data : {};
            }
            // 4. Background Reminder Check (10 mins before shift)
            ReminderService.check();
        } catch (error) {
            console.error('[NotificationService] Processing error:', error);
        }

        const lastRead = parseInt(localStorage.getItem('last_read_notifications') || '0');
        const newLocalCount = localNotifs.filter(n => n.id > lastRead).length;
        const newBackendCount = backendData.filter(p => {
            const subTime = new Date(p.submittedAt).getTime();
            return !isNaN(subTime) && subTime > lastRead;
        }).length;

        // Match overrides as new notifications
        const overridesCount = Object.keys(overrides).length;

        const totalNew = newLocalCount + newBackendCount + overridesCount;

        console.log(`[NotificationService] Unread: ${totalNew} (Last Read: ${lastRead})`);

        // Broadcast to all listeners
        this.listeners.forEach(callback => {
            try {
                callback(totalNew, { local: localNotifs, backend: backendData });
            } catch (e) {
                console.error('[NotificationService] Listener error:', e);
            }
        });
    },

    markAsRead() {
        localStorage.setItem('last_read_notifications', Date.now().toString());
        this.notify();
    },

    notify() {
        this.check();
    }
};
